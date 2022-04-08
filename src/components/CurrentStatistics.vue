<script setup>
import store from '../services/store'
</script>

<template>
  <div class="current-stat">
    {{ store.data.tempWithoutMistake }} / {{ store.data.withoutMistake }}
  </div>
</template>

<style>
.current-stat {
  width: 100px;
  height: 50px;
  /* vertical-align: center; */
  background-color: aquamarine;
  vertical-align: center;
}
</style>
