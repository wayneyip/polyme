/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */
global.THREE = require('three');
import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(0,50,100);
camera.lookAt(0,35,0);

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHandler = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

window.addEventListener('mousemove', function(e){
 
  var mouse3D_head = new THREE.Vector3(
    ( event.clientX / window.innerWidth ) * 200 - 100,
    100 - ( event.clientY / window.innerHeight ) * 200,
    100
  );

	var head = scene.getObjectByName("neck_JNT");
  head.lookAt(mouse3D_head);
  head.rotateZ(1.57);

  var leg = scene.getObjectByName("LF_thigh_JNT");
  leg.lookAt(mouse3D_head);
  leg.rotateZ(-1.57);
  leg.rotateX(-1.57);
})

window.addEventListener('keypress', function(e){

  if (e.code == 'KeyA')
  {
    var body = scene.getObjectByName("body_MSH");

    body.material = new THREE.MeshPhongMaterial(
            {
                color: 0xe4b98e,
                skinning: true
            } 
        );
  }
  else if (e.code == 'KeyS')
  {
    var body = scene.getObjectByName("body_MSH");

    body.material = new THREE.MeshPhongMaterial(
            {
                color: 0xd99164,
                skinning: true
            } 
        );
  }
  else if (e.code == 'KeyD')
  {
    var body = scene.getObjectByName("body_MSH");

    body.material = new THREE.MeshPhongMaterial(
            {
                color: 0xbb6d4a,
                skinning: true
            } 
        );
  }
  else if (e.code == 'KeyZ')
  {
    var underwear = scene.getObjectByName("underwear_MSH");
    var pants = scene.getObjectByName("pants_MSH");
    var jeans = scene.getObjectByName("jeans_MSH");
    underwear.material.visible = true;
    pants.material.visible = false;
    jeans.material.visible = false;
  }
  else if (e.code == 'KeyX')
  {
    var underwear = scene.getObjectByName("underwear_MSH");
    var pants = scene.getObjectByName("pants_MSH");
    var jeans = scene.getObjectByName("jeans_MSH");
    underwear.material.visible = false;
    pants.material.visible = true;
    jeans.material.visible = false;
  }
  else if (e.code == 'KeyC')
  {
    var underwear = scene.getObjectByName("underwear_MSH");
    var pants = scene.getObjectByName("pants_MSH");
    var jeans = scene.getObjectByName("jeans_MSH");
    underwear.material.visible = false;
    pants.material.visible = false;
    jeans.material.visible = true;
  }
})
