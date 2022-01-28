import {charInserter, strPreparer} from "/src/scripts/char-inserter.js";
import {keyboard} from "/src/scripts/keyboard.js";
import {getBrowser} from "/src/scripts/browser-detector.js";


const btnGenFromSite = document.querySelector('#btn1');
const btnGenFromBuffer = document.querySelector('#btn2');

btnGenFromSite.addEventListener('click', function() {
  dataCall();
});


const HTML = 'https://www.litmir.me/br/?b=252058&p=1'


btnGenFromBuffer.addEventListener('click', async function() {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText();
    charInserter(strPreparer(str), 0);
  } else if (br === 'firefox') {
    let str = document.querySelector('#input').value;
    charInserter(strPreparer(str), 0);
  }
});

document.addEventListener('keydown', event => keyboard(event));
