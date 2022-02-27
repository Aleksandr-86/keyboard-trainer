import {charTest, langTest} from "/src/scripts/functions.js";
import {arrOfStrings, indOfString, charInserter} from "/src/scripts/char-inserter.js";

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

// const charArrRus = ['ё1йфя', '2цыч', '3увс', '4кам5епи6', '7нртгоь', '8шлб', '9щдю', '0зж.-хэ=ъ\\', ',/'];
const charArrRus = ['ё1!йфя', '2"цыч', '3№увс', '4;кам5%епи6:', '7?нртгоь', '8*шлб', '9(щдю', '0)зж.,-_хэ=+ъ\\/)'];
const charArrEng = ['`~1!qaz', '2@wsx', '3#edc', '4$rfv5%tgb6^', '7&yhnujm', '8*ik,<', '9(ol.>', "0)p;:/?-_[{'=+]}\\|"];
export let langLayout = 'rus';
let remChart;


// clearing counters
export function clearCounters() {
  numTotal = 0;
  numNeutral = 0;
  numCorrect = 0;
  numWrong = 0;
  numRow = 0;
  numRowCounter = 0;
  bTimer = false;
  remChart = ' ';
}

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

  clearCounters();
}


// return finger pointing div
export function fingerPointing(targetChar) {
  let ind = -1;
  let arr;
  let chCase;

  langTest(targetChar, langLayout) === 'rus' ? langLayout = 'rus' : langLayout = 'eng';
  // langLayout === 'rus' ? arr = charArrRus : arr = charArrEng;
  const langMarker = document.querySelector('#lang-marker');

  if (langLayout === 'rus') {
    arr = charArrRus;
    langMarker.textContent = 'Русский';
    chCase = /[А-ЯЁ!"№;%:?*()_+,/]/i.test(targetChar) && targetChar === targetChar.toUpperCase();
  } else {
    arr = charArrEng;
    langMarker.textContent = 'Английский';
    chCase = /[A-Z!@#$%^&*():<>?_{"+}|]/i.test(targetChar) && targetChar === targetChar.toUpperCase();
  }

  document.querySelectorAll('.finger-pointers > div').forEach(elem => elem.classList.add('pointer-disabled'));

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(targetChar.toLowerCase()) >= 0) {
      ind = i;
      break;
    }
  }

  if (ind === 0) {
    document.querySelector('#left-pinky').classList.remove('pointer-disabled');
  } else if (ind === 1) {
    document.querySelector('#left-ring').classList.remove('pointer-disabled');
  } else if (ind === 2) {
    document.querySelector('#left-middle').classList.remove('pointer-disabled');
  } else if (ind === 3) {
    document.querySelector('#left-index').classList.remove('pointer-disabled');
  } else if (ind === 4) {
    document.querySelector('#right-index').classList.remove('pointer-disabled');
  } else if (ind === 5) {
    document.querySelector('#right-middle').classList.remove('pointer-disabled');
  } else if (ind === 6) {
    document.querySelector('#right-ring').classList.remove('pointer-disabled');
  } else if (ind === 7 || ind === 8) {
    document.querySelector('#right-pinky').classList.remove('pointer-disabled');
  }

  if (chCase && ind >= 0 && ind <= 3) {
    document.querySelector('#right-pinky').classList.remove('pointer-disabled');
  } else if (ind === 8) {
    document.querySelector('#left-pinky').classList.remove('pointer-disabled');
  } else if (chCase) {
    document.querySelector('#left-pinky').classList.remove('pointer-disabled');
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
  fingerPointing(caret.textContent);
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

    // skipping inappropriate chars in terms of language layout
    // if (langLayout !== langTest(eKey, langLayout)) return;
    // fingerPointing(targetChar);

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

    // targetChar = caret.textContent;
    // fingerPointing(caret.textContent);


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