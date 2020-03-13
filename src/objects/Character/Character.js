import {Group} from 'three';
import GLTFLoader from 'three-gltf-loader';


export default class Character extends Group {
  constructor() {
    
    // Initial setup
    super();
    this.name = 'character_GRP';
    var body_obj, LF_eye_obj, RT_eye_obj, LF_eyebrow_obj, RT_eyebrow_obj; 
    var underwear_obj, pants_obj, jeans_obj;
    var rig;
    
    // Loader
    var gltfLoader = new GLTFLoader();
    var texLoader = new THREE.TextureLoader();
    gltfLoader.load('src/objects/Character/character.gltf', (file)=>{

        body_obj = file.scene.getObjectByName('body_MSH');
        LF_eye_obj = file.scene.getObjectByName('LF_eye_MSH');
        RT_eye_obj = file.scene.getObjectByName('RT_eye_MSH');
        LF_eyebrow_obj = file.scene.getObjectByName('LF_eyebrow_MSH');
        RT_eyebrow_obj = file.scene.getObjectByName('RT_eyebrow_MSH');
        underwear_obj = file.scene.getObjectByName('underwear_MSH');
        pants_obj = file.scene.getObjectByName('pants_MSH');
        jeans_obj = file.scene.getObjectByName('jeans_MSH');
        rig = file.scene.getObjectByName('root_JNT');

        var skinMaterial = new THREE.MeshPhongMaterial(
            {
                color: 0xe4b98e,
                skinning: true
            } 
        );
        body_obj.material = skinMaterial;
        body_obj.castShadow = true;
        
        var hairMaterial = new THREE.MeshPhongMaterial( 
            {
                color: 0x555555,
                skinning: true
            } 
        );
        LF_eyebrow_obj.material = hairMaterial;
        RT_eyebrow_obj.material = hairMaterial;

        var eyeMaterial = new THREE.MeshPhongMaterial( 
            {
                map:        texLoader.load('src/objects/Character/eye.png'),
                specular:   0xffffff,
                shininess:  50,
                skinning: true
            } 
        );
        LF_eye_obj.material = eyeMaterial;
        RT_eye_obj.material = eyeMaterial;

        var underwearMaterial = new THREE.MeshPhongMaterial( 
            {
                color: 0x111111,
                skinning: true,
                visible: false
            } 
        );
        underwear_obj.material = underwearMaterial;
        underwear_obj.castShadow = true;

        var pantsMaterial = new THREE.MeshPhongMaterial( 
            {
                color: 0x654321,
                skinning: true,
                visible: true
            } 
        );
        pants_obj.material = pantsMaterial;
        pants_obj.castShadow = true;

        var jeansMaterial = new THREE.MeshPhongMaterial( 
            {
                color: 0x1560bd,
                skinning: true,
                visible: false
            } 
        );
        jeans_obj.material = jeansMaterial;
        jeans_obj.castShadow = true;

        this.add(body_obj);
        this.add(LF_eye_obj);
        this.add(RT_eye_obj);
        this.add(LF_eyebrow_obj);
        this.add(RT_eyebrow_obj);
        this.add(underwear_obj);
        this.add(pants_obj);
        this.add(jeans_obj);
        this.add(rig);

        var helper = new THREE.SkeletonHelper(rig.children[0]);
        this.add(helper);
    });
  }
}