<script setup>
import store from '/src/services/store.js'
function eHandler(e) {
  if (!'0123456789'.includes(e.key) && e.key !== 'Backspace') e.preventDefault()
  if (e.path[0].value.length >= 6 && e.key !== 'Backspace') e.preventDefault()

  if (e.key === '1') {
    let range = new Range()
    range.setStart(e.path[0].value, 0)
    range.setEnd(e.path[0].value, 0)
  }
}
</script>
<template>
  <div class="input-description">Минимальное количество символов:</div>
  <input
    type="text"
    id="input-min-length"
    @keydown="eHandler"
    v-model="store.storage.main.minSnippetLength" />
</template>

<style scoped>
#input-min-length {
  width: 90px;
  height: 50px;
  font-size: 25px;
  font-weight: bold;
  /* padding: 0 10px 0 10px; */
  /* text-indent: 5px; */
  text-align: center;
}

.input-description {
  text-align: left;
}
</style>
