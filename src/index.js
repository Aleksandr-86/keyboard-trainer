import {charInserter} from "/src/scripts/char-inserter.js";
import {getBrowser, strPreparer} from "/src/scripts/functions.js";
import {keyDownHandler, clearCounters} from "/src/scripts/keyboard.js";

// const btnGenFromSite = document.querySelector('#btn1');
const fingerPointers = document.querySelector('.finger-pointers');
const field = document.querySelector('.field');
const keyboard = document.querySelector('.keyboard');

const buffer = document.querySelector('#buffer');

const settings = document.querySelector('.nav > li:last-child > a');
const settingsMenu = document.querySelector('.settings-menu');
const settingsBtnClose = document.querySelector('.settings-btn-close');
// const box1 = document.querySelector('#checkbox');
const box2 = document.querySelector('#box2');
const box3 = document.querySelector('#box3');
const help = document.querySelector('#help');

const statistics = document.querySelector('.statistics');
const statisticsClose = document.querySelector('.statistics-close');
const overlay = document.querySelector('.overlay');

const checkbox1 = document.querySelector("input[name=checkbox]");
if (localStorage.letterCase) {
  localStorage.letterCase === 'true' ? checkbox1.checked = true : checkbox1.checked = false;
}

checkbox1.addEventListener('change', function() {
  this.checked ? localStorage.setItem('letterCase', 'true') : localStorage.setItem('letterCase', 'false');
});

// check1.addEventListener('click', function() {
//   box1.checked ? localStorage.setItem('letterCase', 'true') : localStorage.setItem('letterCase', 'false');
// });


// adding text from a buffer
buffer.addEventListener('click', async function() {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText();
    if ((str.length === 0 || str.length === 1) && (str === ' ' || str === '')) return; // buffer is empty

    buffer.blur(); // removing focus from an element
    settingsMenu.classList.remove('settings-menu-open'); // close settings menu
    // clearing finger pointers
    fingerPointers.querySelectorAll('*').forEach(elem => elem.classList.add('pointer-disabled'));
    clearCounters();
    charInserter(strPreparer(str), 0);
    if (!box2.checked) fingerPointers.classList.remove('hidden');
    field.classList.remove('hidden');
    if (!box3.checked) keyboard.classList.remove('hidden');
  } else if (br === 'firefox') {
    let str = document.querySelector('#input').value;
    charInserter(strPreparer(str), 0);
  }
});

// handling keyboard events
document.addEventListener('keydown', event => keyDownHandler(event));

// shutting down the statistics menu
statisticsClose.addEventListener('click', function() {
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
});
overlay.addEventListener('click', function() {
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
});

// open settings menu
settings.addEventListener('click', function() {
  settingsMenu.classList.add('settings-menu-open');
  fingerPointers.classList.add('hidden');
  field.classList.add('hidden');
  keyboard.classList.add('hidden');
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
});

// close settings menu
settingsBtnClose.addEventListener('click', function() {
  settingsMenu.classList.remove('settings-menu-open');
});

// help
help.addEventListener('click', function() {
  box2.checked = !box2.checked;
});