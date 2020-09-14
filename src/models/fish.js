import Species from "./species.js"

export default class Fish extends Species {
    constructor(pos, name) {
        super()
        this.modelName = 'fish.glb'
        this.name = name || 'Fish'
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