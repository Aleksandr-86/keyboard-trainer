import { charInserter } from '/src/scripts/char-inserter.js';
import { getBrowser, strPreparer } from '/src/scripts/functions.js';
import { keyDownHandler, clearCounters } from '/src/scripts/keyboard.js';

const arrBackgrounds = [
  {
    num: 1,
    name: 'okhotskoye',
    author: 'Игорь Дудковский',
    description: 'охотское море',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 2,
    name: 'okhotskoye',
    author: 'Игорь Дудковский',
    description: 'охотское море',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 3,
    name: 'okhotskoye',
    author: 'Игорь Дудковский',
    description: 'охотское море',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 4,
    name: 'okhotskoye',
    author: 'Игорь Дудковский',
    description: 'охотское море',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 5,
    name: 'okhotskoye',
    author: 'Игорь Дудковский',
    description: 'охотское море',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 6,
    name: 'okhotskoye',
    author: 'Игорь Дудковский',
    description: 'охотское море',
    link: 'https://www.pexels.com/@igor65',
  },
];

// const btnGenFromSite = document.querySelector('#btn1');
const fingerPointers = document.querySelector('.finger-pointers');
const field = document.querySelector('.field');
const keyboard = document.querySelector('.keyboard');

const buffer = document.querySelector('#buffer');

const settingsOpen = document.querySelector('.nav > li:last-child > a');
const settingsMenu = document.querySelector('.settings-menu');
const settingsBtnClose = document.querySelector('.settings-btn-close');

const box1 = document.querySelector('#box1');
const box2 = document.querySelector('#box2');
const box3 = document.querySelector('#box3');
const box4 = document.querySelector('#box4');

const statistics = document.querySelector('.statistics');
const statisticsClose = document.querySelector('.statistics-close');
const overlay = document.querySelector('.overlay');

// loading state of settings checkbox
// if (!localStorage.backgroundPicture)
  // localStorage.setItem('backgroundPicture', '0');
if (localStorage.letterCase) box1.checked = localStorage.letterCase === 'true';
if (localStorage.fingerPointers)
  box2.checked = localStorage.fingerPointers === 'true';
if (localStorage.hideKeyboard)
  box3.checked = localStorage.hideKeyboard === 'true';
if (localStorage.ignoreCharInput)
  box4.checked = localStorage.ignoreCharInput === 'true';

// setting state of settings checkbox
box1.addEventListener('change', function () {
  if (this.checked) {
    localStorage.setItem('letterCase', 'true');
  } else {
    localStorage.setItem('letterCase', 'false');
  }
});

box2.addEventListener('change', function () {
  if (this.checked) {
    localStorage.setItem('fingerPointers', 'true');
  } else {
    localStorage.setItem('fingerPointers', 'false');
  }
});

box3.addEventListener('change', function () {
  if (this.checked) {
    localStorage.setItem('hideKeyboard', 'true');
  } else {
    localStorage.setItem('hideKeyboard', 'false');
  }
});

box4.addEventListener('change', function () {
  if (this.checked) {
    localStorage.setItem('ignoreCharInput', 'true');
  } else {
    localStorage.setItem('ignoreCharInput', 'false');
  }
});

// adding text from a buffer
buffer.addEventListener('click', async function () {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText();
    // buffer is empty
    if ((str.length === 0 || str.length === 1) && (str === ' ' || str === ''))
      return;

    buffer.blur(); // removing focus from an element
    settingsMenu.classList.remove('settings-menu-open'); // close settings menu
    // clearing finger pointers
    fingerPointers
      .querySelectorAll('*')
      .forEach((elem) => elem.classList.add('pointer-disabled'));
    clearCounters();
    charInserter(strPreparer(str), 0);
    if (!box2.checked) fingerPointers.classList.remove('hidden');
    field.classList.remove('hidden');
    if (!box3.checked) keyboard.classList.remove('hidden');
  } else if (br === 'firefoxx') {
    let str = document.querySelector('#input').value;
    charInserter(strPreparer(str), 0);
  }
});

// handling keyboard events
document.addEventListener('keydown', (event) => keyDownHandler(event));

// shutting down the statistics menu
statisticsClose.addEventListener('click', function () {
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
});
overlay.addEventListener('click', function () {
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
});

// open settings menu
settingsOpen.addEventListener('click', function () {
  settingsMenu.classList.toggle('settings-menu-open');
  fingerPointers.classList.add('hidden');
  field.classList.add('hidden');
  keyboard.classList.add('hidden');
  statistics.classList.add('hidden');
  overlay.classList.add('hidden');
});

// close settings menu
settingsBtnClose.addEventListener('click', function () {
  settingsMenu.classList.remove('settings-menu-open');
});
