<script setup>
import { storage } from "@/store/storage.js";
import { data } from "@/store/data.js";
import TheField from "../components/TheField.vue";
import TheCurrentStats from "../components/TheCurrentStats.vue";
</script>

<template>
  <div v-if="!data.fragmentArr[0]" class="preloader"></div>

  <Transition name="opacity">
    <TheCurrentStats v-if="storage.visibility.currentStatistics" />
  </Transition>

  <TheField />
</template>

<style>
.preloader {
  width: 0;
  height: 2px;
  background-color: hsl(120, 100%, 50%);
  animation: linear-preloader 5s linear infinite;
}
</style>
