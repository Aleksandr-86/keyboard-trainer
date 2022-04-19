<script setup>
import NavigationMenu from './components/NavigationMenu.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import Field from './components/Field.vue'
import OverallStatistics from './components/OverallStatistics.vue'
import store from '/src/services/store.js'
import CharMeter from './components/CharMeter.vue'
import { onMounted } from 'vue'
import { arrBackgrounds } from '/src/services/background-list.js'
import { computed } from '@vue/reactivity'

onMounted(() => {
  for (const propertyName in store.storage) {
    if (localStorage[propertyName])
      store.storage[propertyName] = localStorage[propertyName] === 'true'
  }

  const obj = store.storage.background
  document.body.style.background = `black url("/src/images/backgrounds/normal/${obj.name}.jpg") no-repeat fixed center center`
  document.body.style.backgroundSize = 'cover'
})

const fn = function () {
  console.log(typeof store.data.currentBook)
}
</script>

<template>
  <NavigationMenu />
  <!-- <button @click="fn">КНИГА</button> -->
  <SettingsMenu v-if="store.state.settings" />
  <Field v-if="store.state.work" />
  <OverallStatistics v-if="store.state.overallStatistics" />
  <!-- <CharMeter :typing-speed="10" /> -->
</template>

<style scoped></style>

<style>
* {
  margin: 0;
  padding: 0;
}

button {
  margin: 0;
  width: 100px;
  height: 40px;
  font-size: 30px;
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
  transition: background 1000ms linear;
  text-align: center;
  /* color: hsl(300, 100%, 20%); */
  /* margin-top: 60px; */
}
</style>
