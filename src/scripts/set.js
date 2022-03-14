'use strict';

const box1 = document.querySelector('#box1');
export const box2 = document.querySelector('#box2');
export const box3 = document.querySelector('#box3');
const box4 = document.querySelector('#box4');

const btnPrevious = document.querySelector('#settings-btn-previous');
const imgPreview = document.querySelector('#settings-imgPreview');
const btnNext = document.querySelector('#settings-btn-next');
const author = document.querySelector('.settings-author');
const description = document.querySelector('.settings-description');
const link = document.querySelector('.settings-link');

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

function loadImgPreview(index) {
  const obj = arrBackgrounds[index];
  imgPreview.setAttribute('src', `/src/images/backgrounds/small/${obj.name}.jpg`);
  description.innerHTML = `место: ${obj.description}`;
  author.innerHTML = `автор: ${obj.author}`;
  link.setAttribute('href', `${obj.link}`);
}



export function loadBackground(index) {
  const obj = arrBackgrounds[index];
  document.body.style.background = `black url("/src/images/backgrounds/normal/${obj.name}.jpg") no-repeat fixed center center`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.transition = 'background 500ms linear';
}

// loadBackground(Number(localStorage.backgroundPicture));

// loading state of settings
if (localStorage.backgroundPicture === undefined)
  localStorage.setItem('backgroundPicture', '0');
if (localStorage.letterCase) box1.checked = localStorage.letterCase === 'true';
if (localStorage.fingerPointers) box2.checked = localStorage.fingerPointers === 'true';
if (localStorage.hideKeyboard) box3.checked = localStorage.hideKeyboard === 'true';
if (localStorage.ignoreCharInput) box4.checked = localStorage.ignoreCharInput === 'true';

// setting
  const pictureObj = arrBackgrounds[localStorage.backgroundPicture];
  document.body.style.background = `black url("/src/images/backgrounds/normal/${pictureObj.name}.jpg") no-repeat fixed center center`;
  document.body.style.backgroundSize = 'cover';

loadImgPreview(localStorage.backgroundPicture);

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

// circling the background image content
function circlingImg(index, back = false) {
  if (index === 0) {
    back ? (index = 5) : index++;
  } else if (index >= 1 && index <= 4) {
    back ? index-- : index++;
  } else if (index === 5) {
    back ? index-- : (index = 0);
  } else {
    index = 0;
  }

  localStorage.backgroundPicture = String(index);
  loadImgPreview(index);
}

btnPrevious.addEventListener('click', function () {
  circlingImg(Number(localStorage.backgroundPicture), true);
});

btnNext.addEventListener('click', function () {
  circlingImg(Number(localStorage.backgroundPicture));
});
