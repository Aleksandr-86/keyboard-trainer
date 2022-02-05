import {charInserter, strPreparer} from "/src/scripts/char-inserter.js";
import {keyDownHandler} from "/src/scripts/keyboard.js";
import {getBrowser} from "/src/scripts/browser-detector.js";

// const btnGenFromSite = document.querySelector('#btn1');
const fromBuffer = document.querySelector('#buffer');
const statistics = document.querySelector('.statistics');
const overlay = document.querySelector('.overlay');

// btnGenFromSite.addEventListener('click', function() {
// dataCall();
// });

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
    charInserter(strPreparer(str), 0);
  }
});

document.addEventListener('keydown', event => keyDownHandler(event));

overlay.addEventListener('click', function() {
  // shutting down the statistics menu
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
});