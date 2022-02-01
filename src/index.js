import {charInserter, strPreparer} from "/src/scripts/char-inserter.js";
import {keyboard} from "/src/scripts/keyboard.js";
import {getBrowser} from "/src/scripts/browser-detector.js";


// const btnGenFromSite = document.querySelector('#btn1');
const btnGenFromBuffer = document.querySelector('#btn2');

// btnGenFromSite.addEventListener('click', function() {
  // dataCall();
// });

  const str = 'And also he wanted to get away for a time from Mr. Peeve. The very streets were becoming a torment to him, he wanted never to see a newspaper or a newspaper placard again. He was obsessed by apprehensions of some sort\n' +
    'of financial and economic smash that would make the Great War seem a mere incidental catastrophe. This was\n' +
    'because he was sub−editor and general factotum of the Liberal, that well−known organ of the more depressing\n' +
    'aspects of advanced thought, and the unvarying pessimism of Mr. Peeve, his chief, was infecting him more and\n' +
    'more. Formerly it had been possible to put up a sort of resistance to Mr. Peeve by joking furtively about his gloom\n' +
    'with the other members of the staff, but now there were no other members of the staff: they had all been\n' +
    'retrenched by Mr. Peeve in a mood of financial despondency. Practically, now, nobody wrote regularly for the\n' +
    'Liberal except Mr. Barnstaple and Mr. Peeve. So Mr. Peeve had it all his own way with Mr. Barnstaple. He would'

charInserter(strPreparer(str), 0);
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
