import { topImages } from '../js/tops.js';
import { bottomImages } from '../js/bottoms.js';
import { fullBodyImages } from '../js/fullBody.js';
import { shoeImages } from '../js/shoes.js';
import { accessoryImages } from '../js/accessories.js';

export function updateLockedThumbnails() {
    // Get all currently worn items from the daisy container
    const wornItems = Array.from(document.querySelectorAll('.clothes-img'));
    const wornItemsMap = new Map(); // Map to store item names and their current colors
    
    // Build map of worn items and their colors
    wornItems.forEach(img => {
        const itemName = img.dataset.itemName;
        // Extract color from the image source
        const srcParts = img.src.split('/');
        const filename = srcParts[srcParts.length - 1];
        const colorMatch = filename.match(/-([^-]+)\./); // Matches color between last hyphen and dot
        if (colorMatch) {
            wornItemsMap.set(itemName, colorMatch[1]);
        }
    });

    // Check each thumbnail against layering rules and current outfit
    document.querySelectorAll('.thumb').forEach(thumb => {
        const garmentName = thumb.dataset.garmentName;
        
        // If this item is worn, mark as selected and set correct color
        if (wornItemsMap.has(garmentName)) {
            const currentColor = wornItemsMap.get(garmentName);
            thumb.classList.add('selected-thumb');
            
            // Find the item data
            const allItems = {...topImages, ...bottomImages, ...fullBodyImages, ...shoeImages, ...accessoryImages};
            const itemData = allItems[garmentName];
            
            if (itemData && itemData.colors[currentColor]) {
                // Update thumbnail to show current color
                const category = thumb.src.split('/clothes/')[1].split('/')[0]; // Extract category from current src
                thumb.src = `images/clothes/${category}/${itemData.colors[currentColor].thumb}`;
                thumb.alt = `${garmentName}-${currentColor}`;
            }
        } else {
            thumb.classList.remove('selected-thumb');
        }

        // Combine all clothing items into one object for lookup
        const itemData = {...topImages, ...bottomImages, ...fullBodyImages, ...shoeImages, ...accessoryImages}[garmentName];
        const incompatibleItems = itemData?.layeringRules?.incompatibleWith || [];
        
        // Check if this item is incompatible with any currently worn items
        const isIncompatible = Array.from(wornItemsMap.keys()).some(wornItem => 
            incompatibleItems.includes(wornItem)
        );

        // Lock or unlock thumbnail based on compatibility
        if (isIncompatible) {
            thumb.classList.add('locked-thumb');
            // Also lock associated color buttons
            const thumbContainer = thumb.closest('.thumb-container');
            if (thumbContainer) {
                const colorButtons = thumbContainer.querySelectorAll('.color-btn');
                colorButtons.forEach(btn => btn.classList.add('locked-color-btn'));
            }
        } else {
            thumb.classList.remove('locked-thumb');
            const thumbContainer = thumb.closest('.thumb-container');
            if (thumbContainer) {
                const colorButtons = thumbContainer.querySelectorAll('.color-btn');
                colorButtons.forEach(btn => btn.classList.remove('locked-color-btn'));
            }
        }
    });
} 