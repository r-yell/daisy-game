import { getDOMElements } from '../js/domElements.js';
import { updateLockedThumbnails } from '../js/utils.js';

export const accessoryImages = {
    'beret': {
        colors: {
            'yellow': {
                thumb: 'beret-yellow_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/beret-yellow.png', 
                      zIndex: 220 }
                ]
            },
            
            'green': {
                thumb: 'beret-green_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/beret-green.png', 
                      zIndex: 220 }
                ]
            },

            'pink': {
                thumb: 'beret-pink_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/beret-pink.png', 
                      zIndex: 220 }
                ]
            }
        },

        defaultColor: 'yellow',
        layeringRules: {
            incompatibleWith: ['bow', 'headband']
        }
    },

    'bow': {
        colors: {
            'peach': {
                thumb: 'bow-peach_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/bow-peach.png', 
                      zIndex: 210 }
                ]
            },
            
            'pink': {
                thumb: 'bow-pink_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/bow-pink.png', 
                      zIndex: 210 }
                ]
            },

            'purple': {
                thumb: 'bow-purple_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/bow-purple.png', 
                      zIndex: 210 }
                ]
            }
        },

        defaultColor: 'peach',
        layeringRules: {
            incompatibleWith: ['beret', 'bows', 'thin-bows']
        }
    },

    'bows': {
        colors: {
            'purple': {
                thumb: 'bows-purple_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/bows-purple.png', 
                      zIndex: 210,
                      type: 'front' },

                    { src: 'acc-full-size/bows-back-purple.png', 
                      zIndex: 30,
                      type: 'back' }
                ]
            }
        },
        defaultColor: 'purple',
        layeringRules: {
            incompatibleWith: ['bow', 'thin-bows']
        }
    },

    'headband': {
        colors: {
            'peach': {
                thumb: 'headband-peach_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/headband-peach.png', 
                      zIndex: 200 }
                ]
            },

            'pink': {
                thumb: 'headband-pink_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/headband-pink.png', 
                      zIndex: 200 }
                ]
            },

            'purple': {
                thumb: 'headband-purple_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/headband-purple.png', 
                      zIndex: 200 }
                ]
            }
        },
        defaultColor: 'peach',
        layeringRules: {
            incompatibleWith: ['beret']
        }
    },

    'thin-bows': {
        colors: {
            'pink': {
                thumb: 'thin-bows-pink_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/thin-bows-front-pink.png', 
                      zIndex: 210,
                      type: 'front'},

                    { src: 'acc-full-size/thin-bows-back-pink.png', 
                      zIndex: 30,
                      type: 'back'}
                ]
            }
        },
        defaultColor: 'pink',
        layeringRules: {
            incompatibleWith: ['bows', 'bow']
        }
    },

    'necklace': {
        colors: {
            'heart': {
                thumb: 'necklace-heart_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/necklace-heart.png', 
                      zIndex: 170 }
                ]
            }
        },
        defaultColor: 'heart',
        layeringRules: {
            incompatibleWith: []
        }
    },

    'fingerless-gloves': {
        colors: {
            'rainbow': {
                thumb: 'fingerless-gloves-rainbow_thumb.png',
                fullSize: [
                    { src: 'acc-full-size/fingerless-gloves-left-rainbow.png', 
                      zIndex: 90,
                      type: 'front' },

                    { src: 'acc-full-size/fingerless-gloves-right-rainbow.png', 
                      zIndex: 90,
                      type: 'back' }
                ]
            }
        },
        defaultColor: 'rainbow',
        layeringRules: {
            incompatibleWith: []
        }
    },
};

export function loadAccessories() {
    const DOM = getDOMElements();
    
    DOM.clothesGrid.innerHTML = '';
    
    Object.entries(accessoryImages).forEach(([itemName, itemData]) => {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumb-container';
        
        const img = document.createElement('img');
        const defaultColor = itemData.defaultColor || Object.keys(itemData.colors)[0];
        img.src = `images/clothes/acc/${itemData.colors[defaultColor].thumb}`;
        img.alt = `${itemName}-${defaultColor}`;
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
                fullSizeClothesImg.src = `images/clothes/acc/${imageData.src}`;
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
            
            Object.keys(itemData.colors).forEach(color => {
                const colorBtn = document.createElement('button');
                colorBtn.className = 'color-btn';
                colorBtn.dataset.color = color;
                colorBtn.title = color;
                
                colorBtn.addEventListener('click', () => {
                    if (colorBtn.classList.contains('locked-color-btn')) {
                        return;
                    }

                    if (!img.classList.contains('selected-thumb')) {
                        img.classList.add('selected-thumb');
                    }

                    img.src = `images/clothes/acc/${itemData.colors[color].thumb}`;
                    img.alt = `${itemName}-${color}`;

                    const existingClothes = Array.from(DOM.daisyContainer.querySelectorAll('.clothes-img'));
                    existingClothes
                        .filter(img => img.dataset.itemName === itemName)
                        .forEach(img => img.remove());

                    itemData.colors[color].fullSize.forEach(imageData => {
                        const fullSizeClothesImg = document.createElement('img');
                        fullSizeClothesImg.src = `images/clothes/acc/${imageData.src}`;
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
        
        DOM.clothesGrid.appendChild(thumbContainer);
    });
} 