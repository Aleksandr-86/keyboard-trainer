<script setup>
import { computed } from '@vue/reactivity'
import store from '/src/services/store.js'
import { arrBackgrounds } from '/src/services/background-list.js'
import HslaSlider from '../components/HslaSlider.vue'
import { onMounted, ref } from 'vue'

const page = ref(0)
const direction = ref('slide-next')

const title = computed(() => {
  if (page.value === 0) {
    return 'Общие настройки'
  } else if (page.value === 1) {
    return 'Настройки поля'
  } else if (page.value === 2) {
    return 'Цвета указателей пальцев'
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

  if (direction === 'next') {
    if (backgroundPreview >= arrBackgrounds.length - 1) {
      store.data.backgroundPreview = 0
      return
    }
    store.data.backgroundPreview++
  } else if (direction === 'prev') {
    if (backgroundPreview <= 0) {
      store.data.backgroundPreview = arrBackgrounds.length - 1
      return
    }
    store.data.backgroundPreview--
  }
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
        <label class="custom-checkbox">
          <div class="settings-description">Игнорировать регистр букв</div>
          <input
            type="checkbox"
            id="box1"
            v-model="store.storage.main.letterCase"
            @click="store.changeStorage('main')" />
          <div class="check-mark"></div>
        </label>

        <label class="custom-checkbox">
          <div class="settings-description">Скрывать указатели пальцев</div>
          <input
            type="checkbox"
            id="box2"
            v-model="store.storage.visibility.pointers"
            @click.left="store.changeStorage('visibility')" />
          <span class="check-mark"></span>
        </label>

        <label class="custom-checkbox">
          <div class="settings-description">Скрывать клавиатуру</div>
          <input
            type="checkbox"
            id="box3"
            v-model="store.storage.visibility.keyboard"
            @click="store.changeStorage('visibility')" />
          <span class="check-mark"></span>
        </label>

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
        <HslaSlider title="фон поля" property="field.background" />
        <HslaSlider title="фон символа" property="field.charBackground" />
        <HslaSlider title="нейтральный символ" property="field.charColor" />
        <HslaSlider
          title="верно введённый символ"
          property="field.charCorrectColor" />
        <HslaSlider
          title="неверно введённый символ"
          property="field.charWrongColor" />
        <HslaSlider
          title="ненабираемый символ"
          property="field.charNeutralColor" />
        <HslaSlider title="каретка" property="field.caretBackground" />
        <HslaSlider title="тень каретки" property="field.caretColor" />

        <div class="settings-category">Тень:</div>
        <label class="custom-checkbox">
          <div class="settings-description">верно введённый символ</div>
          <input
            type="checkbox"
            id="box4"
            v-model="store.storage.shadow.charCorrect"
            @click="store.changeStorage('shadow')" />
          <span class="check-mark"></span>
        </label>

        <label class="custom-checkbox">
          <div class="settings-description">неверно введённый символ</div>
          <input
            type="checkbox"
            id="box5"
            v-model="store.storage.shadow.charWrong"
            @click="store.changeStorage('shadow')" />
          <span class="check-mark"></span>
        </label>
      </div>
    </transition>

    <transition :name="direction">
      <div v-if="page === 2" class="settings-page-container">
        <div class="settings-category">Клавиатура:</div>
        <HslaSlider title="фон клавиатуры" property="keyboard.background" />
        <HslaSlider title="фон клавиш" property="keyboard.keyBackground" />
        <HslaSlider title="текст клавиш" property="keyboard.keyColor" />
        <HslaSlider title="модификатор (Shift)" property="keyboard.shift" />
        <HslaSlider title="мизинцы" property="keyboard.pinky" />
        <HslaSlider title="безымянные" property="keyboard.ring" />
        <HslaSlider title="средние" property="keyboard.middle" />
        <HslaSlider title="левый указательный" property="keyboard.lIndex" />
        <HslaSlider title="большие" property="keyboard.thumbs" />
        <HslaSlider title="правый указательный" property="keyboard.rIndex" />
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
  background: hsl(40, 2%, 22%);
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

.settings-description {
  /* border: 1px solid green; */
  text-align: left;
  /* height: 29px; */
  margin-bottom: 2px;
}

/* checkbox */
.custom-checkbox {
  display: block;
  position: relative;
  padding-right: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 25px;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.check-mark {
  position: absolute;
  top: 3px;
  right: 0;
  height: 25px;
  width: 25px;
  background-color: hsl(0, 0%, 93%);
}

.custom-checkbox:hover input ~ .check-mark {
  background-color: lightgreen;
}

.custom-checkbox input:checked ~ .check-mark {
  background-color: limegreen;
}

.check-mark:after {
  content: '';
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .check-mark:after {
  display: block;
}

.custom-checkbox .check-mark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.settings-picture {
  display: flex;
  /* margin-top: 20px; */
  /* float: left; */
  /* height: 200px; */
  /* line-height: 200px; */
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
/* #settings-btn-prev,
#settings-btn-next {
  width: 30px;
  background: rgb(100, 100, 100);
}

#settings-btn-prev {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

#settings-btn-next {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
} */

/* .settings-picture div {
  width: 320px;
} */
</style>
