<script setup>
import { computed, onMounted } from 'vue'
import { arrBackgrounds } from '@/services/background-list.js'
import { detectDevice } from '@/services/helpers.js'
import TheNavigationBar from '@/components/TheNavigationBar.vue'
import TheSettingsMenu from '@/components/TheSettingsMenu.vue'
import TheField from '@/components/TheField.vue'
import TheOverallStats from '@/components/TheOverallStats.vue'
import click from '@/assets/sounds/click.mp3'
import ring from '@/assets/sounds/ring.mp3'
import { data } from '@/store/data.js'
import { state } from '@/store/state.js'
import { storage } from '@/store/storage.js'

function getUrl(name) {
  return new URL(`/src/assets/backgrounds/normal/${name}.jpg`, import.meta.url)
    .href
}

const backgroundPath = computed(() => {
  return `url(${getUrl(arrBackgrounds[storage.main.background].name)})`
})

onMounted(() => {
  if (localStorage.main) {
    const obj = JSON.parse(localStorage.main)
    data.backgroundPreview = obj.background
  }

  /* присваивает значения реактивным переменным на основании значений
  из локального хранилища браузера */
  for (const key in storage) {
    if (localStorage[key]) {
      const obj = JSON.parse(localStorage[key])
      for (const property in obj) {
        storage[key][property] = obj[property]
      }
    }
  }
})
</script>

<template>
  <div class="background"></div>
  <div v-if="detectDevice() === 'screen'">
    <audio :src="click" preload="auto"></audio>
    <audio :src="ring" preload="auto"></audio>

    <TheNavigationBar />

    <div v-if="state.preloader && !state.work" class="preloader"></div>

    <Transition name="move-x">
      <TheSettingsMenu v-if="state.settings" />
    </Transition>

    <Transition name="opacity">
      <TheField v-if="state.work" />
    </Transition>

    <Transition name="opacity">
      <TheOverallStats v-if="state.overallStats" />
    </Transition>
  </div>

  <div v-else>
    <div class="info">
      Здравствуйте! Данный сайт не предназначен для работы с мобильных
      устройств.
    </div>
  </div>
</template>

<style>
/* переходное правило opacity */
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.1s linear;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

/* переходное правило move-x */
.move-x-enter-active,
.move-x-leave-active {
  transition: transform 0.2s linear, opacity 0.2s linear;
}

.move-x-enter-from,
.move-x-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.move-x-enter-to,
.move-x-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

/* прочие правила */
* {
  margin: 0;
  padding: 0;
}

html {
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.background {
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-image: v-bind(backgroundPath);
  -webkit-transition: background-image 0.5s linear;
  -moz-transition: background-image 0.5s linear;
  -o-transition: background-image 0.5s linear;
  transition: background-image 0.5s linear;
}

@keyframes linear-preloader {
  0% {
    float: left;
    width: 0%;
  }
  49% {
    float: left;
    width: 100%;
  }
  51% {
    float: right;
    width: 100%;
  }
  100% {
    float: right;
    width: 0%;
  }
}

.preloader {
  width: 0;
  height: 2px;
  background-color: hsl(120, 100%, 50%);
  animation: linear-preloader 5s linear infinite;
  border-radius: 50%;
}

.info {
  font-size: 5vh;
  background-color: pink;
  border: 1px solid black;
}
</style>
