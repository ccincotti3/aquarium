import * as THREE from '../node_modules/three/build/three.module.js';
import { RectAreaLightHelper } from '../node_modules/three/examples/jsm/helpers/RectAreaLightHelper.js';
import Fish from './models/fish.js';
import Shark from './models/shark.js';
import Stingray from './models/stingray.js';
import { lightShader, vertexShader } from "./shaders.js"


class Aquarium {
    constructor() {
        this.container = document.createElement('div')
        this.container.classList.add('canvas-container');
        this.container.style.height = "100%";
        document.body.appendChild(this.container);


        this.clock = new THREE.Clock();
        this.mixers = [] // to hold animation mixers
        this.fisheys = []
        this.selectedFish;

        //shader uniforms
        this.uniforms = {
            iTime: { value: 0 },
            iResolution:  { value: new THREE.Vector3() },
        }

        // this.debug = true

        this.init()
    }
    init() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x1c3c4a, 0.05);
        // this.scene.fog = new THREE.Fog(0x1c3c4a, 0.1, 2000 )
        // this.scene.background = new THREE.Color( 0x65a2b4 );

        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
        this.camera.position.set(0, 0, 20);
        this.camera.lookAt(0, 0, 0);
        window.addEventListener( 'resize', this.onWindowResize );

        const ambient = new THREE.AmbientLight( 0x707070, 4); // soft white light
        this.scene.add( ambient )

        // //middle light
        // const centerLight = new THREE.SpotLight(0xb7f9ff, 1);
        // this.scene.add(centerLight);
        // centerLight.position.set(2500, 300, 2000);
        // centerLight.penumbra = 1;
        // centerLight.decay = 5;


        var recWidth = 30;
        var recHeight = 30;
        var intensity = 10;
        var rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  recWidth, recHeight );
        rectLight.position.set( 0, 20, 0 );
        rectLight.lookAt( 0, 0, 0 );
        this.scene.add( rectLight )

        //Shader over scene - light shader
        const lightShaderMaterial = new THREE.ShaderMaterial({
            fragmentShader: lightShader,
            vertexShader: vertexShader,
            uniforms: this.uniforms,
            depthWrite: false,
            depthTest: false,
            transparent: true,
            // alphaTest: 0.5,
        })

        const quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), lightShaderMaterial );
        this.scene.add(quad);

        // Add Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setClearColor(0x1c3c4a, 0.3)
        this.renderer.setSize(width, height)
        this.container.appendChild(this.renderer.domElement)

        if(this.debug){
            const axesHelper = new THREE.AxesHelper( 20 );
            const camerahelper = new THREE.CameraHelper( this.camera );
            const rectLightHelper = new RectAreaLightHelper( rectLight );
            rectLight.add( rectLightHelper );
            this.scene.add( camerahelper );
            this.scene.add( axesHelper );
        }

        this.loadModels();
        this.loadInteractiveStuff();
        requestAnimationFrame(this.draw);
    }
    draw = () => {
        requestAnimationFrame( () => this.draw() )
        const delta = this.clock.getDelta();
        this.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
        this.uniforms.iTime.value += delta;
        if ( this.mixers.length ) { 
            this.mixers.forEach(m => m.update(delta))
        };
        if ( this.fisheys.length ) {
            this.fisheys.forEach(f => f.move())
        }
        if(this.pGroup){
            if(this.pGroup.position.y > 350) {
                this.pGroup.position.y = -100
            }
            this.pGroup.position.y += .1
        }

        this.handleSelectedFish()

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

            const box = new THREE.BoxHelper( gltf.scene, 0xffff00 );

            gltf.scene.position.set(object.position.x, object.position.y, object.position.z)
            if (this.debug) {
                const axesHelper = new THREE.AxesHelper( 2 );
                gltf.scene.add(axesHelper)
            }

            gltf.scene.traverse((o) => {
                if (o.isMesh) { 
                    o.castShadow = true
                    o.name = object.name
                }
            });
            object.mesh = gltf.scene

            box.name = object.name
            box.visible = false;
            object.mesh.add( box );

            this.fisheys.push(object)
            this.scene.add( object.mesh );
        }
        
        const errorCallback = (e) => console.log(e)

        new Fish({x: -1, y: 3, z: 0}, "Fish 1").load(loadCallback, errorCallback);
        new Fish({x: -3, y: -4, z: 0}, "Fish 2").load(loadCallback, errorCallback);
        new Fish({x: 3, y: -8, z: 0}, "Fish 3").load(loadCallback, errorCallback);
        new Fish({x: 8, y: -4, z: 0}, "Fish 4").load(loadCallback, errorCallback);
        new Fish({x: 0, y: 6, z: 0}, "Fish 5").load(loadCallback, errorCallback);
        new Shark({x: 2, y: 1, z: 0}, "Shark").load(loadCallback, errorCallback);
        new Stingray({x: -2, y: 1, z: 0}, "Stingray").load(loadCallback, errorCallback);

        // Bubbles
        const pGeometry = new THREE.Geometry();
        const pGroup = new THREE.Object3D();
        this.pGroup = pGroup
        this.scene.add(pGroup)

        const tL = new THREE.TextureLoader()
        const sprite = tL.load("assets/sprite.png");
        for (let i = 0; i < 1400; i++) {
            var vertex = new THREE.Vector3();
            vertex.x = 4000 * Math.random() - 2000;
            vertex.y = -500 + Math.random() * 700;
            vertex.z = 1200 * Math.random() - 500;
            pGeometry.vertices.push(vertex);
        }
        const material = new THREE.PointsMaterial({
            size: 10,
            map: sprite,
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending,
            alphaTest: 0.5
        });

        const particles = new THREE.Points(pGeometry, material);
        particles.sortParticles = true;
        pGroup.add(particles);
    }

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    onMouseMove = ( event ) => {
            // calculate mouse position in normalized device coordinates
            event.preventDefault();

            // (-1 to +1) for both components
            this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            this.raycaster.setFromCamera( this.mouse, this.camera );
            const meshes = this.fisheys.map(m => m.mesh)
            const intersects = this.raycaster.intersectObjects( meshes, true );
            if(intersects.length) {
                const fish = this.fisheys.find(f => f.name === intersects[0].object.name);
                return this.selectedFish = fish
            }
            return this.selectedFish = null
    }

    handleSelectedFish() {
        const domEl = document.getElementById("selected")
        if(!this.selectedFish) {
            domEl.innerHTML = ''
            return this.fisheys.forEach(f => f.boxHelper.visible = false)
        }
        domEl.innerHTML = this.selectedFish.name
        this.selectedFish.boxHelper.visible = true
    }

    loadInteractiveStuff = () => {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
       
        window.addEventListener( 'mousemove', this.onMouseMove, false );
    }
}

window.Aquarium = Aquarium
