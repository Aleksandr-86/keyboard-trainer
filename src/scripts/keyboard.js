import {arrOfStrings, charInserter, indOfString} from "/src/scripts/char-inserter.js";
// import {inStrNum} from "/src/index.js";

"use strict";

// checking if CapsLock key is active
// const capsLockState = event.getModifierState && event.getModifierState('CapsLock');
// console.log(capsLockState);
// skipping special keys

const field = document.querySelector('.field');
const keyboard = document.querySelector('.keyboard');
const statistics = document.querySelector('.statistics');
const statParagraph = document.querySelector('#statParagraph');
const overlay = document.querySelector('.overlay');

let timerStart = 0;
let timerStop = 0;
let bTimer = false;

let numTotal = 0;
let numNeutral = 0;
let numCorrect = 0;
let numWrong = 0;
let charPerMinute = 0;

// returns false if a char is inappropriate
export const charTest = char => /[0-9 A-ZА-ЯЁ.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(char);
const langTest = char => /[0-9 А-ЯЁ.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(char);


// skipping inappropriate chars and a space after them (due a certain condition)
export const charHandler = function(caret) {
  let test = charTest(caret.textContent);
  caret.classList.remove('char-caret');

  while (!test) {
    numTotal++;
    numNeutral++;
    caret.classList.remove('char-neutral-inactive');
    caret.classList.add('char-neutral-active');

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
export const keyDownHandler = function(event) {
  event.preventDefault();

  // selecting the first element of the first line
  let caret = document.querySelector('.char-caret');
  let eKey = event.key;
  const btnDn = document.querySelector(`#${event.code.toLowerCase()}`);

  try {
    if (caret === null && (eKey === 'Escape' || eKey === 'Enter')) {
      // shutting down the statistics menu
      statistics.classList.add('hidden');
      overlay.classList.add('hidden');
      return;
    } else if (caret === null) {
      return;
    }

    let targetChar = caret.textContent;

    if (eKey === 'Backspace' || eKey === 'Tab' || eKey === 'CapsLock'
      || eKey === 'Enter' || eKey === 'Shift' || eKey === 'Control'
      || eKey === 'Os' || eKey === 'Alt' || eKey === 'ContexMenu') {
      btnDn.className = 'button-dn1';
    } else {

      if (!bTimer) {
        bTimer = true;
        timerStart = performance.now();
      }

      numTotal++;
      btnDn.className = 'button-dn2';

      // setting case-insensitive matching
      eKey = eKey.toLowerCase();
      targetChar = targetChar.toLowerCase();

      // coloring the char's background depending on the pressed key
      if (eKey === targetChar) {
        if (targetChar !== ' ') caret.classList.add('char-correct');
        numCorrect++;
      } else {
        caret.classList.add('char-wrong');
        numWrong++;
      }

      if (caret.classList.contains('finish')) { // the end of typing
        caret.classList.remove('char-caret');
        console.warn('2 конец');
        showStat();

      } else if (caret.classList.contains('line-end')
        && caret.parentElement.nextElementSibling === null) {
        charInserter(arrOfStrings, indOfString);
        caret = document.querySelector('.char-caret');
        charHandler(caret);
      } else if (caret.classList.contains('line-end')) {
        caret.classList.toggle('char-caret');

        // if (caret.nextElementSibling !== null) {
        //   caret.parentElement
        //     .querySelectorAll('div[class="char"]')
        //     .forEach(char => char.className = 'char char-correct');
        // }

        caret = caret.parentElement.nextElementSibling.firstChild;
        charHandler(caret);
      } else {
        if (caret.nextElementSibling !== null) {
          caret.classList.remove('char-caret');
          caret = caret.nextElementSibling;
          charHandler(caret);
        }
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

// clearing statistics variables
const clearStat = function() {
  numTotal = 0;
  numNeutral = 0;
  numCorrect = 0;
  numWrong = 0;
  bTimer = false;
};

// rounding
const rnd = function(num) {
  return Number(Math.round(Number(num + 'e2')) + 'e-2')
}

// converting ms into minutes:seconds
const msToMinutes = function(ms) {
  ms /= 1000;
  const minutes = Math.floor(ms / 60).toString().padStart(2, '0');
  const seconds = Math.floor(ms - minutes * 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`
};

// showing statistics
const showStat = function() {
  timerStop = performance.now();
  field.classList.add('hidden');
  keyboard.classList.add('hidden');
  statistics.classList.remove('hidden');
  overlay.classList.remove('hidden');

  statParagraph.innerHTML = `
    Предварительная длина: ${0}<br>
    Время набора - <b>${msToMinutes(timerStop - timerStart)}</b><br>
    Cкорость набора символов в минуту - <b>${Math.floor((numTotal * 60) / ((timerStop - timerStart) / 1000))}</b><br>
    Всего символов - <div class="num-total">${numTotal}</div>, из них:<br>
    <ul>
      <li>пропущенных - <b>${numNeutral}</b>
       <div class="num-neutral">(${rnd((numNeutral * 100) / numTotal)}%)</div></li>
      <li>правильно введённых - <b>${numCorrect}</b>
       <div class="num-correct">(${rnd((numCorrect * 100) / (numTotal - numNeutral))}%)</div></li>
      <li>введённых по ошибке - <b>${numWrong}</b>
       <div class="num-wrong">(${rnd((numWrong * 100) / (numTotal - numNeutral))}%)</div></li>
    </ul>
  `;
  clearStat();
};