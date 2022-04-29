<template>
  <svg width="100%" height="100%">
    <defs>
      <clipPath id="cp-roundcorners">
        <rect width="100%" height="100%" fill="gold" fill-opacity=".5" />
        <!-- rx="60"  -->
      </clipPath>
      <symbol id="s-wavy-path">
        <g transform="translate(-50,60)">
          <path
            d="M903,4.5 C903,4.5 854,42.5341344 803.148089,42.2925317 C753.981141,42.0589344 753.709827,1.76742786 703.354914,2.13371392 C653,2.49999998 652.817934,41.4339085 602.908967,41.9840226 C553,42.5341367 552.597027,1.1857595 503.173513,1.84287976 C453.75,2.50000002 452.074424,40.9050063 403.037212,41.7195701 C354,42.5341339 350.880655,2.72739994 302.940328,2.61369997 C255,2.5 253.131621,42.5536648 203.06581,42.5341357 C153,42.5146065 154,2.5 103.175781,2.5 C52.3515625,2.5 3,42.5341344 3,42.5341344"></path>
        </g>
      </symbol>

      <symbol id="s-wavy-path-vert">
        <use
          xlink:href="#s-wavy-path"
          transform=" translate(130,-30) rotate(90)" />
      </symbol>

      <mask id="m-wavy-lines">
        <use xlink:href="#s-wavy-path" y="-100" class="u-line" />
        <use xlink:href="#s-wavy-path" y="-50" class="u-line" />
        <use xlink:href="#s-wavy-path" class="u-line" />
        <use xlink:href="#s-wavy-path" y="50" class="u-line" />
        <use xlink:href="#s-wavy-path" y="100" class="u-line" />
        <use xlink:href="#s-wavy-path" y="150" class="u-line" />
        <use xlink:href="#s-wavy-path" y="200" class="u-line" />
        <use xlink:href="#s-wavy-path" y="250" class="u-line" />
        <use xlink:href="#s-wavy-path" y="300" class="u-line" />
        <use xlink:href="#s-wavy-path" y="350" class="u-line" />
        <use xlink:href="#s-wavy-path" y="400" class="u-line" />
        <use xlink:href="#s-wavy-path" y="450" class="u-line" />
      </mask>

      <mask id="m-wavy-lines-vertical">
        <use xlink:href="#s-wavy-path-vert" x="-50" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="50" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="100" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="150" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="200" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="250" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="300" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="350" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="400" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="450" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="500" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="550" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="600" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="650" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="700" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="750" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="800" class="u-line" />
        <use xlink:href="#s-wavy-path-vert" x="850" class="u-line" />
      </mask>

      <symbol id="s-path">
        <path d="M0,0 0,800" transform="translate(25,0)" />
      </symbol>

      <mask id="m-lines">
        <use xlink:href="#s-path" class="u-line" />
        <use xlink:href="#s-path" x="50" class="u-line" />
        <use xlink:href="#s-path" x="100" class="u-line" />
        <use xlink:href="#s-path" x="150" class="u-line" />
        <use xlink:href="#s-path" x="200" class="u-line" />
        <use xlink:href="#s-path" x="250" class="u-line" />
        <use xlink:href="#s-path" x="300" class="u-line" />
        <use xlink:href="#s-path" x="350" class="u-line" />
        <use xlink:href="#s-path" x="400" class="u-line" />
        <use xlink:href="#s-path" x="450" class="u-line" />
        <use xlink:href="#s-path" x="500" class="u-line" />
        <use xlink:href="#s-path" x="550" class="u-line" />
        <use xlink:href="#s-path" x="600" class="u-line" />
        <use xlink:href="#s-path" x="650" class="u-line" />
        <use xlink:href="#s-path" x="700" class="u-line" />
        <use xlink:href="#s-path" x="750" class="u-line" />
        <use xlink:href="#s-path" x="800" class="u-line" />
      </mask>

      <mask id="m-circles">
        <circle r="5" cx="0" cy="530" class="u-line" />
        <circle r="50" cx="0" cy="530" class="u-line" />
        <circle r="100" cx="0" cy="530" class="u-line" />
        <circle r="150" cx="0" cy="530" class="u-line" />
        <circle r="200" cx="0" cy="530" class="u-line" />
        <circle r="250" cx="0" cy="530" class="u-line" />
        <circle r="300" cx="0" cy="530" class="u-line" />
        <circle r="350" cx="0" cy="530" class="u-line" />
        <circle r="400" cx="0" cy="530" class="u-line" />
        <circle r="450" cx="0" cy="530" class="u-line" />
        <circle r="500" cx="0" cy="530" class="u-line" />
        <circle r="550" cx="0" cy="530" class="u-line" />
        <circle r="600" cx="0" cy="530" class="u-line" />
        <circle r="650" cx="0" cy="530" class="u-line" />
        <circle r="700" cx="0" cy="530" class="u-line" />
        <circle r="750" cx="0" cy="530" class="u-line" />
        <circle r="800" cx="0" cy="530" class="u-line" />
        <circle r="850" cx="0" cy="530" class="u-line" />
        <circle r="900" cx="0" cy="530" class="u-line" />
        <circle r="950" cx="0" cy="530" class="u-line" />
        <circle r="1000" cx="0" cy="530" class="u-line" />
      </mask>

      <filter
        id="fl-shadow"
        filterUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="800"
        height="500">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
        <feOffset in="blur" dx="0" dy="0" result="offsetBlr" />
        <feFlood flood-color="rgba(0,0,0,.9)" />
        <feComposite operator="in" in2="offsetBlr" result="colBlur" />
        <feMerge>
          <feMergeNode in="colBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <text y="260" x="400" text-anchor="middle">SVG is magic.</text>
    <g class="g-images" clip-path="url(#cp-roundcorners)">
      <image
        xlink:href="https://source.unsplash.com/900x600/?flowers"
        width="100%"
        height="100%"
        class="image im-mask-waves-2" />

      <image
        xlink:href="https://source.unsplash.com/900x600/?blossom"
        width="100%"
        height="100%"
        class="image im-mask-waves-1" />

      <image
        xlink:href="https://source.unsplash.com/900x600/?tulips"
        width="100%"
        height="100%"
        class="image im-mask-lines" />

      <image
        xlink:href="https://source.unsplash.com/900x600/?droplets"
        width="100%"
        height="100%"
        class="image im-mask-circles" />
    </g>
  </svg>
</template>

<style>
BODY {
  background: #111;
}

svg {
  /* display: block;
  position: absolute;
  width: 800px;
  height: 532px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  overflow: visible; */
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
text {
  fill: #222;
  fill-opacity: 0.5;
  font-size: 3em;
  filter: url(#fl-shadow);
}
.image {
  animation: opacity 25s infinite step-start;
  opacity: 0;
}
.image:nth-child(4n + 1) {
  animation-delay: -6.25s;
}
.image:nth-child(4n + 2) {
  animation-delay: -12.5s;
}
.image:nth-child(4n + 3) {
  animation-delay: -18.75s;
}
.image:nth-child(4n + 4) {
  animation-delay: -25s;
}
@keyframes opacity {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  26% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.u-line {
  fill: none;
  stroke: white;
  stroke-width: 0;
  stroke-opacity: 0;
  animation: stroke-width-line 6.25s infinite;
}
.u-line:nth-child(56n + 1) {
  animation-delay: 0.1116071429s;
}
.u-line:nth-child(56n + 2) {
  animation-delay: 0.2232142857s;
}
.u-line:nth-child(56n + 3) {
  animation-delay: 0.3348214286s;
}
.u-line:nth-child(56n + 4) {
  animation-delay: 0.4464285714s;
}
.u-line:nth-child(56n + 5) {
  animation-delay: 0.5580357143s;
}
.u-line:nth-child(56n + 6) {
  animation-delay: 0.6696428571s;
}
.u-line:nth-child(56n + 7) {
  animation-delay: 0.78125s;
}
.u-line:nth-child(56n + 8) {
  animation-delay: 0.8928571429s;
}
.u-line:nth-child(56n + 9) {
  animation-delay: 1.0044642857s;
}
.u-line:nth-child(56n + 10) {
  animation-delay: 1.1160714286s;
}
.u-line:nth-child(56n + 11) {
  animation-delay: 1.2276785714s;
}
.u-line:nth-child(56n + 12) {
  animation-delay: 1.3392857143s;
}
.u-line:nth-child(56n + 13) {
  animation-delay: 1.4508928571s;
}
.u-line:nth-child(56n + 14) {
  animation-delay: 1.5625s;
}
.u-line:nth-child(56n + 15) {
  animation-delay: 1.6741071429s;
}
.u-line:nth-child(56n + 16) {
  animation-delay: 1.7857142857s;
}
.u-line:nth-child(56n + 17) {
  animation-delay: 1.8973214286s;
}
.u-line:nth-child(56n + 18) {
  animation-delay: 2.0089285714s;
}
.u-line:nth-child(56n + 19) {
  animation-delay: 2.1205357143s;
}
.u-line:nth-child(56n + 20) {
  animation-delay: 2.2321428571s;
}
.u-line:nth-child(56n + 21) {
  animation-delay: 2.34375s;
}
.u-line:nth-child(56n + 22) {
  animation-delay: 2.4553571429s;
}
.u-line:nth-child(56n + 23) {
  animation-delay: 2.5669642857s;
}
.u-line:nth-child(56n + 24) {
  animation-delay: 2.6785714286s;
}
.u-line:nth-child(56n + 25) {
  animation-delay: 2.7901785714s;
}
.u-line:nth-child(56n + 26) {
  animation-delay: 2.9017857143s;
}
.u-line:nth-child(56n + 27) {
  animation-delay: 3.0133928571s;
}
.u-line:nth-child(56n + 28) {
  animation-delay: 3.125s;
}
.u-line:nth-child(56n + 29) {
  animation-delay: 3.2366071429s;
}
.u-line:nth-child(56n + 30) {
  animation-delay: 3.3482142857s;
}
.u-line:nth-child(56n + 31) {
  animation-delay: 3.4598214286s;
}
.u-line:nth-child(56n + 32) {
  animation-delay: 3.5714285714s;
}
.u-line:nth-child(56n + 33) {
  animation-delay: 3.6830357143s;
}
.u-line:nth-child(56n + 34) {
  animation-delay: 3.7946428571s;
}
.u-line:nth-child(56n + 35) {
  animation-delay: 3.90625s;
}
.u-line:nth-child(56n + 36) {
  animation-delay: 4.0178571429s;
}
.u-line:nth-child(56n + 37) {
  animation-delay: 4.1294642857s;
}
.u-line:nth-child(56n + 38) {
  animation-delay: 4.2410714286s;
}
.u-line:nth-child(56n + 39) {
  animation-delay: 4.3526785714s;
}
.u-line:nth-child(56n + 40) {
  animation-delay: 4.4642857143s;
}
.u-line:nth-child(56n + 41) {
  animation-delay: 4.5758928571s;
}
.u-line:nth-child(56n + 42) {
  animation-delay: 4.6875s;
}
.u-line:nth-child(56n + 43) {
  animation-delay: 4.7991071429s;
}
.u-line:nth-child(56n + 44) {
  animation-delay: 4.9107142857s;
}
.u-line:nth-child(56n + 45) {
  animation-delay: 5.0223214286s;
}
.u-line:nth-child(56n + 46) {
  animation-delay: 5.1339285714s;
}
.u-line:nth-child(56n + 47) {
  animation-delay: 5.2455357143s;
}
.u-line:nth-child(56n + 48) {
  animation-delay: 5.3571428571s;
}
.u-line:nth-child(56n + 49) {
  animation-delay: 5.46875s;
}
.u-line:nth-child(56n + 50) {
  animation-delay: 5.5803571429s;
}
.u-line:nth-child(56n + 51) {
  animation-delay: 5.6919642857s;
}
.u-line:nth-child(56n + 52) {
  animation-delay: 5.8035714286s;
}
.u-line:nth-child(56n + 53) {
  animation-delay: 5.9151785714s;
}
.u-line:nth-child(56n + 54) {
  animation-delay: 6.0267857143s;
}
.u-line:nth-child(56n + 55) {
  animation-delay: 6.1383928571s;
}
.u-line:nth-child(56n + 56) {
  animation-delay: 6.25s;
}
@keyframes stroke-width-line {
  20% {
    stroke-width: 51;
    stroke-opacity: 1;
  }
  60% {
    stroke-width: 51;
    stroke-opacity: 1;
  }
  70% {
    stroke-width: 0;
    stroke-opacity: 0;
  }
}
image {
  /*   display: none; */
}
.im-mask-waves-1 {
  mask: url(#m-wavy-lines);
}
.im-mask-waves-2 {
  mask: url(#m-wavy-lines-vertical);
}
.im-mask-lines {
  mask: url(#m-lines);
}
.im-mask-circles {
  mask: url(#m-circles);
}
</style>
