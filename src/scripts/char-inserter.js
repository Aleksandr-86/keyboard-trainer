import {charHandler, charTest} from "/src/scripts/keyboard.js";

"use strict";

export let arrOfStrings;
export let indOfString;

// trim, remove \r and excess spaces => array
export const strPreparer = str => str.trim().replace(/(\n)|(\r\n)/g, ' \n ').replace(/ +/g, ' ').split(' ');

// create and return div element with char in it
const createDiv = function(char) {
  const container = document.createElement('div');
  container.className = 'char';
  container.textContent = char;
  if (!charTest(container.textContent)) container.classList.add('char-neutral-inactive');
  return container;
};

// filling the field block with char
export const charInserter = function(arr, index) {
  arrOfStrings = [...arr];
  const arrLen = arrOfStrings.length;
  // the maximum length of a word that will not be carried over to the next line
  let wordLenMax = 10;
  const lineLen = 35;
  if (wordLenMax >= lineLen) wordLenMax = lineLen - 1;
  let counter = 0;

  document.querySelectorAll('.line').forEach(line => line.innerHTML = ''); // clearing lines
  let currentLine = document.querySelector('#line1');

  for (let i = index; i < arrLen; i++) {
    const word = arrOfStrings[i];
    const wordLen = word.length;
    const arrWord = [...arrOfStrings[i]];

    if (currentLine === null) {
      indOfString = i;
      break;
    } else if (word === '\n' && counter > 0) {
      currentLine.lastElementChild.classList.add('line-end');
      for (let j = 0; j < (lineLen - counter); j++)  // adding spaces till the end of the line
        currentLine.appendChild(createDiv(' '));
      currentLine = currentLine.nextElementSibling;
      counter = 0;
    } else if (word === '\n' && counter === 0) {
      // ...
    } else if (wordLen + counter < lineLen) {
      arrWord.forEach(char => currentLine.appendChild(createDiv(char)));
      if (i !== arrLen - 1) {
        currentLine.appendChild(createDiv(' '));
        counter++;
      }
      counter = counter + wordLen;
    } else if (wordLen > wordLenMax && (wordLen + counter > lineLen || (counter === 0 && wordLen === lineLen))) {
      let wordPart1 = arrOfStrings[i].slice(0, lineLen - counter);
      let wordPart2 = arrOfStrings[i].slice(lineLen - counter);

      wordPart1.split('').forEach(char => currentLine.appendChild(createDiv(char)));
      currentLine.lastElementChild.classList.add('line-end');
      counter = 0;

      if (wordPart2.length > lineLen) {
        arrOfStrings[i] = wordPart2;
        i--;
        counter = 0;
        currentLine = currentLine.nextElementSibling;
      } else if (wordPart2.length === lineLen) {
        currentLine = currentLine.nextElementSibling;
        wordPart2.split('').forEach(char => currentLine.appendChild(createDiv(char)));
        currentLine.lastElementChild.classList.add('line-end');
        if (i !== arrLen - 1) currentLine = currentLine.nextElementSibling;
        counter = 0;
      } else if (wordPart2.length === 0) {
        if (i !== arrLen - 1) {
          currentLine = currentLine.nextElementSibling;
          counter = 0;
        }
      } else {
        currentLine = currentLine.nextElementSibling;
        if (!currentLine) {
          arrOfStrings[i] = wordPart2;
          i--;
          counter = 0;
        } else {
          wordPart2.split('').forEach(char => currentLine.appendChild(createDiv(char)));
          if (i !== arrLen - 1) {
            currentLine.appendChild(createDiv(' '));
            counter++;
          }
          counter = counter + wordPart2.length;
        }
      }
    } else {
      i--;
      currentLine.lastElementChild.classList.toggle('line-end');

      for (let j = 0; j < (lineLen - counter); j++) // adding spaces till the end of the line
        currentLine.appendChild(createDiv(' '));
      currentLine = currentLine.nextElementSibling;
      counter = 0;
    }

    if (i === arrLen - 1) { // marking the end of typing
      currentLine.lastElementChild.classList.add('finish');
      console.warn(counter)

      if (counter !== 0) for (let j = 0; j < (lineLen - counter); j++)  // adding spaces till the end of the line
        currentLine.appendChild(createDiv(' '));

      if (currentLine) currentLine = currentLine.nextElementSibling;

      while (currentLine) {
        for (let j = 0; j < lineLen; j++)  // adding spaces till the end of the line
          currentLine.appendChild(createDiv(' '));
        currentLine = currentLine.nextElementSibling;

      }

    }
  }

  const firstElem = document.querySelector('#line1 > :first-child');
  firstElem.classList.add('char-caret');
  charHandler(firstElem);
};