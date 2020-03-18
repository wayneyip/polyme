class Character extends THREE.Group {

    constructor(manager) {
    
        // Initial setup
        super();
        this.name = 'character_GRP';
        this.data = {
            'body' : {
                'face' : [],
                'hair' : [],
                'eyes' : [],
                'brows' : [],
                'nose' : [],
                'mouth' : [],
                'ears' : []
            },
            'clothes' : {
                'top' : [],
                'bottom' : [],
                'shoes' : []
            }
        };

        // Loader
        var gltfLoader = new THREE.GLTFLoader(manager);
        var texLoader = new THREE.TextureLoader();
        gltfLoader.load('assets/character.gltf', (file)=>{

            var LF_eye_obj = file.scene.getObjectByName('LF_eye_MSH');
            var RT_eye_obj = file.scene.getObjectByName('RT_eye_MSH');

            var eyeMaterial = new THREE.MeshPhongMaterial( 
                {
                    map:        texLoader.load('assets/eye.png'),
                    specular:   0xffffff,
                    shininess:  50,
                    skinning:   true
                } 
            );
            LF_eye_obj.material = eyeMaterial;
            RT_eye_obj.material = eyeMaterial;

            var body_obj = file.scene.getObjectByName('body_MSH');
            var bodyMaterial = new THREE.MeshPhongMaterial({skinning: true});
            body_obj.material = bodyMaterial;
            body_obj.castShadow = true;

            var sceneObjects = file.scene.children[0].children;
            while (sceneObjects.length > 0)
            {
                var sceneObject = sceneObjects[0];
                if (sceneObject.name.endsWith('_GRP')) 
                {
                    var category = sceneObject.name.substr(0, sceneObject.name.length-4);
                    var type = this.getTypeFromCategory(category);

                    for (var i=0; i < sceneObject.children.length; i++)
                    {
                        var itemName = sceneObject.children[i].name;
                        this.data[type][category].push(itemName);
                        sceneObject.children[i].material = new THREE.MeshPhongMaterial({
                            skinning: true,
                            color: 0x444444,
                            side: THREE.DoubleSide
                        });
                        sceneObject.children[i].castShadow = true;
                    }
                }
                this.add(sceneObject);
            }
            // var rig = file.scene.getObjectByName('root_JNT');
            // var helper = new THREE.SkeletonHelper(rig.children[0]);
            // this.add(helper);
        });
    }

    getTypeFromCategory(category){

        if (category == 'face' || 
            category == 'hair' || 
            category == 'eyes' || 
            category == 'brows' || 
            category == 'nose' || 
            category == 'mouth' || 
            category == 'ears'
        ){
            return 'body';
        }
        else if (
            category == 'top' ||
            category == 'bottom' ||
            category == 'shoes'
         ){
            return 'clothes';
         }
         return "";
    }
}