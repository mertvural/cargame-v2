import { defineStore } from 'pinia';

export const useAudio = defineStore('audio', {
  state: () => ({
    
    src : "audio/car-start.mp3",
    isPlay : false

  }),
  getters: {
    
    getSrc() {

        return this.src;

    }

  },
  actions: {

    setIsPlay(e) {

      this.isPlay = e
    },

    setGameStart() {
      this.src = "audio/car-drive.mp3";
    },

    setCrash() {
      this.src = "audio/car-crash.mp3";
    },

    setDrift() {
      this.src = "audio/car-drift.mp3";
    }

  },
});
