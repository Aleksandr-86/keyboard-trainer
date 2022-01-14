"use strict";

const charGenBtn = document.querySelector('#btn');
const field = document.querySelector('#field');

const str = 'Проверочный текст для в ставки в поле и прочии механики';
const html = str.split('').reduce((acc, cur) => acc + `<div class="char-target">${cur}</div>`, '');

charGenBtn.addEventListener('click', function() {
  field.innerHTML = html;
  const firstDiv = document.querySelector('.char-target:first-child');
  firstDiv.className = 'char-caret';
  firstDiv.id = 'char-first';

  const lastDiv = document.querySelector('.char-target:last-child');
  lastDiv.id = 'char-last';
});