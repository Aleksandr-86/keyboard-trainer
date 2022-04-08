<script setup>
import { computed } from '@vue/reactivity'
import store from '../services/store'

const tempWithoutMistake = computed(() => store.data.tempWithoutMistake)
const withoutMistake = computed(() => store.data.withoutMistake)
</script>

<template>
  <div class="current-stat">
    <div>
      <div v-if="tempWithoutMistake !== withoutMistake">
        {{ tempWithoutMistake }}
      </div>
      <div>{{ withoutMistake }}</div>
    </div>
  </div>
</template>

<style>
.current-stat {
  display: inline-block;
  position: absolute;
  margin-left: 10px;
  width: 100px;
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

.current-stat > div > div:first-child {
  /* border-radius: 10px 10px 0 0; */
  border-radius: 10px;
  background-color: yellow;
  border-bottom: 2px solid black;
}

.current-stat > div > div:last-child {
  height: inherit;
  border-radius: 10px;
  /* border-radius: 0 0 10px 10px; */
  background-color: yellowgreen;
  /* vertical-align: center; */
  overflow: hidden;
}

/* .current-stat > div > div:last-child::after {
  content: '';
} */
</style>
