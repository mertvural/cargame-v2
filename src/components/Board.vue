<template>
    <div class="score" v-if="newScore">
        Level {{ parseInt(gameLevel) }}
    </div>
    <div class="totalscore">
        <p>
            Level: <b>{{ parseInt(gameLevel) }}</b>
        </p>
        <p>
            Total Score: <b>{{ score }}</b>
        </p>
        <p :class="[timezone]">
            Time : <b>
                {{ time + ':00' }}
            </b>
        </p>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia"
import { useCar } from "@/stores/Car"
const car = useCar();
const { gameLevel, score } = storeToRefs(car);
const newScore = ref(false)
const time = ref(12);
const timezone = ref("day")


watch(score, () => {
    time.value === 24 ? time.value = 0 : time.value += 1;

    switch (time.value) {
        case 18:
            timezone.value = "midday"
            break;
        case 22:
            timezone.value = "night"
            break;
        case 5:
            timezone.value = "day"
            break;
    }
})

watch(gameLevel, (newX, oldX) => {

    if (Math.ceil(newX) > Math.ceil(oldX)) {
        newScore.value = true
        setTimeout(() => {
            newScore.value = false
        }, 2000);
    }
})
</script>

<style lang="scss">
.score {
    border-radius: 50%;
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 200px;
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--secondary-color);
    box-shadow: 0 0 30px var(--primary-color);
    animation: zoomIn 2s ease forwards;

    @keyframes zoomIn {
        0% {
            transform: scale(0);
        }

        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
}

.totalscore {
    background: var(--secondary-color);
    position: fixed;
    bottom: 0;
    left: 0;
    color: var(--primary-color);
    padding: 10px;
    border-radius: 0 20px 20px 0;
    
    @media (max-width:1024px) {
        display:none;
    }

    >p {
        margin: 4px;
        padding: 0;
    }
}
</style>