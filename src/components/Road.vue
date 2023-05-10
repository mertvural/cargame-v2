<template>
    <section class="road" v-if="!isLoading" :style=styleObject>
        <Car />
        <Barrier />
    </section>
    <Board />
    <div class="timer" v-if="!isLoadingTimer.end && !isLoading">
        <span class="num">
            {{ isLoadingTimer.time }}
        </span>
    </div>
    <Score />
</template>

<script setup>
import { watch, reactive } from "vue";
import Car from "./Car.vue"
import Barrier from "./Barrier.vue"
import Board from "./Board.vue"
import Score from "./Score.vue"
import { storeToRefs } from 'pinia'
import { useCar } from "@/stores/Car"
import { useRoad } from "@/stores/Road"
const car = useCar()
const road = useRoad()
const { isLoadingTimer, isLoading, isGameStart } = storeToRefs(road);
const { speed } = storeToRefs(car);
const styleObject = reactive({
    "background-position-y": "0px"
})

watch(isLoading, () => {
    let timer = isLoadingTimer.value.time;
    const timerInterval = setInterval(() => {
        timer--;
        road.setIsLoadingTimer(timer, false)
        if (timer === 0) {
            clearInterval(timerInterval);
            road.setIsLoadingTimer(timer, true)
        }
    }, 1000);
});

watch(isGameStart, (newX) => {
    const gameStart = setInterval(() => {
        if(!isGameStart.value) {
            clearInterval(gameStart)
            car.setIsCrash(true)
        }
        car.setSpeed()
        styleObject["background-position-y"] = speed.value + "px";
    })
})

</script>

<style lang="scss" scoped>
.road {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAADIAQMAAAAEHol/AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAA7McDGC2AOAAAAAJ0Uk5TAP9bkSK1AAAAFElEQVR4nGNgoC/4/2AUDQCiOwAAjt/p5DQxyFEAAAAASUVORK5CYII=') repeat-y 0 0;
    background-position: center center;
    background-color: #2e2e2e;
    width: 100%;
    max-width: 800px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100vh;
    border-left: 30px solid #18a602;
    border-right: 30px solid #18a602;
}

.timer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000000cf;

    .num {
        color: #fff;
        animation-name: CountDown;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        font-size: 4rem;
    }

}

@keyframes CountDown {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(3);
    }


}
</style>