import { getDOMElements } from '../js/domElements.js';
import { updateLockedThumbnails } from '../js/utils.js';

export const fullBodyImages = {
    'summer-dress': {
        colors: {
            'pink': {
                thumb: 'summer-dress-pink_thumb.png',
                fullSize: [
                    { src: 'full-body-full-size/summer-dress-pink.png', 
                      zIndex: 12 }
                ]
            },
            'blue': {
                thumb: 'summer-dress-blue_thumb.png',
                fullSize: [
                    { src: 'full-body-full-size/summer-dress-blue.png', 
                      zIndex: 12 }
                ]
            }
        },
        defaultColor: 'pink',
        layeringRules: {
            incompatibleWith: ['tops', 'bottoms']
        }
    }
};

export function loadFullBody() {
    const DOM = getDOMElements();
    // Implementation similar to loadTops
} 