//contains logic related to the ground element
import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const groundElems = document.querySelectorAll('[data-ground')
const SPEED = 0.05

export function setupGround() {
    setCustomProperty(groundElems[0], '--left', 0)      //first ground element
    setCustomProperty(groundElems[1], '--left', 300)    //places second ground element to the right of the fist, making it longer
}

export function updateGround(delta, speedScale) {      //moves the ground
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, '--left', delta * speedScale * SPEED * -1)      //sets ground position and moves to the left every time update() is called based on the delta

        if (getCustomProperty(ground, '--left') <= -300) {                   //checks when ground moves off edge of the screen
            incrementCustomProperty(ground, '--left', 600)      //loops the ground elements
        }
    })
}