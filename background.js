'use strict';

chrome.runtime.onStartup.addListener(() => {
  chrome.downloads.setShelfEnabled(false);
});
