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

        this.selectedColors = {
            'overall' : 0,
            'face' : 0,
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
        let gltfLoader = new THREE.GLTFLoader(manager);
        let texLoader = new THREE.TextureLoader();
        gltfLoader.load('assets/character.glb', (file)=>{

            let rig = file.scene.getObjectByName('root_JNT');
            let helper = new THREE.SkeletonHelper(rig.children[0]);
            this.add(helper);

            let LF_eye_obj = file.scene.getObjectByName('LF_eye_MSH');
            let RT_eye_obj = file.scene.getObjectByName('RT_eye_MSH');

            let eyeMaterial = new THREE.MeshPhongMaterial( 
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

            let body_obj = file.scene.getObjectByName('body_MSH');
            let bodyMaterial = new THREE.MeshPhongMaterial({
                skinning: true,
                morphTargets: true,
                visible: false
            });
            body_obj.material = bodyMaterial;
            body_obj.castShadow = true;
            console.log(body_obj);

            let sceneObjects = file.scene.children[0].children;
            while (sceneObjects.length > 0)
            {
                let sceneObject = sceneObjects[0];
                if (sceneObject.name.endsWith('_GRP')) 
                {
                    let category = sceneObject.name.substr(0, sceneObject.name.length-4);
                    let type = this.getTypeFromCategory(category);

                    for (let i=0; i < sceneObject.children.length; i++)
                    {
                        let itemName = sceneObject.children[i].name;
                        this.data[type][category].push(itemName);

                        // Assign threejs material
                        sceneObject.children[i].material = new THREE.MeshPhongMaterial({
                            skinning: true,
                            side: THREE.DoubleSide,
                            visible: false
                        });
                        sceneObject.children[i].castShadow = true;
                    }
                }
                sceneObject.scale.set(100,100,100); // fbx2gltf exporter peculiarity
                this.add(sceneObject);
            }
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

    selectItem(categoryName, selectedItemName){
    
        for (let type in this.data) {
            for (let category in this.data[type]) {
                if (category == categoryName) {
                    for (let item in this.data[type][category]) {

                        let itemName = this.data[type][category][item];
                        let selectedObj = this.getObjectByName(itemName);

                        if (itemName == selectedItemName) {
                            selectedObj.material.visible = true;
                            this.selectedItems[categoryName] = itemName;
                        }
                        else {
                            selectedObj.material.visible = false;
                        }
                    }
                }
            }
        }
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