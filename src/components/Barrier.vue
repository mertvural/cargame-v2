<template>
    <picture class="barrier" v-if=isLoadingTimer.end
        :style="{ left: styleObject.left + 'px', top: styleObject.top + 'px' }">
        <img src="@/assets/images/barrier.png" />
        <img src="@/assets/images/barrier.png" />
    </picture>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { storeToRefs } from 'pinia'
import { useCar } from "@/stores/Car"
import { useRoad } from "@/stores/Road"
const car = useCar();
const road = useRoad();
const { gameLevel, position, score } = storeToRefs(car)
const { isLoadingTimer, isGameStart } = storeToRefs(road);
const barrierTopPosition = ref(0)
const roadLength = reactive({
    "width": 0,
    "height": 0
});
const styleObject = reactive({
    "left": 0,
    "top": 0
});
watch(isGameStart, (newX, oldX) => {
    if (!oldX) {
        const carW = document.querySelector(".car").clientWidth;
        roadLength.width = document.querySelector(".road").clientWidth;
        roadLength.height = document.querySelector(".road").clientHeight;
        styleObject.left = Math.floor(Math.random() * roadLength.width)
        const barrierSpeed = setInterval(() => {
            barrierTopPosition.value += gameLevel.value;
            styleObject.top = barrierTopPosition.value;
            barrierTopPosition.value > roadLength.height && (
                car.setScore(10),
                barrierTopPosition.value = 0,
                styleObject.top = 0,
                styleObject.left = Math.floor(Math.random() * roadLength.width)
            )
            const crashControl = () => {
                if (styleObject.top >= getOffsetTop() && styleObject.top - getOffsetTop() < carW / 2 && Math.abs(position.value - styleObject.left) <= carW) {
                    road.setIsGameStart(false)
                    clearInterval(barrierSpeed)
                }
            }
            crashControl();
        })
        const getOffsetTop = () => {
            const carOffsetTop = document.querySelector(".car").offsetTop;
            return carOffsetTop
        }
    }
    else {
        
    }
})
</script>

<style lang="scss" scoped>
.barrier {
    width: 70px;
    position: absolute;
    top: 0;
    border-bottom: 3px dashed #000;
    animation: blink 1s infinite;

    @media (max-width:1024px) {
        width: 40px;
    }

    @keyframes blink {
        50% {
            filter: drop-shadow(0 -5px 10px orange)
        }
    }

    >img {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>