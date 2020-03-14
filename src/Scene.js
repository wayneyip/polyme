/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer({antialias: true});

// scene
var isCharLoaded = false;
const charManager = new THREE.LoadingManager();
const lights = new Lights();
const environment = new Environment();
const character = new Character(charManager);

scene.add(character, lights, environment);

// camera
camera.position.set(50,35,100);
camera.lookAt(50,35,0);

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
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
document.body.appendChild(renderer.domElement);

charManager.onLoad = function(){
  console.log("Character load complete");
  isCharLoaded = true;
}
