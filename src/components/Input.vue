<script setup>
import { ref } from 'vue'
import { storage } from '../store/storage.js'

const flag = ref(false)

function keyDown(e) {
  if (!'0123456789'.includes(e.key) && e.key !== 'Backspace') {
    e.preventDefault()
    return
  }

  if (input.selectionEnd - input.selectionStart) return
  if (input.value.length >= 6 && e.key !== 'Backspace' && flag) {
    e.preventDefault()
  }
}
</script>
<template>
  <div class="input-container">
    <div class="input-description">
      Минимальное количество символов отрывка:
    </div>
    <input
      type="text"
      id="input"
      @keydown="keyDown"
      v-model="storage.main.minSnippetLength" />
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 1px 0 2px;
}

.input-description {
  display: inline-block;
  width: 358px;
  text-align: left;
}

#input {
  width: 90px;
  height: 50px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}
</style>
