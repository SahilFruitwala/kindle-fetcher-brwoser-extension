const extractData = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    //? chrome.tabs.sendMessage(tabId: number, message: any, options?: object (optional), callback?: function (optional))
    chrome.tabs.sendMessage(tabs[0].id, tabs[0].url);
  });
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.getElementById("extract").addEventListener("click", extractData);
  },
  false
);
