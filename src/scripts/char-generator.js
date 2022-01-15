"use strict";

const charGenBtn = document.querySelector('#btn');
const field = document.querySelector('#field');
let currentLine = document.querySelector('.line');


// on press button #btn
charGenBtn.addEventListener('click', function() {
  const str = 'Всё дело в доме. В Самом Нача 12345 он уселся в очень удачном доме, крупноблочном и просто сказочно расположенном. Главное же, чем дом отличался от рядом стоящих это сква 234';

// create content for html
  let html = '';
  const arrStr = str.split(' ');
  let counter = 0;


  for (let i = 0; i < arrStr.length; i++) {
    const arrWord = arrStr[i].split('');
    const wordLen = arrStr[i].length;

    if (wordLen + counter === 35) {
      console.warn('first');
      for (let j = 0; j < wordLen; j++) {
        html += `<div class="char-target">${arrWord[j]}</div>`;
      }
      // currentLine.querySelector('.char-target:last-child').style.background = 'red';

      // console.log(currentLine.lastElementChild.textContent);

      currentLine.innerHTML = html;
      // currentLine.lastElementChild.classList.toggle('line-end');
      currentLine.lastElementChild.style.background = 'red';
      currentLine = currentLine.nextElementSibling; // switching to the next line
      html = '';
      counter = 0;

    } else if (wordLen + counter > 35) {
      console.warn('second');
      // adding spaces till the end of the line
      for (let j = 0; j < (35 - counter); j++) {
        html += `<div class="char-target"> </div>`;
      }
      i--;
      currentLine.innerHTML = html;
      currentLine = currentLine.nextElementSibling; // switching to the next line
      html = '';
      counter = 0;
      // } else if (i === arrStr.length - 1) {
    } else if (currentLine === null) {
      console.warn('third');
      console.log(arrStr[i]);
    } else {
      console.warn('fifth');
      for (let k = 0; k < arrWord.length; k++) {
        html += `<div class="char-target">${arrWord[k]}</div>`;
      }
      html += `<div class="char-target"> </div>`;
      counter = counter + wordLen + 1;
    }
  }


// const firstDiv = document.querySelector('.char-target:first-child');
  const firstDiv = document.querySelector('#line1 > .char-target:first-child');
  firstDiv.className = 'char-caret';
  firstDiv.id = 'char-first';

// const lastDiv = document.querySelector('.char-target:last-child');
// lastDiv.id = 'char-last';

})
;