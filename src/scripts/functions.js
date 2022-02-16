"use strict";
// console.warn('functions');

// defining the browser and returning object with information about it
export function getBrowser() {
  const ua = navigator.userAgent;

  let bName = function() {
    if (ua.search(/Edge/) > -1) return "edge";
    if (ua.search(/MSIE/) > -1) return "ie";
    if (ua.search(/Trident/) > -1) return "ie11";
    if (ua.search(/Firefox/) > -1) return "firefox";
    if (ua.search(/Opera/) > -1) return "opera";
    if (ua.search(/OPR/) > -1) return "operaWebkit";
    if (ua.search(/YaBrowser/) > -1) return "yabrowser";
    if (ua.search(/Chrome/) > -1) return "chrome";
    if (ua.search(/Safari/) > -1) return "safari";
  }();

  let version;
  switch (bName) {
    case "edge":
      version = (ua.split("Edge")[1]).split("/")[1];
      break;
    case "ie":
      version = (ua.split("MSIE ")[1]).split(";")[0];
      break;
    case "ie11":
      bName = "ie";
      version = (ua.split("; rv:")[1]).split(")")[0];
      break;
    case "firefox":
      version = ua.split("Firefox/")[1];
      break;
    case "opera":
      version = ua.split("Version/")[1];
      break;
    case "operaWebkit":
      bName = "opera";
      version = ua.split("OPR/")[1];
      break;
    case "yabrowser":
      version = (ua.split("YaBrowser/")[1]).split(" ")[0];
      break;
    case "chrome":
      version = (ua.split("Chrome/")[1]).split(" ")[0];
      break;
    case "safari":
      version = (ua.split("Version/")[1]).split(" ")[0];
      break;
  }

  let platform = 'desktop';
  if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';

  let browsrObj;

  try {
    browsrObj = {
      platform: platform,
      browser: bName,
      versionFull: version,
      versionShort: version.split(".")[0]
    };
  } catch (err) {
    browsrObj = {
      platform: platform,
      browser: 'unknown',
      versionFull: 'unknown',
      versionShort: 'unknown'
    };
  }
  return browsrObj;
}

// trim, remove \r and excess spaces => array
export const strPreparer = str => str.trim().replace(/(\n)|(\r\n)/g, ' \n ').replace(/ +/g, ' ').split(' ');

// returns false if a char is inappropriate
export const charTest = char => /[0-9 A-ZА-ЯЁ.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(char);
export const langTest = char => /[0-9 А-ЯЁ.,<>/\\'"\[\]{}|!@№#;$%:^?&*()\-_+=]/i.test(char);

// checking if CapsLock key is active
// const capsLockState = event.getModifierState && event.getModifierState('CapsLock');
// console.log(capsLockState);
// skipping special keys