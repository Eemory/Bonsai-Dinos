import { updateGround, setupGround } from './javascript/ground.js'
import { setupDino, updateDino, getDinoRect, setDinoLose } from './javascript/dino.js'
import { setupCactus, updateCactus, getCactusRects } from './javascript/cactus.js'
//vars
const WORLD_HEIGHT = 30
const WORLD_WIDTH = 100
const SPEED_SCALE_INCREASE = 0.00001
let lastTime
let speedScale
let score
//elements
const worldElem = document.querySelector('[data-world')
const scoreElem = document.querySelector('[data-score')
const startScreenElem = document.querySelector('[data-start-screen')

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale)
document.addEventListener('keydown', handleStart, { once: true })       //starts the game


function update(time) {     //creates game loop
    if (lastTime == null) {                  //Skips first call so that the delta begins caluclating when the game starts, not when the screen loads
        lastTime = time
        window.requestAnimationFrame(update)
        return                                  //we return after calling rAF so that the code does not call a second time until the game begins
    }
    const delta = time - lastTime           //calculates time from last update which is the frame rate

    updateGround(delta, speedScale)         
    updateSpeedScale(delta)                       //updates ground based on delta aka frame rate + increases over time with speedScale
    updateScore(delta)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)

    if(checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(update)
}

function checkLose() {                              //checks for collision
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {            //if any conditons are true = overlap
    return rect1.left < rect2.right &&
           rect1.top < rect2.bottom &&
           rect1.right> rect2.left &&
           rect1.bottom > rect2. top
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {           //updates player score
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}

function handleStart() {                //handles starting the game
    lastTime = null
    speedScale = 1
    score = 0
    setupGround()
    setupDino()
    setupCactus()
    startScreenElem.classList.add('hide')
    window.requestAnimationFrame(update)
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener('keydown', handleStart, {once: true})
        startScreenElem.classList.remove('hide')
    }, 100)
}




function setPixelToWorldScale() {        //allows game to be responsive based on screen size
    let worldToPixelScale
    if (window, innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH                     //will pixel scale based on width
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT                                                                         //scaled based on height
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
