<template>
    <div class="score-area" v-if="isCrash">
        <div class="container">
            <Board />
            <button class="btn" @click="playAgain()">Play Again</button>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import Board from "./Board.vue"
import { useRoad } from "@/stores/Road"
import { useCar } from "@/stores/Car"
const car = useCar();
const road = useRoad();
const { isCrash } = storeToRefs(car);

const playAgain = () => {
    location.reload()
}

</script>

<style lang="scss">
.score-area {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
    z-index: 9999;
    opacity: 0;
    animation: opac 2s ease forwards;
    @keyframes opac {
        100% {
            opacity: 1;
        }
    }

    .container {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex-direction: column;
        .btn {
            padding: 20px;
            background-color: var(--secondary-color);
            border:0;
            border-radius: 10px;
            font-size: 1.3rem;
            color:#fff;
            margin: 20px;
            &:hover {
                opacity: .9;
            }
        }
        .totalscore {
            position: relative !important;
            border-radius: 20px !important;
            width: 100%;
            text-align: center;
            font-size: 1.3rem;
            display: block !important;
        }
    }
}
</style>