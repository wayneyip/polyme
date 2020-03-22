class Category 
{
    constructor(name, typeName, colors) 
    {
        this.name = name;
        this.typeName = typeName;       
        
        this.items = [];
        this.selectedItemIndex = 0;

        this.colors = colors;
        this.selectedColorIndex = 0;
    }
}


class Character extends THREE.Group 
{
    constructor(manager) 
    {
        // Initial setup
        super();
        this.data = {
            'overall':  new Category('overall', 'body',     [0xffe0bd, 0xe4b98e, 0xd99164, 0xbb6d4a, 0x813e30]),
            'face':     new Category('face',    'body',     []),
            'hair':     new Category('hair',    'body',     [0x3d3d3d, 0x4f1a00, 0x663306, 0xaa8866, 0xdebe99]),
            'eyes':     new Category('eyes',    'body',     []),
            'brows':    new Category('brows',   'body',     [0x3d3d3d, 0x4f1a00, 0x663306, 0xaa8866, 0xdebe99]),
            'nose':     new Category('nose',    'body',     []),
            'mouth':    new Category('mouth',   'body',     []),
            'ears':     new Category('ears',    'body',     []),
            'top':      new Category('top',     'clothes',  [0xeae2dc, 0x645f3f, 0x20419a, 0xef4848, 0xf34976, 0x8063d5, 0x0ca2bd]),
            'bottom':   new Category('bottom',  'clothes',  [0x1560bd, 0x654321, 0x333333, 0xe1e1e1]),
            'shoes':    new Category('shoes',   'clothes',  [0x3d3d3d, 0xeae2dc, 0x60371f]),
        };
        this.morphTargetLookup = {};

        // Loader
        let gltfLoader = new THREE.GLTFLoader(manager);
        let texLoader = new THREE.TextureLoader();
        gltfLoader.load('assets/character.glb', (file)=>{

            // Add skeleton helper
            // let rig = file.scene.getObjectByName('root_JNT');
            // let helper = new THREE.SkeletonHelper(rig.children[0]);
            // this.add(helper);

            // Handle eye material
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

            // Handle body/skin material
            let body_obj = file.scene.getObjectByName('body_MSH');
            let bodyMaterial = new THREE.MeshPhongMaterial({
                skinning: true,
                morphTargets: true,
                visible: false
            });
            body_obj.material = bodyMaterial;
            body_obj.castShadow = true;

            // Fill this character's data JSON with morphTarget data
            let bodyProperties = body_obj.userData.fromFBX.userProperties;
            let propertyList = Object.entries(bodyProperties);
            for (let i=0; i < propertyList.length; i++)
            {
                let property = propertyList[i];
                if (property[0].startsWith('target'))
                {
                    let morphTargetName = property[1].value;
                    let category = morphTargetName.split('_')[0];

                    this.data[category].items.push(morphTargetName);

                    // Also map the morph target's name to its index
                    let morphTargetIndex = property[0].split('_')[1];
                    this.morphTargetLookup[morphTargetName] = morphTargetIndex;
                }
            }

            // Fill this character's data JSON with mesh data
            let sceneObjects = file.scene.children[0].children;
            while (sceneObjects.length > 0)
            {
                let sceneObject = sceneObjects[0];
                if (sceneObject.name.endsWith('_GRP')) 
                {
                    let category = sceneObject.name.split('_')[0];

                    for (let i=0; i < sceneObject.children.length; i++)
                    {
                        let item = sceneObject.children[i];
                        this.data[category].items.push(item.name);

                        // Assign threejs material
                        item.material = new THREE.MeshPhongMaterial({
                            skinning: true,
                            side: THREE.DoubleSide,
                            visible: false
                        });
                        item.castShadow = true;
                    }
                }
                sceneObject.scale.set(100,100,100); // fbx2gltf exporter peculiarity
                this.add(sceneObject);
            }
        });
    }

    selectItem(category, selectedItemIndex)
    {
        this.data[category].selectedItemIndex = selectedItemIndex;

        for (let i in this.data[category].items) 
        {
            let itemName = this.data[category].items[i];
            let selectedObj = this.getObjectByName(itemName);

            if (i == selectedItemIndex) 
            {
                if (itemName.endsWith('_BLN')) 
                {
                    let index = this.morphTargetLookup[itemName];
                    let body = scene.getObjectByName('body_MSH');
                    body.morphTargetInfluences[index] = 1;
                }
                else if (itemName.endsWith('_MSH')) 
                {
                    selectedObj.material.visible = true;
                }
            }
            else 
            {
                if (itemName.endsWith('_BLN')) 
                {
                    let morphTargetIndex = this.morphTargetLookup[itemName];
                    let body = scene.getObjectByName('body_MSH');
                    body.morphTargetInfluences[morphTargetIndex] = 0;
                }
                else if (itemName.endsWith('_MSH')) 
                {
                    selectedObj.material.visible = false;
                }
            }
        }
    }

    colorItem(colorIndex, categoryName, itemIndex){

        let category = this.data[categoryName];

        // Sanity check: does category allow colors?
        if (category.colors.length == 0) 
        {
            return;
        }

        category.selectedColorIndex = colorIndex;
        let item;

        // Temp hack for body
        if (categoryName == 'overall') 
        {
            item = scene.getObjectByName('body_MSH'); 
        }
        else 
        {
            this.traverse(function(child) 
            {
                if (child.name == category.items[itemIndex]) 
                {
                    item = child;
                }
            });
        }
        item.material.color = new THREE.Color(category.colors[colorIndex]);
    }

    showCharacter()
    {
        let body, LF_eye, RT_eye;
        this.traverse(function(child) 
        {
            if (child.name == 'body_MSH') 
            {
                body = child;
            }
            else if (child.name == 'LF_eye_MSH')
            {
                LF_eye = child;
            }
            else if (child.name == 'RT_eye_MSH') 
            {
                RT_eye = child;
            }
        });
        body.material.visible = true;
        LF_eye.material.visible = true;
        RT_eye.material.visible = true;
    }
}