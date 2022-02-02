import {arrOfStrings, charInserter, indOfString} from "/src/scripts/char-inserter.js";

"use strict";

// checking if CapsLock key is active
// const capsLockState = event.getModifierState && event.getModifierState('CapsLock');
// console.log(capsLockState);
// skipping special keys

// returns false if a char is inappropriate
export const charTest = char => /[0-9 A-ZА-ЯЁ.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(char);
const langTest = char => /[0-9 А-ЯЁ.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(char);


// skipping inappropriate chars and a space after them (due a certain condition)
export const charHandler = function(caret) {
  let test = charTest(caret.textContent);
  caret.classList.remove('char-caret');

  while (!test) {
    // caret.className = 'char char-neutral-active';
    caret.classList.add('char-neutral-active')

    if (caret.classList.contains('finish')) { // the end of typing
      caret.classList.add('char-caret');
      console.warn('1 конец');
      break;
    } else {
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

          if (caret.textContent !== ' ') caret.className = 'char char-neutral-active';
        }

        caret = caret.nextElementSibling;
      }
    }

    test = charTest(caret.textContent);
  }

  caret.classList.toggle('char-caret');
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

    if (eKey === 'Backspace' || eKey === 'Tab' || eKey === 'CapsLock'
      || eKey === 'Enter' || eKey === 'Shift' || eKey === 'Control'
      || eKey === 'Os' || eKey === 'Alt' || eKey === 'ContexMenu') {
      btnDn.className = 'button-dn1';
    } else {
      btnDn.className = 'button-dn2';

      // setting case-insensitive matching
      eKey = eKey.toLowerCase();
      targetChar = targetChar.toLowerCase();

      // coloring the char's background depending on the pressed key
      if (eKey === targetChar) {
        if (targetChar !== ' ') caret.classList.add('char-correct');
      } else {
        caret.classList.add('char-wrong');
      }

      if (caret.classList.contains('finish')) { // the end of typing
        caret.classList.remove('char-caret');
        console.warn('2 конец');
      } else if (caret.classList.contains('line-end')
        && caret.parentElement.nextElementSibling === null) {
        charInserter(arrOfStrings, indOfString);
        caret = document.querySelector('.char-caret');
        charHandler(caret);
      } else if (caret.classList.contains('line-end')) {
        caret.classList.toggle('char-caret');
        // caret.firstElementChild.remove();

        // if (caret.nextElementSibling !== null) {
        //   caret.parentElement
        //     .querySelectorAll('div[class="char"]')
        //     .forEach(char => char.className = 'char char-correct');
        // }

        caret = caret.parentElement.nextElementSibling.firstChild;
        charHandler(caret);
      } else {
        caret.classList.remove('char-caret');
        caret = caret.nextElementSibling;
        charHandler(caret);
      }

      // identifying the language of the keyboard layout
      // console.log(langTest(caret.textContent));
      // if (langTest(caret.textContent)) {
      //   caret.style.borderBottomColor = 'rgba(20, 120, 100, 0.8)';
      // } else {
      //   caret.style.borderBottomColor = 'rgb(220, 100, 70, 0.8)';
      // }
    }

    // releasing the key
    document.body.addEventListener('keyup', function(event) {

      const btnUp = document.querySelector(`#${event.code.toLowerCase()}`);
      if (btnDn === btnUp) setTimeout(function() {
        btnUp.className = 'button-up';
      }, 100);
    });
  } catch (error) {
    console.error(error);
  }
};