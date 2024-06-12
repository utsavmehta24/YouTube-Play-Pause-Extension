chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url && tab.url.includes('youtube.com/watch')) {
            chrome.scripting.executeScript({
                target: { tabId: activeInfo.tabId },
                func: playVideo
            }).catch((error) => {
                console.error('Error executing play script:', error.message);
            });
        } else {
            chrome.tabs.query({ url: '*://*.youtube.com/watch*' }, (tabs) => {
                tabs.forEach((ytTab) => {
                    chrome.scripting.executeScript({
                        target: { tabId: ytTab.id },
                        func: pauseVideo
                    }).catch((error) => {
                        console.error('Error executing pause script:', error.message);
                    });
                });
            });
        }
    });
});

// Functions to pause and play videos
function playVideo() {
    const video = document.querySelector("video");
    if (video) {
        video.play();
    }
}

function pauseVideo() {
    const video = document.querySelector("video");
    if (video) {
        video.pause();
    }
}
