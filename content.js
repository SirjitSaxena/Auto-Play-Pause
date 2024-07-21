document.addEventListener('visibilitychange', () => {
  chrome.storage.local.get(['enabled'], result => {
    if (result.enabled === false) return;

    const videos = document.querySelectorAll('video');
    if (document.hidden) {
      videos.forEach(video => {
        video.pause();
      });
    } else {
      videos.forEach(video => {
        video.play();
      });
    }
  });
});
