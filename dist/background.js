//const dataUser = JSON.parse(localStorage.getItem("user"));
chrome.runtime.onMessage.addListener(function (
  { bananoDonateEntries },
  { tab },
  sendResponse
) {
  // Only continue if URL doesn't start with "chrome://"
  if (!tab.url.startsWith("chrome://")) {
    chrome.storage.local.get({ bananoAddressCache: {} }, function ({
      bananoAddressCache,
    }) {
      // Valid banano address/es found so add tab details to cache
      if (bananoDonateEntries.length) {
        bananoAddressCache[tab.id] = {
          url: tab.url,
          bananoDonateEntries,
          id: tab.id,
        };
        localStorage.setItem("user", JSON.stringify({ ...bananoAddressCache }));
        chrome.browserAction.setIcon({
          path: "images/nano-donate-active-128.png",
          tabId: tab.id,
        });
        // No Nano addresses found so remove tab details from cache
      } else {
        const data = JSON.parse(localStorage.getItem("user"));

        localStorage.removeItem("user", {});
        localStorage.setItem("user", { bananoAddressCache });
        chrome.browserAction.setIcon({
          path: "images/nano-donate-inactive-128.png",
          tabId: tab.id,
        });
      }
    });
  }
});

// ---------------------------------------------------

// When tab removed (closed)
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  chrome.storage.local.get({ nanoAddressCache: {} }, function ({
    nanoAddressCache,
  }) {
    localStorage.removeItem("user");
  });
});
