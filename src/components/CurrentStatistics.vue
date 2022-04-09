<script setup>
import { computed } from '@vue/reactivity'
import { onUnmounted } from 'vue'
import { msToMinutes } from '../services/helpers.js'
import store from '../services/store'

const tempWithoutMistake = computed(() => store.data.tempWithoutMistake)
const withoutMistake = computed(() => store.data.withoutMistake)
const elapsedTimeStr = computed(() => msToMinutes(store.data.elapsedTime))

onUnmounted(() => {
  clearInterval(store.data.stopwatch)
  store.data.elapsedTime = 0
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
      {{ elapsedTimeStr }}
    </div>
  </div>
</template>

<style>
.current-stat {
  display: inline-block;
  position: absolute;
  margin-left: 10px;
  width: 200px;
  height: 370px;
  background-color: rgb(123, 118, 123);
  padding: 5px;
  font-size: 30px;
}

.current-stat > div {
  display: flex;
  flex-direction: column;
  height: 80px;
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
