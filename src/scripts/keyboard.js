import { arrOfStrings, charInserter, indOfString } from "/src/scripts/char-inserter.js";

"use strict";

// checking if CapsLock key is active
// const capsLockState = event.getModifierState && event.getModifierState('CapsLock');
// console.log(capsLockState);
// skipping special keys

// testing a char for compliance
const charTest = char => /[0-9 A-ZА-ЯЁ.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(char);


// skipping inappropriate chars and a space after them (due a certain condition)
const wrongKeyHandler = function(caret) {
  let test = charTest(caret.textContent);
  caret.classList.add('char-caret');

  while (!test) {
    caret.classList.add('char-neutral');

    // condition: end of the line, and it's a last line
    if (caret.classList.contains('line-end') && caret.parentElement.nextElementSibling === null) {
      document.querySelectorAll('.line').forEach(line => line.innerHTML = ''); // clearing the line
      charInserter(arrOfStrings, indOfString); // filling all the lines
      caret = document.querySelector('.char-caret');
      caret.classList.toggle('char-caret');
    } else if (caret.classList.contains('line-end')) { // condition: the end of the line
      caret = caret.parentElement.nextElementSibling.firstChild; // switching lines
    } else {
      caret = caret.nextElementSibling; // moving the caret to the next char
    }

    if (caret.textContent === ' ') {
      caret.classList.add('char-neutral');
      caret = caret.nextSibling;
    }

    test = charTest(caret.textContent);
  }

  caret.classList.toggle('char-caret');
};


// keydown
export const keyboard = function(event) {
  event.preventDefault();

// selecting the first element of <span line1>
  let caret = document.querySelector('.char-caret');

  try {
    const btnDn = document.querySelector(`#${event.code.toLowerCase()}`);
    let eKey = event.key;
    let targetChar = caret.textContent;

    if (eKey === 'Backspace' || eKey === 'Tab' || eKey === 'CapsLock' || eKey === 'Enter' || eKey === 'Shift'
      || eKey === 'Control' || eKey === 'Os' || eKey === 'Alt' || eKey === 'ContexMenu') {
      btnDn.className = 'button-dn1';
    } else {
      btnDn.className = 'button-dn2';

      // setting case-insensitive matching
      eKey = eKey.toLowerCase();
      targetChar = targetChar.toLowerCase();

      // marking the char depending on the pressed key
      if (eKey === targetChar) {
        caret.classList.add('char-correct');
      } else {
        caret.classList.toggle('char-wrong');
      }

      // condition: end of the lines and line-end
      if (caret.classList.contains('line-end') && caret.parentElement.nextElementSibling === null) {
        document.querySelectorAll('.line').forEach(line => line.innerHTML = ''); // clearing lines
        charInserter(arrOfStrings, indOfString);
        caret = document.querySelector('.char-caret');
        wrongKeyHandler(caret);
      } else if (caret.classList.contains('line-end')) { // condition: line-end
        caret.classList.toggle('char-caret');
        // const index = [...caret.parentElement.childNodes].indexOf(caret);
        if (caret.nextElementSibling !== null) {
          const curLine = caret.parentElement;
          curLine.querySelectorAll('div[class="char"]').forEach(char => char.classList.add('char-correct'));
        }
        caret = caret.parentElement.nextElementSibling.firstChild; // switching lines
        wrongKeyHandler(caret);
      } else { // regular condition
        caret.classList.toggle('char-caret');
        caret = caret.nextElementSibling; // moving the caret to the next char
        wrongKeyHandler(caret);
      }
      caret.classList.toggle('char-caret');
    }

    // releasing the key
    document.body.addEventListener('keyup', function(event) {
      const btnUp = document.querySelector(`#${event.code.toLowerCase()}`);
      if (btnDn === btnUp) setTimeout(() => {
        btnUp.className = 'button-up';
      }, 100);
    });
  } catch (error) {
    // console.error(`${error.name}: ${error.message}`);
  }
};