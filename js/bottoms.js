import { getDOMElements } from '../js/domElements.js';
import { updateLockedThumbnails } from '../js/utils.js';

export const bottomImages = {
    'tulle-skirt': {
        colors: {
            'pink': {
                thumb: 'tulle-skirt-pink_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/tulle-skirt-pink.png', 
                      zIndex: 130 }
                ],
                buttonColor: '#e69c92'
            },
            'black': {
                thumb: 'tulle-skirt-black_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/tulle-skirt-black.png', 
                      zIndex: 130 }
                ],
                buttonColor: '#533935'
            }
        },
        defaultColor: 'pink',
        layeringRules: {
            incompatibleWith: ['sweater', 'cape', 'jersey-tee']
        }
    },

    'flares': {
        colors: {
            'denim': {
                thumb: 'flares-denim_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/flares-denim.png', 
                      zIndex: 110 }
                ],
                buttonColor: '#566983'
            }
        },
        defaultColor: 'denim',
        layeringRules: {
            incompatibleWith: ['print-flares', 'long-shorts', 'cape']
        }
    },

    'print-flares': {
        colors: {
            'pink': {
                thumb: 'print-flares-pink_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/print-flares-pink.png', 
                      zIndex: 110 }
                ],
                buttonColor: '#caa9ba'
            },

            'purple': {
                thumb: 'print-flares-purple_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/print-flares-purple.png', 
                      zIndex: 110 }
                ],
                buttonColor: '#c591a0'
            },

            'blue': {
                thumb: 'print-flares-blue_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/print-flares-blue.png', 
                      zIndex: 110 }
                ],
                buttonColor: '#a5acc8'
            }   
        },
        defaultColor: 'pink',
        layeringRules: {
            incompatibleWith: ['flares', 'long-shorts', 'cape']
        }
    },

    'long-shorts': {
        colors: {
            'denim': {
                thumb: 'long-shorts-denim_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/long-shorts-denim.png', 
                      zIndex: 110 }
                ],
                buttonColor: '#736054'
            },

            'blue': {
                thumb: 'long-shorts-blue_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/long-shorts-blue.png', 
                      zIndex: 110 }
                ],
                buttonColor: '#9391a3'
            }
        },
        defaultColor: 'denim',
        layeringRules: {
            incompatibleWith: ['print-flares', 'flares', 'animal-print-skirt', 'cape']
        }
    },

    'animal-print-skirt': {
        colors: {
            'pink': {
                thumb: 'animal-print-skirt-pink_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/animal-print-skirt-pink.png', 
                      zIndex: 120 }
                ],
                buttonColor: '#ce9192'
            },

            'brown': {
                thumb: 'animal-print-skirt-brown_thumb.png',
                fullSize: [
                    { src: 'bottoms-full-size/animal-print-skirt-brown.png', 
                      zIndex: 120 }
                ],
                buttonColor: '#804e37'
            }
        },
        defaultColor: 'pink',
        layeringRules: {
            incompatibleWith: ['long-shorts', 'cape']
        }
    }
};

export function loadBottoms() {
    const DOM = getDOMElements();
    
    DOM.thumbGrid.innerHTML = '';
    
    Object.entries(bottomImages).forEach(([itemName, itemData]) => {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumb-container';
        
        const img = document.createElement('img');
        img.src = `images/clothes/bottoms/${itemData.colors[itemData.defaultColor].thumb}`;
        img.alt = `${itemName}-${itemData.defaultColor}`;
        img.className = 'thumb';
        img.dataset.garmentName = itemName;
        
        img.addEventListener('click', () => {
            if (img.classList.contains('locked-thumb')) {
                return;
            }

            if (img.classList.contains('selected-thumb')) {
                img.classList.remove('selected-thumb');
                
                const garmentName = img.dataset.garmentName;
                const existingClothes = Array.from(DOM.daisyContainer.querySelectorAll('.clothes-img'));
                existingClothes
                    .filter(img => img.dataset.itemName === garmentName)
                    .forEach(img => img.remove());

                document.querySelectorAll('.locked-thumb').forEach(thumb => {
                    thumb.classList.remove('locked-thumb');
                });
                document.querySelectorAll('.locked-color-btn').forEach(btn => {
                    btn.classList.remove('locked-color-btn');
                });

                updateLockedThumbnails();
                return;
            }
            
            const existingClothes = Array.from(DOM.daisyContainer.querySelectorAll('.clothes-img'));
            const existingItems = new Set(existingClothes.map(img => img.dataset.itemName));
            
            const incompatibleItems = itemData.layeringRules?.incompatibleWith || [];
            const hasIncompatibleItem = incompatibleItems.some(item => existingItems.has(item));
            
            if (hasIncompatibleItem) {
                return;
            }
            
            img.classList.add('selected-thumb');
            
            const currentColor = img.alt.split('-').pop();
            itemData.colors[currentColor].fullSize.forEach(imageData => {
                const fullSizeClothesImg = document.createElement('img');
                fullSizeClothesImg.src = `images/clothes/bottoms/${imageData.src}`;
                fullSizeClothesImg.className = 'clothes-img pop-in-animation';
                fullSizeClothesImg.style.zIndex = imageData.zIndex;
                fullSizeClothesImg.dataset.itemName = itemName;
                fullSizeClothesImg.dataset.type = imageData.type;
                DOM.daisyContainer.appendChild(fullSizeClothesImg);
            });

            updateLockedThumbnails();
        });
        
        if (Object.keys(itemData.colors).length > 1) {
            const colorSwitcher = document.createElement('div');
            colorSwitcher.className = 'color-switcher';
            
            // Create color button that matches color of the garment
            Object.keys(itemData.colors).forEach(color => {
                const colorBtn = document.createElement('button');
                colorBtn.className = 'color-btn';
                colorBtn.dataset.color = color;
                colorBtn.title = color;
                if (itemData.colors[color].buttonColor) {
                    colorBtn.style.backgroundColor = itemData.colors[color].buttonColor;
                }
                
                colorBtn.addEventListener('click', () => {
                    if (colorBtn.classList.contains('locked-color-btn')) {
                        return;
                    }

                    if (!img.classList.contains('selected-thumb')) {
                        img.classList.add('selected-thumb');
                    }

                    img.src = `images/clothes/bottoms/${itemData.colors[color].thumb}`;
                    img.alt = `${itemName}-${color}`;

                    const existingClothes = Array.from(DOM.daisyContainer.querySelectorAll('.clothes-img'));
                    existingClothes
                        .filter(img => img.dataset.itemName === itemName)
                        .forEach(img => img.remove());

                    itemData.colors[color].fullSize.forEach(imageData => {
                        const fullSizeClothesImg = document.createElement('img');
                        fullSizeClothesImg.src = `images/clothes/bottoms/${imageData.src}`;
                        fullSizeClothesImg.className = 'clothes-img pop-in-animation';
                        fullSizeClothesImg.style.zIndex = imageData.zIndex;
                        fullSizeClothesImg.dataset.itemName = itemName;
                        fullSizeClothesImg.dataset.type = imageData.type;
                        DOM.daisyContainer.appendChild(fullSizeClothesImg);
                    });

                    updateLockedThumbnails();
                });
                
                colorSwitcher.appendChild(colorBtn);
            });
            
            thumbContainer.appendChild(img);
            thumbContainer.appendChild(colorSwitcher);
        } else {
            thumbContainer.appendChild(img);
        }
        
        DOM.thumbGrid.appendChild(thumbContainer);
    });
} 