import Species from "./species.js"

const modelPath = require("3d-aquarium/static/models/marlin.glb")
export default class Marlin extends Species {
    constructor(pos, name, color, metadata) {
        super()
        this.color = color;
        this.metadata = metadata;
        this.modelName = modelPath
        this.name = name || 'Marlin'
        this.position = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.velocity = 0.003
        this.loaded = false
    }
}