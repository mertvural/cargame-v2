import { defineStore } from 'pinia';

export const useAudio = defineStore('audio', {
  state: () => ({
    
    src : "/src/assets/audio/car-start.mp3",
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
      this.src = "/src/assets/audio/car-drive.mp3";
    },

    setCrash() {
      this.src = "/src/assets/audio/car-crash.mp3";
    },

    setDrift() {
      this.src = "/src/assets/audio/car-drift.mp3";
    }

  },
});
