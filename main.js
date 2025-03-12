import { initializeDOMReferences, getDOMElements } from './js/domElements.js';
import { topImages, loadTops } from './js/tops.js';
import { bottomImages, loadBottoms } from './js/bottoms.js';
import { fullBodyImages, loadFullBody } from './js/fullBody.js';
import { shoeImages, loadShoes } from './js/shoes.js';
import { accessoryImages, loadAccessories } from './js/accessories.js';
import { updateLockedThumbnails } from './js/utils.js';

// Initialize screenshots array in localStorage if it doesn't exist
if (!localStorage.getItem('screenshots')) {
    localStorage.setItem('screenshots', JSON.stringify([]));
}

// Capture and save the current outfit as a screenshot
function takeScreenshot() {
    const DOM = getDOMElements();
    
    // Get existing screenshots first to check count
    const screenshots = JSON.parse(localStorage.getItem('screenshots')) || [];
    const MAX_SCREENSHOTS = 20;
    
    if (screenshots.length >= MAX_SCREENSHOTS) {
        alert('Your album is full! Delete some outfits to make room for new ones.');
        return;  // Exit the function early
    }
    
    // Temporarily hide UI elements for clean screenshot
    DOM.captureBtn.style.display = 'none';
    DOM.resetButton.style.display = 'none';
    
    // Temporarily remove animations from clothes for clean screenshot
    const clothesImages = DOM.daisyContainer.querySelectorAll('.clothes-img');
    clothesImages.forEach(img => {
        img.style.animation = 'none';
        img.style.opacity = '1';
        img.style.filter = 'none';
    });
    
    html2canvas(DOM.daisyContainer, {
        backgroundColor: null
    }).then(canvas => {
        // Show the buttons again
        DOM.captureBtn.style.display = 'block';
        DOM.resetButton.style.display = 'block';
        
        // Restore animations
        clothesImages.forEach(img => {
            img.style.animation = '';
            img.style.opacity = '';
            img.style.filter = '';
        });
        
        // Convert canvas to data URL
        const screenshotURL = canvas.toDataURL('image/png');
        
        // Add new screenshot with timestamp
        screenshots.push({
            id: Date.now(),
            url: screenshotURL
        });
        
        try {
            // Save back to localStorage
            localStorage.setItem('screenshots', JSON.stringify(screenshots));
            // Show confirmation to user
            alert('Outfit saved to album!');
        } catch (e) {
            alert('Your album is full! Delete some outfits to make room for new ones :)');
        }
    });
}

// Display saved outfits in the album view
const MAX_SCREENSHOTS = 20;

function loadAlbum() {
    const DOM = getDOMElements();
    DOM.albumGrid.innerHTML = ''; // Clear existing thumbnails
    
    // Get screenshots from localStorage and ensure it's an array
    const screenshots = JSON.parse(localStorage.getItem('screenshots')) || [];
    
    // Add existing screenshots
    screenshots.forEach(screenshot => {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'album-thumb-container';
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'album-delete-btn';
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'Delete outfit';
        
        // Add delete functionality
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const confirmDelete = confirm('Are you sure you want to delete this screenshot?');
            if (!confirmDelete) return;
            
            // Filter out this screenshot
            const updatedScreenshots = screenshots.filter(s => s.id !== screenshot.id);
            
            // Save back to localStorage
            localStorage.setItem('screenshots', JSON.stringify(updatedScreenshots));
            
            // Remove the thumbnail container
            thumbContainer.remove();
            
            // Update placeholders after deletion
            updatePlaceholders();
        });
        
        const thumb = document.createElement('img');
        thumb.src = screenshot.url;
        thumb.className = 'album-thumb';
        
        // Enable fullscreen view on thumbnail click
        thumb.addEventListener('click', () => {
            DOM.fullscreenImg.src = screenshot.url;
            DOM.fullscreenView.style.display = 'flex';
        });
        
        thumbContainer.appendChild(thumb);
        thumbContainer.appendChild(deleteBtn);
        DOM.albumGrid.appendChild(thumbContainer);
    });
    
    // Add placeholders for remaining slots
    updatePlaceholders();
    
    DOM.albumPopup.style.display = 'flex';
}

// Update placeholder thumbnails to show empty slots
function updatePlaceholders() {
    const DOM = getDOMElements();
    
    // Remove existing placeholders
    const existingPlaceholders = DOM.albumGrid.querySelectorAll('.placeholder-thumb');
    existingPlaceholders.forEach(placeholder => placeholder.remove());
    
    // Count current screenshots
    const screenshots = JSON.parse(localStorage.getItem('screenshots')) || [];
    const remainingSlots = MAX_SCREENSHOTS - screenshots.length;
    
    // Add new placeholders
    for (let i = 0; i < remainingSlots; i++) {
        const placeholderContainer = document.createElement('div');
        placeholderContainer.className = 'album-thumb-container';
        
        const placeholder = document.createElement('div');
        placeholder.className = 'album-thumb-placeholder';
        
        placeholderContainer.appendChild(placeholder);
        DOM.albumGrid.appendChild(placeholderContainer);
    }
}

// Preload images to ensure smooth gameplay
function preloadImages(imageList) {
    return Promise.all(imageList.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }));
}

// Update loading bar progress
function updateLoadingBar(progress) {
    const loadingBar = document.querySelector('.loading-bar');
    loadingBar.style.width = `${progress}%`;
}

// Load and initialize all game content
async function loadAllContent() {
    const loadingImages = [
        'images/loading/sky.png',
        'images/loading/cloud-big.png',
        'images/loading/cloud-med.png',
        'images/loading/cloud-small.png',
        'images/loading/grass.png',
        'images/loading/flowers.png',
        'images/UI/title.svg',
    ];

    const loadingBar = document.querySelector('.loading-bar');
    let loadedCount = 0;
    const totalImages = loadingImages.length;

    try {
        // First load all loading images for loading animation
        const loadingPromises = loadingImages.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    // Update loading bar
                    const progress = (loadedCount / totalImages) * 100;
                    loadingBar.style.width = `${progress}%`;
                    resolve(img);
                };
                img.onerror = reject;
                img.src = src;
            });
        });

        // Wait for all loading images to load
        await Promise.all(loadingPromises);

        // Start the loading animation
        const loadingElements = document.querySelectorAll('.loading-img');
        loadingElements.forEach(el => {
            el.style.opacity = '1';
        });

        // Minimum display time for loading screen (10 seconds)
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Hide loading screen and initialize game
        hideLoadingScreen();
        initializeApp();

    } catch (error) {
        console.error('Failed to load some images', error);
    }
    

    // Start timing when loading begins
    const startTime = Date.now();
    const minimumLoadTime = 9000; // 10 seconds in milliseconds
    
    // Collect all image URLs from your image objects
    const allImages = [];
    
    // Add tops images
    Object.values(topImages).forEach(item => {
        Object.values(item.colors).forEach(color => {
            allImages.push(`images/clothes/tops/${color.thumb}`);
            color.fullSize.forEach(img => {
                allImages.push(`images/clothes/tops/${img.src}`);
            });
        });
    });

    // Add bottoms images
    Object.values(bottomImages).forEach(item => {
        Object.values(item.colors).forEach(color => {
            allImages.push(`images/clothes/bottoms/${color.thumb}`);
        });
    });

    // Add full body images
    Object.values(fullBodyImages).forEach(item => {
        Object.values(item.colors).forEach(color => {
            allImages.push(`images/clothes/full-body/${color.thumb}`);
        });
    });

    // Add shoes images
    Object.values(shoeImages).forEach(item => {
        Object.values(item.colors).forEach(color => {
            allImages.push(`images/clothes/shoes/${color.thumb}`);
        });
    });

    // Add accessories images
    Object.values(accessoryImages).forEach(item => {
        Object.values(item.colors).forEach(color => {
            allImages.push(`images/clothes/acc/${color.thumb}`);
        });
    });
    
    
    let loadedImages = 0;
    
    try {
        // Load all images
        await Promise.all(allImages.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    loadedImages++;
                    updateLoadingBar((loadedImages / totalImages) * 100);
                    resolve(img);
                };
                img.onerror = reject;
                img.src = src;
            });
        }));
        
        // Calculate how much time has passed
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minimumLoadTime - elapsedTime;
        
        // If we haven't reached minimum time, wait the remaining duration
        if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        // Hide loading screen when done
        hideLoadingScreen();
        
        // Initialize the rest of your app
        initializeApp();
    } catch (error) {
        console.error('Failed to load some images:', error);
    }
}

// State variables for background cycling
let currentBackgroundIndex = 0;
const backgrounds = [
    '#fef4e9',  // Cream
    '#d9c8db',  // Lilac
    '#e4e6e6',  // Sky blue
    '#f8c7b8',  // Pale peach
];

// Cycle through background options
function cycleBackground() {
    const DOM = getDOMElements();
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    DOM.daisyContainer.style.backgroundColor = backgrounds[currentBackgroundIndex];
}

// Initialize app after DOM and assets are loaded
function initializeApp() {
    initializeDOMReferences();
    const DOM = getDOMElements();

    // Add click handlers for category buttons
    const categoryButtons = {
        'tops-btn': loadTops,
        'bottoms-btn': loadBottoms,
        'full-body-btn': loadFullBody,
        'shoes-btn': loadShoes,
        'accessories-btn': loadAccessories
    };

    Object.entries(categoryButtons).forEach(([btnId, loadFunction]) => {
        const btn = document.getElementById(btnId);
        if (!btn) {
            console.error(`Button not found: ${btnId}`);
            return;  // Skip this iteration if button not found
        }
        
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.clothes-btn').forEach(button => {
                button.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active')
            
            // Clear and load new thumbnails
            DOM.thumbGrid.innerHTML = '';
            loadFunction();
            
            // Add this line to update locked states after loading new category
            updateLockedThumbnails();
        });
    });

    // Add other event listeners with checks
    if (!DOM.captureBtn) console.error('Capture button not found');
    if (!DOM.resetButton) console.error('Reset button not found');
    if (!DOM.albumButton) console.error('Album button not found');

    if (DOM.captureBtn) {
        DOM.captureBtn.addEventListener('click', takeScreenshot);
    }
    if (DOM.resetButton) {
        DOM.resetButton.addEventListener('click', reset);
    }
    if (DOM.albumButton) {
        DOM.albumButton.addEventListener('click', loadAlbum);
    }

    DOM.albumCloseBtn.addEventListener('click', () => {
        DOM.albumPopup.style.display = 'none';
    });

    // Add background button click handler
    if (DOM.backgroundBtn) {
        DOM.backgroundBtn.addEventListener('click', cycleBackground);
    } else {
        console.error('Background button not found');
    }

    // Set initial background
    DOM.daisyContainer.style.backgroundColor = backgrounds[currentBackgroundIndex];

    // Load initial category
    loadTops();
    updateLockedThumbnails();
}

// Start loading when the document is ready
document.addEventListener('DOMContentLoaded', loadAllContent);

// Close popups when clicking outside
window.addEventListener('click', (e) => {
    const DOM = getDOMElements();
    if (e.target === DOM.albumPopup) {
        DOM.albumPopup.style.display = 'none';
    }
    if (e.target === DOM.fullscreenImg) {
        DOM.fullscreenView.style.display = 'none';
    }
});

// Reset all clothing elements and selection states
function reset() {
    const DOM = getDOMElements();
    // Remove all clothes-img elements from daisy-container
    const clothingElements = DOM.daisyContainer.querySelectorAll('.clothes-img');
    clothingElements.forEach(element => element.remove());

    // Remove selected-thumb class from all thumbnails
    document.querySelectorAll('.selected-thumb').forEach(thumb => {
        thumb.classList.remove('selected-thumb');
    });

    // Re-enable all thumbnails and color buttons
    document.querySelectorAll('.locked-thumb').forEach(thumb => {
        thumb.classList.remove('locked-thumb');
    });
    document.querySelectorAll('.locked-color-btn').forEach(btn => {
        btn.classList.remove('locked-color-btn');
    });
}

function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('fade-out');
    
    // Wait for fade animation to complete before removing
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2000);  // 2000ms = 2s to match the transition duration
}

