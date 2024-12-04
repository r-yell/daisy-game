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

// Take screenshot function
function takeScreenshot() {
    const DOM = getDOMElements();
    
    // Temporarily hide the buttons
    DOM.captureBtn.style.display = 'none';
    DOM.resetButton.style.display = 'none';
    
    html2canvas(DOM.daisyContainer, {
        backgroundColor: null
    }).then(canvas => {
        // Show the buttons again
        DOM.captureBtn.style.display = 'block';
        DOM.resetButton.style.display = 'block';
        
        // Convert canvas to data URL
        const screenshotURL = canvas.toDataURL('image/png');
        
        // Get existing screenshots
        const screenshots = JSON.parse(localStorage.getItem('screenshots'));
        
        // Add new screenshot with timestamp
        screenshots.push({
            id: Date.now(),
            url: screenshotURL
        });
        
        // Save back to localStorage
        localStorage.setItem('screenshots', JSON.stringify(screenshots));
        
        // Show confirmation to user
        alert('Outfit saved to album!');
    });
}

// Load album function
function loadAlbum() {
    const DOM = getDOMElements();
    DOM.albumGrid.innerHTML = ''; // Clear existing thumbnails
    
    // Get screenshots from localStorage and ensure it's an array
    const screenshots = JSON.parse(localStorage.getItem('screenshots')) || [];
    
    // Only proceed with forEach if there are screenshots
    if (screenshots.length === 0) {
        // Optional: Add a message when there are no screenshots
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No outfits saved yet!';
        emptyMessage.style.textAlign = 'center';
        DOM.albumGrid.appendChild(emptyMessage);
    } else {
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
                e.stopPropagation(); // Prevent thumbnail click when clicking delete
                
                // Confirm deletion
                const confirmDelete = confirm('Are you sure you want to delete this screenshot?');
                if (!confirmDelete) {
                    return; // Exit if user cancels
                }
                
                // Filter out this screenshot
                const updatedScreenshots = screenshots.filter(s => s.id !== screenshot.id);
                
                // Save back to localStorage
                localStorage.setItem('screenshots', JSON.stringify(updatedScreenshots));
                
                // Remove the thumbnail container from display
                thumbContainer.remove();
            });
            
            const thumb = document.createElement('img');
            thumb.src = screenshot.url;
            thumb.className = 'album-thumb';
            
            // Add click handler for fullscreen view
            thumb.addEventListener('click', () => {
                DOM.fullscreenImg.src = screenshot.url;
                DOM.fullscreenView.style.display = 'flex';
            });
            
            thumbContainer.appendChild(thumb);
            thumbContainer.appendChild(deleteBtn);
            DOM.albumGrid.appendChild(thumbContainer);
        });
    }
    
    DOM.albumPopup.style.display = 'flex';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM references first
    initializeDOMReferences();
    const DOM = getDOMElements();

    // Add event listeners
    document.getElementById('tops-btn').addEventListener('click', () => {
        loadTops();
        updateLockedThumbnails();
    });
    
    document.getElementById('bottoms-btn').addEventListener('click', () => {
        loadBottoms();
        updateLockedThumbnails();
    });
    
    document.getElementById('full-body-btn').addEventListener('click', () => {
        loadFullBody();
        updateLockedThumbnails();
    });
    
    document.getElementById('shoes-btn').addEventListener('click', () => {
        loadShoes();
        updateLockedThumbnails();
    });
    
    document.getElementById('accessories-btn').addEventListener('click', () => {
        loadAccessories();
        updateLockedThumbnails();
    });
    
    DOM.captureBtn.addEventListener('click', takeScreenshot);
    DOM.resetButton.addEventListener('click', reset);
    DOM.albumButton.addEventListener('click', loadAlbum);
    DOM.albumCloseBtn.addEventListener('click', () => {
        DOM.albumPopup.style.display = 'none';
    });
    DOM.fullscreenCloseBtn.addEventListener('click', () => {
        DOM.fullscreenView.style.display = 'none';
    });

    // Load tops after DOM is ready and elements are initialized
    loadTops();
    updateLockedThumbnails();
});

// Close popups when clicking outside
window.addEventListener('click', (e) => {
    const DOM = getDOMElements();
    if (e.target === DOM.albumPopup) {
        DOM.albumPopup.style.display = 'none';
    }
    if (e.target === DOM.fullscreenView) {
        DOM.fullscreenView.style.display = 'none';
    }
});

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

