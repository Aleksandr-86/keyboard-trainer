<script setup>
import { computed } from '@vue/reactivity'
import { data } from '../store/data.js'
import { storage } from '../store/storage.js'

const tempWithoutMistake = computed(() => data.tempWithoutMistake)
const withoutMistake = computed(() => data.withoutMistake)
const remainingChars = computed(() => data.remainingChars)
const elapsedTime = computed(() => data.elapsedTime === 0)

const color = computed(() => storage.currentStatistics.colors)
const background = computed(() => {
  const colorsArr = storage.currentStatistics.colors.match(/[0-9.]+/g)
  const h = colorsArr[0]
  const s = colorsArr[1]
  const l = colorsArr[2] - 30
  const a = colorsArr[3]
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
})
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
      {{ data.charPerMin }}
    </div>
    <div class="elapsed-time">
      <transition name="hide">
        <span v-if="elapsedTime" class="current-stat-description">Время:</span>
      </transition>
      {{ data.elapsedTimeStr }}
    </div>
  </div>
</template>

<style scoped>
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

.current-stat-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: fit-content;
  margin: 5px auto;
  font-size: 35px;
  color: v-bind(color);
  background: v-bind(background);
  border: 2px solid v-bind(color);
  border-radius: 10px;
  user-select: none;
}
.current-stat-description {
  display: inline-flex;
  overflow: hidden;
  white-space: nowrap;
}

.without-mistake {
  display: flex;
  justify-content: center;
  align-content: stretch;
  min-width: 129px;
  padding: 5px 10px 5px 10px;
  border-right: 2px solid v-bind(color);
  overflow: hidden;
  white-space: nowrap;
  transition: min-width 3s 1s;
}

.remaining-chars {
  min-width: 59px;
  padding: 5px 10px 5px 10px;
  border-right: 2px solid v-bind(color);
}

.char-per-minute {
  min-width: 59px;
  padding: 5px 10px 5px 10px;
  border-right: 2px solid v-bind(color);
}

.elapsed-time {
  min-width: 129px;
  padding: 5px 10px 5px 10px;
  text-align: center;
}
</style>
