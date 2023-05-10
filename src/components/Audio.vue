<template>
    <audio>
        <source :src=src type="audio/mp3">
    </audio>
</template>

<script setup>
import { onMounted, watch } from "vue"
import { storeToRefs } from 'pinia'
import { useAudio } from '@/stores/Audio'
import { useRoad } from '@/stores/Road'
import { useCar } from '@/stores/Car'
const audio = useAudio();
const road = useRoad();
const car = useCar();
const { src, isPlay } = storeToRefs(audio)
const { isGameStart } = storeToRefs(road)
const { isCrash, isDrift } = storeToRefs(car)
onMounted(() => {
    const audioPlayer = document.querySelector("audio");

    watch(isPlay, (newX) => {
        newX && audioPlayer.play()
    })

    watch(isGameStart, (newX) => {
        audio.setGameStart()
        if (newX) {
            audioPlayer.setAttribute("loop", true)
            audioPlayer.load()
            audioPlayer.play()
        }
    })

    watch(isCrash, (newX) => {
        audio.setCrash()
        if (newX) {
            audioPlayer.removeAttribute("loop")
            audioPlayer.load()
            audioPlayer.play()
        }
    })

    watch(isDrift, (newX) => {
        audio.setDrift()
        if (newX) {
            audioPlayer.removeAttribute("loop")
            audioPlayer.load()
            audioPlayer.play()
            setTimeout(() => {
                audio.setGameStart()
                audioPlayer.setAttribute("loop", true)
                audioPlayer.load()
                audioPlayer.play()
            }, 500);
        }
    })

})
</script>

<style lang="scss" scoped></style>