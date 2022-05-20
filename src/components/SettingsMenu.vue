<script setup>
import { computed, ref } from 'vue'
import store from '/src/services/store.js'
import { arrBackgrounds } from '/src/services/background-list.js'
import HslaSlider from '../components/HslaSlider.vue'
import SingleSlider from '../components/SingleSlider.vue'
import Checkbox from '../components/Checkbox.vue'

const page = ref(0)
const direction = ref('slide-next')

const title = computed(() => {
  if (page.value === 0) {
    return 'Общие настройки'
  } else if (page.value === 1) {
    return 'Настройки поля'
  } else if (page.value === 2) {
    return 'Цвета клавиатуры'
  }
})

const turnThePage = function (dir) {
  if (dir === 'next') {
    direction.value = 'slide-next'
    if (page.value >= 2) {
      page.value = 0
      return
    }
    page.value++
  } else if (dir === 'prev') {
    direction.value = 'slide-prev'
    if (page.value <= 0) {
      page.value = 2
      return
    }
    page.value--
  }
}

const backgroundPreview = computed(
  () =>
    `/src/images/backgrounds/small/${
      arrBackgrounds[store.data.backgroundPreview].name
    }.jpg`
)

const changeBackground = function (direction) {
  const backgroundPreview = store.data.backgroundPreview
  function saveBackgroundInStorage() {
    const tempObj = { ...store.storage.main }
    tempObj.background = store.data.backgroundPreview
    localStorage.main = JSON.stringify(tempObj)
  }

  if (direction === 'next') {
    if (backgroundPreview >= arrBackgrounds.length - 1) {
      store.data.backgroundPreview = 0
      saveBackgroundInStorage()
      return
    }
    store.data.backgroundPreview++
  } else if (direction === 'prev') {
    if (backgroundPreview <= 0) {
      store.data.backgroundPreview = arrBackgrounds.length - 1
      saveBackgroundInStorage()
      return
    }
    store.data.backgroundPreview--
  }

  saveBackgroundInStorage()
}

const closeSettingMenu = function () {
  store.storage.main.background = store.data.backgroundPreview
  for (const key in store.storage) {
    localStorage[key] = JSON.stringify(store.storage[key])
  }
  store.setFalse('settings')
}
</script>

<template>
  <div v-click-outside="closeSettingMenu" class="settings-container">
    <div class="settings-title-container">
      <button @click="turnThePage('prev')" class="settings-btn-page">
        &lt;
      </button>
      <div class="settings-title">{{ title }}</div>
      <button @click="turnThePage('next')" class="settings-btn-page">
        &gt;
      </button>
    </div>

    <transition :name="direction">
      <div v-if="page === 0" class="settings-page-container">
        <Checkbox title="Учитывать регистр букв" obj="main" prop="letterCase" />
        <Checkbox
          title="Отображать текущую статистику"
          obj="visibility"
          prop="currentStatistics" />
        <Checkbox
          title="Отображать клавиатуру"
          obj="visibility"
          prop="keyboard" />

        <div class="settings-picture">
          <img
            id="settings-preview"
            :src="backgroundPreview"
            alt="background-preview" />
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
          <p class="settings-description"></p>
          <p class="settings-author"></p>
          <a class="settings-link" href="#!">ссылка на страницу</a>
        </div>
      </div>
    </transition>

    <transition :name="direction">
      <div v-if="page === 1" class="settings-page-container">
        <div class="settings-category">Цвет:</div>
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
        <Checkbox
          title="верно введённый символ"
          obj="shadow"
          prop="charCorrect" />
        <Checkbox
          title="неверно введённый символ"
          obj="shadow"
          prop="charWrong" />
        <Checkbox title="ненабираемый символ" obj="shadow" prop="charSpecial" />
        <div class="settings-category-margin">Размытие:</div>
        <SingleSlider title="поле" obj="blur" prop="field" />
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
  </div>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active5,
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
  padding-bottom: 18px;
  z-index: 20;
}

.settings-title {
  width: 350px;
}

.settings-btn-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 29px;
  height: 29px;
  background-color: hsl(0, 0%, 50%);
  border-radius: 7px;
  border: none;
}

.settings-btn-page:hover {
  color: hsl(120, 73%, 75%);
}

.settings-btn-page:active {
  font-size: 24px;
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
  margin-bottom: 14px;
}

.settings-description {
  /* border: 1px solid green; */
  text-align: left;
  /* height: 29px; */
  margin-bottom: 2px;
}

/* checkbox */
.settings-picture {
  display: flex;
}

#settings-preview {
  width: 455px;
  height: 281px;
}

.settings-btn-preview-container {
  position: absolute;
  width: 455px;
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
}

.settings-btn-preview {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  font-size: 40px;
  background-color: transparent;
  backdrop-filter: blur(5px);
  border-color: hsla(0, 0%, 0%, 0.4);
  color: hsla(0, 0%, 0%, 0.4);
  /* filter: drop-shadow(0 0 3px yellowgreen) brightness(230%); */
  border-style: double;
}

.settings-btn-preview:hover {
  border-color: hsla(120, 100%, 45%, 0.65);
  color: hsla(120, 100%, 45%, 0.65);
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
