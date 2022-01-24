import { wrongKeyHandler } from "/src/scripts/keyboard.js";

"use strict";

export let arrOfStrings;
export let indOfString;

// trim, remove \r and excess spaces => array
export const strPreparer = str => str.trim().replace(/\r\n/g, ' \n ').replace(/ +/g, ' ').split(' ');

// create and return div element with char in it
const createDiv = function(char) {
  const container = document.createElement('div');
  container.className = 'char';
  container.textContent = char;
  return container;
};

// filling the field block with char
export const charInserter = function(arr, index) {
  arrOfStrings = [...arr];
  const arrLen = arrOfStrings.length;
  // the maximum length of a word that will not be carried over to the next line
  let wordLenMax = 10;
  const lineLen = 35;
  if (wordLenMax > lineLen) wordLenMax = lineLen;
  let counter = 0;

  document.querySelectorAll('.line').forEach(line => line.innerHTML = ''); // clearing lines
  let currentLine = document.querySelector('#line1');

  for (let i = index; i < arrLen; i++) {
    const word = arrOfStrings[i];
    const wordLen = word.length;
    const arrWord = [...arrOfStrings[i]];

    if (currentLine === null) {
      console.log('0');
      indOfString = i;
      break;
    } else if (word === '\n' && counter > 0) {
      console.log(`1 counter ${counter}`);

      currentLine.lastElementChild.classList.add('line-end');

      for (let j = 0; j < (lineLen - counter); j++)  // adding spaces till the end of the line
        currentLine.appendChild(createDiv(' '));
      currentLine = currentLine.nextElementSibling;
      counter = 0;
    } else if (word === '\n' && counter === 0) {
      // ...
    } else if (wordLen + counter < lineLen) {
      console.log('3');

      arrWord.forEach(char => currentLine.appendChild(createDiv(char))); // filling the line with chars
      currentLine.appendChild(createDiv(' '));
      counter = counter + wordLen + 1;

      if (counter === lineLen) {
        currentLine.lastElementChild.classList.add('line-end');
        if (i !== arrLen - 1) currentLine = currentLine.nextElementSibling;
        counter = 0;
      }
    } else if (wordLen > wordLenMax) {
      console.log('4');

      let wordPart1 = arrOfStrings[i].slice(0, lineLen - counter);
      let wordPart2 = arrOfStrings[i].slice(lineLen - counter);

      let arrWordPart1 = wordPart1.split('');
      arrWordPart1.forEach(char => currentLine.appendChild(createDiv(char))); // filling the line with chars
      currentLine.lastElementChild.classList.add('line-end');
      // if (i === arrLen - 1 && wordPart2.length !== 0) currentLine = currentLine.nextElementSibling;
      if (i !== arrLen - 1) currentLine = currentLine.nextElementSibling;
      // if (wordPart2.length !== 0) currentLine = currentLine.nextElementSibling;
      // currentLine = currentLine.nextElementSibling;

      while (wordPart2.length > lineLen) {
        const tempStr = wordPart2;
        wordPart1 = tempStr.slice(0, lineLen);
        wordPart2 = tempStr.slice(lineLen);
        arrWordPart1 = wordPart1.split('');

        arrWordPart1.forEach(char => currentLine.appendChild(createDiv(char))); // filling the line with chars
        currentLine.lastElementChild.classList.add('line-end');
        currentLine = currentLine.nextElementSibling;
        if (!currentLine) break;
      }

      if (!currentLine) {
        if (wordPart2.length !== 0) {
          arrOfStrings[i] = wordPart2;
          i--;
        }
        counter = 0;
      } else {

        if (wordPart2.length === lineLen) {
          const arrWordPart2 = wordPart2.split('');
          arrWordPart2.forEach(char => currentLine.appendChild(createDiv(char))); // filling the line with chars
          currentLine.lastElementChild.classList.add('line-end');
          if (i !== arrLen - 1) currentLine = currentLine.nextElementSibling;
          counter = 0;
          console.log('sdfsdfdsfsdf', currentLine);
        } else if (wordPart2.length > 0) {
          const arrWordPart2 = wordPart2.split('');
          arrWordPart2.forEach(char => currentLine.appendChild(createDiv(char))); // filling the line with chars
          currentLine.appendChild(createDiv(' '));
          counter = wordPart2.length + 1;
        } else {
          counter = 0;
        }
      }
      console.log('44444444444444', currentLine);
    } else if ((wordLen + counter) > (lineLen - 1) && wordLen < lineLen) {
      console.log('5');

      i--;
      currentLine.lastElementChild.classList.toggle('line-end');

      for (let j = 0; j < (lineLen - counter); j++) // adding spaces till the end of the line
        currentLine.appendChild(createDiv(' '));
      currentLine = currentLine.nextElementSibling;
      counter = 0;
    }

    if (i === arrLen - 1) { // marking the end of typing
      const lastElem = currentLine.lastElementChild;
      if (lastElem.textContent === ' ') lastElem.remove();
      currentLine.lastElementChild.classList.add('finish');
    }
  }

  const firstElem = document.querySelector('#line1 > :first-child');
  firstElem.classList.add('char-caret');
  wrongKeyHandler(firstElem);
};