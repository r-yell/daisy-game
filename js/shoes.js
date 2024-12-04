import { getDOMElements } from '../js/domElements.js';
import { updateLockedThumbnails } from '../js/utils.js';

export const shoeImages = {
    'sneakers': {
        colors: {
            'white': {
                thumb: 'sneakers-white_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/sneakers-white.png', 
                      zIndex: 1 }
                ]
            },
            'black': {
                thumb: 'sneakers-black_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/sneakers-black.png', 
                      zIndex: 1 }
                ]
            }
        },
        defaultColor: 'white',
        layeringRules: {
            incompatibleWith: [] // Can be worn with anything
        }
    },
    'boots': {
        colors: {
            'brown': {
                thumb: 'boots-brown_thumb.png',
                fullSize: [
                    { src: 'shoes-full-size/boots-brown.png', 
                      zIndex: 1 }
                ]
            }
        },
        defaultColor: 'brown',
        layeringRules: {
            incompatibleWith: []
        }
    }
};

export function loadShoes() {
    const DOM = getDOMElements();
    // Similar structure to loadTops
} 