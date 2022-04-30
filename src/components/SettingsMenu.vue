<script setup>
import { computed } from '@vue/reactivity'
import store from '/src/services/store.js'
import { arrBackgrounds } from '/src/services/background-list.js'

const backgroundPreview = computed(
  () =>
    `/src/images/backgrounds/small/${
      arrBackgrounds[store.storage.backgroundPreview].name
    }.jpg`
)

const changeBackground = function (direction) {
  let background = 0
  if (localStorage.background) background = Number(localStorage.background)

  if (direction === 'next') {
    if (background >= arrBackgrounds.length - 1) {
      localStorage.background = 0
      store.storage.backgroundPreview = 0
      return
    }
    localStorage.background++
    store.storage.backgroundPreview++
  } else if (direction === 'previous') {
    if (background <= 0) {
      const length = arrBackgrounds.length - 1
      localStorage.background = length
      store.storage.backgroundPreview = length
      return
    }
    localStorage.background--
    store.storage.backgroundPreview--
  }
}

const closeSettingMenu = function () {
  store.storage.background = store.storage.backgroundPreview
  store.setFalse('settings')
}
</script>

<template>
  <div class="settings-menu">
    <label class="settings-btn-close" @click="closeSettingMenu">+</label>
    <div class="settings-title">Настройки:</div>

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

    <div class="settings-description">Игнорировать набор символов</div>
    <label class="custom-checkbox">
      <div class="settings-description">несоответствущего языка</div>
      <input
        type="checkbox"
        id="box4"
        v-model="store.storage.inapLang"
        @click="store.toggleStorage('inapLang')" />
      <span class="check-mark"></span>
    </label>

    <div class="settings-picture">
      <button
        @click="changeBackground('previous')"
        type="button"
        id="settings-btn-previous"></button>
      <img
        id="settings-imgPreview"
        :src="backgroundPreview"
        alt="background-preview" />
      <button
        @click="changeBackground('next')"
        type="button"
        id="settings-btn-next"></button>
    </div>

    <p class="settings-description"></p>
    <p class="settings-author"></p>
    <a class="settings-link" href="#!">ссылка на страницу</a>
  </div>
</template>

<style>
.settings-description {
  text-align: left;
}

.settings-menu {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  /* left: -420px; */
  background: rgb(60, 60, 60);
  width: 380px;
  height: 100vh;
  box-shadow: none;
  color: rgb(200, 200, 200);
  padding: 40px 20px;
  /* transition: left 3000ms; */
  font-size: 25px;
  font-family: 'Montserrat', sans-serif;
}

.settings-menu-open {
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.4);
  left: 0;
}

.settings-title {
  font-size: 25px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid rgb(191, 226, 255);
}

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
  color: rgb(191, 226, 255);
}

.settings-btn-close:hover {
  transform: rotate(45deg) scale(1.1);
  color: darkviolet;
  transition: all 300ms ease-in-out;
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
  margin-top: 20px;
  float: left;
  height: 200px;
  line-height: 200px;
}

#settings-btn-previous,
#settings-btn-next {
  width: 30px;
  background: rgb(100, 100, 100);
}

#settings-btn-previous {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

#settings-btn-next {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.settings-picture div {
  width: 320px;
}
</style>
