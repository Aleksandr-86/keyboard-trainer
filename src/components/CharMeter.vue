<script setup>
import { computed } from '@vue/reactivity'

const props = defineProps({
  typingSpeed: Number
})

const speedToAngle = computed(() => {
  if (props.typingSpeed === 0) {
    return 0
  } else if (props.typingSpeed > 0 && props.typingSpeed <= 400) {
    return Math.round(props.typingSpeed * 0.6)
  } else {
    return 300
  }
})

const enable = function () {
  document
    .querySelector('#contour')
    .setAttribute('d', 'M 0,0 L 300,0 L 300,25 L 0,25 L 0,0')
}
</script>

<template>
  <button @click="enable">добавить</button>
  <div class="meter-wrapper">
    <svg width="300px" height="50px" view-box="0 0 300 50">
      <path id="contour" d="M 0,0 L 300,0 L 300,50 L 0,50 L 0,0" />
    </svg>

    <!--
      <svg
      width="135"
      height="135"
      view-box="0 0 135 135">
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
      <circle fill="red" r="4" cx="50%" cy="50%"></circle>
      <path
        class="arrow"
        d="M 33.8521,125.7799 L 72.5,58.8397"
        stroke="red"
        stroke-width="2"
        style="
           {
            transform: `rotate(${speedToAngle}deg) `;
          }
        " />
    </svg>
    -->
  </div>
</template>

<style>
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

button {
  margin-top: 50px;
}

#contour {
  /* stroke-dasharray: 700;
  stroke-dashoffset: 700; */
  /* animation: draw 5s linear forwards; */
  fill: transparent;
  stroke: black;
  stroke-width: 3;
  /* transition: d 3s; */

  transform: rotateY(10deg);
  transform-box: fill-box;
  transform-origin: center;
}

.anim {
}

.meter-wrapper {
  /* position: absolute; */
  /* left: 653px; */
  margin: 20px auto;
  height: 50px;
  /* padding: 2px; */
  background-color: wheat;
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
  transform-origin: 50% 50%;
  transition: transform 3s ease-out;
}
</style>
