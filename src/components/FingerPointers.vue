<script setup>
import { computed } from '@vue/reactivity'

const props = defineProps({
  keyDown: {},
  caps: {},
  lang: String
})

let leftPinky = true
let leftRing = true
let leftMiddle = true
let leftIndex = true

let rightPinky = true
let rightRing = true
let rightMiddle = true
let rightIndex = true

if (props.lang === 'rus') {
  leftPinky = computed(() => {
    if (props.caps) {
      return /^(?![ё1йфя])/.test(props.keyDown)
    }
    return /^(?![ё1йфя])/.test(props.keyDown)
  })
  leftRing = computed(() => /^(?![2цыч])/.test(props.keyDown))
  leftMiddle = computed(() => /^(?![3увс])/.test(props.keyDown))
  leftIndex = computed(() => /^(?![4кам5епи6])/.test(props.keyDown))

  rightPinky = computed(() => /^(?![0зж.\-хэ=ъ\\])/.test(props.keyDown))
  rightRing = computed(() => /^(?![9щдю])/.test(props.keyDown))
  rightMiddle = computed(() => /^(?![8шлб])/.test(props.keyDown))
  rightIndex = computed(() => /^(?![7нртгоь])/.test(props.keyDown))
} else if (props.lang === 'eng') {
  leftPinky = computed(() => {
    if (props.caps) {
      return /^(?![`1qaz~!QAZ])/.test(props.keyDown)
    }
    return /^(?![`1qaz~!QAZ])/.test(props.keyDown)
  })
  leftRing = computed(() => /^(?![2wsx])/.test(props.keyDown))
  leftMiddle = computed(() => /^(?![3edc])/.test(props.keyDown))
  leftIndex = computed(() => /^(?![4rfv5tgb6])/.test(props.keyDown))

  rightPinky = computed(() => {
    if (props.caps) {
      return /^(?![0p;/\-\['=\]\\~!])/.test(props.keyDown)
    }
    return /^(?![0p;/\-\['=\]\\~!QAZWSXEDCRFVTGB])/.test(props.keyDown)
  })

  rightRing = computed(() => /^(?![9ol.])/.test(props.keyDown))
  rightMiddle = computed(() => /^(?![8ik,])/.test(props.keyDown))
  rightIndex = computed(() => /^(?![7yhnujm])/.test(props.keyDown))
}
</script>

<template>
  <div class="finger-pointers">
    <div class="left-hand" :class="{ disabled: leftPinky }"></div>
    <div class="left-hand" :class="{ disabled: leftRing }"></div>
    <div class="left-hand" :class="{ disabled: leftMiddle }"></div>
    <div class="left-hand" :class="{ disabled: leftIndex }"></div>

    <div class="right-hand" :class="{ disabled: rightPinky }"></div>
    <div class="right-hand" :class="{ disabled: rightRing }"></div>
    <div class="right-hand" :class="{ disabled: rightMiddle }"></div>
    <div class="right-hand" :class="{ disabled: rightIndex }"></div>
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

.finger-pointers .disabled {
  background: rgba(50, 50, 50, 0.75);
}
</style>
