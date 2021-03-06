import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three/build/three.module';

const loader = new GLTFLoader().setPath('')

export default class Species {
    constructor(pos, name, color, metadata) {
        this.rotationThreshold = 0.0
        this.rotationTurnFactor = 0.01
        this.loader = loader
        this.modelName = name;
        this.color = color;
        this.metadata = metadata;
        this.position = pos || { x: 0, y: 0, z: 0, }
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

            const directionToRotationAxis = {
                'x': 'y',
                'y': 'x',
                'z': 'y'
            }
            if (magnitude > this.lastMagnitude) {
                const dir = directionToRotationAxis[max]
                const turnVel = .0006 * vectorToRotate[max]
                this.mesh.rotation.x += this.mesh.rotation.x < 0 ? 0.001 : -0.001
                this.mesh.rotation.y += this.mesh.rotation.y < 0 ? 0.001 : -0.001
                this.mesh.rotation.z += this.mesh.rotation.z < 0 ? 0.001 : -0.001
                this.mesh.rotation[dir] +=  dir === "x" && this.mesh.position.y < 0 ? -turnVel : turnVel
            }

            this.lastMagnitude = magnitude

            if (this.mesh.rotation.x < -Math.PI / 2)  {
                this.mesh.rotation.x = -Math.PI / 2
            }

            if (this.mesh.rotation.x > Math.PI / 2)  {
                this.mesh.rotation.x = Math.PI / 2
            }

            this.mesh.translateX(this.velocity * this.direction.x)
            this.mesh.translateY(this.velocity * this.direction.y)
            this.mesh.translateZ(this.velocity * this.direction.z)
 
        }

    load(cb, errCb) {
        if(!this.modelName) {
            throw new Error("Please set a file name to load the 3D model")
        }
        this.loader.load(this.modelName, (gltf) => cb(gltf, this), undefined, errCb)
    }
}