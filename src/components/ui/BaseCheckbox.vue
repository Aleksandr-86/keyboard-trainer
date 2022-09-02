<script setup>
import { computed, watch } from 'vue'
import { storage } from '@/store/storage.js'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  obj: {
    type: String,
    required: true
  },
  prop: {
    type: String,
    required: true
  },
  disabled: Boolean
})

watch(storage[props.obj], newValue => {
  localStorage[props.obj] = JSON.stringify(newValue)
})

const opacity = computed(() => {
  if (props.disabled) {
    return 0.5
  } else {
    return 1
  }
})

const cursor = computed(() => {
  if (props.disabled) {
    return 'not-allowed'
  } else {
    return 'pointer'
  }
})
</script>

<template>
  <label class="checkbox">
    <div class="checkbox__title">{{ props.title }}</div>
    <input
      class="checkbox__input"
      type="checkbox"
      v-model="storage[props.obj][props.prop]"
      :disabled="props.disabled" />
    <span class="checkbox__box"></span>
  </label>
</template>

<style lang="scss">
.checkbox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 37px;
  margin-bottom: 12px;
  padding: 0 1px 0 2px;
  font-size: 25px;
  border-radius: 7px;
  opacity: v-bind(opacity);
  user-select: none;
  cursor: v-bind(cursor);

  &:hover {
    background: hsl(120, 20%, 25%);
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    cursor: pointer;
  }

  &__title {
    margin-bottom: 2px;
    text-align: left;
  }

  &__box {
    position: relative;
    right: 0;
    width: 35px;
    height: 35px;
    background-color: hsl(0, 0%, 93%);
    border-radius: 7px;
  }

  &:hover &__input ~ &__box {
    background-color: hsl(120, 73%, 85%);
  }

  & &__input:checked ~ &__box {
    background-color: limegreen;
  }

  &__box:after {
    position: absolute;
    display: none;
    content: '';
  }

  & &__input:checked ~ &__box:after {
    display: block;
  }

  & &__box:after {
    top: 5px;
    left: 12px;
    width: 8px;
    height: 17px;
    border: solid white;
    border-width: 0 4px 4px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
</style>
