import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader().setPath('../../models/')

export default class Object {
    constructor() {
        this.loader = loader
        this.modelName = undefined
        this.position = {
            x: 0,
            y: 0,
            z: 0,
        }
    }

    load(cb, errCb) {
        if(!this.modelName) {
            throw new Error("Please set a file name to load the 3D model")
        }

        const loadOptions = {
            position: this.position
        }
        this.loader.load(this.modelName, (gltf) => cb(gltf, this), undefined, errCb)
        // this.loader.load(this.modelFileName, cb, undefined, errCb)
    }
}