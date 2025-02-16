// Create an object to store DOM references
const DOM = {
    thumbGrid: null,
    daisyContainer: null,
    captureBtn: null,
    resetButton: null,
    albumButton: null,
    albumPopup: null,
    albumGrid: null,
    albumCloseBtn: null,
    fullscreenView: null,
    fullscreenImg: null,
    backgroundBtn: null,
};

// Initialize DOM references
export function initializeDOMReferences() {
    DOM.thumbGrid = document.querySelector('.thumb-grid');
    DOM.daisyContainer = document.querySelector('.daisy-container');
    DOM.captureBtn = document.querySelector('.capture-btn');
    DOM.resetButton = document.querySelector('.reset-btn');
    DOM.albumButton = document.querySelector('#album-btn');
    DOM.albumPopup = document.querySelector('.album-popup');
    DOM.albumGrid = document.querySelector('.album-grid');
    DOM.albumCloseBtn = document.querySelector('.album-close-btn');
    DOM.fullscreenView = document.querySelector('.fullscreen-view');
    DOM.fullscreenImg = document.querySelector('.fullscreen-img');
    DOM.backgroundBtn = document.querySelector('#background-btn');
}

// Export DOM references
export const getDOMElements = () => DOM; 