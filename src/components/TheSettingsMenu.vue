<script setup>
import { computed, ref } from 'vue'
import { arrBackgrounds } from '@/services/background-list.js'
import BaseHslaSlider from '@/components/ui/BaseHslaSlider.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSingleSlider from '@/components/ui/BaseSingleSlider.vue'
import { data } from '@/store/data.js'
import { state } from '@/store/state.js'
import { storage } from '@/store/storage.js'

const page = ref(0)
const direction = ref()

const title = computed(() => {
  if (page.value === 0) {
    return 'Общие настройки'
  } else if (page.value === 1) {
    return 'Настройки поля'
  } else if (page.value === 2) {
    return 'Цвета клавиатуры'
  } else if (page.value === 3) {
    return 'Статистика и звук'
  }
})

const turnThePage = function (dir) {
  if (dir === 'next') {
    direction.value = 'move-next'
    if (page.value >= 3) {
      page.value = 0
      return
    }
    page.value++
  } else if (dir === 'prev') {
    direction.value = 'move-prev'
    if (page.value <= 0) {
      page.value = 3
      return
    }
    page.value--
  }
}

function getUrl(name) {
  return new URL(`/src/assets/backgrounds/small/${name}.jpg`, import.meta.url)
    .href
}

const backgroundPreviewPath = computed(() =>
  getUrl(arrBackgrounds[data.backgroundPreview].name)
)

const changeBackground = function (direction) {
  const backgroundPreview = data.backgroundPreview
  function saveBackgroundInStorage() {
    const tempObj = { ...storage.main }
    tempObj.background = data.backgroundPreview
    localStorage.main = JSON.stringify(tempObj)
  }

  if (direction === 'next') {
    if (backgroundPreview >= arrBackgrounds.length - 1) {
      data.backgroundPreview = 0
      saveBackgroundInStorage()
      return
    }
    data.backgroundPreview++
  } else if (direction === 'prev') {
    if (backgroundPreview <= 0) {
      data.backgroundPreview = arrBackgrounds.length - 1
      saveBackgroundInStorage()
      return
    }
    data.backgroundPreview--
  }

  saveBackgroundInStorage()
}

const closeSettingsMenu = function () {
  function getUrl(name) {
    return new URL(
      `/src/assets/backgrounds/normal/${name}.jpg`,
      import.meta.url
    ).href
  }

  const img = new Image()
  img.src = getUrl(arrBackgrounds[data.backgroundPreview].name)
  img.onload = () => {
    storage.main.background = data.backgroundPreview
    for (const key in storage) {
      localStorage[key] = JSON.stringify(storage[key])
    }
  }

  state.settings = false
}

const defaultValues = {
  currentStatistics: {
    colors: 'hsla(144, 65%, 47%, 1)'
  },
  field: {
    background: 'hsla(0, 0%, 60%, 1)',
    charBackground: 'hsla(0, 0%, 0%, 0.65)',
    caretBackground: 'hsla(280, 85%, 70%, 0.65)',
    charColor: 'hsla(0, 0%, 67%, 1)',
    charCorrectColor: 'hsla(144, 65%, 47%, 1)',
    charWrongColor: 'hsla(0, 100%, 60%, 1)',
    charRevisedColor: 'hsla(90, 65%, 50%, 1)',
    charSpecialColor: 'hsl(180, 100%, 50%, 0.75)'
  },
  keyboard: {
    background: 'hsla(0, 0%, 15%, 1)',
    keyBackground: 'hsla(0, 0%, 0%, 1)',
    keyColor: 'hsla(0, 0%, 70%, 1)',
    shift: 'hsla(300, 80%, 40%, 1)',
    pinky: 'hsla(300, 60%, 40%, 1)',
    ring: 'hsla(60, 80%, 35%, 1)',
    middle: 'hsla(120, 80%, 33%, 1)',
    lIndex: 'hsla(180, 100%, 35%, 1)',
    thumbs: 'hsla(0, 0%, 70%, 1)',
    rIndex: 'hsla(0, 75%, 50%, 1)',
    underline: true
  },
  main: {
    background: 0,
    langOfSnippets: 'russian',
    minSnippetLength: 160,
    letterCase: true,
    speaker: true,
    ring: true,
    volume: 0.2
  },
  overallStats: {
    title: 'hsla(282, 100%, 25%, 1)',
    ms: 'hsla(240, 60%, 40%, 1)',
    correct: 'hsla(135, 100%, 27%, 1)',
    wrong: 'hsla(0, 100%, 30%, 1)'
  },
  shadow: {
    charCorrect: false,
    charWrong: true,
    charRevised: false,
    charSpecial: true
  },
  visibility: { currentStatistics: true, keyboard: true }
}

function clearSettings() {
  for (const key in defaultValues) {
    storage[key] = defaultValues[key]
  }
  data.backgroundPreview = 0
  localStorage.clear()
  state.settings = false
}

const keyDown = function (e) {
  const code = e.code
  if (code === 'Enter' || code === 'Escape') closeSettingsMenu()
}
</script>

<template>
  <div v-click-outside="closeSettingsMenu" class="settings__container">
    <div class="settings__title-container">
      <button @click="turnThePage('prev')" class="settings__page-button">
        <div class="arrow arrow_left"></div>
      </button>
      <div class="settings__title">{{ title }}</div>
      <button @click="turnThePage('next')" class="settings__page-button">
        <div class="arrow arrow_right"></div>
      </button>
    </div>

    <Transition :name="direction">
      <div v-if="page === 0" class="settings__page-container">
        <button @click="clearSettings" class="settings__default-button">
          Сброс
        </button>
        <BaseCheckbox
          title="Учитывать регистр букв"
          obj="main"
          prop="letterCase" />
        <BaseCheckbox
          title="Отображать текущую статистику"
          obj="visibility"
          prop="currentStatistics" />
        <BaseCheckbox
          title="Отображать клавиатуру"
          obj="visibility"
          prop="keyboard" />
        <BaseCheckbox
          title="Отображать засечки"
          obj="keyboard"
          prop="underline" />
        <BaseInput @keydown="keyDown" />

        <div class="settings__image">
          <img
            :src="backgroundPreviewPath"
            :alt="arrBackgrounds[data.backgroundPreview].location" />
          <div class="settings__preview-button-container">
            <button
              @click="changeBackground('prev')"
              class="settings__preview-button">
              &#9668;
            </button>
            <button
              @click="changeBackground('next')"
              class="settings__preview-button">
              &#9658;
            </button>
          </div>
        </div>
        <div>
          <p
            v-if="arrBackgrounds[data.backgroundPreview].location"
            class="settings__image-description">
            Местоположение:
            {{ arrBackgrounds[data.backgroundPreview].location }}
          </p>
          <p class="settings__image-link-description">
            Автор фотографии:
            <a
              v-if="arrBackgrounds[data.backgroundPreview].link === ''"
              class="settings__image-link">
              {{ arrBackgrounds[data.backgroundPreview].author }}
            </a>
            <a
              v-else
              class="settings__image-link"
              :href="arrBackgrounds[data.backgroundPreview].link">
              {{ arrBackgrounds[data.backgroundPreview].author }}
            </a>
          </p>
        </div>
      </div>
    </Transition>

    <Transition :name="direction">
      <div v-if="page === 1" class="settings__page-container">
        <div class="settings__category">Цвет:</div>
        <BaseHslaSlider title="фон поля" obj="field" prop="background" />
        <BaseHslaSlider title="фон символа" obj="field" prop="charBackground" />
        <BaseHslaSlider title="фон каретки" obj="field" prop="caretBackground" />
        <BaseHslaSlider title="нейтральный символ" obj="field" prop="charColor" />
        <BaseHslaSlider
          title="верно введённый символ"
          obj="field"
          prop="charCorrectColor" />
        <BaseHslaSlider
          title="неверно введённый символ"
          obj="field"
          prop="charWrongColor" />
        <BaseHslaSlider
          title="исправленный символ"
          obj="field"
          prop="charRevisedColor" />
        <BaseHslaSlider
          title="ненабираемый символ"
          obj="field"
          prop="charSpecialColor" />

        <div class="settings__category">Тень:</div>
        <div class="settings__shadow-checkbox">
          <BaseCheckbox
            title="верно введённый символ"
            obj="shadow"
            prop="charCorrect" />
          <BaseCheckbox
            title="неверно введённый символ"
            obj="shadow"
            prop="charWrong" />
          <BaseCheckbox
            title="исправленный символ"
            obj="shadow"
            prop="charRevised" />
          <BaseCheckbox
            title="ненабираемый символ"
            obj="shadow"
            prop="charSpecial" />
        </div>
      </div>
    </Transition>

    <Transition :name="direction">
      <div v-if="page === 2" class="settings__page-container">
        <BaseHslaSlider title="фон клавиатуры" obj="keyboard" prop="background" />
        <BaseHslaSlider title="фон клавиш" obj="keyboard" prop="keyBackground" />
        <BaseHslaSlider title="текст клавиш" obj="keyboard" prop="keyColor" />
        <BaseHslaSlider title="модификатор (Shift)" obj="keyboard" prop="shift" />
        <BaseHslaSlider title="мизинцы" obj="keyboard" prop="pinky" />
        <BaseHslaSlider title="безымянные пальцы" obj="keyboard" prop="ring" />
        <BaseHslaSlider title="средние пальцы" obj="keyboard" prop="middle" />
        <BaseHslaSlider title="левый указательный" obj="keyboard" prop="lIndex" />
        <BaseHslaSlider title="большие пальцы" obj="keyboard" prop="thumbs" />
        <BaseHslaSlider title="правый указательный" obj="keyboard" prop="rIndex" />
      </div>
    </Transition>

    <Transition :name="direction">
      <div v-if="page === 3" class="settings__page-container">
        <BaseHslaSlider
          title="цвет текущей статистики"
          obj="currentStatistics"
          prop="colors" />
        <div class="settings__category">Цвета общей статистики:</div>
        <BaseHslaSlider
          title="название книги и автор"
          obj="overallStats"
          prop="title" />
        <BaseHslaSlider title="миллисекунды" obj="overallStats" prop="ms" />
        <BaseHslaSlider
          title="процент правильных символов"
          obj="overallStats"
          prop="correct" />
        <BaseHslaSlider
          title="процент ошибочных символов"
          obj="overallStats"
          prop="wrong" />

        <div class="settings__category">Звук:</div>
        <div class="settings__shadow-checkbox">
          <BaseCheckbox title="Озвучивать печать" obj="main" prop="speaker" />
          <BaseCheckbox
            title="Сигнал по окончании набора"
            obj="main"
            prop="ring"
            :disabled="!storage.main.speaker" />
        </div>
        <BaseSingleSlider
          obj="main"
          prop="volume"
          max="1"
          step="0.01"
          :disabled="!storage.main.speaker" />
      </div>
    </Transition>
  </div>
</template>

<style>
/* transition */
.move-next-enter-active,
.move-prev-enter-active,
.move-prev-leave-active {
  transition: all 0.1s linear;
}

.move-next-enter-from {
  transform: translateX(100%);
}
.move-prev-enter-from {
  transform: translateX(-100%);
}

.move-next-leave-from,
.move-prev-leave-from {
  transform: none;
  opacity: 1;
}

.move-next-enter-to,
.move-prev-enter-to {
  transform: none;
}

.move-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.move-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* component */
.settings__container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 455px;
  height: 100vh;
  padding: 20px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  color: hsl(0, 0%, 78%);
  background: hsl(120, 2%, 22%);
  box-shadow: none;
  overflow: auto;
  user-select: none;
}

.settings__title-container {
  display: flex;
  justify-content: space-between;
  z-index: 20;
  height: 29px;
  margin-bottom: 10px;
  padding-bottom: 19px;
  border-bottom: 2px solid hsl(0, 0%, 78%);
}

.settings__title {
  width: 350px;
}

.settings__page-button {
  --btn-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 29px;
  height: 29px;
  background-color: hsl(0, 0%, 50%);
  border: none;
  border-radius: 7px;
}

.settings__page-button:hover {
  --btn-color: hsl(120, 73%, 75%);
}

.settings__page-button:active {
  transform: scale(0.9);
}

.arrow {
  width: 10px;
  height: 10px;
  color: inherit;
  border-top: 3px solid var(--btn-color);
  border-right: 3px solid var(--btn-color);
}

.arrow_right {
  transform: rotate(45deg);
  margin-right: 5px;
}

.arrow_left {
  transform: rotate(-135deg);
  margin-left: 5px;
}

.settings__page-button:hover {
  color: hsl(120, 73%, 75%);
}

.settings__page-button:active {
  font-size: 24px;
}

.settings__default-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 455px;
  margin-bottom: 10px;
  font: inherit;
  font-weight: bold;
  background-color: hsl(33, 100%, 88%);
  border: none;
  border-radius: 7px;
}

.settings__default-button:hover {
  background-color: hsl(0, 100%, 50%);
}

.settings__default-button:active {
  background-color: hsl(120, 50%, 50%);
}

.settings__page-container {
  position: absolute;
}

.settings__category {
  margin-bottom: 14px;
  padding-left: 2px;
  text-align: left;
  text-decoration: underline;
}

.settings__shadow-checkbox {
  margin-right: 6px;
}

.settings-description {
  margin-bottom: 2px;
  text-align: left;
}

.settings__image {
  margin-bottom: 10px;
  display: flex;
}

.settings__image-description {
  width: 455px;
  margin: 10px 0 10px 0;
  text-align: left;
}

.settings__image-link-description {
  display: block;
  margin: 10px 0 10px 0;
  text-align: left;
}

.settings__image-link {
  text-decoration: none;
  color: hsl(270, 90%, 70%);
}

.settings__image-link:visited {
  color: hsl(94, 90%, 60%);
}

.settings__preview-button-container {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 455px;
  margin-top: 113px;
}

.settings__preview-button {
  width: 55px;
  height: 55px;
  font-size: 30px;
  color: hsl(120, 0%, 60%);
  background-color: transparent;
  backdrop-filter: blur(5px);
  border-style: double;
  border-radius: 50%;
  border-color: hsl(120, 0%, 60%);
}

.settings__preview-button:hover {
  color: hsl(120, 100%, 45%);
  border-color: hsl(120, 100%, 45%);
}

.settings__preview-button:active {
  transform: scale(0.9);
}

.settings__preview-button:first-child {
  margin-left: 10px;
  padding-right: 7px;
}
.settings__preview-button:last-child {
  margin-right: 10px;
  padding-left: 7px;
}
</style>
