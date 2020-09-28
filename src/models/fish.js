import Species from "./species.js"

const modelPath = require("../../static/models/fish.glb")

export default class Fish extends Species {
    constructor(pos, name, color, metadata) {
        super()
        this.metadata = metadata;
        this.modelName = modelPath
        this.name = name || 'Fish'
        this.color = color
        this.position = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.velocity = 0.005
        this.rotationTurnFactor = 0.01
        this.loaded = false
    }
}