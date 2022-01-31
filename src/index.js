import {charInserter, strPreparer} from "/src/scripts/char-inserter.js";
import {keyboard} from "/src/scripts/keyboard.js";
import {getBrowser} from "/src/scripts/browser-detector.js";


// const btnGenFromSite = document.querySelector('#btn1');
const btnGenFromBuffer = document.querySelector('#btn2');

// btnGenFromSite.addEventListener('click', function() {
  // dataCall();
// });

  const str = 'There’s our black and white effect. Let’s start from the beginning of our code because it’s a little bit complex. Using the function we store in a variable img our image and we’ll be able to access every single pixel by storing the data array in the pix variable. Then we use a for statement to loop through each pixel, and through each value of a single pixel. As described before, every pixel has four values: red, green, blue and alpha'

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
