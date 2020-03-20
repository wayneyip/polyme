class Character extends THREE.Group {

    constructor(manager) {
    
        // Initial setup
        super();
        this.name = 'character_GRP';
        this.data = {
            'body' : {
                'overall' : [],
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
        this.selectedItems = {
            'overall' : 'body_MSH',
            'face' : 'body_MSH',
            'hair' : 0,
            'eyes' : 0,
            'brows' : 0,
            'nose' : 0,
            'mouth' : 0,
            'ears' : 0,
            'top' : 0,
            'bottom' : 0,
            'shoes' : 0
        };
        this.categoryColors = {
            'overall' : [0xffe0bd, 0xe4b98e, 0xd99164, 0xbb6d4a, 0x813e30],
            'face' : [],
            'hair' : [0x3d3d3d, 0x4f1a00, 0x663306, 0xaa8866, 0xdebe99],
            'eyes' : [],
            'brows' : [0x3d3d3d, 0x4f1a00, 0x663306, 0xaa8866, 0xdebe99],
            'nose' : [],
            'mouth' : [],
            'ears' : [],
            'top' : [0xeae2dc, 0x645f3f, 0x20419a, 0xef4848, 0xf34976, 0x8063d5, 0x0ca2bd],
            'bottom' : [0x1560bd, 0x654321, 0x333333, 0xe1e1e1],
            'shoes' : [0x3d3d3d, 0xeae2dc, 0x60371f]
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
                    skinning:   true,
                    visible:    false
                } 
            );
            LF_eye_obj.material = eyeMaterial;
            RT_eye_obj.material = eyeMaterial;

            var body_obj = file.scene.getObjectByName('body_MSH');
            var bodyMaterial = new THREE.MeshPhongMaterial({
                skinning: true,
                visible: false
            });
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
                            side: THREE.DoubleSide,
                            visible: false
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

    colorItem(color, itemName){
        let item;
        this.traverse(function(child) {
            if (child.name == itemName) {
                item = child;
            }
        });
        item.material.color = new THREE.Color(color);
    }

    showCharacter(){
        let body, LF_eye, RT_eye;
        this.traverse(function(child) {
            if (child.name == 'body_MSH') {
                body = child;
            }
            else if (child.name == 'LF_eye_MSH') {
                LF_eye = child;
            }
            else if (child.name == 'RT_eye_MSH') {
                RT_eye = child;
            }
        });
        body.material.visible = true;
        LF_eye.material.visible = true;
        RT_eye.material.visible = true;
    }
}