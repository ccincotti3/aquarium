import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from '../../node_modules/three/build/three.module.js';

const loader = new GLTFLoader().setPath('../../models/')

export default class Species {
    constructor() {
        this.rotationThreshold = 0.01
        this.rotationTurnFactor = 0.01
        this.loader = loader
        this.modelName = undefined
        this.position = {
            x: 0,
            y: 0,
            z: 0,
        }
        this.direction = { // 1 for positive, -1 for negative
            x: 0,
            y: 0,
            z: 1,
        }

        this.lastMagnitude = 0
    }

    get boxHelper() {
        return this.mesh.children.find(c => {
            return c.type === "BoxHelper"
        })
    }

    move() {
            if (!this.loaded) {
                this.loaded = true;
                return null;
            }
            let vector = new THREE.Vector3()
            this.mesh.getWorldPosition(vector);

            const magnitude = Math.sqrt(vector.x**2 + vector.y**2 + vector.z**2)

            const vectorToRotate = {}


            Object.keys(this.direction).forEach((k) => {
                    vectorToRotate[k] = Math.abs(vector[k])
            })

            let max;
            Object.keys(vectorToRotate).forEach(k => {
                max = vectorToRotate[max] > vectorToRotate[k] ? max : k
            })
            // if(this.name === "Shark") {
            //     console.log({ vectorToRotate, max})
            // }

            const directionToRotationAxis = {
                'x': 'y',
                'y': 'x',
                'z': 'y'
            }
            if (magnitude > this.lastMagnitude) {
                const dir = directionToRotationAxis[max]
                const turnVel = .001 * vectorToRotate[max]
                this.mesh.rotation.x += this.mesh.rotation.x < 0 ? 0.001 : -0.001
                this.mesh.rotation.y += this.mesh.rotation.y < 0 ? 0.001 : -0.001
                this.mesh.rotation.z += this.mesh.rotation.z < 0 ? 0.001 : -0.001
                this.mesh.rotation[dir] +=  dir === "x" && this.mesh.position.y < 0 ? -turnVel : turnVel
            if(this.name === "Fish 3") {
                console.log(dir === "x" && this.mesh.position.y < 0)
            }

            }

            this.lastMagnitude = magnitude

            // if (this.mesh.rotation.y > 2 * Math.PI)  {
            //     this.mesh.rotation.y = 0
            // }
            // if (this.mesh.rotation.y < -2 * Math.PI)  {
            //     this.mesh.rotation.y = 0
            // }

            if (this.mesh.rotation.x < -Math.PI / 2)  {
                this.mesh.rotation.x = -Math.PI / 2
            }

            if (this.mesh.rotation.x > Math.PI / 2)  {
                this.mesh.rotation.x = Math.PI / 2
            }



            // let rotationY = 0
            // let rotationZ = 0

            // const direction = new THREE.Vector3(0, 0, 0).applyQuaternion( this.mesh.quaternion );

        
            // const xDirectionFactor = direction.x * vector.x > 0 ?  1 : 0.7;
            // const yDirectionFactor = direction.y * vector.y > 0 ? 1 : 0.7;

            // const rotationRandom = Math.random()
            // if (this.rotationThreshold > rotationRandom) {
            //     const influencingVector = Math.abs(vector.x) > Math.abs(vector.z) ? vector.x : vector.z
            //         rotationY = influencingVector * this.rotationTurnFactor * xDirectionFactor
            //         rotationZ = vector.y * this.rotationTurnFactor * yDirectionFactor
            // }

            // this.mesh.rotation.y += rotationY // Turn around
            // this.mesh.rotation.z += rotationZ // Turn around
            // this.mesh.rotation.x += rotationY // Turn around



            this.mesh.translateX(this.velocity * this.direction.x)
            this.mesh.translateY(this.velocity * this.direction.y)
            this.mesh.translateZ(this.velocity * this.direction.z)
            // // console.log(this.mesh.position)
            // // console.log(vector)
            // // console.log(worldCoords)
            // // console.log(this.mesh.getWorldPosition())
        }

    load(cb, errCb) {
        if(!this.modelName) {
            throw new Error("Please set a file name to load the 3D model")
        }

        this.loader.load(this.modelName, (gltf) => cb(gltf, this), undefined, errCb)
        // this.loader.load(this.modelFileName, cb, undefined, errCb)
    }
}