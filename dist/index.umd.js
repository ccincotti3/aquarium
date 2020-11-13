!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("three/build/three.module"),require("three/examples/jsm/helpers/RectAreaLightHelper"),require("three/examples/jsm/loaders/GLTFLoader")):"function"==typeof define&&define.amd?define(["three/build/three.module","three/examples/jsm/helpers/RectAreaLightHelper","three/examples/jsm/loaders/GLTFLoader"],t):(e=e||self).dAquarium=t(e.THREE,e.RectAreaLightHelper,e.GLTFLoader)}(this,function(e,t,n){function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function o(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function a(e,t,n){return(a=o()?Reflect.construct:function(e,t,n){var i=[null];i.push.apply(i,t);var o=new(Function.bind.apply(e,i));return n&&r(o,n.prototype),o}).apply(null,arguments)}var s=(new n.GLTFLoader).setPath(""),c=function(){function t(e,t,n,i){this.rotationThreshold=0,this.rotationTurnFactor=.01,this.loader=s,this.modelName=t,this.color=n,this.metadata=i,this.position=e||{x:0,y:0,z:0},this.direction={x:0,y:0,z:1},this.lastMagnitude=0}var n,i=t.prototype;return i.move=function(){if(!this.loaded)return this.loaded=!0,null;var t=new e.Vector3;this.mesh.getWorldPosition(t);var n,i=Math.sqrt(Math.pow(t.x,2)+Math.pow(t.y,2)+Math.pow(t.z,2)),r={};if(Object.keys(this.direction).forEach(function(e){r[e]=Math.abs(t[e])}),Object.keys(r).forEach(function(e){n=r[n]>r[e]?n:e}),i>this.lastMagnitude){var o={x:"y",y:"x",z:"y"}[n],a=6e-4*r[n];this.mesh.rotation.x+=this.mesh.rotation.x<0?.001:-.001,this.mesh.rotation.y+=this.mesh.rotation.y<0?.001:-.001,this.mesh.rotation.z+=this.mesh.rotation.z<0?.001:-.001,this.mesh.rotation[o]+="x"===o&&this.mesh.position.y<0?-a:a}this.lastMagnitude=i,this.mesh.rotation.x<-Math.PI/2&&(this.mesh.rotation.x=-Math.PI/2),this.mesh.rotation.x>Math.PI/2&&(this.mesh.rotation.x=Math.PI/2),this.mesh.translateX(this.velocity*this.direction.x),this.mesh.translateY(this.velocity*this.direction.y),this.mesh.translateZ(this.velocity*this.direction.z)},i.load=function(e,t){var n=this;if(!this.modelName)throw new Error("Please set a file name to load the 3D model");this.loader.load(this.modelName,function(t){return e(t,n)},void 0,t)},(n=[{key:"boxHelper",get:function(){return this.mesh.children.find(function(e){return"BoxHelper"===e.type})}}])&&function(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(t.prototype,n),t}(),h=require("3d-aquarium/static/models/marlin.glb"),l=function(e){function t(t,n,i,r){var o;return(o=e.call(this)||this).color=i,o.metadata=r,o.modelName=h,o.name=n||"Marlin",o.position={x:t.x,y:t.y,z:t.z},o.velocity=.003,o.loaded=!1,o}return i(t,e),t}(c),d=require("3d-aquarium/static/models/fish.glb"),u=function(e){function t(t,n,i,r){var o;return(o=e.call(this)||this).metadata=r,o.modelName=d,o.name=n||"Fish",o.color=i,o.position={x:t.x,y:t.y,z:t.z},o.velocity=.005,o.rotationTurnFactor=.01,o.loaded=!1,o}return i(t,e),t}(c),m=require("3d-aquarium/static/models/shark.glb"),f=function(e){function t(t,n,i,r){var o;return(o=e.call(this)||this).modelName=m,o.name=n||"Shark",o.position={x:t.x,y:t.y,z:t.z},o.velocity=.0115,o.loaded=!1,o.color=i,o.metadata=r,o.direction={x:0,y:0,z:1},o}return i(t,e),t}(c),y=require("3d-aquarium/static/models/stingray.glb"),p=function(e){function t(t,n,i,r){var o;return(o=e.call(this)||this).color=i,o.metadata=r,o.modelName=y,o.name=n||"Stingray",o.position={x:t.x,y:t.y,z:t.z},o.velocity=.01,o.loaded=!1,o}return i(t,e),t}(c),v=require("../static/assets/sprite.png"),g=function(){function n(t){var n=this;this.onWindowResize=function(){n.camera.aspect=window.innerWidth/window.innerHeight,n.camera.updateProjectionMatrix(),n.renderer.setSize(window.innerWidth,window.innerHeight)},this.onMouseMove=function(e){e.preventDefault();var t=n.renderer.domElement.getBoundingClientRect();n.mouse.x=(e.clientX-t.left)/t.width*2-1,n.mouse.y=-(e.clientY-t.top)/t.height*2+1,n.raycaster.setFromCamera(n.mouse,n.camera);var i=n.fisheys.map(function(e){return e.mesh}),r=n.raycaster.intersectObjects(i,!0),o=document.querySelector("body");if(r.length){var a=n.fisheys.find(function(e){return e.name===r[0].object.name});return o.style.cursor="pointer",n.selectedFish=a}return o.style.cursor="unset",n.selectedFish=null},this.onMouseDown=function(e,t){if(e.preventDefault(),e.target instanceof HTMLCanvasElement==0)return null;t(n.selectedFish)},this.loadInteractiveStuff=function(){n.raycaster=new e.Raycaster,n.mouse=new e.Vector2,window.addEventListener("mousemove",n.onMouseMove,!1),window.addEventListener("mousedown",function(e){return n.onMouseDown(e,n.onClick)},!1)},this.container=document.createElement("div"),this.container.classList.add("canvas-container"),this.container.style.height="100%",document.body.appendChild(this.container),this.clock=new e.Clock,this.mixers=[],this.fisheys=[],this.uniforms={iTime:{value:0},iResolution:{value:new e.Vector3}},this.debug=t.debug,this.nodes=t.nodes,this.onClick=t.onClick,this.init()}var i=n.prototype;return i.init=function(){var n=this,i=window.innerWidth,r=window.innerHeight;this.scene=new e.Scene,this.scene.fog=new e.FogExp2(1850442,.05),this.camera=new e.PerspectiveCamera(45,i/r,1,2e3),this.camera.position.set(0,0,20),this.camera.lookAt(0,0,0),window.addEventListener("resize",this.onWindowResize);var o=new e.AmbientLight(7368816,7);this.scene.add(o);var a=new e.RectAreaLight(16777215,1,30,30);a.position.set(0,50,0),a.lookAt(0,0,0),this.scene.add(a);var s=new e.ShaderMaterial({fragmentShader:"\nuniform vec3 iResolution;\nuniform float iTime;\n\nfloat rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed)\n{\n\tvec2 sourceToCoord = coord - raySource;\n\tfloat cosAngle = dot(normalize(sourceToCoord), rayRefDirection);\n\t\n\treturn clamp(\n\t\t(0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +\n\t\t(0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),\n\t\t0.0, 1.0) *\n\t\tclamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);\n}\n\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord )\n{\n\tvec2 uv = fragCoord.xy / iResolution.xy;\n\tuv.y = 1.0 - uv.y;\n\tvec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);\n\t\n\t\n\t// Set the parameters of the sun rays\n\tvec2 rayPos1 = vec2(iResolution.x * 0.7, iResolution.y * -0.4);\n\tvec2 rayRefDir1 = normalize(vec2(1.0, -0.116));\n\tfloat raySeedA1 = 36.2214;\n\tfloat raySeedB1 = 21.11349;\n\tfloat raySpeed1 = 1.5;\n\t\n\tvec2 rayPos2 = vec2(iResolution.x * 0.8, iResolution.y * -0.6);\n\tvec2 rayRefDir2 = normalize(vec2(1.0, 0.241));\n\tconst float raySeedA2 = 22.39910;\n\tconst float raySeedB2 = 18.0234;\n\tconst float raySpeed2 = 1.1;\n\t\n\t// Calculate the colour of the sun rays on the current fragment\n\tvec4 rays1 =\n\t\tvec4(1.0, 1.0, 1.0, 1.0) *\n\t\trayStrength(rayPos1, rayRefDir1, coord, raySeedA1, raySeedB1, raySpeed1);\n\t \n\tvec4 rays2 =\n\t\tvec4(1.0, 1.0, 1.0, 1.0) *\n\t\trayStrength(rayPos2, rayRefDir2, coord, raySeedA2, raySeedB2, raySpeed2);\n\t\n\tfragColor = rays1 * 0.5 + rays2 * 0.4;\n\t\n\t// Attenuate brightness towards the bottom, simulating light-loss due to depth.\n\t// Give the whole thing a blue-green tinge as well.\n\tfloat brightness = 0.1 - (coord.y / iResolution.y);\n\tfragColor.x *= 0.1 + (brightness * 0.8);\n\tfragColor.y *= 0.3 + (brightness * 0.6);\n\tfragColor.z *= 0.5 + (brightness * 0.5);\n    \n    fragColor;\n}\n\nvoid main() {\n    mainImage(gl_FragColor, gl_FragCoord.xy);\n}\n",vertexShader:"\n  varying vec2 vUv;\n\n  void main() {\n    vUv = uv;\n    gl_Position = vec4(position, 1.0);\n  }\n",uniforms:this.uniforms,depthWrite:!1,depthTest:!1,transparent:!0}),c=new e.Mesh(new e.PlaneBufferGeometry(2,2),s);if(this.scene.add(c),this.renderer=new e.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.setClearColor(1850442,.3),this.renderer.setSize(i,r),this.container.appendChild(this.renderer.domElement),this.debug){var h=new e.AxesHelper(20),l=new e.CameraHelper(this.camera),d=new t.RectAreaLightHelper(a);a.add(d),this.scene.add(l),this.scene.add(h)}this.loadModels(),this.loadInteractiveStuff(),requestAnimationFrame(function(){return n.draw()})},i.draw=function(){var e=this;requestAnimationFrame(function(){return e.draw()});var t=this.clock.getDelta();this.uniforms.iResolution.value.set(window.innerWidth,window.innerHeight,1),this.uniforms.iTime.value+=t,this.mixers.length&&this.mixers.forEach(function(e){return e.update(t)}),this.fisheys.length&&this.fisheys.forEach(function(e){return e.move()}),this.pGroup&&(this.pGroup.position.y>350&&(this.pGroup.position.y=-100),this.pGroup.position.y+=.1),this.handleSelectedFish(),this.renderer.render(this.scene,this.camera)},i.loadModels=function(){var t=this,n=function(n,i){var r=new e.AnimationMixer(n.scene);n.animations.forEach(function(e){return r.clipAction(e).play()}),t.mixers.push(r);var o=new e.BoxHelper(n.scene,16776960);if(n.scene.position.set(i.position.x,i.position.y,i.position.z),t.debug){var a=new e.AxesHelper(2);n.scene.add(a)}n.scene.traverse(function(t){if(t.isMesh&&(t.castShadow=!0,t.name=i.name,i.color)){var n=new e.MeshStandardMaterial({color:i.color});t.material=n}}),i.mesh=n.scene,o.name=i.name,o.visible=!1,i.mesh.add(o),t.fisheys.push(i),t.scene.add(i.mesh)},i=function(e){return console.log(e)};this.nodes.forEach(function(e){var t=[{x:e.position[0],y:e.position[1],z:e.position[2]},e.name,e.color,e.metadata];switch(e.type){case"Goldfish":return a(u,t).load(n,i);case"Shark":return a(f,t).load(n,i);case"Stingray":return a(p,t).load(n,i);case"Marlin":return a(l,t).load(n,i)}}),this.debug&&(new u({x:-3,y:-4,z:0},"Fish 2").load(n,i),new u({x:3,y:-8,z:0},"Fish 3").load(n,i),new u({x:8,y:-4,z:0},"Fish 4").load(n,i),new u({x:0,y:0,z:0},"Fish 5").load(n,i),new f({x:2,y:1,z:0},"Shark").load(n,i),new p({x:-2,y:1,z:0},"Stingray").load(n,i),new l({x:-2,y:1,z:-5},"Marlin").load(n,i));var r=new e.Geometry,o=new e.Object3D;this.pGroup=o,this.scene.add(o);for(var s=(new e.TextureLoader).load(v),c=0;c<1400;c++){var h=new e.Vector3;h.x=4e3*Math.random()-2e3,h.y=700*Math.random()-500,h.z=1200*Math.random()-500,r.vertices.push(h)}var d=new e.PointsMaterial({size:10,map:s,transparent:!0,opacity:1,blending:e.AdditiveBlending,alphaTest:.5}),m=new e.Points(r,d);m.sortParticles=!0,o.add(m)},i.handleSelectedFish=function(){var e=document.getElementById("selected");if(this.fisheys.forEach(function(e){return e.boxHelper.visible=!1}),!this.selectedFish)return e.innerHTML="",null;e.innerHTML=this.selectedFish.name,this.selectedFish.boxHelper.visible=!0},n}();return window.Aquarium=g,g});
//# sourceMappingURL=index.umd.js.map
