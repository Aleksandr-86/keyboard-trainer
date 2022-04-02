<script setup>
import { computed } from '@vue/reactivity'

const props = defineProps({
  keyDown: String,
  keyUp: String,
  lang: String
})

const leftPinky = computed(() => {
  if (props.lang === 'rus') {
    return /^(?![ё1йфя])/i.test(props.keyDown)
  } else if (props.lang === 'eng') {
    return /^(?![`1qaz])/i.test(props.keyDown)
  }
})

const leftRing = computed(() => {
  if (props.lang === 'rus') {
    return /^(?![2цыч])/i.test(props.keyDown)
  } else if (props.lang === 'eng') {
    return /^(?![])/i.test(props.keyDown)
  }
})

const leftMiddle = computed(() => {
  if (props.lang === 'rus') {
    return /^(?![3увс])/i.test(props.keyDown)
  } else if (props.lang === 'eng') {
    return /^(?![])/i.test(props.keyDown)
  }
})

const leftIndex = computed(() => {
  if (props.lang === 'rus') {
    return /^(?![4кам5епи6])/i.test(props.keyDown)
  } else if (props.lang === 'eng') {
    return /^(?![])/i.test(props.keyDown)
  }
})

// const rightPinky = computed(() => /^(?![0.зж\-хэ=ъ\\])/i.test(props.keyDown))
const rightPinky = computed(() => {
  if (props.lang === 'rus') {
    return /^(?![])/i.test(props.keyDown)
  } else if (props.lang === 'eng') {
    return /^(?![])/i.test(props.keyDown)
  }
})
const rightRing = computed(() => /^(?![9щдю])/i.test(props.keyDown))
const rightMiddle = computed(() => /^(?![8шлб])/i.test(props.keyDown))
const rightIndex = computed(() => /^(?![7нртгоь])/i.test(props.keyDown))
</script>
/^(?![ё1!йфя])/i.test(store.event.keyDown.key)

<template>
  <div>{{ keyDown }} {{ lang }}</div>
  <div class="finger-pointers">
    <div class="left-hand" :class="{ 'pointer-disabled': leftPinky }"></div>
    <div class="left-hand" :class="{ 'pointer-disabled': leftRing }"></div>
    <div class="left-hand" :class="{ 'pointer-disabled': leftMiddle }"></div>
    <div class="left-hand" :class="{ 'pointer-disabled': leftIndex }"></div>

    <div class="right-hand" :class="{ 'pointer-disabled': rightPinky }"></div>
    <div class="right-hand" :class="{ 'pointer-disabled': rightRing }"></div>
    <div class="right-hand" :class="{ 'pointer-disabled': rightMiddle }"></div>
    <div class="right-hand" :class="{ 'pointer-disabled': rightIndex }"></div>
  </div>
</template>

<style>
.finger-pointers {
  position: relative;
  width: 1365px;
  height: 20px;
  margin: 40px auto 10px;
  /* transition: visibility 300ms, opacity 300ms; */
}

.left-hand,
.right-hand {
  width: 120px;
  height: 18px;
  backdrop-filter: blur(200px);

  border-radius: 10px;
  border: solid black 1px;
}

.left-hand {
  float: left;
  margin-right: 15px;
}

.right-hand {
  float: right;
  margin-left: 15px;
}

.left-hand:nth-child(1) {
  background: rgba(0, 0, 255, 0.75);
  margin-left: 15px;
}

.right-hand:nth-child(5) {
  background: rgba(0, 0, 255, 0.75);
  margin-right: 15px;
}

.left-hand:nth-child(2),
.right-hand:nth-child(6) {
  background: rgba(0, 175, 0, 0.75);
}

.left-hand:nth-child(3),
.right-hand:nth-child(7) {
  background: rgba(255, 255, 0, 0.75);
}

.left-hand:nth-child(4),
.right-hand:nth-child(8) {
  background: rgba(255, 0, 0, 0.75);
}

.finger-pointers .pointer-disabled {
  background: rgba(50, 50, 50, 0.75);
}
</style>
