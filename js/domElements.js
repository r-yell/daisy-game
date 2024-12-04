// Create an object to store DOM references
const DOM = {
    clothesGrid: null,
    daisyContainer: null,
    captureBtn: null,
    resetButton: null,
    albumButton: null,
    albumPopup: null,
    albumGrid: null,
    albumCloseBtn: null,
    fullscreenView: null,
    fullscreenCloseBtn: null,
    fullscreenImg: null
};

// Initialize DOM references
export function initializeDOMReferences() {
    DOM.clothesGrid = document.querySelector('.clothes-grid');
    DOM.daisyContainer = document.querySelector('.daisy-container');
    DOM.captureBtn = document.querySelector('.capture-btn');
    DOM.resetButton = document.querySelector('.reset-btn');
    DOM.albumButton = document.querySelector('.album-btn');
    DOM.albumPopup = document.querySelector('.album-popup');
    DOM.albumGrid = document.querySelector('.album-grid');
    DOM.albumCloseBtn = document.querySelector('.album-close-btn');
    DOM.fullscreenView = document.querySelector('.fullscreen-view');
    DOM.fullscreenCloseBtn = document.querySelector('.fullscreen-close-btn');
    DOM.fullscreenImg = document.querySelector('.fullscreen-img');
}

// Export DOM references
export const getDOMElements = () => DOM; 