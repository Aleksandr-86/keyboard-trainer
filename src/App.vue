<script setup>
import { ref } from 'vue'
import NavigationMenu from './components/NavigationMenu.vue'
import Field from './components/Field.vue'
import Keyboard from './components/Keyboard.vue'

const inputText = 'Просто какой-то текст'

// const workState = ref(true)
// const settingsState = ref(false)
</script>

<template>
  <NavigationMenu />
  <Field :txt="inputText" />
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
