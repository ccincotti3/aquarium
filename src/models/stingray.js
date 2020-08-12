import Object from "./object.js"

export default class Stingray extends Object {
    constructor(pos, name) {
        super()
        this.modelName = 'stingray.glb'
        this.name = name || 'Stingray'
        this.position = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.velocity = 0.01
        this.loaded = false
    }
}