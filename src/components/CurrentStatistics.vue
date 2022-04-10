<script setup>
import { computed } from '@vue/reactivity'
import { onUnmounted } from 'vue'
import { msToMinutes } from '../services/helpers.js'
import store from '../services/store'
import CharMeter from './CharMeter.vue'

const tempWithoutMistake = computed(() => store.data.tempWithoutMistake)
const withoutMistake = computed(() => store.data.withoutMistake)
// const elapsedTimeStr = computed(() => msToMinutes(store.data.elapsedTime))

onUnmounted(() => {
  clearInterval(store.data.stopwatch)
  // clearInterval(store.data.charPerMinute)
})
</script>

<template>
  <div class="current-stat">
    <div>
      <div
        v-if="tempWithoutMistake === 0 || tempWithoutMistake < withoutMistake"
        class="temp-in-a-row">
        {{ tempWithoutMistake }}
      </div>
      <div v-if="withoutMistake !== 0" class="in-a-row">
        {{ withoutMistake }}
      </div>
    </div>
    <div class="elapsed-time">
      {{ store.data.elapsedTimeStr }}
    </div>
    <div class="char-per-minute">
      {{ store.data.charPerMin }}
    </div>
  </div>
</template>

<style>
.current-stat {
  display: inline-block;
  position: absolute;
  margin-left: 10px;
  width: 150px;
  height: 370px;
  background-color: rgb(123, 118, 123);
  padding: 5px;
  font-size: 35px;
}

.current-stat > div {
  display: flex;
  flex-direction: column;
  height: 100px;
  padding: 2px;
  border: 2px solid darkviolet;
  border-radius: 10px;
}

.temp-in-a-row {
  height: inherit;
  border-radius: 10px;
  background-color: yellow;
  /* border-bottom: 2px solid black; */
}

.in-a-row {
  height: inherit;
  border-radius: 10px;
  background-color: yellowgreen;
}
</style>
