<script setup>
import { computed } from '@vue/reactivity'
import { onUnmounted } from 'vue'
import { msToMinutes } from '../services/helpers.js'
import store from '../services/store'
import CharMeter from './CharMeter.vue'

const tempWithoutMistake = computed(() => store.data.tempWithoutMistake)
const withoutMistake = computed(() => store.data.withoutMistake)
const remainingChars = computed(() => store.data.remainingChars)

onUnmounted(() => {})
</script>

<template>
  <div class="current-stat">
    <div class="without-mistake" v-if="tempWithoutMistake === withoutMistake">
      {{ withoutMistake }}
    </div>
    <div class="without-mistake" v-else>
      {{ tempWithoutMistake }}/{{ withoutMistake }}
    </div>
    <div class="without-mistake">
      {{ remainingChars }}
    </div>
    <div class="char-per-minute">
      {{ store.data.charPerMin }}
    </div>
    <div class="elapsed-time">
      {{ store.data.elapsedTimeStr }}
    </div>
    <!-- <CharMeter :typing-speed="store.data.charPerMin" /> -->
  </div>
</template>

<style>
.current-stat {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px auto;
  width: fit-content;
  background: hsla(0, 0%, 30%);
  font-size: 35px;
}

.without-mistake {
  padding: 5px;
  min-width: 131px;
  border-radius: 10px;
}

.char-per-minute {
  padding: 5px;
  min-width: 80px;
  border: 2px solid darkviolet;
  border-radius: 10px;
}

.elapsed-time {
  min-width: 133px;
  padding: 5px;
  text-align: center;
  border: 2px solid darkviolet;
  border-radius: 10px;
}
</style>
