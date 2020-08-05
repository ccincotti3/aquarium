import * as THREE from '../node_modules/three/build/three.module.js';
import Fish from './models/fish.js';

class Aquarium {
    constructor() {
        this.container = document.createElement('div')
        this.container.style.height = "100%";
        document.body.appendChild(this.container);


        this.clock = new THREE.Clock();
        this.mixers = [] // to hold animation mixers
        this.fisheys = []
        this.debug = true

        this.init()
    }
    init() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
        this.camera.position.set(0, 0, 20);
        this.camera.lookAt(0, 0, 0);
        window.addEventListener( 'resize', this.onWindowResize );

        const ambient = new THREE.AmbientLight( 0x707070 ); // soft white light

        // Add Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(width, height)
        this.container.appendChild(this.renderer.domElement)

        this.scene.add( ambient )

        if(this.debug){
            const axesHelper = new THREE.AxesHelper( 20 );
            const camerahelper = new THREE.CameraHelper( this.camera );
            this.scene.add( camerahelper );
            this.scene.add( axesHelper );
        }

        this.loadModels();
        this.draw();
    }
    draw = () => {
        requestAnimationFrame( () => this.draw() )
        var delta = this.clock.getDelta();

        if ( this.mixers.length ) { 
                this.mixers.forEach(m => m.update(delta))
        };

        if ( this.fisheys.length ) {
            this.fisheys.forEach(f => f.move(this.camera))
        }

        this.renderer.render(this.scene, this.camera)
    }
    loadModels() {
        const loadCallback = (gltf, object) => {
            const mixer = new THREE.AnimationMixer(gltf.scene);
            const clips = gltf.animations

            // Play all animations
            clips.forEach(( clip ) => mixer.clipAction( clip ).play());

            // Append to mixers
            this.mixers.push(mixer)

            gltf.scene.position.set(object.position.x, object.position.y, object.position.z)
            object.mesh = gltf.scene
            this.fisheys.push(object)
            this.scene.add( object.mesh );
        }
        
        const errorCallback = (e) => console.log(e)

        new Fish({x: 1, y: 3, z: 0}).load(loadCallback, errorCallback);
        new Fish({x: 4, y: 1, z: 0}).load(loadCallback, errorCallback);
    }

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}

window.Aquarium = Aquarium
