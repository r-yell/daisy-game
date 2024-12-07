import { getDOMElements } from '../js/domElements.js';
import { updateLockedThumbnails } from '../js/utils.js';

export const shoeImages = {
    'leggings': {
        colors: {
            'purple': {
                thumb: 'leggings-purple_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/leggings-purple.png', 
                      zIndex: 60 }
                ],
                buttonColor: '#d1a1b6'  
            },

            'white': {
                thumb: 'leggings-white_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/leggings-white.png', 
                      zIndex: 60 }
                ],
                buttonColor: '#ead7d2'  
            }
        },
        defaultColor: 'purple',
        layeringRules: {
            incompatibleWith: []
        }
    },

    'loafers': {
        colors: {
            'brown': {
                thumb: 'loafers-brown_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/loafers-brown.png', 
                      zIndex: 80 }
                ],
                buttonColor: '#794d3b'  
            }
        },

        defaultColor: 'brown',
        layeringRules: {
            incompatibleWith: ['mary-janes', 'sneakers']
        }
    },

    'mary-janes': {
        colors: {
            'black': {
                thumb: 'mary-janes-black_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/mary-janes-black.png', 
                      zIndex: 80,
                      type: 'front' },

                    { src: 'shoes-full-size/mary-janes-back-black.png', 
                      zIndex: 80,
                      type: 'back' }
                ],
                buttonColor: '#51362d'  
            }
        },

        defaultColor: 'black',
        layeringRules: {
            incompatibleWith: ['loafers', 'sneakers']
        }
    },

    'ruffle-hem-socks': {
        colors: {
            'white': {
                thumb: 'ruffle-hem-socks-white_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/ruffle-hem-socks-white.png', 
                      zIndex: 70 }
                ],
                buttonColor: '#ead6d1'  
            },

            'pink': {
                thumb: 'ruffle-hem-socks-pink_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/ruffle-hem-socks-pink.png', 
                      zIndex: 70 }
                ],
                buttonColor: '#e7b7d6'  
            }
        },

        defaultColor: 'white',
        layeringRules: {
            incompatibleWith: ['socks', 'sports-socks']
        }
    },

    'sneakers': {
        colors: {
            'black': {
                thumb: 'sneakers-black_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/sneakers-black.png', 
                      zIndex: 80 }
                ],
                buttonColor: '#51362d'  
            },

            'blue': {
                thumb: 'sneakers-blue_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/sneakers-blue.png', 
                      zIndex: 80 }
                    ],
                buttonColor: '#bdbcc5'  
            }
        },

        defaultColor: 'black',
        layeringRules: {
            incompatibleWith: ['mary-janes', 'loafers']
        }
    },

    'socks': {
        colors: {
            'white': {
                thumb: 'socks-white_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/socks-white.png', 
                      zIndex: 70 }
                ],
                buttonColor: '#ead7d2'  
            },

            'purple': {
                thumb: 'socks-purple_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/socks-purple.png', 
                      zIndex: 70 }
                ],
                buttonColor: '#d6bbcc'  
            },

            'blue   ': {
                thumb: 'socks-blue_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/socks-blue.png', 
                      zIndex: 70 }
                ],
                buttonColor: '#c6c6cf'  
            }
        },

        defaultColor: 'white',
        layeringRules: {
            incompatibleWith: ['sports-socks', 'ruffle-hem-socks']
        }
    },

    'sports-socks': {
        colors: {
            'honey': {
                thumb: 'sports-socks-honey_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/sports-socks-honey.png', 
                      zIndex: 70 }
                ],
                buttonColor: '#e6ad65'  
            },

            'green': {
                thumb: 'sports-socks-green_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/sports-socks-green.png', 
                      zIndex: 70 }
                ],
                buttonColor: '#e0dc6b'  
            },

            'pink': {
                thumb: 'sports-socks-pink_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/sports-socks-pink.png', 
                      zIndex: 70 }
                ],
                buttonColor: '#e092a2'  
            }
        },

        defaultColor: 'honey',
        layeringRules: {
            incompatibleWith: ['socks', 'ruffle-hem-socks']
        }
    }
};

export function loadShoes() {
    const DOM = getDOMElements();
    
    DOM.thumbGrid.innerHTML = '';
    
    Object.entries(shoeImages).forEach(([itemName, itemData]) => {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumb-container';
        
        const img = document.createElement('img');
        img.src = `images/clothes/shoes/${itemData.colors[itemData.defaultColor].thumb}`;
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
                fullSizeClothesImg.src = `images/clothes/shoes/${imageData.src}`;
                fullSizeClothesImg.className = 'clothes-img';
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

                    img.src = `images/clothes/shoes/${itemData.colors[color].thumb}`;
                    img.alt = `${itemName}-${color}`;

                    const existingClothes = Array.from(DOM.daisyContainer.querySelectorAll('.clothes-img'));
                    existingClothes
                        .filter(img => img.dataset.itemName === itemName)
                        .forEach(img => img.remove());

                    itemData.colors[color].fullSize.forEach(imageData => {
                        const fullSizeClothesImg = document.createElement('img');
                        fullSizeClothesImg.src = `images/clothes/shoes/${imageData.src}`;
                        fullSizeClothesImg.className = 'clothes-img';
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