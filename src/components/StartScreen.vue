<template>
    <section class="bg" v-if="isLoading">
        <article class="screen">
            <div class="arrowkeys">
                <p>
                    The game is played with the left and right keyboard keys. Press space key to scroll
                    <img src="@/assets/images/arrowKeys.png" />
                </p>
      
                <p>
                    Start the engine to start the game
                </p>                
            </div>

            <button class="startstop noSelect" type="button" @click="switchVoice">
                <div class="startstopinner">
                    <div class="startstopinner2">
                        <ul>
                            <li>Start</li>
                            <div class="startstopinnerline2">
                                <div class="startstopinnerline"></div>
                            </div>
                            <li>Stop</li>
                        </ul>
                    </div>
                </div>
            </button>
        </article>
    </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAudio } from '@/stores/Audio';
import { useRoad } from '@/stores/Road';
const audio = useAudio()
const road = useRoad()
const { isLoading } = storeToRefs(road)

const switchVoice = () => {
    audio.setIsPlay(true)
    setTimeout(() => {
        road.setIsLoading(false)
    }, 1500);
}

</script>

<style lang="scss" scoped>
.bg {
    background: url("@/assets/images/bg.jpg") no-repeat;
    background-position: center center;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    color: var(--secondary-color);

    .screen {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        right: 0;
        background: linear-gradient(to bottom right, #0e1317 0%, #0a0d10 20%, #11161a 50%, #26372f 70%, #23372e 100%);
        width: max-content;
        padding: 56px 71px;
        border-radius: 50% 50% 0 0;

        input[type=checkbox] {
            height: 0;
            width: 0;
            visibility: hidden;

            &:checked {
                &+label {
                    background: var(--primary-color);

                    &::after {
                        left: calc(100% - 5px);
                        transform: translateX(-100%);
                    }
                }
            }
        }

        label {
            cursor: pointer;
            text-indent: -9999px;
            width: 100px;
            height: 50px;
            background: var(--secondary-color);
            display: block;
            border-radius: 100px;
            position: relative;

            &:active {
                &::after {
                    width: 45px;
                }
            }

            &::after {
                content: '';
                position: absolute;
                top: 5px;
                left: 5px;
                width: 40px;
                height: 40px;
                background: #fff;
                border-radius: 90px;
                transition: 0.3s;
            }
        }

        .arrowkeys {
            position: absolute;
            bottom: calc(100% + 50px);
            color: var(--primary-color);
            font-weight: 700;
            text-align: center;
            left: 0;
            text-shadow: 0 0 18px var(--secondary-color);
            filter: drop-shadow(10px 10px 10px var(--secondary-color));
            img {
                margin-top: 10px;
            }
        }
    }
}

.startstop {
    border: none;
    font-family: 'Montserrat';
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    transform: scale(1.5);
    background-image: -webkit-gradient(linear, left top, right bottom, from(#cccccc), color-stop(20%, #6b6b6b), color-stop(50%, black), color-stop(70%, black), to(#6b6b6b));
    background-image: linear-gradient(to bottom right, #cccccc 0%, #6b6b6b 20%, black 50%, black 70%, #6b6b6b 100%);
    border-radius: 100px;
    width: 100px;
    height: 100px;
    margin: auto;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    display: -ms-grid;
    display: grid;
    cursor: pointer;
}

.startstop .startstopinner {
    width: 85px;
    height: 85px;
    border-radius: 100px;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#9e9e9e), color-stop(40%, white), color-stop(70%, #383838), to(white));
    background-image: linear-gradient(to bottom, #9e9e9e 0%, white 40%, #383838 70%, white 100%);
    margin: 2px auto 6px auto;
    padding: 2px;
}

.startstop .startstopinner .startstopinner2 {
    width: 85px;
    height: 85px;
    background-color: #6b6b6b;
    border-radius: 100px;
    -webkit-box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.7);
    box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.7);
    display: -ms-grid;
    display: grid;
}

.startstop .startstopinner .startstopinner2 ul {
    padding: 0;
}

.startstop .startstopinner .startstopinner2 ul li {
    color: #aaaaaa;
    list-style-type: none;
    text-align: center;
    text-transform: uppercase;
    padding: 12px;
}

.startstop .startstopinner .startstopinner2 ul .startstopinnerline2 {
    width: 70px;
    height: 1px;
    margin: auto;
    background-color: black;
    z-index: -1;
}

.startstop .startstopinner .startstopinner2 ul .startstopinnerline {
    width: 70px;
    height: 1px;
    margin: auto;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

@-webkit-keyframes animshadow {
    50% {
        -webkit-box-shadow: 0 0px 20px white;
        box-shadow: 0 0px 20px white;
        background-color: white;
    }

    100% {
        -webkit-box-shadow: 0 0px 4px #e00000;
        box-shadow: 0 0px 4px #e00000;
        background-color: #e00000;
    }
}

@keyframes animshadow {
    50% {
        -webkit-box-shadow: 0 0px 20px white;
        box-shadow: 0 0px 20px white;
        background-color: white;
    }

    100% {
        -webkit-box-shadow: 0 0px 4px #e00000;
        box-shadow: 0 0px 4px #e00000;
        background-color: #e00000;
    }
}

@-webkit-keyframes pressedbutton {
    100% {
        -webkit-transform: scale(1.47);
        transform: scale(1.47);
        -webkit-box-shadow: none;
        box-shadow: none;
    }
}

@keyframes pressedbutton {
    100% {
        -webkit-transform: scale(1.47);
        transform: scale(1.47);
        -webkit-box-shadow: none;
        box-shadow: none;
    }
}

.startstop:hover .startstopinnerline {
    -webkit-box-shadow: 0 0px 4px #e00000;
    box-shadow: 0 0px 4px #e00000;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background-color: #e00000;
}

.startstop:focus {
    border: none;
    outline: none;
    -webkit-animation: pressedbutton 0.2s alternate;
    animation: pressedbutton 0.2s alternate;
}

.startstop:focus .startstopinner {
    border: none;
}

.startstop:focus .startstopinner2 {
    border: none;
}

.startstop:focus .startstopinnerline2 {
    border: none;
}

.startstop:focus .startstopinnerline {
    -webkit-animation: animshadow 0.4s forwards;
    animation: animshadow 0.4s forwards;
    border: none;
}
</style>