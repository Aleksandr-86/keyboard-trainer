<script setup>
import { computed, ref } from 'vue'
import { data } from '/src/services/data.js'
import { arrBackgrounds } from '/src/services/background-list.js'
import HslaSlider from '../components/HslaSlider.vue'
import Checkbox from '../components/Checkbox.vue'
import Input from '../components/Input.vue'
import SingleSlider from '../components/SingleSlider.vue'
import { storage } from '/src/services/storage.js'
import { state } from '../services/state.js'

const page = ref(0)
const direction = ref('slide-next')

const title = computed(() => {
  if (page.value === 0) {
    return 'Общие настройки'
  } else if (page.value === 1) {
    return 'Настройки поля'
  } else if (page.value === 2) {
    return 'Цвета клавиатуры'
  } else if (page.value === 3) {
    return 'Статистика'
  }
})

const turnThePage = function (dir) {
  if (dir === 'next') {
    direction.value = 'slide-next'
    if (page.value >= 3) {
      page.value = 0
      return
    }
    page.value++
  } else if (dir === 'prev') {
    direction.value = 'slide-prev'
    if (page.value <= 0) {
      page.value = 3
      return
    }
    page.value--
  }
}

function getImageUrl(name) {
  return new URL(`/images/backgrounds/small/${name}.jpg`, import.meta.url).href
}

const backgroundPreviewPath = computed(() =>
  getImageUrl(arrBackgrounds[data.backgroundPreview].name)
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

const closeSettingMenu = function () {
  storage.main.background = data.backgroundPreview
  for (const key in storage) {
    localStorage[key] = JSON.stringify(storage[key])
  }
  state.settings = false
}

const defaultValues = {
  currentStatistics: {
    colors: 'hsl(160, 80%, 45%, 1)'
  },
  field: {
    background: 'hsla(80, 10%, 40%, 1)',
    charBackground: 'hsla(0, 0%, 20%, 0.75)',
    caretBackground: 'hsla(280, 85%, 70%, 0.65)',
    charColor: 'hsla(0, 0%, 65%, 1)',
    charCorrectColor: 'hsla(144, 65%, 45%, 1)',
    charWrongColor: 'hsla(0, 100%, 60%, 1)',
    charSpecialColor: 'hsl(180, 100%, 45%, 0.75)'
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
    speaker: false,
    volume: 0.2
  },
  overallStatistics: {
    title: 'hsla(282, 100%, 25%, 1)',
    ms: 'hsla(240, 100%, 30%, 1)',
    correct: 'hsla(135, 100%, 25%, 1)',
    wrong: 'hsla(0, 100%, 30%, 1)'
  },
  shadow: {
    charCorrect: false,
    charWrong: true,
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
</script>

<template>
  <div v-click-outside="closeSettingMenu" class="settings-container">
    <div class="settings-title-container">
      <button @click="turnThePage('prev')" class="settings-btn-page">
        <div class="arrow arrow-left"></div>
      </button>
      <div class="settings-title">{{ title }}</div>
      <button @click="turnThePage('next')" class="settings-btn-page">
        <div class="arrow arrow-right"></div>
      </button>
    </div>

    <transition :name="direction">
      <div v-if="page === 0" class="settings-page-container">
        <button @click="clearSettings" class="settings-btn-default">
          Сброс
        </button>
        <Checkbox title="Учитывать регистр букв" obj="main" prop="letterCase" />
        <Checkbox
          title="Отображать текущую статистику"
          obj="visibility"
          prop="currentStatistics" />
        <Checkbox
          title="Отображать клавиатуру"
          obj="visibility"
          prop="keyboard" />
        <Checkbox title="Отображать засечки" obj="keyboard" prop="underline" />
        <Input />
        <div class="settings-category-margin">Звук:</div>
        <Checkbox title="Озвучивать печать" obj="main" prop="speaker" />
        <SingleSlider
          obj="main"
          prop="volume"
          max="1"
          step="0.01"
          :disabled="!storage.main.speaker" />

        <div class="settings-image">
          <img
            id="settings-preview"
            :src="backgroundPreviewPath"
            :alt="arrBackgrounds[data.backgroundPreview].location" />
          <div class="settings-btn-preview-container">
            <button
              @click="changeBackground('prev')"
              class="settings-btn-preview">
              &#9668;
            </button>
            <button
              @click="changeBackground('next')"
              class="settings-btn-preview">
              &#9658;
            </button>
          </div>
        </div>
        <div>
          <p class="settings-image-description">
            Местоположение:
            {{ arrBackgrounds[data.backgroundPreview].location }}
          </p>
          <p class="settings-image-link">
            Автор снимка:
            <a :href="arrBackgrounds[data.backgroundPreview].link">{{
              arrBackgrounds[data.backgroundPreview].author
            }}</a>
          </p>
        </div>
      </div>
    </transition>

    <transition :name="direction">
      <div v-if="page === 1" class="settings-page-container">
        <div class="settings-category-margin">Цвет:</div>
        <HslaSlider title="фон поля" obj="field" prop="background" />
        <HslaSlider title="фон символа" obj="field" prop="charBackground" />
        <HslaSlider title="фон каретки" obj="field" prop="caretBackground" />
        <HslaSlider title="нейтральный символ" obj="field" prop="charColor" />
        <HslaSlider
          title="верно введённый символ"
          obj="field"
          prop="charCorrectColor" />
        <HslaSlider
          title="неверно введённый символ"
          obj="field"
          prop="charWrongColor" />
        <HslaSlider
          title="ненабираемый символ"
          obj="field"
          prop="charSpecialColor" />

        <div class="settings-category-margin">Тень:</div>
        <div class="settings-shadow-checkbox">
          <Checkbox
            title="верно введённый символ"
            obj="shadow"
            prop="charCorrect" />
          <Checkbox
            title="неверно введённый символ"
            obj="shadow"
            prop="charWrong" />
          <Checkbox
            title="ненабираемый символ"
            obj="shadow"
            prop="charSpecial" />
        </div>
      </div>
    </transition>

    <transition :name="direction">
      <div v-if="page === 2" class="settings-page-container">
        <HslaSlider title="фон клавиатуры" obj="keyboard" prop="background" />
        <HslaSlider title="фон клавиш" obj="keyboard" prop="keyBackground" />
        <HslaSlider title="текст клавиш" obj="keyboard" prop="keyColor" />
        <HslaSlider title="модификатор (Shift)" obj="keyboard" prop="shift" />
        <HslaSlider title="мизинцы" obj="keyboard" prop="pinky" />
        <HslaSlider title="безымянные пальцы" obj="keyboard" prop="ring" />
        <HslaSlider title="средние пальцы" obj="keyboard" prop="middle" />
        <HslaSlider title="левый указательный" obj="keyboard" prop="lIndex" />
        <HslaSlider title="большие пальцы" obj="keyboard" prop="thumbs" />
        <HslaSlider title="правый указательный" obj="keyboard" prop="rIndex" />
      </div>
    </transition>

    <transition :name="direction">
      <div v-if="page === 3" class="settings-page-container">
        <HslaSlider
          title="цвет текущей статистики"
          obj="currentStatistics"
          prop="colors" />
        <div class="settings-category-margin">Цвета общей статистики:</div>
        <HslaSlider
          title="название книги и автор"
          obj="overallStatistics"
          prop="title" />
        <HslaSlider title="миллисекунды" obj="overallStatistics" prop="ms" />
        <HslaSlider
          title="процент правильных символов"
          obj="overallStatistics"
          prop="correct" />
        <HslaSlider
          title="процент ошибочных символов"
          obj="overallStatistics"
          prop="wrong" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-next-enter-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.1s linear;
}

.slide-next-enter-from {
  transform: translateX(100%);
}
.slide-prev-enter-from {
  transform: translateX(-100%);
}

.slide-next-leave-from,
.slide-prev-leave-from {
  transform: none;
  opacity: 1;
}

.slide-next-enter-to,
.slide-prev-enter-to {
  transform: none;
}

.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.settings-container {
  position: absolute;
  top: 0;
  left: 0;
  background: hsl(120, 2%, 22%);
  color: hsl(0, 0%, 78%);
  width: 455px;
  height: 100vh;
  box-shadow: none;
  padding: 20px 20px;
  font-size: 25px;
  font-family: 'Montserrat', sans-serif;
  user-select: none;
  overflow: auto;
  z-index: 2;
}

.settings-title-container {
  display: flex;
  height: 29px;
  justify-content: space-between;
  /* align-items: center; */
  border-bottom: 2px solid hsl(0, 0%, 78%);
  margin-bottom: 10px;
  padding-bottom: 19px;
  z-index: 20;
}

.settings-title {
  width: 350px;
}

.settings-btn-page {
  --btn-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(0, 0%, 50%);
  width: 29px;
  height: 29px;
  border-radius: 7px;
  border: none;
}

.settings-btn-page:hover {
  --btn-color: hsl(120, 73%, 75%);
}

.settings-btn-page:active {
  transform: scale(0.9);
}

.arrow {
  color: inherit;
  width: 10px;
  height: 10px;
  border-top: 3px solid var(--btn-color);
  border-right: 3px solid var(--btn-color);
}

.arrow-right {
  transform: rotate(45deg);
  margin-right: 5px;
}

.arrow-left {
  transform: rotate(-135deg);
  margin-left: 5px;
}

.settings-btn-page:hover {
  color: hsl(120, 73%, 75%);
}

.settings-btn-page:active {
  font-size: 24px;
}

.settings-btn-default {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 455px;
  /* height: 37px; */
  font: inherit;
  font-weight: bold;
  border: none;
  border-radius: 7px;
  margin-bottom: 10px;
  background-color: hsl(33, 100%, 88%);
}

.settings-btn-default:hover {
  background-color: hsl(0, 100%, 50%);
}

.settings-btn-default:active {
  background-color: hsl(120, 50%, 50%);
}

.settings-page-container {
  position: absolute;
}

.settings-category {
  text-align: left;
  text-decoration: underline;
  margin-bottom: 7px;
}

.settings-category-margin {
  text-align: left;
  text-decoration: underline;
  padding-left: 2px;
  margin-bottom: 14px;
}

.settings-shadow-checkbox {
  margin-right: 6px;
}

.settings-description {
  /* border: 1px solid green; */
  text-align: left;
  /* height: 29px; */
  margin-bottom: 2px;
}

/* checkbox */
.settings-image {
  display: flex;
  margin-bottom: 10px;
}

.settings-image-description,
.settings-image-link {
  text-align: left;
  margin: 10px 0 10px 0;
}

.settings-image-link {
  display: block;
  text-decoration: none;
}

#settings-preview {
  margin-top: 10px;
  width: 455px;
  height: 281px;
}

.settings-btn-preview-container {
  position: absolute;
  width: 455px;
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
}

.settings-btn-preview {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  font-size: 30px;
  background-color: transparent;
  backdrop-filter: blur(5px);
  border-color: hsla(0, 0%, 0%, 0.4);
  color: hsla(0, 0%, 0%, 0.4);
  border-style: double;
}

.settings-btn-preview:hover {
  border-color: hsla(120, 100%, 45%, 0.65);
  color: hsla(120, 100%, 45%, 0.65);
}

.settings-btn-preview:active {
  transform: scale(0.9);
}

.settings-btn-preview:first-child {
  margin-left: 10px;
  padding-right: 7px;
}
.settings-btn-preview:last-child {
  margin-right: 10px;
  padding-left: 7px;
}
</style>
