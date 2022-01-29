import {charInserter, strPreparer} from "/src/scripts/char-inserter.js";
import {keyboard} from "/src/scripts/keyboard.js";
import {getBrowser} from "/src/scripts/browser-detector.js";


// const btnGenFromSite = document.querySelector('#btn1');
const btnGenFromBuffer = document.querySelector('#btn2');

// btnGenFromSite.addEventListener('click', function() {
  // dataCall();
// });

const str = "We all have seen many books and articles where one diagram attempts to capture the gist of the architecture\n" +
  "of a system. But looking carefully at the set of boxes and arrows shown on these diagrams, it becomes clear\n" +
  "that their authors have struggled hard to represent more on one blueprint than it can actually express. Are\n" +
  "the boxes representing running programs? Or chunks of source code? Or physical computers? Or merely\n" +
  "logical groupings of functionality? Are the arrows representing compilation dependencies? Or control\n" +
  "flows? Or data flows? Usually it is a bit of everything. Does an architecture need a single architectural\n" +
  "style? Sometimes the architecture of the software suffers scars from a system design that went too far into\n" +
  "prematurely partitioning the software, or from an over-emphasis on one aspect of software development:\n" +
  "data engineering, or run-time efficiency, or development strategy and team organization. Often also the\n" +
  "architecture does not address the concerns of all its “customers” (or “stakeholders” as they are called at\n" +
  "USC). This problem has been noted by several authors: Garlan & Shaw1, Abowd & Allen at CMU,\n" +
  "Clements at the SEI. As a remedy, we propose to organize the description of a software architecture using\n" +
  "several concurrent views, each one addressing one specific set of concerns"
charInserter(strPreparer(str), 0);
btnGenFromBuffer.addEventListener('click', async function() {
  // defining browser
  const br = getBrowser().browser;
  if (br === 'chrome' || br === 'yabrowser') {
    let str = await navigator.clipboard.readText();
    charInserter(strPreparer(str), 0);
  } else if (br === 'firefox') {
    let str = document.querySelector('#input').value;
    charInserter(strPreparer(str), 0);
  }
});

document.addEventListener('keydown', event => keyboard(event));
