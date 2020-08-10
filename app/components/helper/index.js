import { banToRaw, rawToBan } from "banano-unit-converter";

export const refreshTab = () => {
  chrome.tabs.getSelected(null, function (tab) {
    var code = "window.location.reload();";
    chrome.tabs.executeScript(tab.id, { code: code });
  });
};

export const convertBanToRaw = (value) => {
  return banToRaw(value);
};

export const convertRawToban = (value) => {
  return rawToBan(value);
};
