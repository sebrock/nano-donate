import BigNumber from "bignumber.js";
//import { banToRaw, rawToban } from "banano-unit-converter";

export const refreshTab = () => {
  chrome.tabs.getSelected(null, function (tab) {
    var code = "window.location.reload();";
    chrome.tabs.executeScript(tab.id, { code: code });
  });
};

export const convertUnitBan = (value) => {
  //multiply number by ten then multiply to 10**28
  let data = Number(value * 10) * Math.pow(10, 29);
  return BigNumber(data).toFixed();
};
