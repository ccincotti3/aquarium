import Species from "./species.js"

const modelPath = require("../../static/models/marlin.glb")
export default class Stingray extends Species {
    constructor(pos, name) {
        super()
        this.modelName = modelPath
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