function listenForClicks() {
  document.getElementById("extract").addEventListener("click", () => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, tabs[0].url);
      })
      .catch((error) => {
        console.error(`Could not beastify: ${error}`);
      });
  });
}

function reportExecuteScriptError(error) {
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "content-script.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
