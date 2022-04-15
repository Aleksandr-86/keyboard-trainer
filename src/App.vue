<script setup>
import NavigationMenu from './components/NavigationMenu.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import Field from './components/Field.vue'
import OverallStatistics from './components/OverallStatistics.vue'
import store from '/src/services/store.js'
import CharMeter from './components/CharMeter.vue'
import { onMounted } from 'vue'
const showStore = () => console.warn(store.storage.letterCase)
const showLocal = () => console.warn(localStorage.letterCase)

onMounted(() => {
  if (localStorage.letterCase)
    store.storage.letterCase = localStorage.letterCase === 'true'
})
</script>

<template>
  <NavigationMenu />
  <button @click="showStore">store</button>
  <button @click="showLocal">local</button>
  <SettingsMenu v-if="store.state.settings" />
  <Field v-if="store.state.work" />
  <OverallStatistics v-if="store.state.overallStatistics" />
  <!-- <CharMeter :typing-speed="10" /> -->
</template>

<style>
button {
  width: 100px;
  height: 100px;
  font-size: 30px;
}
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
  background-color: pink;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: hsl(300, 100%, 20%); */
  /* margin-top: 60px; */
}
</style>
