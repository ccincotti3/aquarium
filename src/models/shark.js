import Object from "./object.js"

export default class Shark extends Object {
    constructor(pos, name) {
        super()
        this.modelName = 'shark.glb'
        this.name = name || 'Shark'
        this.position = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.velocity = 0.01
        this.loaded = false
    }
}