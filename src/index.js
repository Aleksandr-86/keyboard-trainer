import {charInserter} from "/src/scripts/char-inserter.js";
import {getBrowser, strPreparer} from "/src/scripts/functions.js";
import {keyDownHandler} from "/src/scripts/keyboard.js";

// const btnGenFromSite = document.querySelector('#btn1');
const fromBuffer = document.querySelector('#buffer');
const statistics = document.querySelector('.statistics');
const statisticsClose = document.querySelector('.statistics-close');
const overlay = document.querySelector('.overlay');
console.warn('index.js')

let bKeyboard = false;

// shutting down the statistics menu
function shutDnStat() {
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
  bKeyboard = false;
}

// adding text from a buffer
fromBuffer.addEventListener('click', async function() {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText();
    charInserter(strPreparer(str), 0);
    document.querySelector('.field').classList.remove('hidden');
    document.querySelector('.keyboard').classList.remove('hidden');
    bKeyboard = true;
  } else if (br === 'firefox') {
    let str = document.querySelector('#input').value;
    charInserter(strPreparer(str), 0);
  }
});

// handling keyboard events
document.addEventListener('keydown', function(event) {
  const eKey = event.key;
  if (!statistics.classList.contains('hidden') && (eKey === 'Escape' || eKey === 'Enter')) {
    event.preventDefault();
    statistics.classList.add('hidden');
    overlay.classList.add('hidden');
    bKeyboard = false;
  }
  if (bKeyboard) keyDownHandler(event);
});

// shutting down the statistics menu
statisticsClose.addEventListener('click', function() {
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
  bKeyboard = false;
});
overlay.addEventListener('click', function() {
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
  bKeyboard = false;
});