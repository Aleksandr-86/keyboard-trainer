import { charInserter, strPreparer } from "/src/scripts/char-inserter.js";
import { keyboard } from "/src/scripts/keyboard.js";
import { getBrowser } from "/src/scripts/browser-detector.js";

// const btnGenFromSite = document.querySelector('#btn1');
const btnGenFromBuffer = document.querySelector('#btn2');


// btnGenFromSite.addEventListener('click', function() {
//   charGenerator(str);
// });
//

btnGenFromBuffer.addEventListener('click', async () => {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {

    // let str2 = '“';

    let str = await navigator.clipboard.readText();
    charInserter(strPreparer(str), 0)
  } else if (br === 'firefox') {
    let str = document.querySelector('#input').value;
    charInserter(strPreparer(str), 0)
  }
});

document.addEventListener('keydown', event => keyboard(event));