import { arrOfStrings, charInserter, indOfString } from "/src/scripts/char-inserter.js";

"use strict";

// checking if CapsLock key is active
// const capsLockState = event.getModifierState && event.getModifierState('CapsLock');
// console.log(capsLockState);
// skipping special keys

const wrongKeyHandler = function(caret) {
  let test = /[0-9 A-ZА-ЯЁ.,<>\/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(caret.textContent);
  caret.classList.toggle('char-caret');
  while (!test) {
    caret.classList.toggle('char-neutral');
    if (caret.classList.contains('line-end') && caret.parentElement.nextElementSibling === null) {
      document.querySelectorAll('.line').forEach(line => line.innerHTML = ''); // clearing lines
      charInserter(arrOfStrings, indOfString);
      caret = document.querySelector('.char-caret');
      caret.classList.toggle('char-caret');
    } else if (caret.classList.contains('line-end')) { // line-end condition
      // caret.classList.toggle('char-caret');
      if (caret.nextElementSibling !== null) {
        const curLine = caret.parentElement;
        curLine.querySelectorAll('div[class="char"]').forEach(char => char.classList.add('char-correct'));
      }
      caret = caret.parentElement.nextElementSibling.firstChild; // switching lines
    } else {
      caret = caret.nextElementSibling; // moving the caret to the next char
    }

    if (caret.textContent === ' ') {
      caret.classList.toggle('char-neutral');
      caret = caret.nextSibling;
    }
    test = /[0-9 A-ZА-ЯЁ.,<>\/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(caret.textContent);
  }
  // console.log(caret.previousNode());


  // if (caret.textContent === ' ' && caret.previousSibling) console.log('sdfsdf');
  // caret.classList.toggle('char-neutral');
  // caret = caret.nextElementSibling; // moving the caret to the next char

  // if (caret.previousSibling)

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
        caret.classList.toggle('char-correct');
      } else {
        caret.classList.toggle('char-wrong');
      }

      // end of the lines and line-end condition
      if (caret.classList.contains('line-end') && caret.parentElement.nextElementSibling === null) {
        document.querySelectorAll('.line').forEach(line => line.innerHTML = ''); // clearing lines
        charInserter(arrOfStrings, indOfString);

      } else if (caret.classList.contains('line-end')) { // line-end condition
        caret.classList.toggle('char-caret');
        // const index = [...caret.parentElement.childNodes].indexOf(caret);
        if (caret.nextElementSibling !== null) {
          const curLine = caret.parentElement;
          curLine.querySelectorAll('div[class="char"]').forEach(char => char.classList.add('char-correct'));
        }
        caret = caret.parentElement.nextElementSibling.firstChild; // switching lines
        wrongKeyHandler(caret);
      } else if (caret.id === 'char-last') {

        // choosing all the char elements
        document.querySelectorAll('.char-correct, .char-wrong').forEach(div => div.className = 'char-target');
        caret = document.querySelector('#char-first');
      } else { // regular condition
        // console.log(`condition ${caret.textContent}`);
        caret.classList.toggle('char-caret');
        caret = caret.nextElementSibling; // moving the caret to the next char
        wrongKeyHandler(caret);
      }
      caret.classList.toggle('char-caret');
    }

    // releasing the key
    document.body.addEventListener('keyup', event => {
      const btnUp = document.querySelector(`#${event.code.toLowerCase()}`);
      if (btnDn === btnUp) setTimeout(() => {
        btnUp.className = 'button-up';
      }, 100);
    });
  } catch (error) {
    // console.error(`${error.name}: ${error.message}`);
  }
};