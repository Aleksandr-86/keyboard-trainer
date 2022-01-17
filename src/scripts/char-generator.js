"use strict";

const btnGenFromSite = document.querySelector('#btn1');
const btnGenFromBuffer = document.querySelector('#btn2');

const charField = document.querySelector('#field');
let currentLine = document.querySelector('.line');

const arrOfStrings = [];
let ind = 0;

// filling the field block with char
const charGenerator = (str, ind) => {

  str = str.trim();
  str = str.replace(/ +/g, ' ');
  let html = '';
  const arrStr = str.split(' ');
  let counter = 0;

  console.log(arrStr);

  for (let i = ind; i < arrStr.length; i++) {
    const arrWord = arrStr[i].split('');
    const wordLen = arrStr[i].length;

    if (currentLine === null) { // the end of the field has been reached

    } else if (arrStr[i] === '\n' && counter > 0) { // the line break character
      currentLine.innerHTML = html;
      html = '';
      currentLine.lastElementChild.remove();
      currentLine.lastElementChild.classList.toggle('line-end');
      // adding spaces till the end of the line
      for (let j = 0; j < (36 - counter); j++) {
        html += `<div class="char"> </div>`;
      }

      currentLine.innerHTML += html;
      html = '';
      currentLine = currentLine.nextElementSibling; // switching focus to the next line
      counter = 0;

    } else if (arrStr[i] === '\n' && counter === 0) { // the line break character && beginning of the line
      // ...
    } else if (wordLen + counter < 35) { // the added word fits into the line
      for (let k = 0; k < arrWord.length; k++) {
        html += `<div class="char">${arrWord[k]}</div>`;
      }
      html += `<div class="char"> </div>`;
      counter = counter + wordLen + 1;
    } else if (wordLen + counter > 35) { // the word being added doesn't fit into the line
      i--;
      currentLine.innerHTML = html;
      html = '';
      currentLine.lastElementChild.remove();
      currentLine.lastElementChild.classList.toggle('line-end');

      // adding spaces till the end of the line
      for (let j = 0; j < (36 - counter); j++) {
        html += `<div class="char"> </div>`;
      }

      currentLine.innerHTML += html;
      html = '';
      currentLine = currentLine.nextElementSibling; // switching focus to the next line
      counter = 0;
    } else if (wordLen + counter === 35) { // end of row sharp
      for (let j = 0; j < wordLen - 1; j++) {
        html += `<div class="char">${arrWord[j]}</div>`;
      }
      html += `<div class="char line-end">${arrWord[wordLen - 1]}</div>`;

      currentLine.innerHTML = html;
      currentLine = currentLine.nextElementSibling; // switching focus to the next line
      html = '';
      counter = 0;
    }
  }
  const firstDiv = document.querySelector('#line1 > .char:first-child');
  firstDiv.classList.toggle('char-caret');
};

// charGenerator(str);

// btnGenFromSite.addEventListener('click', function() {
//   charGenerator(str);
// });
//
btnGenFromBuffer.addEventListener('click', async function() {

  const str = await navigator.clipboard.readText();
  // let str = navigator.clipboard.readText();
  charGenerator(str, ind);
});
