<script setup>
import { computed } from '@vue/reactivity'
import { onUnmounted } from 'vue'
import { msToMinutes } from '../services/helpers.js'
import store from '../services/store'
import CharMeter from './CharMeter.vue'
import { reactive } from 'vue'

const tempWithoutMistake = computed(() => store.data.tempWithoutMistake)
const withoutMistake = computed(() => store.data.withoutMistake)
const remainingChars = computed(() => store.data.remainingChars)

const elapsedTime = computed(() => store.data.elapsedTime === 0)
</script>

<template>
  <div class="current-stat-container">
    <div class="without-mistake">
      <transition name="hide">
        <span v-if="elapsedTime" class="current-stat-description">
          Без ошибок:&nbsp;
        </span>
      </transition>
      <span v-if="tempWithoutMistake === withoutMistake">
        {{ withoutMistake }}
      </span>
      <span v-else>{{ tempWithoutMistake }}/{{ withoutMistake }}</span>
    </div>
    <div class="remaining-chars">
      <transition name="hide">
        <span v-if="elapsedTime" class="current-stat-description">
          Осталось знаков:
        </span>
      </transition>
      {{ remainingChars }}
    </div>
    <div class="char-per-minute">
      <transition name="hide">
        <span v-if="elapsedTime" class="current-stat-description">
          Знаков в минуту:
        </span>
      </transition>
      {{ store.data.charPerMin }}
    </div>
    <div class="elapsed-time">
      <transition name="hide">
        <span v-if="elapsedTime" class="current-stat-description">Время:</span>
      </transition>
      {{ store.data.elapsedTimeStr }}
    </div>
  </div>
</template>

<style>
.hide-leave-active {
  transition: all 1.4s linear;
}

.hide-leave-from {
  max-width: 297px;
  opacity: 1;
}

.hide-leave-to {
  max-width: 0;
  opacity: 0;
}

.current-stat-description {
  display: inline-flex;
  overflow: hidden;
  white-space: nowrap;
}

.current-stat-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px auto;
  width: fit-content;
  background: hsla(160, 20%, 20%);
  /* backdrop-filter: blur(200px); */
  font-size: 35px;
  color: hsl(160, 80%, 45%);
  /* border: 2px solid hsl(282, 100%, 41%); */
  border: 2px solid hsl(160, 80%, 45%);
  border-radius: 10px;
}

.without-mistake {
  display: flex;
  justify-content: center;
  align-content: stretch;
  padding: 5px 10px 5px 10px;
  min-width: 129px;
  border-right: 2px solid hsl(160, 80%, 45%);
  overflow: hidden;
  white-space: nowrap;
  transition: min-width 3s 1s;
}

.remaining-chars {
  padding: 5px 10px 5px 10px;
  min-width: 59px;
  border-right: 2px solid hsl(160, 80%, 45%);
}

.char-per-minute {
  padding: 5px 10px 5px 10px;
  min-width: 59px;
  border-right: 2px solid hsl(160, 80%, 45%);
}

.elapsed-time {
  padding: 5px 10px 5px 10px;
  min-width: 129px;
  text-align: center;
}
</style>
