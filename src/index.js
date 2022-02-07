import {charInserter, strPreparer} from "/src/scripts/char-inserter.js";
import {keyDownHandler} from "/src/scripts/keyboard.js";
import {getBrowser} from "/src/scripts/browser-detector.js";

// const btnGenFromSite = document.querySelector('#btn1');
const fromBuffer = document.querySelector('#buffer');
const statistics = document.querySelector('.statistics');
const statisticsClose = document.querySelector('.statistics-close');
const overlay = document.querySelector('.overlay');


// adding text from a buffer
fromBuffer.addEventListener('click', async function() {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText();
    charInserter(strPreparer(str), 0);
    document.querySelector('.field').classList.remove('hidden');
    document.querySelector('.keyboard').classList.remove('hidden');

  } else if (br === 'firefox') {
    let str = document.querySelector('#input').value;
    // inStrNum = str.length;
    charInserter(strPreparer(str), 0);
  }
});

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