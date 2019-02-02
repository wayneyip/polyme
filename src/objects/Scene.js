import { Group } from 'three';
import Land from './Land/Land.js';
import Flower from './Flower/Flower.js';
import Head from './Head/Head.js';
import BasicLights from './Lights.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    const head = new Head();
    const lights = new BasicLights();

    this.add(head, lights);
  }

  update(timeStamp) {
    this.rotation.y = timeStamp / 1000;
  }
}