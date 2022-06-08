<script setup>
import { computed } from '@vue/reactivity'
import { getBrowser } from '/src/services/helpers.js'
import SpeakerSVG from './SpeakerSVG.vue'
import { data, randomSnippet, loadFragment } from '../store/data.js'
import { state } from '../store/state.js'
import { storage } from '../store/storage.js'

async function fillFieldFromBuffer() {
  data.classSelector = '.navigation-bar__buffer'
  data.currentBook = 0 // for sake of overall statistics menu

  const br = getBrowser().browser
  if (br === 'yabrowser' || br === 'chrome' || br === 'opera') {
    let str = await navigator.clipboard.readText()
    if (str === ' ' || str === '' || str === '\r\n') return // buffer is empty
    loadFragment(str)
  }
}

const toggleSettings = function () {
  state.settings = !state.settings
  if (!state.settings) {
    storage.main.background = data.backgroundPreview
  }
}

const minSnippetLength = computed(() => Number(storage.main.minSnippetLength))
</script>

<template>
  <div>
    <SpeakerSVG class="navigation-bar__speaker" />

    <ul class="navigation-bar__list">
      <li>
        <a
          @click="randomSnippet(storage.main.langOfSnippets, minSnippetLength)"
          class="navigation-bar__snippet-link"
          href="#!">
          Отрывок
        </a>
      </li>
      <li class="nav-children">
        <a class="navigation-bar__drop-down-list" href="#!">▼</a>
        <ul>
          <li>
            <a
              @click="randomSnippet('russian', minSnippetLength)"
              :class="{
                'nav-underscore-none': storage.main.langOfSnippets !== 'russian'
              }"
              href="#!">
              На русском языке
            </a>
          </li>
          <li>
            <a
              @click="randomSnippet('english', minSnippetLength)"
              :class="{
                'nav-underscore-none': storage.main.langOfSnippets !== 'english'
              }"
              href="#!">
              На английском языке
            </a>
          </li>
        </ul>
      </li>

      <li>
        <a
          @click="fillFieldFromBuffer"
          class="navigation-bar__buffer"
          href="#!">
          Буфер обмена
        </a>
      </li>

      <li>
        <a @click="toggleSettings" class="navigation-bar__settings" href="#!">
          Настройки
        </a>
      </li>
    </ul>
  </div>
</template>

<style>
.navigation-bar__speaker {
  left: 10px;
  margin-top: 13px;
}

.navigation-bar__list {
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 70px;
  font-family: 'Montserrat', sans-serif;
  list-style: none;
  background: hsla(0, 0%, 8%, 0.8);
  user-select: none;
}

.navigation-bar__buffer,
.navigation-bar__drop-down-list,
.navigation-bar__settings {
  display: inline-flex;
  margin-left: 20px;
}

.navigation-bar__buffer,
.navigation-bar__snippet-link,
.navigation-bar__drop-down-list,
.navigation-bar__settings {
  position: relative;
  padding: 20px 0 20px 0;
  color: hsl(210, 13%, 50%);
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0;
}

.navigation-bar__buffer:hover,
.navigation-bar__snippet-link:hover,
.navigation-bar__drop-down-list:hover,
.navigation-bar__settings:hover {
  color: rgb(22, 198, 93);
}

.navigation-bar__list li {
  margin: 0;
  white-space: nowrap;
}

.navigation-bar__list li.nav-children {
  position: relative;
}

.navigation-bar__drop-down-list {
  margin-left: 5px;
}

.navigation-bar__list li.nav-children > ul {
  left: -128px;
}

.navigation-bar__list li.nav-children:hover > ul {
  position: absolute;
  visibility: visible;
  background: rgba(20, 20, 20, 0.8);
  opacity: 1;
}

.navigation-bar__list ul {
  position: absolute;
  top: 100%;
  z-index: 20;
  visibility: hidden;
  min-width: 220px;
  margin: 0;
  padding: 10px 0;
  text-align: left;
  list-style: none;
  opacity: 0;
  transition: all 350ms;
}

.navigation-bar__list ul li {
  display: block;
  padding: 0 5px;
  line-height: 1.1;
}

.navigation-bar__list ul li:last-child {
  margin-bottom: 0;
}

.navigation-bar__list ul li a {
  display: block;
  padding: 10px;
  color: rgb(112, 128, 144);
  transition: all 300ms;
}

.navigation-bar__list ul li a:hover {
  color: rgb(0, 0, 0);
  background: darkseagreen;
}

.navigation-bar__list > li > ul > li > a {
  font-size: 25px;
  font-weight: bold;
}

.nav-underscore-none {
  text-decoration: none;
}
</style>
