<script setup>
import { ref } from 'vue'

const count = ref(0)
const newItem = ref('')

function increment() {
  count.value++
}
</script>

<template>
  <label>
    <input v-model="newItem" placeholder="введите число" />
  </label>
  <!-- <p class="counter">{{ `${newItem.length}/200` }}</p> -->
  <button class="btn" @click="increment">{{ count }}</button>
</template>

<style>
input {
  margin-top: 20px;
  width: 700px;
  height: 50px;
  font-size: 40px;
}

.counter {
  font-size: 40px;
  color: hsl(120, 100%, 30%);
}

.btn {
  margin: 80px 0 0 0;
  width: 100px;
  height: 100px;
  font-size: 50px;
}
</style>
