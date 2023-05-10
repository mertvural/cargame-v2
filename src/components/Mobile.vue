<template>
    <div class="mobile">
        <span class="left mobile-arrow" @click="mobileArrow('left')"></span>
        <span class="right mobile-arrow" @click="mobileArrow('right')"></span>
    </div>
</template>

<script setup>
import { useMobile } from "@/stores/Mobile"
const mobile = useMobile();
const mobileArrow = (e) => {
    mobile.setArrow(e)
}
</script>

<style lang="scss" scoped>
.mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 120px;
    margin: 0 auto;
    position: absolute;
    bottom: 30%;
    z-index: 2;
    right: 0;

    @media (min-width:1025px) {
        display: none;
    }

    .left,
    .right {
        margin: auto;
        width: 44px;
        height: 32px;
        background-repeat: no-repeat;
        background-size: contain;
        opacity: .5;
        transition: opacity 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:active {
            opacity: .2;
        }
    }

    .left {
        background-image: url("../assets/images/arrow-left.png");
    }

    .right {
        background-image: url("../assets/images/arrow-right.png");
    }
}
</style>