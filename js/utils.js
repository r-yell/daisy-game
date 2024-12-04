import { topImages } from '../js/tops.js';
import { bottomImages } from '../js/bottoms.js';
import { fullBodyImages } from '../js/fullBody.js';
import { shoeImages } from '../js/shoes.js';
import { accessoryImages } from '../js/accessories.js';

export function updateLockedThumbnails() {
    const selectedItems = new Set(
        Array.from(document.querySelectorAll('.selected-thumb')).map(thumb => thumb.dataset.garmentName)
    );

    document.querySelectorAll('.thumb').forEach(thumb => {
        const garmentName = thumb.dataset.garmentName;
        const itemData = {...topImages, ...bottomImages, ...fullBodyImages, ...shoeImages, ...accessoryImages}[garmentName];
        const incompatibleItems = itemData?.layeringRules?.incompatibleWith || [];
        
        const isIncompatible = Array.from(selectedItems).some(selectedItem => 
            incompatibleItems.includes(selectedItem)
        );

        if (isIncompatible) {
            thumb.classList.add('locked-thumb');
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