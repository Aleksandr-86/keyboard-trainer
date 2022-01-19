import { charInserter } from "/src/scripts/char-inserter.js";
import { keyboard } from "/src/scripts/keyboard.js";
import { getBrowser } from "/src/scripts/browser-detector.js";

// const btnGenFromSite = document.querySelector('#btn1');
const btnGenFromBuffer = document.querySelector('#btn2');

// export let arrOfStrings;

// btnGenFromSite.addEventListener('click', function() {
//   charGenerator(str);
// });
//
btnGenFromBuffer.addEventListener('click', () => {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {
    console.warn(br);

    navigator.clipboard.readText().then(result => charInserter(result, 0));
  } else if (br === 'firefox') {
    console.warn(br);

    const str = document.querySelector('#input').value;
    console.log(str);
    charInserter(str, 0);


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