// selecting the first element of <span line1>
let caret = document.querySelector('#line-beginning');

// keydown
document.body.addEventListener('keydown', function(event) {
  event.preventDefault();

  try {
    const btnDn = document.querySelector(`#${event.code.toLowerCase()}`);
    let eKey = event.key;
    let targetLetter = caret.textContent;
    // checking if CapsLock key is active

    const capsLockState = event.getModifierState && event.getModifierState('CapsLock');
    console.log(capsLockState);
    // skipping special keys

    if (eKey === 'Backspace' || eKey === 'Tab' || eKey === 'CapsLock' || eKey === 'Enter' || eKey === 'Shift'
      || eKey === 'Control' || eKey === 'Os' || eKey === 'Alt' || eKey === 'ContexMenu') {
      btnDn.className = 'button-dn1';
    } else {
      btnDn.className = 'button-dn2';
      // setting case-insensitive matching
      eKey = eKey.toLowerCase();
      targetLetter = targetLetter.toLowerCase();

      // marking the letter depending on the pressed key
      if (eKey === targetLetter) {
        caret.className = 'letter-correct';
      } else {
        caret.className = 'letter-wrong';
      }

      // checking if it's the last letter
      if (caret.id === 'line-end') {
        // choosing all the letter elements
        const divLetters = document.querySelectorAll('.letter-correct, .letter-wrong');
        divLetters.forEach(div => div.className = 'letter-target');

        caret = document.querySelector('#line-beginning');
      } else {
        // moving the caret to the next letter
        caret = caret.nextElementSibling;
      }
      caret.className = 'letter-caret';

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