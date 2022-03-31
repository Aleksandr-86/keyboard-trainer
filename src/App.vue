<script setup>
import NavigationMenu from './components/NavigationMenu.vue'
import Field from './components/Field.vue'
import Keyboard from './components/Keyboard.vue'

import store from '/src/services/store.js'

const inputText = 'Просто какой-то текст'

const changeState = function () {
  store.state.work = !store.state.work
  console.log(`settings ${store.state.work}`)
}
</script>

<template>
  <NavigationMenu />
  <Field :txt="inputText" v-if="store.state.work || store.state.settings" />
  <button @click="changeState" class="btn">app</button>
  <Keyboard />
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

.btn {
  width: 80px;
  height: 80px;
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
