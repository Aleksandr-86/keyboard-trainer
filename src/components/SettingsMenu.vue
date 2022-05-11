<script setup>
import { computed } from '@vue/reactivity'
import store from '/src/services/store.js'
import { arrBackgrounds } from '/src/services/background-list.js'
import Slider from '../components/Slider.vue'
import { ref, watch } from 'vue'

const page = ref(0)
const direction = ref('slide-next')

const title = computed(() => {
  if (page.value === 0) {
    return 'Общие настройки'
  } else if (page.value === 1) {
    return 'Цвета поля и статистики'
  } else if (page.value === 2) {
    return 'Цвета клавиатуры'
  }
  console.warn(title)
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
  let background = 0
  if (localStorage.background) background = Number(localStorage.background)

  if (direction === 'next') {
    if (background >= arrBackgrounds.length - 1) {
      localStorage.background = 0
      store.data.backgroundPreview = 0
      return
    }
    localStorage.background = background + 1
    store.data.backgroundPreview++
  } else if (direction === 'prev') {
    if (background <= 0) {
      const length = arrBackgrounds.length - 1
      localStorage.background = length
      store.data.backgroundPreview = length
      return
    }
    localStorage.background = background - 1
    store.data.backgroundPreview--
  }
}

const closeSettingMenu = function () {
  store.storage.background = store.data.backgroundPreview
  store.setFalse('settings')
}
</script>

<template>
  <div class="settings-container">
    <label class="settings-btn-close" @click="closeSettingMenu">+</label>

    <div class="settings-title-container">
      <button @click="turnThePage('prev')" class="settings-btn-page">
        &lt;
      </button>
      <div>{{ title }}</div>
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
            v-model="store.storage.letterCase"
            @click="store.toggleStorage('letterCase')" />
          <div class="check-mark"></div>
        </label>

        <label class="custom-checkbox">
          <div class="settings-description">Скрывать указатели пальцев</div>
          <input
            type="checkbox"
            id="box2"
            v-model="store.storage.pointers"
            @click.left="store.toggleStorage('pointers')" />
          <span class="check-mark"></span>
        </label>

        <label class="custom-checkbox">
          <div class="settings-description">Скрывать клавиатуру</div>
          <input
            type="checkbox"
            id="box3"
            v-model="store.storage.keyboard"
            @click="store.toggleStorage('keyboard')" />
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
      <div v-if="page === 1" class="settings-page-container"></div>
    </transition>

    <transition :name="direction">
      <div v-if="page === 2" class="settings-page-container">
        <Slider title="Модификатор (Shift)" property="pointers" num="0" />
        <Slider title="Мизинцы" property="pointers" num="1" />
        <Slider title="Безымянные" property="pointers" num="2" />
        <Slider title="Средние" property="pointers" num="3" />
        <Slider title="Левый указательный" property="pointers" num="4" />
        <Slider title="Большие" property="pointers" num="5" />
        <Slider title="Правый указательный" property="pointers" num="6" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
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
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  /* left: -420px; */
  background: rgb(60, 60, 60);
  width: 395px;
  height: 100vh;
  box-shadow: none;
  color: rgb(200, 200, 200);
  padding: 40px 20px;
  /* transition: left 3000ms; */
  font-size: 25px;
  font-family: 'Montserrat', sans-serif;
  user-select: none;
  overflow: auto;
}

.settings-title-container {
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid hsl(207, 100%, 87%);
  margin: 10px 0 10px 0;
  padding-bottom: 10px;
}

.settings-btn-page {
  width: 30px;
  height: 40px;
  background-color: hsl(0, 0%, 50%);
  border-radius: 7px;
  border: none;
}

.settings-btn-page:hover {
  /* color: hsl(189, 100%, 50%); */
  color: lightgreen;
}

.settings-btn-page:active {
  font-size: 24px;
}

.settings-page-container {
  position: absolute;
}

/* .settings-menu-open {
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.4);
  left: 0;
} */

.settings-btn-close {
  display: inline-block;
  font-size: 50px;
  background: none;
  user-select: none;
  position: absolute;
  z-index: 1;
  top: -5.5px;
  right: 8px;
  cursor: pointer;
  transform: rotate(45deg);
  color: #bfe2ff;
}

.settings-btn-close:hover {
  transform: rotate(45deg) scale(1.1);
  color: darkviolet;
  transition: all 300ms ease-in-out;
}

.settings-description {
  text-align: left;
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
  background-color: rgb(238, 238, 238);
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
  width: 395px;
  height: 245px;
}

.settings-btn-preview-container {
  position: absolute;
  /* position: fixed; */

  /* left: 0; */
  width: 395px;
  margin-top: 95px;
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
  border-color: hsla(120, 100%, 50%, 0.7);
  color: hsla(120, 100%, 50%, 0.7);
  /* filter: drop-shadow(0 0 1px hsl(120, 100%, 50%)) brightness(200%); */
  /* transform: scale(1.1); */
}
.settings-btn-preview:active {
  /* color: hsla(120, 100%, 50%, 0.8); */
  font-size: 37px;
  /* background-image: none;
  background-color: transparent; */
  /* transform: scale(0.95); */
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
