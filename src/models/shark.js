import Species from "./species.js"

export default class Shark extends Species {
    constructor(pos, name) {
        super()
        this.modelName = 'shark.glb'
        this.name = name || 'Shark'
        this.position = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.velocity = .0115
        this.loaded = false
        this.direction = { // 1 for positive, 0 for negative
            x: 0,
            y: 0,
            z: 1,
        }
    }
}