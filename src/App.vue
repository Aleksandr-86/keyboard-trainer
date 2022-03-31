<script setup>
import NavigationMenu from './components/NavigationMenu.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import Field from './components/Field.vue'
import Keyboard from './components/Keyboard.vue'
import store from '/src/services/store.js'
import FingerPointers from './components/FingerPointers.vue'
import { ref } from 'vue'

// const keyDown = ref({})
document.body.addEventListener('keydown', function (e) {
  // keyDown.value = event
  store.setEvent('keyDown', e)
})

const inputText = 'asdfasdf'
</script>

<template>
  <NavigationMenu />
  <SettingsMenu v-if="store.state.settings" />
  <FingerPointers v-if="store.state.pointers && store.state.work" />
  <Field v-if="store.state.work" />
  <Keyboard v-if="store.state.keyboard && store.state.work" />
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
  background-color: rgb(212, 198, 166);

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: hsl(300, 100%, 20%); */
  /* margin-top: 60px; */
}
</style>
