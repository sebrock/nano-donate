//const dataUser = JSON.parse(localStorage.getItem("user"));
bananoAddressCache = {};
chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    tabs.forEach(function (tab) {
      console.log(tab);
      if (!tab.url.startsWith("chrome://")) {
        var code = "window.location.reload();";
        chrome.tabs.executeScript(tab.id, { code: code });
      }
    });
  });
});
chrome.runtime.onMessage.addListener(function (
  { bananoDonateEntries },
  { tab },
  sendResponse
) {
  // Only continue if URL doesn't start with "chrome://"
  if (!tab.url.startsWith("chrome://")) {
    // Valid banano address/es found so add tab details to cache
    if (bananoDonateEntries.length) {
      bananoAddressCache[tab.id] = {
        url: tab.url,
        bananoDonateEntries,
        id: tab.id,
        banActive: true,
      };
      localStorage.setItem("user", JSON.stringify({ ...bananoAddressCache }));
      chrome.browserAction.setIcon({
        path: "images/images/icon128.png",
        tabId: tab.id,
      });
      // No Nano addresses found so remove tab details from cache
    } else {
      bananoAddressCache[tab.id] = {
        banActive: false,
        url: tab.url,
      };
      localStorage.setItem("user", JSON.stringify({ ...bananoAddressCache }));
      chrome.browserAction.setIcon({
        path: "images/icon128_inactive.png",
        tabId: tab.id,
      });
    }
  }
});

// ---------------------------------------------------

// When tab removed (closed)
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  const bananoAddressCache = localStorage.getItem("user");
  const deletedJson = JSON.parse(bananoAddressCache);
  delete deletedJson[tabId];
  localStorage.setItem("user", JSON.stringify({ ...deletedJson }));
});
