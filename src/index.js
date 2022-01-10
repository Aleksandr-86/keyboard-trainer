// selecting the first element of <span line1>
let caret = document.querySelector('#line1-beginning');

// const arrOfLetters = [['ё', '`'], ['й', 'q'], ['ц', 'w'], ['у', 'e'], ['к', 'r'], ['е', 't'],
//   ['н', 'y'], ['г', 'u'], ['ш', 'i'], ['щ', 'o'], ['з', 'p'], ['х', '['], ['ъ', ']'], ['ф', 'a'],
//   ['ы', 's'], ['в', 'd'], ['a', 'ф'], ['п', 'g'], ['р', 'h'], ['о', 'j'], ['л', 'k'], ['д', 'l'],
//   ['ж', ';'], ['э', "'"], ['я', 'z'], ['ч', 'x'], ['с', 'c'], ['м', 'v'], ['и', 'b'], ['т', 'n'],
//   ['ь', 'm'], ['б', ','], ['ю', '.'], ['.', '/'],
//   ['`', 'ё'], ['q', 'й'], ['w', 'ц'], ['e', 'у'], ['r', 'к'], ['t', 'е'], ['y', 'н'], ['u', 'г'],
//   ['i', 'ш'], ['o', 'щ'], ['p', 'з'], ['[', 'х'], [']', 'ъ'], ['a', 'ф'], ['s', 'ы'], ['d', 'в'],
//   ['f', 'а'], ['g', 'п'], ['h', 'р'], ['j', 'о'], ['k', 'л'], ['l', 'д'], [';', 'ж'], ["'", 'э'],
//   ['z', 'я'], ['x', 'ч'], ['c', 'с'], ['v', 'м'], ['b', 'и'], ['n', 'т'],
//   ['m', 'ь'], [',', 'б'], ['.', 'ю'], ['/', '.']];

// const mapOfLetters = new Map(arrOfLetters);
// console.log(map.get('ё'));

document.body.addEventListener('keydown', function(event) {
  event.preventDefault();
  try {
    const btnDn = document.querySelector(`#${event.code.toLowerCase()}`);
    btnDn.className = 'button-dn';
    let eKey = event.key;
    let targetLetter = caret.textContent;

    // console.log(eKey, mapOfLetters.get(eKey));
    // console.log(targetLetter);

    if (eKey === 'Backspace' || eKey === 'Tab' || eKey === 'CapsLock' || eKey === 'Enter' || eKey === 'Shift'
      || eKey === 'Control' || eKey === 'Os' || eKey === 'Alt' || eKey === 'ContexMenu') {
      // console.log(eKey);
    } else {
      eKey = eKey.toLowerCase();
      targetLetter = targetLetter.toLowerCase();

      if (eKey === targetLetter) {
        caret.className = 'letter-correct';
      } else {
        caret.className = 'letter-wrong';
      }

      // console.log(caret.textContent);
      // move caret to the next letter of current row
      if (caret.id === 'line1-end') {
        caret = document.querySelector('#line2-beginning');
      } else if (caret.id === 'line2-end') {
        caret = document.querySelector('#line3-beginning');
      } else if (caret.id === 'line3-end') {
        caret = document.querySelector('#line1-beginning');
      } else {
        caret = caret.nextElementSibling;
      }
      caret.className = 'letter-caret';
    }
    // отпускание кнопки
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