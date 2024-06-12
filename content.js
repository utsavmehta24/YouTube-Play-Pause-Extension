// Functions to pause and play the video
function pauseVideo() {
    let video = document.querySelector('video');
    if (video) {
        video.pause();
    }
}

function playVideo() {
    let video = document.querySelector('video');
    if (video) {
        video.play();
    }
}

// Listening for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'pause') {
        pauseVideo();
    } else if (request.action === 'play') {
        playVideo();
    }
});
