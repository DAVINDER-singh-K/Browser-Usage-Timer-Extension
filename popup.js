document.getElementById('resetTimer').addEventListener('click', () => {
  chrome.storage.local.set({ totalSeconds: 0 }, () => {
    document.getElementById('timeDisplay').textContent = '0:00:00';
    chrome.runtime.sendMessage({ action: 'resetTimer' });
  });
});

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateTimeDisplay() {
  chrome.storage.local.get(['totalSeconds'], (result) => {
    if (result.totalSeconds) {
      document.getElementById('timeDisplay').textContent = formatTime(result.totalSeconds);
    }
  });
}

document.addEventListener('DOMContentLoaded', updateTimeDisplay);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.totalSeconds) {
    updateTimeDisplay();
  }
});
