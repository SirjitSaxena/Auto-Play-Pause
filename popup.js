document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
  
    // Get the current state from storage
    chrome.storage.local.get(['enabled'], result => {
      if (result.enabled === false) {
        toggleButton.textContent = 'Enable';
      } else {
        toggleButton.textContent = 'Disable';
      }
    });
  
    toggleButton.addEventListener('click', () => {
      chrome.storage.local.get(['enabled'], result => {
        const isEnabled = result.enabled !== false;
        const newState = !isEnabled;
  
        // Update the button text
        toggleButton.textContent = newState ? 'Disable' : 'Enable';
  
        // Save the new state
        chrome.storage.local.set({ enabled: newState });
  
        // Update the background script
        chrome.runtime.sendMessage({ enabled: newState });
      });
    });
  });
  