<script setup>
import { computed, onMounted, onUnmounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { data, moveCaret, recordingStatistics } from "@/store/data.js";
import { state } from "@/store/state.js";
import { storage } from "@/store/storage.js";
import click from "@/assets/sounds/click.mp3";
import { charTest, isAuxiliaryKeys, msToMinutes, playAudio } from "@/services/helpers.js";
import TheKeyboard from "@/components/TheKeyboard.vue";
import TheCurrentStats from "./TheCurrentStats.vue";

const events = reactive({
  keyDn: Object,
  keyValue: {},
  capsLock: false,
});

const router = useRouter();

const statArr = computed(() => data.statArr);
const indexArr = computed(() => data.indexArr);
const firstIndex = computed(() => data.firstIndex);

// переменные цвета
const fieldBackground = computed(() => storage.field.background);
const charBackground = computed(() => storage.field.charBackground);
const charColor = computed(() => storage.field.charColor);
const charCorrectColor = computed(() => storage.field.charCorrectColor);
const charWrongColor = computed(() => storage.field.charWrongColor);
const charRevisedColor = computed(() => storage.field.charRevisedColor);
const charSpecialColor = computed(() => storage.field.charSpecialColor);
const caretBackground = computed(() => storage.field.caretBackground);

// переменные эффекта отбрасываемой тени
const charCorrectShadow = computed(() => {
  if (storage.shadow.charCorrect) {
    return "drop-shadow(3px 2px 2px)";
  } else {
    return "none";
  }
});

const charWrongShadow = computed(() => {
  if (storage.shadow.charWrong) {
    return "drop-shadow(3px 2px 2px)";
  } else {
    return "none";
  }
});

const charRevisedShadow = computed(() => {
  if (storage.shadow.charRevised) {
    return "drop-shadow(3px 2px 2px)";
  } else {
    return "none";
  }
});

const charSpecialShadow = computed(() => {
  if (storage.shadow.charSpecial) {
    return "drop-shadow(3px 2px 2px)";
  } else {
    return "none";
  }
});

// возвращает символы поля для набора
const charsArr = computed(() =>
  data.fragmentArr.slice(data.firstIndex, data.firstIndex + 200)
);

// обработка события ввода символа с клавиатуры
const eListener = function (e) {
  events.keyDn = e;
  events.keyValue = e.key;
  const code = e.code;

  if (
    (data.indexArr === 0 && code === "Enter") ||
    (data.indexArr === 0 && code === "Backspace")
  ) {
    return;
  } else if (data.indexArr !== 0 && code === "Enter") {
    data.timerStop = performance.now();
    router.push({ name: "stats" });
    return;
  }

  if (isAuxiliaryKeys(code)) {
    e.preventDefault();
    return;
  }

  if (!state.bTimer) {
    // активация секундомера
    state.bTimer = true;
    data.timerStart = performance.now();

    /* присвоение и обновление реактивной переменной
    отражающей истёкшее время */
    data.stopwatch = setInterval(() => {
      data.elapsedTime = performance.now() - data.timerStart;
      data.elapsedTimeStr = msToMinutes(data.elapsedTime);
      let charPerMin = Math.floor(
        (data.numDialed * 60) / (Math.floor(data.elapsedTime) / 1000)
      )
        .toString()
        .padStart(3, "0");
      if (charPerMin > 999) charPerMin = 999;
      data.charPerMin = charPerMin;
    }, 10);
  }

  recordingStatistics(e);

  if (code === "Backspace" && data.indexArr > 0) {
    /* возвращает предыдущий набор символов при условии нажатия
    клавиши backspace в нулевом положении курсора */
    if (data.indexArr % 200 === 0 && data.firstIndex !== 0) {
      data.firstIndex -= 200;
    }

    data.remainingChars++;
    moveCaret("back");
    if ("23".includes(data.statArr[data.indexArr]) && data.tempErrorFree > 0) {
      data.tempErrorFree--;
    }
  } else {
    if (storage.main.speaker) playAudio(click, storage.main.volume);
    data.remainingChars--;
    moveCaret();
  }

  // срабатывает после того как был набран последний символ фрагмента
  if (
    data.indexArr >= data.fragmentArr.length ||
    data.fragmentArr[data.indexArr] === "end"
  ) {
    router.push({ name: "stats" });
  }
};

onMounted(() => {
  document.body.addEventListener("keydown", eListener);
});

onUnmounted(() => {
  document.body.removeEventListener("keydown", eListener);
  clearInterval(data.stopwatch);
  data.charPerMin = 0;
});
</script>

<template>
  <Transition name="opacity">
    <TheCurrentStats v-if="storage.visibility.currentStatistics" />
  </Transition>

  <Transition name="opacity">
    <div class="field">
      <div
        v-for="(char, index) in charsArr"
        :key="index"
        class="char"
        :class="[
          { char_display_caret: index === indexArr % 200 },
          {
            char_display_correct:
              statArr[index + firstIndex] === '2' &&
              char !== ' ' &&
              index < indexArr % 200,
          },
          {
            char_display_revised:
              statArr[index + firstIndex] === '3' && index < indexArr % 200,
          },
          {
            char_display_wrong:
              statArr[index + firstIndex] === '4' && index < indexArr % 200,
          },
          { 'char_display_special-inactive': charTest(char) },
          {
            'char_display_special-active':
              char !== 'skip' &&
              statArr[index + firstIndex] === '0' &&
              index < indexArr % 200,
          },
        ]"
      >
        <div v-if="char === 'skip'">&nbsp;</div>
        <div v-else-if="char === 'end'">&nbsp;</div>
        <div v-else>{{ char }}</div>
      </div>
    </div>
  </Transition>

  <Transition name="opacity">
    <TheKeyboard
      v-if="storage.visibility.keyboard"
      :event-keydown="events.keyDn"
      :char="data.fragmentArr[data.indexArr]"
      :lang="data.keyboardLayout"
    />
  </Transition>
</template>

<style lang="scss">
.field {
  width: 1440px;
  height: 380px;
  margin: 5px auto 50px;
  background-color: v-bind(fieldBackground);
  filter: blur(0px);
  outline: none;
  user-select: none;
}

.char {
  float: left;
  width: 36px;
  height: 76px;
  font-family: "Consolas", monospace;
  font-size: 65px;
  color: v-bind(charColor);
  background: v-bind(charBackground);

  &_display_caret {
    position: relative;
    z-index: -1;
  }

  &_display_caret:after {
    position: absolute;
    right: 0;
    bottom: 0;
    content: "";
    width: 36px;
    height: 5px;
    background: v-bind(caretBackground);
  }

  &_display_correct {
    color: v-bind(charCorrectColor);
    filter: v-bind(charCorrectShadow);
  }

  &_display_revised {
    color: v-bind(charRevisedColor);
    filter: v-bind(charRevisedShadow);
  }

  &_display_wrong {
    color: v-bind(charWrongColor);
    filter: v-bind(charWrongShadow);
  }

  &_display_special-inactive {
    color: v-bind(charSpecialColor);
  }

  &_display_special-active {
    color: v-bind(charSpecialColor);
    filter: v-bind(charSpecialShadow);
  }
}
</style>
