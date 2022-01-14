"use strict";

const charGenBtn = document.querySelector('#btn');
const field = document.querySelector('#field');

// on press button #btn
charGenBtn.addEventListener('click', function() {
  const str = 'Всё дело в доме. В Самом Начале он уселся в очень удачном доме, крупноблочном и просто сказочно расположенном. Главное же, чем дом отличался от рядом';
  // const str = 'Всё дело в доме. В Самом начал';
// create content for html
//   const html = str.split('').reduce((acc, cur) => acc + `<div class="char-target">${cur}</div>`, '');
  let html = '';
  const arrStr = str.split(' ');
  let counter = 0;
  for (let i = 0; i < arrStr.length; i++) {
    const arrWord = arrStr[i].split('');
    const wordLen = arrStr[i].length;

    if (wordLen + counter === 35) {
      console.log('first');
      for (let k = 0; k < arrWord.length; k++) {
        html += `<div class="char-target">${arrWord[k]}</div>`;
      }
      counter = 0;
    } else if (wordLen + counter > 35) {
      console.log('second');

      // adding spaces till the end of the line
      for (let j = 0; j < (35 - counter); j++) {
        html += `<div class="char-target"> </div>`;
      }
      i -= 1;
      counter = 0;
    } else {
      console.log('third');

      for (let k = 0; k < arrWord.length; k++) {
        html += `<div class="char-target">${arrWord[k]}</div>`;
      }
      html += `<div class="char-target"> </div>`;
      counter = counter + wordLen + 1;
    }
  }

  field.innerHTML = html;

  const firstDiv = document.querySelector('.char-target:first-child');
  firstDiv.className = 'char-caret';
  firstDiv.id = 'char-first';

  const lastDiv = document.querySelector('.char-target:last-child');
  lastDiv.id = 'char-last';

});