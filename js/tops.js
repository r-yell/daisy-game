import { getDOMElements } from '../js/domElements.js';
import { updateLockedThumbnails } from '../js/utils.js';

// Object containing all top clothing items with their properties
export const topImages = {
    'jersey-tee': {
        colors: {
            'cream': {
                thumb: 'jersey-tee-cream_thumb.png',
                fullSize: [
                    // Front view of the garment, appears above most other clothing
                    { src: 'tops-full-size/jersey-tee-cream.png', 
                      zIndex: 150,
                      type: 'front' },

                    // Back view, appears behind other clothing
                    { src: 'tops-full-size/jersey-tee-back-cream.png',
                      zIndex: 20,
                      type: 'back' }
                ],
                buttonColor: '#f7c898'
            },
            'green': {
                thumb: 'jersey-tee-green_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/jersey-tee-green.png', 
                      zIndex: 150,
                      type: 'front' },

                    { src: 'tops-full-size/jersey-tee-back-green.png',
                      zIndex: 20,
                      type: 'back' }
                ],
                buttonColor: '#629467'
            },
            'purple': {
                thumb: 'jersey-tee-purple_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/jersey-tee-purple.png', 
                      zIndex: 150,
                      type: 'front' },

                    { src: 'tops-full-size/jersey-tee-back-purple.png',
                      zIndex: 20,
                      type: 'back' }
                ],
                buttonColor: '#d393ad'
            },
            'navy': {
                thumb: 'jersey-tee-navy_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/jersey-tee-navy.png', 
                      zIndex: 150,
                      type: 'front' },

                    { src: 'tops-full-size/jersey-tee-back-navy.png',
                      zIndex: 20,
                      type: 'back' }
                ],
                buttonColor: '#6e576a'
            }
        },
        defaultColor: 'cream',
        layeringRules: {
            // List of items that cannot be worn simultaneously with this item
            incompatibleWith: ['sweater', 'stripe-tank', 'butterfly-tee', 'knit-sweater', 'cape', 'tulle-skirt'] 
        }
    },

    'turtle-neck': {
        colors: {
            'black': {
                thumb: 'turtle-neck-black_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/turtle-neck-black.png', 
                      zIndex: 80 }
                ],
                buttonColor: '#50352c'
            }
        },
        defaultColor: 'black',
        layeringRules: {
            incompatibleWith: ['ruffle-shirt'] 
        }
    },

    'stripe-tank': {
        colors: {
            'red': {
                thumb: 'stripe-tank-red_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/stripe-tank-red.png', 
                      zIndex: 100 }
                ],
                buttonColor: '#d95d59'
            },

            'blue': {
                thumb: 'stripe-tank-blue_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/stripe-tank-blue.png', 
                      zIndex: 100 }
                ],
                buttonColor: '#9da6a8'
            }
        },
        defaultColor: 'red',
        layeringRules: {
            incompatibleWith: ['sweater', 'jersey-tee', 'ruffle-shirt', 'butterfly-tee', 'knit-sweater'] 
        }
    },

    'ruffle-shirt': {
        colors: {
            'pink': {
                thumb: 'ruffle-shirt-pink_thumb.png',
                fullSize: [
                    { 
                        src: 'tops-full-size/ruffle-shirt-front-pink.png', 
                        zIndex: 140,
                        type: 'front'  // Adding type to identify parts
                    },
                    { 
                        src: 'tops-full-size/ruffle-shirt-sleeves.png', 
                        zIndex: 95,
                        type: 'sleeves'
                    }
                ],
                buttonColor: '#e8b2b2'
            },
            'purple': {
                thumb: 'ruffle-shirt-purple_thumb.png',
                fullSize: [
                    { 
                        src: 'tops-full-size/ruffle-shirt-front-purple.png', 
                        zIndex: 140,
                        type: 'front'  // Adding type to identify parts
                    },
                    { 
                        src: 'tops-full-size/ruffle-shirt-sleeves.png', 
                        zIndex: 95,
                        type: 'sleeves'
                    }
                ],
                buttonColor: '#b18ea8'
            }
        },
        defaultColor: 'pink',
        layeringRules: {
            hidePartsWhenWearing: {},
            incompatibleWith: ['stripe-tank', 'stripe-tank', 'butterfly-tee', 'turtle-neck']
        }
    },

    'sweater': {
        colors: {
            'honey': {
                thumb: 'sweater-honey_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/sweater-honey.png', 
                      zIndex: 160 }
                ],
                buttonColor: '#e49c55'
            },
            'purple': {
                thumb: 'sweater-purple_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/sweater-purple.png', 
                      zIndex: 160 }
                ],
                buttonColor: '#c38984'
            }
        },
        defaultColor: 'honey',
        layeringRules: {
            incompatibleWith: ['knit-sweater', 'butterfly-tee', 'stripe-tank', 'jersey-tee', 'cape', 'tulle-skirt'] 
        }
    },

    'butterfly-tee': {
        colors: {
            'charc': {
                thumb: 'butterfly-tee-charc_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/butterfly-tee-charc.png', 
                      zIndex: 140 }
                ],
                buttonColor: '#54413b'
            },
            'pink': {
                thumb: 'butterfly-tee-pink_thumb.png',
                fullSize: [
                    { src: 'tops-full-size/butterfly-tee-pink.png', 
                      zIndex: 140 }
                ],
                buttonColor: '#d69397'
            }
        },
        defaultColor: 'charc',
        layeringRules: {
            incompatibleWith: ['jersey-tee', 'stripe-tank', 'sweater', 'knit-sweater', 'ruffle-shirt', 'cape']
        }
    },

    'knit-sweater': {
        colors: {
            'brown': {
                thumb: 'knit-sweater-brown_thumb.png',
                fullSize: [
                    { 
                        src: 'tops-full-size/knit-sweater-sleeves-brown.png', 
                        zIndex: 100,
                        type: 'sleeves'
                    },
                    { 
                        src: 'tops-full-size/knit-sweater-body-brown.png', 
                        zIndex: 150,
                        type: 'body'
                    },
                    { 
                        src: 'tops-full-size/knit-sweater-back-brown.png',
                        zIndex: 20,
                        type: 'back'
                    }
                ],
                buttonColor: '#745941'
            }
        },
        defaultColor: 'brown',
        layeringRules: {
            incompatibleWith: ['sweater', 'jersey-tee', 'butterfly-tee', 'stripe-tank', 'cape'] 
        }
    }
};

// Export the loadTops function
export function loadTops() {
    const DOM = getDOMElements();
    DOM.thumbGrid.innerHTML = '';
    
    Object.entries(topImages).forEach(([itemName, itemData]) => {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumb-container';
        
        // Create and configure the thumbnail image
        const img = document.createElement('img');
        img.src = `images/clothes/tops/${itemData.colors[itemData.defaultColor].thumb}`;
        img.alt = `${itemName}-${itemData.defaultColor}`;
        img.className = 'thumb';
        img.dataset.garmentName = itemName;
        
        // Handle thumbnail click events
        img.addEventListener('click', () => {
            // Prevent interaction if thumbnail is locked
            if (img.classList.contains('locked-thumb')) {
                return;
            }

            // Handle deselection of currently worn item
            if (img.classList.contains('selected-thumb')) {
                img.classList.remove('selected-thumb');
                
                const garmentName = img.dataset.garmentName;
                const existingClothes = Array.from(DOM.daisyContainer.querySelectorAll('.clothes-img'));
                existingClothes
                    .filter(img => img.dataset.itemName === garmentName)
                    .forEach(img => img.remove());

                // Re-enable all thumbnails and color buttons
                document.querySelectorAll('.locked-thumb').forEach(thumb => {
                    thumb.classList.remove('locked-thumb');
                });
                document.querySelectorAll('.locked-color-btn').forEach(btn => {
                    btn.classList.remove('locked-color-btn');
                });

                // Re-check compatibility for remaining selected garments
                updateLockedThumbnails();

                return;
            }
            
            // Check compatibility with currently worn items
            const existingClothes = Array.from(DOM.daisyContainer.querySelectorAll('.clothes-img'));
            const existingItems = new Set(existingClothes.map(img => img.dataset.itemName));
            
            const incompatibleItems = itemData.layeringRules?.incompatibleWith || [];
            const hasIncompatibleItem = incompatibleItems.some(item => existingItems.has(item));
            
            if (hasIncompatibleItem) {
                return;
            }
            
            // Add selected item to character
            img.classList.add('selected-thumb');
            
            // Add the garment to the daisyContainer
            const currentColor = img.alt.split('-').pop();
            itemData.colors[currentColor].fullSize.forEach(imageData => {
                const fullSizeClothesImg = document.createElement('img');
                fullSizeClothesImg.src = `images/clothes/tops/${imageData.src}`;
                fullSizeClothesImg.className = 'clothes-img';
                fullSizeClothesImg.style.zIndex = imageData.zIndex;
                fullSizeClothesImg.dataset.itemName = itemName;
                fullSizeClothesImg.dataset.type = imageData.type;
                DOM.daisyContainer.appendChild(fullSizeClothesImg);
            });

            // Update locked thumbnails based on current selection
            updateLockedThumbnails();
        });
        
        // Add color switcher if item has multiple colors
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

                    img.src = `images/clothes/tops/${itemData.colors[color].thumb}`;
                    img.alt = `${itemName}-${color}`;

                    const existingClothes = Array.from(DOM.daisyContainer.querySelectorAll('.clothes-img'));
                    existingClothes
                        .filter(img => img.dataset.itemName === itemName)
                        .forEach(img => img.remove());

                    itemData.colors[color].fullSize.forEach(imageData => {
                        const fullSizeClothesImg = document.createElement('img');
                        fullSizeClothesImg.src = `images/clothes/tops/${imageData.src}`;
                        fullSizeClothesImg.className = 'clothes-img';
                        fullSizeClothesImg.style.zIndex = imageData.zIndex;
                        fullSizeClothesImg.dataset.itemName = itemName;
                        fullSizeClothesImg.dataset.type = imageData.type;
                        DOM.daisyContainer.appendChild(fullSizeClothesImg);
                    });

                    // Add this line to update locked thumbnails after color change
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