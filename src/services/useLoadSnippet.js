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

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1))

// function readTextFile(file) {
//   const rawFile = new XMLHttpRequest()
//   rawFile.open('GET', file, false)
//   let allText = ''
//   rawFile.onreadystatechange = function () {
//     if (rawFile.readyState === 4) {
//       if (rawFile.status === 200 || rawFile.status == 0) {
//         allText = rawFile.responseText
//       }
//     }
//   }
//   rawFile.send(null)
//   return allText
// }

export function foo(callback, path) {
  var httpRequest = new XMLHttpRequest()
  httpRequest.onload = function () {
    // When the request is loaded
    callback(httpRequest.responseText) // We're calling our method
  }
  httpRequest.open('GET', path)
  httpRequest.send()
}

export async function getRandomText() {
  const filePath = `/src/books/russian/aelita.txt`
  const response = await fetch(filePath)
  let text = await response.text()
  console.log(text)
}

// export async function useLoadSnippet(lang, amount) {
export async function useLoadSnippet(lang, amount) {
  // let arrOfBooks
  // if (lang === 'russian') {
  //   arrOfBooks = arrOfRusBooks
  // } else {
  //   arrOfBooks = arrOfEngBooks
  // }
  // const obj = arrOfBooks[randomNum(0, 4)] // choosing a random book
  // const filePath = `/src/books/russian/${obj.name}.txt`
  // const response = await fetch(filePath)
  // let text = await response.text()
  // // console.log(text)
  // return text
  // const snippet = text.substring(0, 300)
  // const textLength = text.length
  // const lowBound = text.indexOf('.', amount) + 1
  // const highBound = text.lastIndexOf('.', textLength - amount) + 1
  // let snippet
  // const randomPoint = randomNum(0, textLength)
  // if (randomNum <= lowBound) {
  //   snippet = text.substring(0, lowBound)
  // } else if (randomNum >= highBound) {
  //   snippet = text.substring(highBound, textLength)
  // } else {
  //   const startOfSnippet = text.lastIndexOf('.', randomPoint) + 1
  //   const endOfSnippet = text.indexOf('.', randomPoint + amount) + 1
  //   snippet = text.substring(startOfSnippet, endOfSnippet).trim()
  // }
  // // snippetLength = snippet.length
  // // console.log(`длина ${snippet.length}`)
  // // console.warn(snippet)
  // return snippet
}
