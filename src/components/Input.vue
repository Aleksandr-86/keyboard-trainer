<script setup>
import { ref } from 'vue'
import { storage } from '/src/services/storage.js'
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
  padding: 0 1px 0 2px;
  align-items: center;
  margin-bottom: 10px;
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
  /* padding: 0 10px 0 10px; */
  /* text-indent: 5px; */
  text-align: center;
}
</style>
