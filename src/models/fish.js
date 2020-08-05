import Object from "./object.js"
import * as THREE from '../../node_modules/three/build/three.module.js';

export default class Fish extends Object {
    constructor(pos) {
        super()
        this.modelName = 'fish.glb'
        this.name = 'Fish'
        this.position = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.direction = { // 1 for positive, 0 for negative
            x: -1,
            y: 0,
            z: 0,
        }
        this.velocity = 0.01
        this.rotationTurnFactor = 0.008
        this.loaded = false
        this.rotationThreshold = 0.1
    }


    move(cam) {
        if (!this.loaded) {
            this.loaded = true;
            return null;
        }
        let vector = new THREE.Vector3()
        this.mesh.getWorldPosition(vector);
        let rotationY = 0
        let rotationZ = 0

        console.log(vector)

        const rotationRandom = Math.random()
        if (this.rotationThreshold > rotationRandom) {
            const influencingVector = Math.abs(vector.x) > Math.abs(vector.z) ? vector.x : vector.z
            rotationY = influencingVector * this.rotationTurnFactor
            rotationZ = vector.y * this.rotationTurnFactor
        }


        this.mesh.rotation.y += rotationY // Turn around
        this.mesh.rotation.z += rotationZ // Turn around

        if (this.mesh.rotation.z > Math.PI / 2) {
            this.mesh.rotation.z = Math.PI / 2
        }

        if (this.mesh.rotation.z < -Math.PI / 2)  {
            this.mesh.rotation.z = -Math.PI / 2
        }


        this.mesh.translateX(this.velocity * this.direction.x)
        // console.log(this.mesh.position)
        // console.log(vector)
        // console.log(worldCoords)
        // console.log(this.mesh.getWorldPosition())
    }
}