import { charInserter } from "/src/scripts/char-inserter.js";

// const btnGenFromSite = document.querySelector('#btn1');
const btnGenFromBuffer = document.querySelector('#btn2');

const arrOfStrings = [];
let indOfStr = 0;

// btnGenFromSite.addEventListener('click', function() {
//   charGenerator(str);
// });
//
btnGenFromBuffer.addEventListener('click', async function() {
  const str = await navigator.clipboard.readText();
  charInserter(str, indOfStr);
});
