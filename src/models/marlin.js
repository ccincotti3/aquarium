import Object from "./object.js"

export default class Stingray extends Object {
    constructor(pos, name) {
        super()
        this.modelName = 'marlin.glb'
        this.name = name || 'Marlin'
        this.position = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.velocity = 0.01
        this.loaded = false
    }
}