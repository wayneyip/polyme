import { Group, ObjectLoader } from 'three';
import MODEL from './head.json';
var SubdivisionModifier = require('three-subdivision-modifier');


export default class Head extends Group {
  constructor() {
    const loader = new ObjectLoader();
    super();

    this.name = 'head';

    loader.load(MODEL, (mesh)=>{
        this.add(mesh);

        var head_obj = mesh.getObjectByName('head.001');
        var LF_eye_obj = mesh.getObjectByName('LF_eye');
        var RT_eye_obj = mesh.getObjectByName('RT_eye');

        head_obj.scale.set(1, 1, 1);
        LF_eye_obj.scale.set(1, .9, 1.5);
        RT_eye_obj.scale.set(1, .9, 1.5);

        LF_eye_obj.rotateZ(-0.05);
        RT_eye_obj.rotateZ(0.05);
    

        var modifier = new SubdivisionModifier( 1 );
        modifier.modify( head_obj.geometry );
    });
  }
}