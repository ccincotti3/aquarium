import Species from "./species.js"

const modelPath = require("../../static/models/stingray.glb")
export default class Stingray extends Species {
    constructor(pos, name, color, metadata) {
        super()
        this.color = color;
        this.metadata = metadata;
        this.modelName = modelPath
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