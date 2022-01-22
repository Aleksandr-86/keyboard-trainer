"use strict";

export let arrOfStrings;
export let indOfString;

// string => trim => replace Win sign 'next row' => replace excess spaces => array
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
  document.querySelectorAll('.line').forEach(line => line.innerHTML = ''); // clearing lines
  let currentLine = document.querySelector('#line1');
  arrOfStrings = [...arr];
  const arrLen = arrOfStrings.length;
  let html = '';
  let counter = 0;

  for (let i = index; i < arrLen; i++) {
    const word = arrOfStrings[i];
    const wordLen = word.length;
    // const arrWord = arrOfStrings[i].split('');
    const arrWord = [...arrOfStrings[i]];

    if (currentLine === null) { // the end of the field has been reached
      console.warn('1 first');

      indOfString = i;
      break;

    } else if (word === '\n' && counter > 0) { // the line break character
      console.warn('2 second');

      currentLine.lastElementChild.classList.add('line-end');

      for (let j = 0; j < (35 - counter); j++)  // adding spaces till the end of the line
        currentLine.appendChild(createDiv(' '));
      currentLine = currentLine.nextElementSibling; // switching focus to the next line
      counter = 0;

    } else if (word === '\n' && counter === 0) { // the line break character && beginning of the line
      console.warn('3 third');
      currentLine = currentLine.nextElementSibling; // switching focus to the next line

    } else if (wordLen + counter < 35) { // the word being added fits in the line
      console.warn('4 fourth');

      arrWord.forEach(char => currentLine.appendChild(createDiv(char)));
      currentLine.appendChild(createDiv(' '));
      counter = counter + wordLen + 1;

      if (i === arrLen - 1) {
        currentLine.lastElementChild.remove();
      }


    } else if (wordLen >= 35 && counter === 0) { // condition: the word's length is more or equal 35
      console.warn('5 fifth');

      let wordPart1 = arrOfStrings[i].slice(0, 35);
      let wordPart2 = arrOfStrings[i].slice(35);

      let arrWordPart1 = wordPart1.split('');
      arrWordPart1.forEach(char => currentLine.appendChild(createDiv(char)));
      currentLine.lastElementChild.classList.add('line-end');
      currentLine = currentLine.nextElementSibling; // switching focus to the next line

      while (wordPart2.length > 35) {
        const tempStr = wordPart2;

        wordPart1 = tempStr.slice(0, 35);
        wordPart2 = tempStr.slice(35);
        arrWordPart1 = wordPart1.split('');

        arrWordPart1.forEach(char => currentLine.appendChild(createDiv(char)));
        currentLine.lastElementChild.classList.add('line-end');
        currentLine = currentLine.nextElementSibling; // switching focus to the next line
        if (!currentLine) break;
      }

      if (!currentLine) {
        arrOfStrings[i] = wordPart2;
        i--;
      } else {
        const arrWordPart2 = wordPart2.split('');
        arrWordPart2.forEach(char => currentLine.appendChild(createDiv(char)));
        if (i !== arrLen - 1 && wordPart2.length !== 35) currentLine.appendChild(createDiv(' '));
        counter = counter + arrWordPart2.length + 1;
      }
    } else if (wordLen + counter >= 35) { // the word being added doesn't fit into the line
      console.warn('6 sixth');

      i--;
      currentLine.appendChild(createDiv(' '));
      currentLine.lastElementChild.remove();
      currentLine.lastElementChild.classList.toggle('line-end');

      for (let j = 0; j < (35 - counter); j++) // adding spaces till the end of the line
        currentLine.appendChild(createDiv(' '));
      currentLine = currentLine.nextElementSibling; // switching focus to the next line
      counter = 0;
    }
  }

  document.querySelector('#line1 > :first-child').classList.add('char-caret');
};