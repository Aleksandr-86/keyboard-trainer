// определяет браузер и возвращает объект с информации о нём
export function getBrowser() {
  const ua = navigator.userAgent

  let bName = (function () {
    if (ua.search(/Edge/) > -1) return 'edge'
    if (ua.search(/MSIE/) > -1) return 'ie'
    if (ua.search(/Trident/) > -1) return 'ie11'
    if (ua.search(/Firefox/) > -1) return 'firefox'
    if (ua.search(/Opera/) > -1) return 'opera'
    if (ua.search(/OPR/) > -1) return 'operaWebkit'
    if (ua.search(/YaBrowser/) > -1) return 'yabrowser'
    if (ua.search(/Chrome/) > -1) return 'chrome'
    if (ua.search(/Safari/) > -1) return 'safari'
  })()

  let version
  switch (bName) {
    case 'edge':
      version = ua.split('Edge')[1].split('/')[1]
      break
    case 'ie':
      version = ua.split('MSIE ')[1].split(';')[0]
      break
    case 'ie11':
      bName = 'ie'
      version = ua.split('; rv:')[1].split(')')[0]
      break
    case 'firefox':
      version = ua.split('Firefox/')[1]
      break
    case 'opera':
      version = ua.split('Version/')[1]
      break
    case 'operaWebkit':
      bName = 'opera'
      version = ua.split('OPR/')[1]
      break
    case 'yabrowser':
      version = ua.split('YaBrowser/')[1].split(' ')[0]
      break
    case 'chrome':
      version = ua.split('Chrome/')[1].split(' ')[0]
      break
    case 'safari':
      version = ua.split('Version/')[1].split(' ')[0]
      break
  }

  let platform = 'desktop'
  if (
    /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
      navigator.userAgent.toLowerCase()
    )
  )
    platform = 'mobile'

  let browsrObj

  try {
    browsrObj = {
      platform: platform,
      browser: bName,
      versionFull: version,
      versionShort: version.split('.')[0]
    }
  } catch (err) {
    browsrObj = {
      platform: platform,
      browser: 'unknown',
      versionFull: 'unknown',
      versionShort: 'unknown'
    }
  }
  return browsrObj
}

export const detectDevice = function () {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return 'handheld'
  } else {
    return 'screen'
  }
}

// удаляет пробелы и возвращает массив из строки
export const arrPreparer = function (str) {
  // количество символов в строке
  const lineLen = 40
  // максимальная длина слова, которое не будет переносится на следующую линию
  let maxWordLen = 15

  const tempArr = str.split(' ')
  const arr = []
  let counter = 0

  for (let i = 0; i < tempArr.length; i++) {
    const word = tempArr[i]
    const wordLen = word.length

    if (word === '' || word === ' ') {
      continue
    } else if (word === '\n' && counter === 0) {
      // пропускает пустую линию
      continue
    } else if (word === '\n' && counter > 0) {
      /* добавляет строку 'skip' в массив, до тех пор пока индекс массива
      не будет соответствовать div элементу в конце линии поля */
      for (let j = 0; j < lineLen - counter; j++) {
        arr.push('skip')
      }
      counter = 0
    } else if (wordLen + counter < lineLen) {
      for (let j = 0; j < wordLen; j++) {
        arr.push(word[j])
      }
      arr.push(' ')
      counter = (counter + wordLen + 1) % 40
    } else if (wordLen <= maxWordLen || counter + wordLen === lineLen) {
      for (let j = 0; j < lineLen - counter; j++) {
        arr.push('skip')
      }

      for (let j = 0; j < wordLen; j++) {
        arr.push(word[j])
      }
      arr.push(' ')
      counter = (wordLen + 1) % 40
    } else {
      for (let j = 0; j < wordLen; j++) {
        arr.push(word[j])
      }
      arr.push(' ')
      counter = (counter + wordLen + 1) % 40
    }
  }

  arr.pop()
  arr.push('end')

  const arrRemainder = arr.length % 200
  if (arrRemainder !== 0) {
    for (let i = 0; i < 200 - arrRemainder; i++) {
      arr.push(' ')
    }
  }

  return arr
}

export const strPrepWithNewLines = str =>
  str
    .trim()
    .replace(/(\n)|(\r\n)/g, ' \n ')
    .replace(/ +/g, ' ')

// возвращает строку с удалёнными лишним пробелами
export const strPrepWithoutNewLines = str =>
  str
    .trim()
    .replace(/(\n)|(\r\n)/g, ' ')
    .replace(/ +/g, ' ')

/* возвращает логическое значение ЛОЖЬ, если набираемый символ
не подходит для набора */
export const charTest = char =>
  !/[0-9 А-ЯЁA-Z.,<>/\\'"\[\]{}|`~!@№#;$%:^?&*()\-_+=\n]/i.test(char)

export function keyboardLayoutTest(char, keyboardLayout) {
  if (/[ЁА-Я№]/i.test(char)) {
    return 'russian'
  } else if (/[A-Z`~@#$^&\[{\]}|'<>]/i.test(char)) {
    return 'english'
  } else {
    return keyboardLayout
  }
}

export const isUpCase = char => char !== char.toLowerCase()

export const isAuxiliaryKeys = function (code) {
  if (
    code === 'Tab' ||
    code === 'CapsLock' ||
    code == 'ShiftLeft' ||
    code == 'ControlLeft' ||
    code == 'MetaLeft' ||
    code == 'AltLeft' ||
    code == 'AltRight' ||
    code == 'ContexMenu' ||
    code == 'MetaRight' ||
    code === 'ControlRight' ||
    code === 'ShiftRight'
  ) {
    return true
  } else {
    return false
  }
}

// проигрывает аудио файл
export const playAudio = function (path, volume) {
  const audio = new Audio()
  audio.src = path
  audio.volume = volume
  audio.play()
}

// возвращает округлённое значение с заданным количество разрядов до запятой
export const rnd = function (num, digit = 0) {
  return Number(Math.round(Number(num + 'e' + digit)) + 'e-' + digit)
}

// возвращает случайное число в заданном диапазоне
export const randomNum = function (min, max) {
  const difference = Math.floor(Math.random() * (max - min + 1))
  return min + difference
}

// возвращает строку с конвертированным из миллисекунд временем
export function msToMinutes(ms) {
  const centiseconds = Math.trunc(ms / 10)
    .toString()
    .slice(-2)
    .padStart(2, '0')
  ms /= 1000
  const minutes = Math.floor(ms / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(ms - minutes * 60)
    .toString()
    .padStart(2, '0')
  return `${minutes}:${seconds}.${centiseconds}`
}

export const getSomeSentences = function (str, minSnippetLength) {
  const strLength = str.length
  if (minSnippetLength >= strLength) return str

  let lowBound = 0
  let highBound = strLength

  // возвращает индекс символа оканчивающего предыдущее предложение
  function findPreviousSignIndex(str, point) {
    let char = str[point]
    let bSign = char === '.' || char === '?' || char === '!' || char === '…'

    // пропускает знаки .?! и ...
    while (bSign) {
      point++
      if (point >= strLength - 1) return strLength - 1
      char = str[point]
      bSign = char === '.' || char === '?' || char === '!' || char === '…'
    }

    return Math.max(
      str.lastIndexOf('.', point),
      str.lastIndexOf('?', point),
      str.lastIndexOf('!', point),
      str.lastIndexOf('…', point),
      0
    )
  }

  // возвращает индекс символа оканчивающего текущее предложение
  function findNextSignIndex(str, point) {
    let char = str[point]
    let bSign = char === '.' || char === '?' || char === '!' || char === '…'

    while (bSign) {
      point++
      if (point >= strLength - 1) return strLength - 1
      char = str[point]
      bSign = char === '.' || char === '?' || char === '!' || char === '…'
    }

    let nextSignIndex = str.length - 1

    if (str.indexOf('.', point) !== -1) {
      const temp = str.indexOf('.', point)
      if (temp < nextSignIndex) nextSignIndex = temp
    }
    if (str.indexOf('?', point) !== -1) {
      const temp = str.indexOf('?', point)
      if (temp < nextSignIndex) nextSignIndex = temp
    }
    if (str.indexOf('!', point) !== -1) {
      const temp = str.indexOf('!', point)
      if (temp < nextSignIndex) nextSignIndex = temp
    }
    if (str.indexOf('…', point) !== -1) {
      const temp = str.indexOf('…', point)
      if (temp < nextSignIndex) nextSignIndex = temp
    }

    return nextSignIndex
  }

  let lastIndex = strLength - 1
  let lastChar = str[lastIndex]
  let bSign =
    lastChar === '.' ||
    lastChar === '?' ||
    lastChar === '!' ||
    lastChar === '…' ||
    charTest(lastChar)

  while (bSign) {
    lastIndex--
    lastChar = str[lastIndex]
    bSign =
      lastChar === '.' ||
      lastChar === '?' ||
      lastChar === '!' ||
      lastChar === '…' ||
      charTest(lastChar)
  }

  // выбирает случайный индекс символа
  let randomIndex = randomNum(0, lastIndex - minSnippetLength)

  lowBound = findPreviousSignIndex(str, randomIndex)
  if (lowBound !== 0) lowBound = lowBound + 2
  highBound = findNextSignIndex(str, lowBound + minSnippetLength) + 1

  return str.substring(lowBound, highBound)
}
