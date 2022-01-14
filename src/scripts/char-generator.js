"use strict";

const charGenBtn = document.querySelector('#btn');
const field = document.querySelector('#field');

const str = 'Всё дело 5в доме. В Самом Начале он уселся в очень удачном доме, крупноблочном и просто сказочно расположенном. Главное же, чем дом отличался от рядом';
// const str ='в'
// create content for html
const html = str.split('').reduce((acc, cur) => acc + `<div class="char-target">${cur}</div>`, '');

// on press button #btn
charGenBtn.addEventListener('click', function() {
  field.innerHTML = html;

  const firstDiv = document.querySelector('.char-target:first-child');
  firstDiv.className = 'char-caret';
  firstDiv.id = 'char-first';

  const lastDiv = document.querySelector('.char-target:last-child');
  lastDiv.id = 'char-last';

  const lastLineDive = document.querySelector('.')
});