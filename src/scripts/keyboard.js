import { arrOfStrings, charInserter, indOfString } from "/src/scripts/char-inserter.js";

"use strict";

// checking if CapsLock key is active
// const capsLockState = event.getModifierState && event.getModifierState('CapsLock');
// console.log(capsLockState);
// skipping special keys

// returns false if a char is inappropriate
// const charTest = char => /[0-9 A-ZА-ЯЁ.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(char);
const charTest = char => /[ A-ZА-ЯЁ.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(char);


// skipping inappropriate chars and a space after them (due a certain condition)
const wrongKeyHandler = function(caret) {
  let test = charTest(caret.textContent);
  caret.classList.remove('char-caret');

  while (!test) {
    caret.classList.add('char-neutral');

    if (caret.classList.contains('line-end') && !caret.parentElement.nextElementSibling) {
      charInserter(arrOfStrings, indOfString); // filling all the lines
    } else if (caret.classList.contains('line-end')) {
      caret = caret.parentElement.nextElementSibling.firstElementChild;
    } else {
      if (caret !== caret.parentElement.firstElementChild &&
        caret.previousElementSibling.textContent === ' ' &&
        caret.nextElementSibling.textContent === ' ') {
        caret = caret.nextElementSibling;
        if (caret.classList.contains('line-end')) {
          caret.parentElement
            .querySelectorAll('div[class="char"], div[class="char line-end"]')
            .forEach(div => div.classList.add('char-correct'));
          caret = caret.parentElement.nextElementSibling.firstElementChild;
        }
        caret.classList.add('char-neutral');
      }
      caret = caret.nextElementSibling;
    }

    test = charTest(caret.textContent);
  }

  // caret.classList.toggle('char-caret');
  caret.classList.add('char-caret');
};


// keydown
export const keyboard = function(event) {
  event.preventDefault();

// selecting the first element of the first line
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

      // coloring the char's background depending on the pressed key
      if (eKey === targetChar) {
        caret.classList.add('char-correct');
      } else {
        caret.classList.toggle('char-wrong');
      }

      if (caret.classList.contains('finish')) { // the end
        caret.classList.remove('char-caret');
        console.log('конец');
      } else if (caret.classList.contains('line-end') && caret.parentElement.nextElementSibling === null) {
        charInserter(arrOfStrings, indOfString);
        caret = document.querySelector('.char-caret');
        wrongKeyHandler(caret);
      } else if (caret.classList.contains('line-end')) {
        caret.classList.toggle('char-caret');

        if (caret.nextElementSibling !== null) {
          const curLine = caret.parentElement;
          curLine.querySelectorAll('div[class="char"]').forEach(char => char.classList.add('char-correct'));
        }

        caret = caret.parentElement.nextElementSibling.firstChild;
        wrongKeyHandler(caret);
      } else {
        caret.classList.remove('char-caret');
        caret = caret.nextElementSibling;
        wrongKeyHandler(caret);
      }
      // caret.classList.add('char-caret');
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
    console.error(error);
  }
};