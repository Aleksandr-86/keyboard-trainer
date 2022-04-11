<script setup>
import NavigationMenu from './components/NavigationMenu.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import Field from './components/Field.vue'
import Statistics from './components/Statistics.vue'
import store from '/src/services/store.js'
import CharMeter from './components/CharMeter.vue'
</script>

<template>
  <NavigationMenu />
  <SettingsMenu v-if="store.state.settings" />
  <Field v-if="store.state.work" />
  <Statistics v-if="store.state.statistics" />
  <CharMeter :typing-speed="20" />
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
  background-color: pink;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: hsl(300, 100%, 20%); */
  /* margin-top: 60px; */
}
</style>
