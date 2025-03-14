import { getDOMElements } from '../js/domElements.js';
import { updateLockedThumbnails } from '../js/utils.js';

export const fullBodyImages = {
    'cape': {
        colors: {
            'yellow': {
                thumb: 'cape-yellow_thumb.png',
                fullSize: [
                    { src: 'full-body-full-size/cape-front-yellow.png', 
                      zIndex: 180,
                      type: 'front' },

                    { src: 'full-body-full-size/cape-back-yellow.png',
                      zIndex: 0,
                      type: 'back' }
                ],
                buttonColor: '#fac357'
            },

            'green': {
                thumb: 'cape-green_thumb.png',
                fullSize: [
                    { src: 'full-body-full-size/cape-front-green.png', 
                      zIndex: 180, 
                      type: 'front' },

                    { src: 'full-body-full-size/cape-back-green.png',
                      zIndex: 0,
                      type: 'back' }
                ],
                buttonColor: '#c4cd75'
            },

            'pink': {
                thumb: 'cape-pink_thumb.png',
                fullSize: [
                    { src: 'full-body-full-size/cape-front-pink.png', 
                      zIndex: 180, 
                      type: 'front' },

                    { src: 'full-body-full-size/cape-back-pink.png',
                      zIndex: 0,
                      type: 'back' }
                ],
                buttonColor: '#e08796'
            }
        },
        defaultColor: 'yellow',
        layeringRules: {
            incompatibleWith: ['jersey-tee', 'sweater', 'butterfly-tee', 'knit-sweater', 'tulle-skirt', 'flares', 'print-flares', 'long-shorts', 'animal-print-skirt']
        }
    }
};

export function loadFullBody() {
    const DOM = getDOMElements();
    
    DOM.thumbGrid.innerHTML = '';
    
    Object.entries(fullBodyImages).forEach(([itemName, itemData]) => {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumb-container';
        
        const img = document.createElement('img');
        img.src = `images/clothes/full-body/${itemData.colors[itemData.defaultColor].thumb}`;
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
                fullSizeClothesImg.src = `images/clothes/full-body/${imageData.src}`;
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

                    img.src = `images/clothes/full-body/${itemData.colors[color].thumb}`;
                    img.alt = `${itemName}-${color}`;

                    const existingClothes = Array.from(DOM.daisyContainer.querySelectorAll('.clothes-img'));
                    existingClothes
                        .filter(img => img.dataset.itemName === itemName)
                        .forEach(img => img.remove());

                    itemData.colors[color].fullSize.forEach(imageData => {
                        const fullSizeClothesImg = document.createElement('img');
                        fullSizeClothesImg.src = `images/clothes/full-body/${imageData.src}`;
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