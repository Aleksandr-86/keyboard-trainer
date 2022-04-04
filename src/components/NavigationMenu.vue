<script setup>
import { useGetBrowser } from '/src/services/helpers.js'
import store from '/src/services/store.js'

function upToDate() {
  store.increaseIndex()
}

async function fillFieldFromBuffer() {
  const br = useGetBrowser().browser
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText()
    // str = remEmoji(str) // removing emoji
    if (str === ' ' || str === '') return // buffer is empty
    // this.blur() // removing focus from an element
    // loadBackground(localStorage.backgroundPicture)
    // settingsMenu.classList.remove('settings-menu-open') // close settings menu
    // clearing finger pointers
    // fingerPointers
    // .querySelectorAll('*')
    // .forEach((elem) => elem.classList.add('pointer-disabled'))
    // clearCounters()
    // charInserter(strPreparer(str), 0)
    // if (!box2.checked) fingerPointers.classList.remove('hidden')
    // field.classList.remove('hidden')
    // if (!box3.checked) keyboard.classList.remove('hidden')
    // store.updateToken()
    // console.log(str)
    // store.state.arrIndex = 0
    store.state.fragment = str

    store.setTrue('work')
  } else if (br === 'firefox') {
    // let str = document.querySelector('#input').value
    // charInserter(strPreparer(str), 0)
  }
}
</script>

<template>
  <ul class="nav">
    <li>
      <a @click="fillFieldFromBuffer" href="#!">Буфер обмена</a>
    </li>
    <li class="nav-children">
      <a href="#!">Отрывок</a>
      <ul>
        <li>
          <a @click="upToDate" href="#!">На русском языке</a>
        </li>
        <li><a href="#!">На английском языке</a></li>
      </ul>
    </li>
    <li><a href="#!">Справка</a></li>
    <li>
      <a @click="store.changeState('settings')" href="#!">Настройки</a>
    </li>
  </ul>
</template>

<style>
.nav {
  background: rgba(20, 20, 20, 0.8);
  display: flex;
  justify-content: center;
  list-style: none;
  font-family: 'Montserrat', sans-serif;
  flex-wrap: wrap;
}

.nav > li {
  display: inline-flex;
}

.nav > li + li {
  margin-left: 20px;
}

.nav > li > a {
  padding: 20px 0 20px 0;
  position: relative;
  text-transform: uppercase;
  color: rgb(112, 128, 144);
  font-weight: bold;
  letter-spacing: 0;
  font-size: 25px;
  text-decoration: none;
}

.nav > li > a:hover {
  text-decoration: none;
  color: rgb(22, 198, 93);
}

.nav li {
  margin: 0;
  white-space: nowrap;
}

.nav li.nav-children {
  position: relative;
  margin-right: 12px;
}

.nav li.nav-children:after {
  position: absolute;
  content: '\2039';
  color: rgb(183, 152, 51);
  font-size: 25px;
  font-weight: bold;
  right: -12px;
  top: 12px;
  transform: rotate(-90deg);
}

.nav li.nav-children:hover > ul {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  background: rgb(60, 60, 60);
  position: absolute;
  left: 0;
}

.nav ul {
  padding: 10px 0;
  margin: 0;
  list-style: none;
  position: absolute;
  z-index: 20;
  min-width: 220px;
  top: 100%;
  /*left: -30px;*/
  opacity: 0;
  visibility: hidden;
  transform: translateY(5px);
  /*transition: all 300ms cubic-bezier(0, 0, 1, 1);*/
  transition: all 300ms;
}

.nav ul li {
  display: block;
  padding: 0 5px;
  line-height: 1.1;
}

.nav ul li:last-child {
  margin-bottom: 0;
}

.nav ul li a {
  display: block;
  color: rgb(112, 128, 144);
  padding: 10px;
  transition: all 300ms;
  text-decoration: none;
}

.nav ul li a:hover {
  color: rgb(0, 0, 0);
  background: darkseagreen;
  text-decoration: none;
}

.nav > li > ul > li > a {
  font-size: 25px;
  font-weight: bold;
}
</style>
