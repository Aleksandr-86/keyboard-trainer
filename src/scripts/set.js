const box1 = document.querySelector('#box1');
export const box2 = document.querySelector('#box2');
export const box3 = document.querySelector('#box3');
const box4 = document.querySelector('#box4');

const btnPrevious = document.querySelector('#settings-btn-previous');
const btnNext = document.querySelector('#settings-btn-next');
//   lsdkfjlsjfd

const arrBackgrounds = [
  {
    num: 1,
    name: 'mountain',
    author: 'Игорь Дудковский',
    description: 'гора',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 2,
    name: 'okhotskoye',
    author: 'Иван',
    description: 'охотское море',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 3,
    name: 'sea-creatures',
    author: 'Дмитрий',
    description: 'морские котики',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 4,
    name: 'snow-mountain',
    author: 'Александр',
    description: 'заснеженная гора',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 5,
    name: 'water',
    author: 'Иван',
    description: 'вода',
    link: 'https://www.pexels.com/@igor65',
  },
  {
    num: 6,
    name: 'water-fall',
    author: 'Маша',
    description: 'водопад',
    link: 'https://www.pexels.com/@igor65',
  },
];

// loading state of settings checkbox
if (localStorage.backgroundPicture === undefined)
  localStorage.setItem('backgroundPicture', '0');
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

// btnPrevious.addEventListener
