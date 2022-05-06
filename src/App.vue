<script setup>
import { onMounted } from 'vue'
import { arrBackgrounds } from '/src/services/background-list.js'
import { computed } from '@vue/reactivity'
import NavigationMenu from './components/NavigationMenu.vue'
import Slider from './components/Slider.vue'
// import Background from './components/Background.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import Field from './components/Field.vue'
import OverallStatistics from './components/OverallStatistics.vue'
import store from '/src/services/store.js'
// import CharMeter from './components/CharMeter.vue'

onMounted(() => {
  for (const propertyName in store.storage) {
    if (propertyName === 'background' && localStorage.background) {
      store.storage.background = localStorage.background
      store.data.backgroundPreview = store.storage.background
    } else if (
      propertyName === 'langOfSnippets' &&
      localStorage.langOfSnippets
    ) {
      store.storage.langOfSnippets = localStorage.langOfSnippets
    } else if (localStorage[propertyName]) {
      store.storage[propertyName] = localStorage[propertyName] === 'true'
    }
  }
})

const background = computed(
  () =>
    `url('/src/images/backgrounds/normal/${
      arrBackgrounds[store.storage.background].name
    }.jpg')`
)

// const fn = function () {
//   console.log(store.storage.langOfSnippets)
// }
</script>

<template>
  <div id="background">
    <!-- <Background /> -->
    <NavigationMenu />
    <!-- <button @click="fn">КНИГА</button> -->
    <SettingsMenu v-if="store.state.settings" />
    <Field v-if="store.state.work" />
    <OverallStatistics v-if="store.state.overallStatistics" />
    <!-- <CharMeter :typing-speed="10" /> -->
    <!-- <div class="button-double">
      <div>!</div>
      <div>2</div>
    </div> -->
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
