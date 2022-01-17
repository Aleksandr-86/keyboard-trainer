"use strict";

// keydown
export const keyboard = function(event) {
  event.preventDefault();

// selecting the first element of <span line1>
  let caret = document.querySelector('.char-caret');

  try {
    const btnDn = document.querySelector(`#${event.code.toLowerCase()}`);
    let eKey = event.key;
    let targetChar = caret.textContent;

    // checking if CapsLock key is active
    // const capsLockState = event.getModifierState && event.getModifierState('CapsLock');
    // console.log(capsLockState);

    // skipping special keys
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

      // checking if it's the last char
      if (caret.classList.contains('line-end') && caret.nextElementSibling === null) {
        document.querySelectorAll('.line').forEach(line => line.innerHTML = ''); // clearing lines

      } else if (caret.classList.contains('line-end')) {
        caret.classList.toggle('char-caret');
        // const index = [...caret.parentElement.childNodes].indexOf(caret);
        // console.log(caret.nextElementSibling !== null);
        if (caret.nextElementSibling !== null) {
          const curLine = caret.parentElement;
          curLine.querySelectorAll('div[class="char"]').forEach(char => char.classList.add('char-correct'));
        }
        caret = caret.parentElement.nextElementSibling.firstChild; // switching lines
      } else if (caret.id === 'char-last') {

        // choosing all the char elements
        document.querySelectorAll('.char-correct, .char-wrong').forEach(div => div.className = 'char-target');
        caret = document.querySelector('#char-first');
      } else {
        caret.classList.toggle('char-caret');
        // moving the caret to the next char
        caret = caret.nextElementSibling;
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