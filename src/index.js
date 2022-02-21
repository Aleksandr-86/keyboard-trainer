import {charInserter} from "/src/scripts/char-inserter.js";
import {getBrowser, strPreparer} from "/src/scripts/functions.js";
import {keyDownHandler, clearCounters} from "/src/scripts/keyboard.js";


// const btnGenFromSite = document.querySelector('#btn1');
const fingerPointers = document.querySelector('.finger-pointers');
const field = document.querySelector('.field');
const keyboard = document.querySelector('.keyboard');
const buffer = document.querySelector('#buffer');
const statistics = document.querySelector('.statistics');
const statisticsClose = document.querySelector('.statistics-close');
const overlay = document.querySelector('.overlay');

// adding text from a buffer
buffer.addEventListener('click', async function() {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText();
    if (str.length === 1 && str === ' ') return; // buffer is empty
    buffer.blur(); // removing focus from an element
    // clearing finger pointers
    fingerPointers.querySelectorAll('*').forEach(elem => elem.classList.add('pointer-disabled'));
    clearCounters();
    charInserter(strPreparer(str), 0);
    fingerPointers.classList.remove('hidden');
    field.classList.remove('hidden');
    keyboard.classList.remove('hidden');
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