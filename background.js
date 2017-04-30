'use strict';

// See https://github.com/tfoxy/chrome-promise
chrome.promise = new ChromePromise();

chrome.commands.onCommand.addListener(async command => {
  const incr = (() => {
    if (command == 'move_left') {
      return -1;
    }
    if (command == 'move_right') {
      return 1;
    };
  })();
  const [currentWindow, highlightedTabs] = await Promise.all([
    chrome.promise.windows.getCurrent({populate: true}),
    chrome.promise.tabs.query({currentWindow: true, highlighted: true}),
  ]);
  const tabToMove = highlightedTabs[0];
  const moveTo = (() => {
    if (incr == 1 && tabToMove.index == currentWindow.tabs.length - 1) {
      return 0;
    } else {
      return tabToMove.index + incr;
    }
  })();
  chrome.promise.tabs.move(tabToMove.id, {index: moveTo});
});
