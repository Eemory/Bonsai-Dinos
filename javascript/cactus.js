import { setCustomProperty, incrementCustomProperty, getCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500             //interval for how long between spawning cacti
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector('[data-world]')
let nextCactusTime

export function setupCactus() {
nextCactusTime = CACTUS_INTERVAL_MIN
document.querySelectorAll('[data-cactus]').forEach(cactus => {          //removes old caci when a new game starts
    cactus.remove()
})
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        incrementCustomProperty(cactus, '--left', delta * speedScale * SPEED * - 1)
        if(getCustomProperty(cactus, '--left') <= -100) {               //checks if cactus is off the edge of the screen, if so it's removed
            cactus.remove()
        }
    })

    if(nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta         //makes value smaller until 0 when it makes a cactus
}

export function getCactusRects() {
    return [...document.querySelectorAll('[data-cactus]')].map(cactus => {          //gets rectangle for cacti
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement('img')        //creates cactus element
    cactus.dataset.cactus = true
    cactus.src = '../images/cactus.png'                 //sets image for cactus
    cactus.classList.add('cactus')                      //adds class to cactus element
    setCustomProperty(cactus, '--left', 100)            //moves to right side of screen
    worldElem.append(cactus)            //appends cactus to world div
}

function randomNumberBetween(min, max) {            //generates random number to create cactus
   return  Math.floor(Math.random() * (max - min + 1) + min)
}
