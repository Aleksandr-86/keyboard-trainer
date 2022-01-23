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
  let wordLenMax = 9;
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
      indOfString = i;
      console.log(`1 counter ${counter}, before break ${word}`);
      break;

    } else if (word === '\n' && counter > 0) {
      console.log(2);
      currentLine.lastElementChild.classList.add('line-end');

      for (let j = 0; j < (35 - counter); j++)  // adding spaces till the end of the line
        currentLine.appendChild(createDiv(' '));
      currentLine = currentLine.nextElementSibling;
      counter = 0;

    } else if (word === '\n' && counter === 0) {
      console.log(3);
      currentLine = currentLine.nextElementSibling;

    } else if (wordLen + counter < 35) {
      arrWord.forEach(char => currentLine.appendChild(createDiv(char))); // filling the line with chars
      currentLine.appendChild(createDiv(' '));
      counter = counter + wordLen + 1;

      if (i === arrLen - 1) {
        currentLine.lastElementChild.remove();
      } else if (counter === 35) {
        currentLine.lastElementChild.classList.add('line-end');
        currentLine = currentLine.nextElementSibling;
        counter = 0;
      }
      console.log(`4 counter ${counter}`);

    } else if (wordLen > wordLenMax) {
      // console.log(5);
      let wordPart1 = arrOfStrings[i].slice(0, 35 - counter);
      let wordPart2 = arrOfStrings[i].slice(35 - counter);
      // counter = wordLen % 35;

      let arrWordPart1 = wordPart1.split('');
      arrWordPart1.forEach(char => currentLine.appendChild(createDiv(char))); // filling the line with chars
      currentLine.lastElementChild.classList.add('line-end');
      currentLine = currentLine.nextElementSibling;

      while (wordPart2.length > 35) {
        const tempStr = wordPart2;
        wordPart1 = tempStr.slice(0, 35);
        wordPart2 = tempStr.slice(35);
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
        console.log(`5.1 counter ${counter}`);
      } else {
        const arrWordPart2 = wordPart2.split('');
        arrWordPart2.forEach(char => currentLine.appendChild(createDiv(char))); // filling the line with chars
        currentLine.appendChild(createDiv(' '));
        counter = wordPart2.length + 1;

        console.log(`5.2 counter ${counter}`);
      }

    } else if (wordLen + counter > 34 && wordLen < 35) {
      console.log(`6 ${counter}, word ${word}`);
      i--;
      currentLine.lastElementChild.classList.toggle('line-end');

      for (let j = 0; j < (35 - counter); j++) // adding spaces till the end of the line
        currentLine.appendChild(createDiv(' '));
      currentLine = currentLine.nextElementSibling;
      counter = 0;
    } else {
      console.log('else', word, wordLen);
    }
  }

  document.querySelector('#line1 > :first-child').classList.add('char-caret');
};