<script setup>
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { data, loadFragment, randomSnippet } from '@/store/data.js'
import { state } from '@/store/state.js'
import { storage } from '@/store/storage.js'
import { getBrowser } from '@/services/helpers.js'
import BaseSpeakerIcon from '@/components/ui/BaseSpeakerIcon.vue'
import BaseGitHubLink from '@/components/ui/BaseGitHubLink.vue'

const router = useRouter()

async function fillFieldFromBuffer() {
  data.classSelector = '.navigation-bar__buffer'
  // требуется для условного отображения некоторых строк в общей статистки
  data.currentBook = 0

  const br = getBrowser().browser
  if (br === 'yabrowser' || br === 'chrome' || br === 'opera') {
    let str = await navigator.clipboard.readText()
    if (str === ' ' || str === '' || str === '\r\n') return // buffer is empty
    loadFragment(str)
    router.push({ name: 'typing' })
  }
}

const toggleSettings = function () {
  state.settings = !state.settings
  if (!state.settings) {
    storage.main.background = data.backgroundPreview
  }
}

const minSnippetLength = computed(() => Number(storage.main.minSnippetLength))
const langOfSnippets = computed(() => storage.main.langOfSnippets)
</script>

<template>
  <div class="navigation-bar__container">
    <ul class="navigation-bar__list">
      <li>
        <RouterLink
          :to="{ path: 'typing' }"
          @click="randomSnippet(langOfSnippets, minSnippetLength)"
          class="navigation-bar__snippet-link">
          Отрывок
        </RouterLink>
      </li>

      <li class="nav-children">
        <a class="navigation-bar__drop-down-list">▼</a>
        <ul>
          <li>
            <RouterLink
              :to="{ path: 'typing' }"
              @click="randomSnippet('russian', minSnippetLength)"
              class="navigation-bar__link"
              :class="{
                'navigation-bar__link_underscore': langOfSnippets === 'russian'
              }">
              На русском языке
            </RouterLink>
          </li>

          <li>
            <RouterLink
              :to="{ path: 'typing' }"
              @click="randomSnippet('english', minSnippetLength)"
              class="navigation-bar__link"
              :class="{
                'navigation-bar__link_underscore': langOfSnippets === 'english'
              }">
              На английском языке
            </RouterLink>
          </li>
        </ul>
      </li>

      <li>
        <RouterLink
          :to="{ path: 'typing' }"
          @click="fillFieldFromBuffer"
          class="navigation-bar__buffer">
          Буфер обмена
        </RouterLink>
      </li>

      <li>
        <a @click="toggleSettings" class="navigation-bar__settings">
          Настройки
        </a>
      </li>
    </ul>

    <BaseSpeakerIcon class="navigation-bar__speaker" />
    <BaseGitHubLink class="navigation-bar__github-link" />
  </div>
</template>

<style>
.navigation-bar__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  font-family: 'Montserrat', sans-serif;
  background: hsla(0, 0%, 8%, 0.8);
  user-select: none;
}

.navigation-bar__list {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
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

.navigation-bar__link {
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
}

.navigation-bar__link:hover {
  color: rgb(0, 0, 0);
  background: darkseagreen;
}

.navigation-bar__link_underscore {
  text-decoration: underline;
}

.navigation-bar__speaker {
  margin-left: 20px;
}

.navigation-bar__github-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
</style>
