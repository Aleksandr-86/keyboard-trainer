"use strict";

// filling the field block with char
export const charInserter = (arr, index) => {
  let currentLine = document.querySelector('#line1');

  let html = '';
  let counter = 0;

  for (let i = index; i < arr.length; i++) {
    const arrWord = arr[i].split('');
    const wordLen = arr[i].length;

    if (currentLine === null) { // the end of the field has been reached
      console.warn('1');


    } else if (wordLen > 35 && counter === 0) {
      console.warn('2');
      let tempStr = arr[i]
      console.log(tempStr.slice(0, 35));
      console.log(tempStr.slice(35));


    } else if (arr[i] === '\n' && counter > 0) { // the line break character
      console.warn('3');
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


    } else if (arr[i] === '\n' && counter === 0) { // the line break character && beginning of the line
      // ...
      console.warn('4');

    } else if (wordLen + counter < 35) { // the added word fits into the line
      console.warn('5');
      for (let k = 0; k < wordLen; k++) {
        html += `<div class="char">${arrWord[k]}</div>`;
      }
      html += `<div class="char"> </div>`;
      counter = counter + wordLen + 1;


    } else if (wordLen + counter > 35) { // the word being added doesn't fit into the line
      console.warn('6');
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
      console.warn('7');
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