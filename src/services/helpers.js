// defining the browser and returning object with information about it
export function useGetBrowser() {
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

// смайлики
const regexEmoji =
  /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

// trim, remove \r, emoji and excess spaces => array
export const arrPreparer = function (str) {
  const tempArr = str
    .trim()
    .replace(/(\r\n)/g, ' \n ')
    // .replace(/ +/g, ' ')
    // .replace(regexEmoji, '')
    .split(' ')

  // console.warn(tempArr)

  const arr = []
  let counter = 0

  for (let i = 0; i < tempArr.length; i++) {
    const word = tempArr[i]

    if (word === ' ' && word === '') {
      continue
    } else if (counter === 0 && word === '\n') {
      console.log(counter)
      // skipping empty line
      continue
    } else if (word === '\n' || word.length + counter > 39) {
      // console.log(counter)
      for (let j = 0; j < 40 - counter; j++) {
        arr.push('\n')
      }
      counter = 0
    } else if (word.length + counter <= 39) {
      // console.log(2)
      for (let j = 0; j < word.length; j++) {
        arr.push(word[j])
      }
      arr.push(' ')
      counter = counter + word.length + 1
    }
  }

  return arr
}

// removing excess spaces
export const remExSpaces = (str) =>
  str.replace(/(\n)|(\r\n)/g, ' ').replace(/ +/g, ' ')

// removing emoji
export const remEmoji = (str) => str.replace(regexEmoji, '')

// returns false if a char is inappropriate for being typed
export const charTest = (char) =>
  !/[0-9 А-ЯЁA-Z.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=\n]/i.test(char)

export function langTest(char, langLayout) {
  if (/[А-ЯЁ]/i.test(char)) {
    return 'rus'
  } else if (/[A-Z@#$^&<>|\[\]{}']/i.test(char)) {
    return 'eng'
  } else {
    return langLayout
  }
}

// rounding number to 0,00
export const rnd = (num) => Number(Math.round(Number(num + 'e2')) + 'e-2')

// returning ,00
// const rndRemain = (num) =>

// converting ms to the format: minutes:seconds.mille seconds
export function msToMinutes(ms) {
  ms /= 1000
  const minutes = Math.floor(ms / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(ms - minutes * 60)
    .toString()
    .padStart(2, '0')
  const centiseconds = ms.toString().split('.')[1]?.slice(0, 2).padEnd(2, '0')

  return `${minutes}:${seconds}.${centiseconds}`
}

// checking letter case
// export const charCase = (char) => /[А-ЯЁA-Z.-=\\]/i.test(char) && char === char.toUpperCase();
// export const charCase = (char) => /[А-ЯЁA-Z!"]/i.test(char) && char === char.toUpperCase();

// checking if CapsLock key is active
// const capsLockState = event.getModifierState && event.getModifierState('CapsLock');
// console.log(capsLockState);
// skipping special keys
