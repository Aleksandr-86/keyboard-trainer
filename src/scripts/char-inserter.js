"use strict";

export let arrOfStrings;
export let indOfString;

// string => prepare => array
export const strPreparer = str => {
  str = str.trim();
  str = str.replace(/\r\n/g, ' \n ');
  str = str.replace(/ +/g, ' '); // removing excess spaces
  return str.split(' ');
};

// create and return div element with char in it
const createDiv = char => {
  const container = document.createElement('div');
  container.className = 'char';
  container.textContent = char;
  return container;
};

// filling the field block with char
export const charInserter = (arr, index) => {
  let currentLine = document.querySelector('#line1');

  arrOfStrings = [...arr];
  const arrLen = arrOfStrings.length;
  let html = '';
  let counter = 0;

  for (let i = index; i < arrLen; i++) {
    const word = arrOfStrings[i];
    const wordLen = word.length;
    const arrWord = arrOfStrings[i].split('');

    if (currentLine === null) { // the end of the field has been reached
      console.warn('1 first');
      indOfString = i;
      break;

    } else if (word === '\n' && counter > 0) { // the line break character
      console.warn('2 second');
      currentLine.innerHTML = html;
      html = '';
      currentLine.lastElementChild.remove();
      currentLine.lastElementChild.classList.toggle('line-end');

      for (let j = 0; j < (36 - counter); j++)  // adding spaces till the end of the line
        currentLine.innerHTML += `<div class="char"> </div>`;
      currentLine = currentLine.nextElementSibling; // switching focus to the next line
      counter = 0;

    } else if (word === '\n' && counter === 0) { // the line break character && beginning of the line
      // ...
      console.warn('3 third');

    } else if (wordLen + counter < 35) { // the word being added fits in the line
      console.warn('4 fourth');

      arrWord.forEach(char => currentLine.appendChild(createDiv(char)));
      currentLine.appendChild(createDiv(' '));
      counter = counter + wordLen + 1;

      // if (i === arrLen - 1) {
      //   currentLine.lastElementChild.remove();
      // }


    } else if (wordLen >= 35 && counter === 0) {
      console.warn('7 seventh');

      let tempStr = arrOfStrings[i];
      let tempStrLen = arrOfStrings[i].length;

      if (tempStrLen > 35) {
        const tempStrPart1 = tempStr.slice(0, 35);
        const tempStrPart2 = tempStr.slice(35);
        console.log(tempStrPart1);
        console.log(tempStrPart2);

        for (let k = 0; k < tempStrPart1.length; k++)
          currentLine.innerHTML += `<div class="char">${tempStrPart1[k]}</div>`;
        currentLine = currentLine.nextElementSibling; // switching focus to the next line

        for (let k = 0; k < tempStrPart2.length; k++)
          html += `<div class="char">${tempStrPart2[k]}</div>`;
        html += `<div class="char"> </div>`;

      } else {

        // for (let k = 0; k < wordLen; k++) {
        //   html += `<div class="char">${arrWord[k]}</div>`;
        // }
      }


    } else if (wordLen + counter >= 35) { // the word being added doesn't fit into the line
      console.warn('5 fifth');
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