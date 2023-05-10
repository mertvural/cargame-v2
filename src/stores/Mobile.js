import { defineStore } from 'pinia';

export const useMobile = defineStore('Mobile', {
    state: () => ({
        positionMobile : null
    }),
    getters: {
        
    },
    actions: {
        
        setArrow(e) {
            this.positionMobile = e
        }

    },
});
