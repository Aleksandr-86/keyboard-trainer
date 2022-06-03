<script setup>
import { computed } from '@vue/reactivity'
import { getBrowser } from '/src/services/helpers.js'
import SpeakerSVG from './SpeakerSVG.vue'
import { data, randomSnippet, loadFragment } from '../store/data.js'
import { state } from '../store/state.js'
import { storage } from '../store/storage.js'

async function fillFieldFromBuffer() {
  data.focusElement = '#nav-buffer'
  data.currentBook = 0 // for sake of overall statistics menu

  const br = getBrowser().browser
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText()
    if (str === ' ' || str === '' || str === '\r\n') return // buffer is empty
    loadFragment(str)
  } else if (br === 'firefox') {
    // let str = document.querySelector('#input').value
    // charInserter(strPreparer(str), 0)
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
    <SpeakerSVG class="nav-speaker" />
    <ul class="nav">
      <li>
        <a @click="fillFieldFromBuffer" href="#!" id="nav-buffer">
          Буфер обмена
        </a>
      </li>
      <li>
        <a
          @click="randomSnippet(storage.main.langOfSnippets, minSnippetLength)"
          id="nav-snippet"
          href="#!">
          Отрывок
        </a>
      </li>
      <li class="nav-children">
        <a id="nav-drop-down" href="#!">▼</a>
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
        <a @click="toggleSettings" id="nav-settings" href="#!">Настройки</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.nav-speaker {
  margin-top: 13px;
  left: 10px;
}
.nav {
  background: hsla(0, 0%, 8%, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  height: 70px;
  font-family: 'Montserrat', sans-serif;
  flex-wrap: wrap;
  z-index: 10;
  user-select: none;
}

#nav-snippet,
#nav-drop-down,
#nav-settings {
  display: inline-flex;
  margin-left: 20px;
}

#nav-buffer,
#nav-snippet,
#nav-drop-down,
#nav-settings {
  padding: 20px 0 20px 0;
  position: relative;
  text-transform: uppercase;
  color: hsl(210, 13%, 50%);
  font-weight: bold;
  letter-spacing: 0;
  font-size: 25px;
  text-decoration: none;
}

#nav-buffer:hover,
#nav-snippet:hover,
#nav-drop-down:hover,
#nav-settings:hover {
  text-decoration: none;
  color: rgb(22, 198, 93);
}

.nav li {
  margin: 0;
  white-space: nowrap;
}

.nav li.nav-children {
  position: relative;
}

#nav-drop-down {
  margin-left: 5px;
}

.nav li.nav-children > ul {
  left: -128px;
}

.nav li.nav-children:hover > ul {
  opacity: 1;
  visibility: visible;
  background: rgba(20, 20, 20, 0.8);
  position: absolute;
}

.nav ul {
  padding: 10px 0;
  margin: 0;
  list-style: none;
  position: absolute;
  z-index: 20;
  min-width: 220px;
  text-align: left;
  top: 100%;
  opacity: 0;
  visibility: hidden;
  transition: all 350ms;
}

.nav ul li {
  display: block;
  padding: 0 5px;
  line-height: 1.1;
  /* text-align: left; */
}

.nav ul li:last-child {
  margin-bottom: 0;
}

.nav ul li a {
  display: block;
  color: rgb(112, 128, 144);
  padding: 10px;
  transition: all 300ms;
  /* text-decoration: none; */
}

.nav ul li a:hover {
  color: rgb(0, 0, 0);
  background: darkseagreen;
  /* text-decoration: none; */
}

.nav > li > ul > li > a {
  font-size: 25px;
  font-weight: bold;
}

.nav-underscore-none {
  text-decoration: none;
}
</style>
