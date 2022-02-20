import {charTest} from "/src/scripts/functions.js";
import {arrOfStrings, indOfString, charInserter} from "/src/scripts/char-inserter.js";

"use strict";

const fingerPointers = document.querySelector('.finger-pointers');
const field = document.querySelector('.field');
const keyboard = document.querySelector('.keyboard');
const statistics = document.querySelector('.statistics');
const statContainer = document.querySelector('#statContainer');
const overlay = document.querySelector('.overlay');

let timerStart = 0;
let timerStop = 0;
let bTimer = false;

let numTotal = 0;
let numNeutral = 0;
let numCorrect = 0;
let numWrong = 0;
let numRow = 0;
let numRowCounter = 0;


const charArrRus = ['ё1йфя', '2цыч', '3увс', '4кам5епи6', '7нртгоь', '8шлб', '9щдю', '0зж.-хэ=ъ\\'];
export let fPointer;


// showing statistics
function showStat() {
  function rnd(num) { // rounding
    return Number(Math.round(Number(num + 'e2')) + 'e-2');
  }

  function msToMinutes(ms) { // converting ms into minutes:seconds
    ms /= 1000;
    const minutes = Math.floor(ms / 60).toString().padStart(2, '0');
    const seconds = Math.floor(ms - minutes * 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`
  }

  timerStop = performance.now();
  fingerPointers.classList.add('hidden');
  field.classList.add('hidden');
  keyboard.classList.add('hidden');
  statistics.classList.remove('hidden');
  overlay.classList.remove('hidden');

  statContainer.innerHTML = `
    <div >
      <div class="stat-first-row">Время набора:</div>
      <div class="stat-second-row">${msToMinutes(timerStop - timerStart)}</div>
    </div>
    <div >
      <div class="stat-first-row">Cкорость набора, зн/мин:</div>
      <div class="stat-second-row">${Math.floor((numTotal * 60) / ((timerStop - timerStart) / 1000))}</div>
    </div>
    <div >
      <div class="stat-first-row">Всего набрано знаков <b>${numTotal - numNeutral}</b>, из них:</div>
      <div class="stat-second-row"></div>
    </div>
    <div >
      <div class="stat-first-row stat-pos">- правильных</div>
      <div class="stat-second-row">${numCorrect}
        <div class="num-correct">(${rnd((numCorrect * 100) / (numTotal - numNeutral))}%)</div>
      </div>
    </div>
    <div >
      <div class="stat-first-row stat-pos">- ошибочных</div>
      <div class="stat-second-row">${numWrong}
        <div class="num-wrong">(${rnd((numWrong * 100) / (numTotal - numNeutral))}%)</div>
      </div>
    </div>
    <div >
      <div class="stat-first-row">Знаков подряд без ошибки:</div>
      <div class="stat-second-row">${numRow}</div>
    </div>
  `

  numTotal = 0;
  numNeutral = 0;
  numCorrect = 0;
  numWrong = 0;
  numRow = 0;
  numRowCounter = 0;
  bTimer = false;
}


// return finger pointing div
export function fingerPointing(targetChar) {
  let ind;
  for (let i = 0; i < charArrRus.length; i++) {
    if (charArrRus[i].indexOf(targetChar) >= 0) {
      ind = i;
      break;
    }
  }

  if (ind === 0) {
    return document.querySelector('#left-pinky');
  } else if (ind === 1) {
    return document.querySelector('#left-ring');
  } else if (ind === 2) {
    return document.querySelector('#left-middle');
  } else if (ind === 3) {
    return document.querySelector('#left-index');
  } else if (ind === 4) {
    return document.querySelector('#right-index');
  } else if (ind === 5) {
    return document.querySelector('#right-middle');
  } else if (ind === 6) {
    return document.querySelector('#right-ring');
  } else if (ind === 7) {
    return document.querySelector('#right-pinky');
  }
}


// skipping inappropriate chars and a space after them (due a certain condition)
export function charHandler(caret) {
  let test = charTest(caret.textContent);
  caret.classList.remove('char-caret');

  while (!test) {
    numTotal++;
    numNeutral++;
    caret.classList.remove('char-neutral-inactive');
    caret.classList.add('char-neutral-active');

    if (caret.classList.contains('finish')) { // the end of typing
      caret.classList.add('char-caret');
      console.warn('конец 1');
      showStat();
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
}

// keydown
export function keyDownHandler(event) {
  let eKey = event.key;
  const btnDn = document.querySelector(`#${event.code.toLowerCase()}`);

  if (!statistics.classList.contains('hidden') && (eKey === 'Escape' || eKey === 'Enter')) {
    statistics.classList.add('hidden');
    overlay.classList.add('hidden');
    return;
  } else if (!field.classList.contains('hidden') && eKey === 'Enter' && numTotal > 0) {
    showStat();
    return;
  } else if (!field.classList.contains('hidden') && eKey === 'Enter' && numTotal === 0) {
    return;
  } else if (field.classList.contains('hidden')) {
    return;
  } else if (eKey === 'Backspace' || eKey === 'Tab' || eKey === 'CapsLock'
    || eKey === 'Shift' || eKey === 'Control'
    || eKey === 'Os' || eKey === 'Alt' || eKey === 'ContexMenu') {
    btnDn.className = 'button-dn1';
  } else {
    // selecting the first element of the first line
    let caret = document.querySelector('.char-caret');
    let targetChar = caret.textContent;

    if (!bTimer) {
      bTimer = true;
      timerStart = performance.now();
    }

    numTotal++;
    btnDn.className = 'button-dn2';

    // setting case-insensitive matching
    eKey = eKey.toLowerCase();
    targetChar = targetChar.toLowerCase();

    if (targetChar !== ' ') fingerPointing(targetChar).classList.add('pointer-disabled');

    // coloring the char's background depending on the pressed key
    if (eKey === targetChar) {
      if (targetChar !== ' ') caret.classList.add('char-correct');
      numCorrect++;
      numRowCounter++;
      if (numRowCounter > numRow) numRow = numRowCounter;
    } else {
      caret.classList.add('char-wrong');
      numWrong++;
      numRowCounter = 0;
    }

    if (caret.classList.contains('finish')) { // the end of typing
      caret.classList.remove('char-caret');
      console.warn('2 конец');
      showStat();
      return;
    } else if (caret.classList.contains('line-end')
      && caret.parentElement.nextElementSibling === null) {
      charInserter(arrOfStrings, indOfString);
      caret = document.querySelector('.char-caret');
      charHandler(caret);
    } else if (caret.classList.contains('line-end')) {
      caret.classList.toggle('char-caret');
      caret = caret.parentElement.nextElementSibling.firstChild;
      charHandler(caret);
    } else {
      if (caret.nextElementSibling !== null) {
        caret.classList.remove('char-caret');
        caret = caret.nextElementSibling;
        charHandler(caret);
      }
    }


    fingerPointing(caret.textContent).classList.remove('pointer-disabled');
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
}