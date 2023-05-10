<template>
    <div class="car" :class="{ crash: isCrash }" v-if=isLoadingTimer.end :style=styleObject>
        <img src="@/assets/images/car.svg" />
    </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia"
import { useRoad } from "@/stores/Road"
import { useCar } from "../stores/Car";
import { useMobile } from "../stores/Mobile";
const road = useRoad()
const car = useCar();
const mobile = useMobile();
const { isLoadingTimer } = storeToRefs(road);
const { position, positionSpeed, isCrash } = storeToRefs(car)
const { positionMobile } = storeToRefs(mobile)
const styleObject = reactive({
    "left": position.value + "px",
    "transform": "rotate(0deg)"
})

onMounted(() => {
    document.querySelectorAll(".mobile-arrow").forEach((item) => {
        item.addEventListener("click", () => {
            switch (positionMobile.value) {
                case "left":
                    leftPosition()
                    break;
                case "right":
                    rightPosition()
                    break;
            }
        })
    })
})

document.addEventListener('keyup', function () {
    if (isCrash.value) return
    switch (event.keyCode) {
        case 37:
            leftPosition()
            break;
        case 39:
            rightPosition()
            break;
        case 32:
            driftPosition();
            break;
    }
})

const leftPosition = () => {
    car.setPosition(-positionSpeed.value);
    styleObject["left"] = car.getPosition + "px"
    styleObject["transform"] = "rotate(-" + positionSpeed.value / 2 + "deg)";
    setTimeout(() => {
        styleObject.transform = "rotate(0deg)";
    }, 200);
}

const rightPosition = () => {
    car.setPosition(positionSpeed.value)
    styleObject.left = car.getPosition + "px"
    styleObject.transform = "rotate(" + positionSpeed.value / 2 + "deg)";
    setTimeout(() => {
        styleObject.transform = "rotate(0deg)";
    }, 200);
}

const driftPosition = () => {
    car.setDrift(true)
    car.setPosition(positionSpeed.value * 3)
    styleObject.left = car.getPosition + "px"
    styleObject.transform = "rotate(" + positionSpeed.value / 2 + "deg)";
    setTimeout(() => {
        styleObject.transform = "rotate(0deg)";
        car.setDrift(false)
    }, 200);
}



</script>

<style lang="scss" scoped>
.car {
    width: 70px;
    height: 145px;
    position: absolute;
    bottom: -30px;
    animation: bottomAnim 3s ease forwards;
    transition: all .3s linear;
    z-index: 1;
    @media (max-width:1024px) {
        animation: bottomAnimMobile 3s ease forwards;
    }

    &.crash {
        transform: rotate(45deg) !important;
    }

    @keyframes bottomAnim {
        0% {
            bottom: -30px;
        }

        100% {
            bottom: 30px;            
        }
    }

    @keyframes bottomAnimMobile {
        0% {
            bottom: -30px;
        }

        100% {
            bottom: 50px;            
        }
    }

    img {
        width: 100%;
        height: 100%;
        display: block;
    }
}

html:has(.night, .midday) {

    .car {
        &::before {
            left: 0
        }

        &::after {
            right: 0
        }

        &::after,
        &::before {
            content: "";
            width: 30px;
            height: 100px;
            display: block;
            position: absolute;
            background: linear-gradient(0deg, #9b9b00, white, transparent);
            bottom: 100%;
            border-radius: 50%;
        }

    }

}
</style>