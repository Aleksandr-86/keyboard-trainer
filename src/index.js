import { charInserter } from "/src/scripts/char-inserter.js";
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
    console.warn(br);

    let str = await navigator.clipboard.readText();
    str = str.trim();
    str = str.replace(/\r\n/g, ' \n ');
    str = str.replace(/ +/g, ' '); // removing excess spaces
    const arr = str.split(' ');
    charInserter(arr, 0)

  } else if (br === 'firefox') {
    console.warn(br);

    let str = document.querySelector('#input').value;

    str = str.trim();
    str = str.replace(/\r\n/g, ' \n ');
    str = str.replace(/ +/g, ' '); // removing excess spaces
    const arr = str.split(' ');
    charInserter(arr, 0)







    // const { state } = await navigator.permissions.query({
    //   name: "clipboard", access: "full"
    // });

    // switch (state) {
    //   case "granted":
    //     console.log('granted');
    //     break;
    //   case 'prompt':
    //     console.log('prompt');
    //     break;
    //   case "denied":
    //     console.log('denied');
    //     break;
    // }
  }
});

document.addEventListener('keydown', event => keyboard(event));