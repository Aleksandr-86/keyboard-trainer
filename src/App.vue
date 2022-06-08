<script setup>
import { onMounted, computed } from 'vue'
import { arrBackgrounds } from '/src/services/background-list.js'
import NavigationBar from './components/NavigationBar.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import Field from './components/Field.vue'
import OverallStats from './components/OverallStats.vue'
import { data } from '/src/store/data.js'
import { state } from '/src/store/state.js'
import { storage } from '/src/store/storage.js'

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

  // loading values from  local storage to the reactive object
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
  <div id="background"></div>
  <NavigationBar />
  <SettingsMenu v-if="state.settings" />
  <Field v-if="state.work" />
  <OverallStats v-if="state.overallStats" />
</template>

<style>
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

#background {
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
</style>
