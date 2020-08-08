import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from '../../node_modules/three/build/three.module.js';

const loader = new GLTFLoader().setPath('../../models/')

export default class Object {
    constructor() {
        this.rotationThreshold = 0.04
        this.rotationTurnFactor = 0.002
        this.loader = loader
        this.modelName = undefined
        this.position = {
            x: 0,
            y: 0,
            z: 0,
        }
    }

    move() {
            if (!this.loaded) {
                this.loaded = true;
                return null;
            }
            let vector = new THREE.Vector3()
            this.mesh.getWorldPosition(vector);
            let rotationY = 0
            let rotationZ = 0

            const direction = new THREE.Vector3( -1, 0, 0 ).applyQuaternion( this.mesh.quaternion );
            const xDirectionFactor = direction.x * vector.x > 0 ? 1 : 0.7;
            const yDirectionFactor = direction.y * vector.y > 0 ? 1 : 0.7;

            const rotationRandom = Math.random()
            if (this.rotationThreshold > rotationRandom) {
                const influencingVector = Math.abs(vector.x) > Math.abs(vector.z) ? vector.x : vector.z
                    rotationY = influencingVector * this.rotationTurnFactor * xDirectionFactor
                    rotationZ = vector.y * this.rotationTurnFactor * yDirectionFactor
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

    load(cb, errCb) {
        if(!this.modelName) {
            throw new Error("Please set a file name to load the 3D model")
        }

        this.loader.load(this.modelName, (gltf) => cb(gltf, this), undefined, errCb)
        // this.loader.load(this.modelFileName, cb, undefined, errCb)
    }
}