import { Group } from 'three';
import Land from './Land/Land.js';
import Flower from './Flower/Flower.js';
import Character from './Character/Character.js';
import BasicLights from './Lights.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    const character = new Character();
    const lights = new BasicLights();

    // Floor
    const floorGeo = new THREE.PlaneGeometry(10000, 10000);
  	var floorMat = new THREE.MeshLambertMaterial( {color: 0xaaaaaa, side: THREE.DoubleSide} );
  	var floor = new THREE.Mesh( floorGeo, floorMat );
  	floor.rotateX(1.57);
  	floor.receiveShadow = true;

    this.add(character, lights, floor);
  }
}