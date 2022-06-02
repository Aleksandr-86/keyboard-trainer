<script setup>
import { onMounted, computed } from 'vue'
import { arrBackgrounds } from '/src/services/background-list.js'
import { getUrl } from '/src/services/helpers.js'
import NavigationBar from './components/NavigationBar.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import Field from './components/Field.vue'
import OverallStatistics from './components/OverallStatistics.vue'
import { data } from '/src/services/data.js'
import { state } from '/src/services/state.js'
import { storage } from '/src/services/storage.js'

const backgroundPath = computed(() =>
  getUrl(
    `/src/images/backgrounds/normal/${
      arrBackgrounds[storage.main.background].name
    }.jpg`
  )
)

onMounted(() => {
  if (localStorage.main) {
    const obj = JSON.parse(localStorage.main)
    data.backgroundPreview = obj.background
  }
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
  <div
    id="background"
    :style="{
      'background-image': `url(${backgroundPath})`
    }">
    <NavigationBar />
    <SettingsMenu v-if="state.settings" />
    <Field v-if="state.work" />
    <OverallStatistics v-if="state.overallStatistics" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

html {
  /*box-sizing: border-box;*/
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  /* background: pink no-repeat fixed center center; */
  /* background-size: cover; */

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* transition: background 1000ms linear; */
  text-align: center;
  /* color: hsl(300, 100%, 20%); */
  /* margin-top: 60px; */
}

#background {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  -webkit-transition: background-image 0.5s linear;
  -moz-transition: background-image 0.5s linear;
  -o-transition: background-image 0.5s linear;
  transition: background-image 0.5s linear;
}
</style>