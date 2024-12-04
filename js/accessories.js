import { getDOMElements } from '../js/domElements.js';
import { updateLockedThumbnails } from '../js/utils.js';

export const accessoryImages = {
    'necklace': {
        colors: {
            'gold': {
                thumb: 'necklace-gold_thumb.png',
                fullSize: [
                    { src: 'accessories-full-size/necklace-gold.png', 
                      zIndex: 20 }
                ]
            },
            'silver': {
                thumb: 'necklace-silver_thumb.png',
                fullSize: [
                    { src: 'accessories-full-size/necklace-silver.png', 
                      zIndex: 20 }
                ]
            }
        },
        defaultColor: 'gold',
        layeringRules: {
            incompatibleWith: []
        }
    },
    'hair-bow': {
        colors: {
            'red': {
                thumb: 'hair-bow-red_thumb.png',
                fullSize: [
                    { src: 'accessories-full-size/hair-bow-red.png', 
                      zIndex: 25 }
                ]
            }
        },
        defaultColor: 'red',
        layeringRules: {
            incompatibleWith: []
        }
    }
};

export function loadAccessories() {
    const DOM = getDOMElements();
    // Implementation similar to loadTops
} 