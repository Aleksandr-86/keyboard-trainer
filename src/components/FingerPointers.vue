<script setup></script>

<template>
  <div class="finger-pointers">
    <div class="left-hand pointer-disabled" id="left-pinky"></div>
    <div class="left-hand pointer-disabled" id="left-ring"></div>
    <div class="left-hand pointer-disabled" id="left-middle"></div>
    <div class="left-hand pointer-disabled" id="left-index"></div>

    <div class="right-hand pointer-disabled" id="right-pinky"></div>
    <div class="right-hand pointer-disabled" id="right-ring"></div>
    <div class="right-hand pointer-disabled" id="right-middle"></div>
    <div class="right-hand pointer-disabled" id="right-index"></div>
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
