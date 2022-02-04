import {charInserter, strPreparer} from "/src/scripts/char-inserter.js";
import {keyboard} from "/src/scripts/keyboard.js";
import {getBrowser} from "/src/scripts/browser-detector.js";


// const btnGenFromSite = document.querySelector('#btn1');
const fromBuffer = document.querySelector('#buffer');

// btnGenFromSite.addEventListener('click', function() {
// dataCall();
// });

const str = '”””the ”hospital”. For the patient, the hospital is — “realist” only while he stays there. His greatest desire is to go back to the “nonhospital” world as fast as possible.\n' +
  'What ”happens” inside any — organization is — effort and cost. To speak of “profit centers” in a business as we are wont to do is polite euphemism. There are only effort centers. The less an organization has to do to produce results, the better does its job. \n'

charInserter(strPreparer(str), 0);

fromBuffer.addEventListener('click', async function() {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText();
    charInserter(strPreparer(str), 0);
    document.querySelector('.field').classList.remove('hidden');
    document.querySelector('.keyboard').classList.remove(('hidden'));
  } else if (br === 'firefox') {
    let str = document.querySelector('#input').value;
    charInserter(strPreparer(str), 0);
  }
});

document.addEventListener('keydown', event => keyboard(event));
