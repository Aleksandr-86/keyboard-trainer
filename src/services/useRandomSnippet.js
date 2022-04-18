import { randomNum } from '/src/services/helpers.js'

const arrOfRusBooks = [
  { title: 'Аэлита', author: 'Алексей Николаевич Толстой', name: 'aelita' },
  {
    title: 'Герой нашего времени',
    author: 'Михаил Юрьевич Лермонтов',
    name: 'a_hero_of_our_time'
  },
  {
    title: 'Человек-амфибия',
    author: 'Александр Романович Беляев',
    name: 'amphibian_man'
  },
  { title: 'Братья Карамазовы', author: '', name: 'the_brothers_karamazov' },
  {
    title: 'Господа Головлёвы',
    author: 'Михаил Евграфович Салтыков-Щедрин',
    name: 'the_golovlyov_family'
  }
]

export function useRandomSnippet(callback, lang, amount) {
  let arrOfBooks
  if (lang === 'russian') {
    arrOfBooks = arrOfRusBooks
  } else {
    arrOfBooks = arrOfEngBooks
  }

  const obj = arrOfBooks[randomNum(0, 4)] // choosing a random book
  const filePath = `/src/books/${lang}/${obj.name}.txt`

  var httpRequest = new XMLHttpRequest()
  httpRequest.onload = function () {
    // When the request is loaded
    callback(httpRequest.responseText, amount) // We're calling our method
  }
  httpRequest.open('GET', filePath)
  httpRequest.send()
}
