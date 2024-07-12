let totalSeconds = 0;
let interval;

chrome.storage.local.get(['totalSeconds'], (result) => {
  if (result.totalSeconds) {
    totalSeconds = result.totalSeconds;
  }
});

function startTimer() {
  interval = setInterval(() => {
    totalSeconds++;
    chrome.storage.local.set({ totalSeconds });
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

chrome.idle.onStateChanged.addListener((newState) => {
  if (newState === 'active') {
    startTimer();
  } else {
    stopTimer();
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.idle.queryState(15, (state) => {
    if (state === 'active') {
      startTimer();
    }
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.idle.queryState(15, (state) => {
    if (state === 'active') {
      startTimer();
    }
  });
});
