export const refreshTab = () => {
  chrome.tabs.getSelected(null, function (tab) {
    var code = "window.location.reload();";
    chrome.tabs.executeScript(tab.id, { code: code });
  });
};
