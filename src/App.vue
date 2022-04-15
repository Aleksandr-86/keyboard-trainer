<script setup>
import NavigationMenu from './components/NavigationMenu.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import Field from './components/Field.vue'
import OverallStatistics from './components/OverallStatistics.vue'
import store from '/src/services/store.js'
import CharMeter from './components/CharMeter.vue'
import { onMounted } from 'vue'
const showStore = () => console.warn(store.storage.pointers)
const showLocal = () => console.warn(localStorage.keyboard)

onMounted(() => {
  for (const propertyName in store.storage) {
    if (localStorage[propertyName])
      store.storage[propertyName] = localStorage[propertyName] === 'true'
  }

  // if (localStorage.letterCase)
  //   store.storage.letterCase = localStorage.letterCase === 'true'
  // if (localStorage.pointers)
  //   store.storage.pointers = localStorage.pointers === 'true'
})
</script>

<template>
  <NavigationMenu />
  <!-- <button @click="showStore">pointers</button>
  <button @click="showLocal">keyboard</button> -->
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
  /* background-color: pink; */
  background: black url('/src/images/backgrounds/normal/mountain.jpg') no-repeat
    fixed center center;
  background-size: cover;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: hsl(300, 100%, 20%); */
  /* margin-top: 60px; */
}
</style>
