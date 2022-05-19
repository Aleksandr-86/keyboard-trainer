<script setup>
import { computed } from '@vue/reactivity'
import { watch } from 'vue'
import store from '../services/store'

const props = defineProps({
  title: String,
  obj: String,
  prop: String
})

watch(store.storage[props.obj], newValue => {
  localStorage[props.obj] = JSON.stringify(newValue)
})
</script>

<template>
  <label class="checkbox">
    <div class="checkbox-title">{{ props.title }}</div>
    <input type="checkbox" v-model="store.storage[props.obj][props.prop]" />
    <span class="check-mark"></span>
  </label>
</template>

<style scoped>
.checkbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  height: 37px;
  border-radius: 7px;
  margin-right: 6px;

  padding: 0 1px 0 2px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 25px;
  user-select: none;
}

.checkbox:hover {
  background: hsl(120, 20%, 25%);
}

.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-title {
  text-align: left;
  margin-bottom: 2px;
}

.check-mark {
  /* position: absolute; */
  position: relative;
  /* top: 3px; */
  right: 0;
  /* height: 25px;
  width: 25px; */
  height: 35px;
  width: 35px;
  background-color: hsl(0, 0%, 93%);
  border-radius: 7px;
}

.checkbox:hover input ~ .check-mark {
  background-color: hsl(120, 73%, 90%);
}

.checkbox input:checked ~ .check-mark {
  background-color: limegreen;
}

.check-mark:after {
  content: '';
  position: absolute;
  display: none;
}

.checkbox input:checked ~ .check-mark:after {
  display: block;
}

.checkbox .check-mark:after {
  left: 12px;
  top: 5px;
  width: 8px;
  height: 17px;
  border: solid white;
  border-width: 0 4px 4px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
