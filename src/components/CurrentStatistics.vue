<script setup>
import { computed } from '@vue/reactivity'
import { onUnmounted } from 'vue'
import { msToMinutes } from '../services/helpers.js'
import store from '../services/store'
import CharMeter from './CharMeter.vue'

const tempWithoutMistake = computed(() => store.data.tempWithoutMistake)
const withoutMistake = computed(() => store.data.withoutMistake)
// const elapsedTimeStr = computed(() => msToMinutes(store.data.elapsedTime))

const keyboardLang = computed(() => store.data.keyboardLang)
onUnmounted(() => {})
</script>

<template>
  <div class="current-stat">
    <div>
      <div
        class="temp-in-a-row"
        v-if="tempWithoutMistake === 0 || tempWithoutMistake < withoutMistake">
        {{ tempWithoutMistake }}
      </div>
      <div class="in-a-row" v-if="withoutMistake !== 0">
        {{ withoutMistake }}
      </div>
    </div>
    <div class="elapsed-time">
      {{ store.data.elapsedTimeStr }}
    </div>
    <div class="char-per-minute">
      {{ store.data.charPerMin }}
    </div>
    <div v-if="keyboardLang === 'russian-basic'">Русский базовый</div>
    <div v-if="keyboardLang === 'russian-extended'">Русский расширенный</div>
    <div v-if="keyboardLang === 'english-basic'">Английский базовый</div>
    <div v-if="keyboardLang === 'english-extended'">Английский расширенный</div>
    <!-- <CharMeter :typing-speed="store.data.charPerMin" /> -->
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

.current-stat > div:first-child,
.elapsed-time {
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
