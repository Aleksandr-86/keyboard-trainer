<script setup>
import { onMounted, computed } from 'vue'
import { arrBackgrounds } from '/src/services/background-list.js'
import NavigationMenu from './components/NavigationMenu.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import Field from './components/Field.vue'
import OverallStatistics from './components/OverallStatistics.vue'
import { data } from '/src/services/data.js'
import { state } from '/src/services/state.js'
import { storage } from '/src/services/storage.js'

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

const background = computed(
  () =>
    `url('/src/images/backgrounds/normal/${
      arrBackgrounds[storage.main.background].name
    }.jpg')`
)
</script>

<template>
  <div id="background">
    <NavigationMenu />
    <SettingsMenu v-if="state.settings" />
    <Field v-if="state.work" />
    <OverallStatistics v-if="state.overallStatistics" />
  </div>
</template>

<style>
/* .button,
.button-double {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-top: 3px;
  margin-right: 3px;
  font-size: 23px;
  font-family: 'Consolas', monospace;
  text-align: center;
  color: black;
  background: hsl(0, 0%, 80%);
  border-radius: 15px;
}

.button > div {
  position: relative;
  background-color: greenyellow;
  top: 16px;
  height: 28px;
}

.button-double > div {
  background-color: aqua;
  margin-top: 2px;
  height: 27px;
} */

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
  background-image: v-bind(background);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  transition: background-image 500ms linear;
}
</style>
