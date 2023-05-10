import { defineStore } from 'pinia';

export const useCar = defineStore('Car', {
    state: () => ({
        position: 45,
        positionSpeed: 60,
        offsetTop: 0,
        gameLevel: 1,
        score : 0,
        speed: 0,
        isCrash: false,
        isDrift : false
    }),
    getters: {
        getPosition() {
            const road = document.querySelector(".road"),
                car = document.querySelector(".car");
            this.position <= 0 ? this.position = 0 : this.position;
            this.position > road.clientWidth - car.clientWidth ? this.position = road.clientWidth - car.clientWidth : this.position
            return this.position
        }
    },
    actions: {

        setSpeed() {
            this.speed += this.gameLevel;
        },

        setPosition(e) {
            this.position += e;
        },

        setIsCrash(e) {
            this.isCrash = e;
        },

        setGameLevel(e) {
            this.gameLevel = e;
        },

        setScore(e) {
            this.score += e;
            this.gameLevel += e/100;
        },

        setDrift(e) {
            this.isDrift = e
        }

    }
});
