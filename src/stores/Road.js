import { defineStore } from 'pinia';

export const useRoad = defineStore('road', {
  state: () => ({
    isGameStart:false,
    isLoading : true,
    isLoadingTimer : {
      time : 1,
      end : false
    }
  }),
  getters: {
  },
  actions: {
    
    setIsLoadingTimer(e,end) {
      if(end) this.isGameStart = true;
      this.isLoadingTimer = {
        time : e,
        end
      }
    },

    setIsLoading(e) {
      this.isLoading = e;
    },

    setIsGameStart(e) {
      this.isGameStart = e;
    }

  },
});