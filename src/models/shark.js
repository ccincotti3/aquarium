import Object from "./object.js"

export default class Shark extends Object {
    constructor(pos) {
        super()
        this.modelName = 'shark.glb'
        this.name = 'Shark'
        this.position = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.direction = { // 1 for positive, 0 for negative
            x: -1,
            y: 0,
            z: 0,
        }
        this.velocity = 0.01
        this.loaded = false
    }
}