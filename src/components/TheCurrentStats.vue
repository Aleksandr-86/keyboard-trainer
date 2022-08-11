<script setup>
import { computed } from '@vue/reactivity'
import { data } from '@/store/data.js'
import { storage } from '@/store/storage.js'

const isStarted = computed(() => data.elapsedTime === 0)
const color = computed(() => storage.currentStatistics.colors)
const backColor = computed(() => {
  const colorsArr = storage.currentStatistics.colors.match(/[0-9.]+/g)
  const h = colorsArr[0]
  const s = colorsArr[1]
  const l = colorsArr[2] - 30
  const a = colorsArr[3]
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
})
</script>

<template>
  <div class="current-stats">
    <div class="current-stats__error-free">
      <Transition name="collapse">
        <span v-if="isStarted" class="current-stats__description">
          Без ошибок:&nbsp;
        </span>
      </Transition>
      <span v-if="data.tempErrorFree === data.ErrorFree">
        {{ data.ErrorFree }}
      </span>
      <span v-else>{{ data.tempErrorFree }}/{{ data.ErrorFree }}</span>
    </div>

    <div class="current-stats__remaining-chars">
      <Transition name="collapse">
        <span v-if="isStarted" class="current-stats__description">
          Осталось знаков:
        </span>
      </Transition>
      {{ data.remainingChars }}
    </div>

    <div class="current-stats__char-per-minute">
      <Transition name="collapse">
        <span v-if="isStarted" class="current-stats__description">
          Знаков в минуту:
        </span>
      </Transition>
      {{ data.charPerMin }}
    </div>

    <div class="current-stats__elapsed-time">
      <Transition name="collapse">
        <span v-if="isStarted" class="current-stats__description">Время:</span>
      </Transition>
      {{ data.elapsedTimeStr }}
    </div>
  </div>
</template>

<style>
/* правило перехода collapse */
.collapse-leave-active {
  transition: all 1.4s linear;
}

.collapse-leave-from {
  max-width: 297px;
  opacity: 1;
}

.collapse-leave-to {
  max-width: 0;
  opacity: 0;
}

/* прочие правила */
.current-stats {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: fit-content;
  margin: 5px auto;
  font-size: 35px;
  color: v-bind(color);
  background: v-bind(backColor);
  border: 2px solid v-bind(color);
  border-radius: 10px;
  user-select: none;
}

.current-stats__description {
  display: inline-flex;
  overflow: hidden;
  white-space: nowrap;
}

.current-stats__error-free {
  display: flex;
  justify-content: center;
  align-content: stretch;
  min-width: 129px;
  padding: 5px 10px 5px 10px;
  border-right: 2px solid v-bind(color);
  overflow: hidden;
  white-space: nowrap;
  transition: min-width 3s 1s;
}

.current-stats__remaining-chars {
  min-width: 59px;
  padding: 5px 10px 5px 10px;
  border-right: 2px solid v-bind(color);
}

.current-stats__char-per-minute {
  min-width: 59px;
  padding: 5px 10px 5px 10px;
  border-right: 2px solid v-bind(color);
}

.current-stats__elapsed-time {
  min-width: 129px;
  padding: 5px 10px 5px 10px;
  text-align: center;
}
</style>
