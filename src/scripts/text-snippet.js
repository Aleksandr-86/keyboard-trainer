import { charInserter } from '/src/scripts/char-inserter.js';
import { remExSpaces } from '/src/scripts/functions.js';

const arrOfRusBooks = [
  { title: 'Аэлита', author: 'Алексей Николаевич Толстой', name: 'aelita' },
  {
    title: 'Герой нашего времени',
    author: 'Михаил Юрьевич Лермонтов',
    name: 'a_hero_of_our_time',
  },
  { title: 'Человек-амфибия', author: 'Александр Романович Беляев', name: 'amphibian_man' },
  { title: 'Братья Карамазовы', author: '', name: 'the_brothers_karamazov' },
  {
    title: 'Господа Головлёвы',
    author: 'Михаил Евграфович Салтыков-Щедрин',
    name: 'the_golovlyov_family',
  },
];

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1));

export function readTextFile(file) {
  const rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  let allText = '';
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return allText;
}

export let snippetLength = 0;
export function loadSnippet(lang, amount) {
  let arrOfBooks;
  if (lang === 'russian') {
    arrOfBooks = arrOfRusBooks;
  } else {
    arrOfBooks = arrOfEngBooks;
  }

  const obj = arrOfBooks[randomNum(0, 4)]; // choosing a random book
  let text = readTextFile(`/src/books/russian/${obj.name}.txt`);
  text = remExSpaces(text);

  const textLength = text.length;
  const lowBound = text.indexOf('.', amount) + 1;
  const highBound = text.lastIndexOf('.', textLength - amount) + 1;

  let snippet;
  const randomPoint = randomNum(0, textLength);
  if (randomNum <= lowBound) {
    snippet = text.substring(0, lowBound);
  } else if (randomNum >= highBound) {
    snippet = text.substring(highBound, textLength);
  } else {
    const startOfSnippet = text.lastIndexOf('.', randomPoint) + 1;
    const endOfSnippet = text.indexOf('.', randomPoint + amount) + 1;
    snippet = text.substring(startOfSnippet, endOfSnippet).trim();
  }

  snippetLength = snippet.length;
  console.log(`длина ${snippet.length}`);
  console.warn(snippet);
  return snippet.split(' ');
}
