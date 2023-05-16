const btnScripting = document.getElementById("btnscript");
const textmessageElement = document.getElementById('message');

btnScripting.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const portTabActive = chrome.tabs.connect(tab.id, {name: "popup"});

  portTabActive.onMessage.addListener(function (msg) {
    textmessageElement.innerText = JSON.stringify(msg, null,2);
  });

  portTabActive.postMessage({cmd: "scraping"});
});

