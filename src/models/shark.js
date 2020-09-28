import Species from "./species.js"

const modelPath = require("3d-aquarium/static/models/shark.glb")
export default class Shark extends Species {
    constructor(pos, name, color, metadata) {
        super()
        this.modelName = modelPath
        this.name = name || 'Shark'
        this.position = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.velocity = .0115
        this.loaded = false
        this.color = color
        this.metadata = metadata
        this.direction = { // 1 for positive, 0 for negative
            x: 0,
            y: 0,
            z: 1,
        }
    }
}