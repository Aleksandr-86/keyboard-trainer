"use strict";

// keydown
document.addEventListener('keydown', function(event) {
// selecting the first element of <span line1>
  event.preventDefault();
  let caret = document.querySelector('.char-caret');
  console.log(currentLine);
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
        caret.className = 'char-correct';
      } else {
        caret.className = 'char-wrong';
      }

      // checking if it's the last char
      if (caret.id === 'char-last') {
        // choosing all the char elements
        const divChars = document.querySelectorAll('.char-correct, .char-wrong');
        divChars.forEach(div => div.className = 'char-target');

        // caret = document.querySelector('#char-first');
      } else {
        // moving the caret to the next char
        caret = caret.nextElementSibling;
      }
      caret.className = 'char-caret';

    }
    // releasing the key
    document.body.addEventListener('keyup', function(event) {
      const btnUp = document.querySelector(`#${event.code.toLowerCase()}`);
      if (btnDn === btnUp) setTimeout(function() {
        btnUp.className = 'button-up';
      }, 100);
    });
  } catch (error) {
    // console.error(`${error.name}: ${error.message}`);
  }
});