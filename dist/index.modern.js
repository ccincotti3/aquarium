import{Vector3 as e,Raycaster as t,Vector2 as s,Clock as i,Scene as n,FogExp2 as o,PerspectiveCamera as r,AmbientLight as a,RectAreaLight as h,ShaderMaterial as d,Mesh as l,PlaneBufferGeometry as c,WebGLRenderer as m,AxesHelper as u,CameraHelper as y,Geometry as p,Object3D as f,TextureLoader as w,PointsMaterial as g,AdditiveBlending as v,Points as x,AnimationMixer as z,BoxHelper as S,MeshStandardMaterial as b}from"three/build/three.module";import{RectAreaLightHelper as M}from"three/examples/jsm/helpers/RectAreaLightHelper";import{GLTFLoader as C}from"three/examples/jsm/loaders/GLTFLoader";const R=(new C).setPath("");class F{constructor(e,t,s,i){this.rotationThreshold=0,this.rotationTurnFactor=.01,this.loader=R,this.modelName=t,this.color=s,this.metadata=i,this.position=e||{x:0,y:0,z:0},this.direction={x:0,y:0,z:1},this.lastMagnitude=0}get boxHelper(){return this.mesh.children.find(e=>"BoxHelper"===e.type)}move(){if(!this.loaded)return this.loaded=!0,null;let t=new e;this.mesh.getWorldPosition(t);const s=Math.sqrt(t.x**2+t.y**2+t.z**2),i={};let n;if(Object.keys(this.direction).forEach(e=>{i[e]=Math.abs(t[e])}),Object.keys(i).forEach(e=>{n=i[n]>i[e]?n:e}),s>this.lastMagnitude){const e={x:"y",y:"x",z:"y"}[n],t=6e-4*i[n];this.mesh.rotation.x+=this.mesh.rotation.x<0?.001:-.001,this.mesh.rotation.y+=this.mesh.rotation.y<0?.001:-.001,this.mesh.rotation.z+=this.mesh.rotation.z<0?.001:-.001,this.mesh.rotation[e]+="x"===e&&this.mesh.position.y<0?-t:t}this.lastMagnitude=s,this.mesh.rotation.x<-Math.PI/2&&(this.mesh.rotation.x=-Math.PI/2),this.mesh.rotation.x>Math.PI/2&&(this.mesh.rotation.x=Math.PI/2),this.mesh.translateX(this.velocity*this.direction.x),this.mesh.translateY(this.velocity*this.direction.y),this.mesh.translateZ(this.velocity*this.direction.z)}load(e,t){if(!this.modelName)throw new Error("Please set a file name to load the 3D model");this.loader.load(this.modelName,t=>e(t,this),void 0,t)}}const A=require("3d-aquarium/static/models/marlin.glb");class T extends F{constructor(e,t,s,i){super(),this.color=s,this.metadata=i,this.modelName=A,this.name=t||"Marlin",this.position={x:e.x,y:e.y,z:e.z},this.velocity=.003,this.loaded=!1}}const E=require("3d-aquarium/static/models/fish.glb");class q extends F{constructor(e,t,s,i){super(),this.metadata=i,this.modelName=E,this.name=t||"Fish",this.color=s,this.position={x:e.x,y:e.y,z:e.z},this.velocity=.005,this.rotationTurnFactor=.01,this.loaded=!1}}const P=require("3d-aquarium/static/models/shark.glb");class k extends F{constructor(e,t,s,i){super(),this.modelName=P,this.name=t||"Shark",this.position={x:e.x,y:e.y,z:e.z},this.velocity=.0115,this.loaded=!1,this.color=s,this.metadata=i,this.direction={x:0,y:0,z:1}}}const D=require("3d-aquarium/static/models/stingray.glb");class H extends F{constructor(e,t,s,i){super(),this.color=s,this.metadata=i,this.modelName=D,this.name=t||"Stingray",this.position={x:e.x,y:e.y,z:e.z},this.velocity=.01,this.loaded=!1}}const L=require("../static/assets/sprite.png");class B{constructor(n){this.onWindowResize=()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},this.onMouseMove=e=>{e.preventDefault();const t=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-(e.clientY-t.top)/t.height*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const s=this.fisheys.map(e=>e.mesh),i=this.raycaster.intersectObjects(s,!0),n=document.querySelector("body");if(i.length){const e=this.fisheys.find(e=>e.name===i[0].object.name);return n.style.cursor="pointer",this.selectedFish=e}return n.style.cursor="unset",this.selectedFish=null},this.onMouseDown=(e,t)=>{if(e.preventDefault(),e.target instanceof HTMLCanvasElement==0)return null;t(this.selectedFish)},this.loadInteractiveStuff=()=>{this.raycaster=new t,this.mouse=new s,window.addEventListener("mousemove",this.onMouseMove,!1),window.addEventListener("mousedown",e=>this.onMouseDown(e,this.onClick),!1)},this.container=document.createElement("div"),this.container.classList.add("canvas-container"),this.container.style.height="100%",document.body.appendChild(this.container),this.clock=new i,this.mixers=[],this.fisheys=[],this.uniforms={iTime:{value:0},iResolution:{value:new e}},this.debug=n.debug,this.nodes=n.nodes,this.onClick=n.onClick,this.init()}init(){const e=window.innerWidth,t=window.innerHeight;this.scene=new n,this.scene.fog=new o(1850442,.05),this.camera=new r(45,e/t,1,2e3),this.camera.position.set(0,0,20),this.camera.lookAt(0,0,0),window.addEventListener("resize",this.onWindowResize);const s=new a(7368816,7);this.scene.add(s);var i=new h(16777215,1,30,30);i.position.set(0,50,0),i.lookAt(0,0,0),this.scene.add(i);const p=new d({fragmentShader:"\nuniform vec3 iResolution;\nuniform float iTime;\n\nfloat rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed)\n{\n\tvec2 sourceToCoord = coord - raySource;\n\tfloat cosAngle = dot(normalize(sourceToCoord), rayRefDirection);\n\t\n\treturn clamp(\n\t\t(0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +\n\t\t(0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),\n\t\t0.0, 1.0) *\n\t\tclamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);\n}\n\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord )\n{\n\tvec2 uv = fragCoord.xy / iResolution.xy;\n\tuv.y = 1.0 - uv.y;\n\tvec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);\n\t\n\t\n\t// Set the parameters of the sun rays\n\tvec2 rayPos1 = vec2(iResolution.x * 0.7, iResolution.y * -0.4);\n\tvec2 rayRefDir1 = normalize(vec2(1.0, -0.116));\n\tfloat raySeedA1 = 36.2214;\n\tfloat raySeedB1 = 21.11349;\n\tfloat raySpeed1 = 1.5;\n\t\n\tvec2 rayPos2 = vec2(iResolution.x * 0.8, iResolution.y * -0.6);\n\tvec2 rayRefDir2 = normalize(vec2(1.0, 0.241));\n\tconst float raySeedA2 = 22.39910;\n\tconst float raySeedB2 = 18.0234;\n\tconst float raySpeed2 = 1.1;\n\t\n\t// Calculate the colour of the sun rays on the current fragment\n\tvec4 rays1 =\n\t\tvec4(1.0, 1.0, 1.0, 1.0) *\n\t\trayStrength(rayPos1, rayRefDir1, coord, raySeedA1, raySeedB1, raySpeed1);\n\t \n\tvec4 rays2 =\n\t\tvec4(1.0, 1.0, 1.0, 1.0) *\n\t\trayStrength(rayPos2, rayRefDir2, coord, raySeedA2, raySeedB2, raySpeed2);\n\t\n\tfragColor = rays1 * 0.5 + rays2 * 0.4;\n\t\n\t// Attenuate brightness towards the bottom, simulating light-loss due to depth.\n\t// Give the whole thing a blue-green tinge as well.\n\tfloat brightness = 0.1 - (coord.y / iResolution.y);\n\tfragColor.x *= 0.1 + (brightness * 0.8);\n\tfragColor.y *= 0.3 + (brightness * 0.6);\n\tfragColor.z *= 0.5 + (brightness * 0.5);\n    \n    fragColor;\n}\n\nvoid main() {\n    mainImage(gl_FragColor, gl_FragCoord.xy);\n}\n",vertexShader:"\n  varying vec2 vUv;\n\n  void main() {\n    vUv = uv;\n    gl_Position = vec4(position, 1.0);\n  }\n",uniforms:this.uniforms,depthWrite:!1,depthTest:!1,transparent:!0}),f=new l(new c(2,2),p);if(this.scene.add(f),this.renderer=new m({antialias:!0,alpha:!0}),this.renderer.setClearColor(1850442,.3),this.renderer.setSize(e,t),this.container.appendChild(this.renderer.domElement),this.debug){const e=new u(20),t=new y(this.camera),s=new M(i);i.add(s),this.scene.add(t),this.scene.add(e)}this.loadModels(),this.loadInteractiveStuff(),requestAnimationFrame(()=>this.draw())}draw(){requestAnimationFrame(()=>this.draw());const e=this.clock.getDelta();this.uniforms.iResolution.value.set(window.innerWidth,window.innerHeight,1),this.uniforms.iTime.value+=e,this.mixers.length&&this.mixers.forEach(t=>t.update(e)),this.fisheys.length&&this.fisheys.forEach(e=>e.move()),this.pGroup&&(this.pGroup.position.y>350&&(this.pGroup.position.y=-100),this.pGroup.position.y+=.1),this.handleSelectedFish(),this.renderer.render(this.scene,this.camera)}loadModels(){const t=(e,t)=>{const s=new z(e.scene);e.animations.forEach(e=>s.clipAction(e).play()),this.mixers.push(s);const i=new S(e.scene,16776960);if(e.scene.position.set(t.position.x,t.position.y,t.position.z),this.debug){const t=new u(2);e.scene.add(t)}e.scene.traverse(e=>{if(e.isMesh&&(e.castShadow=!0,e.name=t.name,t.color)){const s=new b({color:t.color});e.material=s}}),t.mesh=e.scene,i.name=t.name,i.visible=!1,t.mesh.add(i),this.fisheys.push(t),this.scene.add(t.mesh)},s=e=>console.log(e);this.nodes.forEach(e=>{const i=[{x:e.position[0],y:e.position[1],z:e.position[2]},e.name,e.color,e.metadata];switch(e.type){case"Goldfish":return new q(...i).load(t,s);case"Shark":return new k(...i).load(t,s);case"Stingray":return new H(...i).load(t,s);case"Marlin":return new T(...i).load(t,s)}}),this.debug&&(new q({x:-3,y:-4,z:0},"Fish 2").load(t,s),new q({x:3,y:-8,z:0},"Fish 3").load(t,s),new q({x:8,y:-4,z:0},"Fish 4").load(t,s),new q({x:0,y:0,z:0},"Fish 5").load(t,s),new k({x:2,y:1,z:0},"Shark").load(t,s),new H({x:-2,y:1,z:0},"Stingray").load(t,s),new T({x:-2,y:1,z:-5},"Marlin").load(t,s));const i=new p,n=new f;this.pGroup=n,this.scene.add(n);const o=(new w).load(L);for(let t=0;t<1400;t++){var r=new e;r.x=4e3*Math.random()-2e3,r.y=700*Math.random()-500,r.z=1200*Math.random()-500,i.vertices.push(r)}const a=new g({size:10,map:o,transparent:!0,opacity:1,blending:v,alphaTest:.5}),h=new x(i,a);h.sortParticles=!0,n.add(h)}handleSelectedFish(){const e=document.getElementById("selected");if(this.fisheys.forEach(e=>e.boxHelper.visible=!1),!this.selectedFish)return e.innerHTML="",null;e.innerHTML=this.selectedFish.name,this.selectedFish.boxHelper.visible=!0}}window.Aquarium=B;export default B;
//# sourceMappingURL=index.modern.js.map
