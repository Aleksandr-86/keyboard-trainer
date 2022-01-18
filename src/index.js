import { charInserter } from "/src/scripts/char-inserter.js";
import { keyboard } from "/src/scripts/keyboard.js";

// const btnGenFromSite = document.querySelector('#btn1');
const btnGenFromBuffer = document.querySelector('#btn2');

const arrOfStrings = [];
let indOfStr = 0;

// btnGenFromSite.addEventListener('click', function() {
//   charGenerator(str);
// });
//
btnGenFromBuffer.addEventListener('click', async function() {
  let str = await navigator.clipboard.readText();
  str = str.trim();
  str = str.replace(/\r\n/g, ' \n ');
  str = str.replace(/ +/g, ' '); // removing excess spaces
  const arr = str.split(' ');
  console.log(arr);
  charInserter(arr, indOfStr);
});

document.addEventListener('keydown', event => keyboard(event));