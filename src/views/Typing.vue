<script setup>
import { data } from '@/store/data.js'
import TheField from '../components/TheField.vue'
</script>

<template>
  <div v-if="!data.fragmentArr[0]" class="preloader"></div>

  <TheField v-else />
</template>

<style>
.preloader {
  width: 0;
  height: 2px;
  background-color: hsl(120, 100%, 50%);
  animation: linear-preloader 5s linear infinite;
}
</style>
