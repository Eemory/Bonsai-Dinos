//handles dino logic
import { getCustomProperty, incrementCustomProperty, setCustomProperty } from './updateCustomProperty.js'

//vars
const JUMP_SPEED = .45
const GRAVITY = .0017
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100
let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
//elements
const dinoElem = document.querySelector('[data-dino]')

export function setupDino() {
    isJumping = false
    dinoFrame = 0 
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, '--bottom', 0)
    document.removeEventListener('keydown', onJump)             //removes event listener so they don't stack
    document.addEventListener('keydown', onJump)                //allows jump upon keystroke
    document.removeEventListener('touchstart', onJump)             
    document.addEventListener('touchstart', onJump)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function setDinoLose() {
    dinoElem.src = '../images/dino-lose.png'
}

function handleRun(delta, speedScale){           //moves through animations for running
    if (isJumping) {
        dinoElem.src = `../images/dino-stationary.png`            //when jumping, sets image to stationary
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT          //makes sure animation loops
        dinoElem.src = `../images/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME                          //resets to 0
    }
    currentFrameTime += delta * speedScale          //as game gets faster, dino moves faster
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
}

function handleJump(delta) {                            //handles jump logic
    if (!isJumping) return

    incrementCustomProperty(dinoElem, '--bottom', yVelocity * delta)
    
    if(getCustomProperty(dinoElem, '--bottom') <= 0) {
        setCustomProperty(dinoElem, '--bottom', 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (/*e.code !== 'Space' ||*/ isJumping) return
    yVelocity = JUMP_SPEED
    isJumping = true

}
