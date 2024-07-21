let isEnabled = true;

chrome.storage.local.get(['enabled'], result => {
  if (result.enabled === false) {
    isEnabled = false;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.hasOwnProperty('enabled')) {
    isEnabled = request.enabled;
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  if (!isEnabled) return;

  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab.active) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: resumeVideo
      });
    }
  });

  chrome.tabs.query({ active: false, currentWindow: true }, tabs => {
    tabs.forEach(tab => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: pauseVideo
      });
    });
  });
});

function pauseVideo() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.pause();
  });
}

function resumeVideo() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.play();
  });
}
