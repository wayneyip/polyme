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

window.addEventListener('keydown', function(e){

    if (e.code == 'KeyA')
    {
        var body = scene.getObjectByName("pelvis_JNT");
        body.rotateX(-0.05);
    }

    if (e.code == 'KeyD')
    {
        var body = scene.getObjectByName("pelvis_JNT");
        body.rotateX(0.05);
    }
})

window.addEventListener('keypress', function(e){

    if (e.code == 'KeyQ')
    {
        var body = scene.getObjectByName("body_MSH");
        body.material.color = new THREE.Color(0xe4b98e);
    }
    if (e.code == 'KeyW')
    {
        var body = scene.getObjectByName("body_MSH");
        body.material.color = new THREE.Color(0xd99164);
    }
    if (e.code == 'KeyE')
    {
        var body = scene.getObjectByName("body_MSH");
        body.material.color = new THREE.Color(0xbb6d4a);
    }
})

function selectItem(categoryName, selectedItemName){

    for (let type in character.data) {
        for (let category in character.data[type]) {
            if (category == categoryName) {
                for (let item in character.data[type][category]) {

                    let itemName = character.data[type][category][item];
                    let selectedObj = character.getObjectByName(itemName);

                    if (itemName == selectedItemName) {
                        selectedObj.material.visible = true;
                    }
                    else {
                        selectedObj.material.visible = false;
                    }
                }
            }
        }
    }
}

function populateItems(){

    if(isCharLoaded) {
        for (let type in character.data) {
            for (let category in character.data[type]) {
                for (let item in character.data[type][category]) {

                    let categoryElement = document.getElementById(category);
                    if (categoryElement)
                    {
                        let itemName = character.data[type][category][item];

                        let newButton = document.createElement('LI');
                        newButton.className += "item-button";
                        newButton.innerHTML = itemName;
                        categoryElement.appendChild(newButton);
                    }
                }
            }
        }
        // Select first item in every category by default
        let itemMenus = document.getElementsByClassName('item-menu');
        for (let i=0; i < itemMenus.length; i++) {
            if (itemMenus[i].children.length > 0) {
                
                // Make UI display selection
                itemMenus[i].children[0].classList.add('ui-selected');

                // Also programmatically select element                
                let categoryName = itemMenus[i].id; 
                let itemName = itemMenus[i].children[0].innerText;
                selectItem(categoryName, itemName);
            }   
        }
    } 
    else {
       window.setTimeout(populateItems, 1000);
    }
}

$(document).ready(function(){

    $('.type-menu').tabs({active:0});
    $('.category-menu').tabs({active:0});
    $('.item-menu').selectable({
        selected: function(event, ui){
            let categoryName = ui.selected.parentNode.id;
            let itemName = ui.selected.innerText;
            selectItem(categoryName, itemName);

            // Deselect all other items in category
            $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
        }
    });
    populateItems();
});