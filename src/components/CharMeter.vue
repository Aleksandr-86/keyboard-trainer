<script setup>
import { computed } from '@vue/reactivity'
import { ref } from 'vue'

// const props = defineProps({
//   speed: 200
// })

const speed = ref()
speed.value = 0
// const cp = computed(() => 'rotate(200deg)')
const cp = computed(() => `rotate(${speed.value}deg)`)
</script>

<template>
  <div class="meter-wrapper">
    <svg width="135" height="135" view-box="0 0 135 135">
      <circle fill="wheat" r="47.2958" cx="50%" cy="50%"></circle>
      <g
        fill="none"
        stroke-width="20"
        stroke-dasharray="60 300"
        stroke-opacity="0.75">
        <circle class="violet-range" r="57.2958" cx="50%" cy="50%"></circle>
        <circle class="orange-range" r="57.2958" cx="50%" cy="50%"></circle>
        <circle class="yellow-range" r="57.2958" cx="50%" cy="50%"></circle>
        <circle class="green-range" r="57.2958" cx="50%" cy="50%"></circle>
        <circle class="blue-range" r="57.2958" cx="50%" cy="50%"></circle>
      </g>
      <circle fill="red" r="3" cx="50%" cy="50%"></circle>
      <path
        class="arrow"
        d="M 33.8521,125.7799 L 72.5,58.8397"
        stroke="red"
        :style="{ transform: cp }" />
    </svg>
  </div>
</template>

<style>
.meter-wrapper {
  /* position: absolute; */
  width: 135px;
  height: 135px;
  margin: 0 auto;
  /* padding: 2px; */
  /* background-color: pink; */
}

.violet-range {
  stroke: darkviolet;
}

.orange-range {
  stroke: orange;
  stroke-dashoffset: 240;
}

.yellow-range {
  stroke: yellow;
  stroke-dashoffset: 180;
}

.green-range {
  stroke: green;
  stroke-dashoffset: 120;
}

.blue-range {
  stroke: blue;
  stroke-dashoffset: 60;
}

.arrow {
  /* transform: rotate(100deg); */
  transform-origin: 50% 50%;
}
</style>
