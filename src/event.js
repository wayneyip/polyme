// window.addEventListener('mousemove', function(e){
 
//     let mouse3D_head = new THREE.Vector3(
//         ( event.clientX / window.innerWidth ) * 200 - 100,
//         100 - ( event.clientY / window.innerHeight ) * 200,
//         100
//     );

//     let head = scene.getObjectByName("neck_JNT");
//     head.lookAt(mouse3D_head);
//     head.rotateZ(1.57);

//     let leg = scene.getObjectByName("LF_thigh_JNT");
//     leg.lookAt(mouse3D_head);
//     leg.rotateZ(-1.57);
//     leg.rotateX(-1.57);
// })

window.addEventListener('keydown', function(e){

    if (e.code == 'KeyA')
    {
        let body = scene.getObjectByName("pelvis_JNT");
        body.rotateX(-0.05);
    }

    if (e.code == 'KeyD')
    {
        let body = scene.getObjectByName("pelvis_JNT");
        body.rotateX(0.05);
    }
})

function selectItem(categoryName, selectedItemName){

    character.selectItem(categoryName, selectedItemName);
    
    // Color the selected item accordingly
    let color = character.selectedColors[categoryName]; 
    selectColor(color, categoryName, selectedItemName);
}

function selectColor(color, categoryName, itemName){
    
    character.selectedColors[categoryName] = color;
    character.colorItem(color, itemName);
}

function populateItems(){

    for (let type in character.data) {
        for (let category in character.data[type]) {
            let categoryElement = document.getElementById(category);
            if (categoryElement){
                
                let itemDiv = document.createElement('DIV');
                $(itemDiv).addClass('item-div');
                categoryElement.appendChild(itemDiv);

                for (let item in character.data[type][category]) {
                    
                    let itemName = character.data[type][category][item];

                    let newButton = document.createElement('LI');
                    newButton.className += "item-button";
                    newButton.innerHTML = itemName;
                    itemDiv.appendChild(newButton);
                }

                $(itemDiv).selectable({
                    selected: function(event, ui){
                        let categoryName = ui.selected.parentNode.parentNode.id;
                        let itemName = ui.selected.innerText;
                        selectItem(categoryName, itemName);

                        // Deselect all other items in category
                        $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
                    }
                });
            }
        }
    }
    // Select first item in every category by default
    let itemMenus = document.getElementsByClassName('item-div');
    for (let i=0; i < itemMenus.length; i++) {
        if (itemMenus[i].children.length > 0) {
            
            // Make UI display selection
            itemMenus[i].children[0].classList.add('ui-selected');

            // Also programmatically select element                
            let categoryName = itemMenus[i].parentNode.id; 
            let itemName = itemMenus[i].children[0].innerText;
            selectItem(categoryName, itemName);
        }   
    } 
}

function populateColors(){
    for (let type in character.data) {
        for (let category in character.data[type]) {
            let categoryElement = document.getElementById(category);
            if (categoryElement)
            {
                let colorDiv = document.createElement('DIV');
                $(colorDiv).addClass('color-div');
                categoryElement.appendChild(colorDiv);

                // Get list of colors for this category
                let colors = character.categoryColors[category];
                
                // Create color button
                for (let i=0; i < colors.length; i++) {
                    let newButton = document.createElement('LI');
                    $(newButton).addClass('color-button');
                    newButton.style.backgroundColor = getHexColorAsString(colors[i]);
                    colorDiv.appendChild(newButton);
                }

                $(colorDiv).selectable({
                    selected: function(event, ui){
                        let color = ui.selected.style.backgroundColor;
                        let categoryName = ui.selected.parentNode.parentNode.id;
                        let itemName = character.selectedItems[categoryName];

                        selectColor(color, categoryName, itemName);

                        // Deselect all other colors in category
                        $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
                    }
                });
            }
        }
    }
    // Select first color in every category by default
    let colorMenus = document.getElementsByClassName('color-div');
    for (let i=0; i < colorMenus.length; i++) {
        if (colorMenus[i].children.length > 0) {
            
            // Make UI display selection
            colorMenus[i].children[0].classList.add('ui-selected');

            // Also programmatically select element                
            let color = colorMenus[i].children[0].style.backgroundColor; 
            let categoryName = colorMenus[i].parentNode.id;
            let itemName = character.selectedItems[categoryName];
            selectColor(color, categoryName, itemName);
        }   
    } 
}

function getHexColorAsString(hexColor){

    strColor = hexColor.toString(16);
    while (strColor.length < 6) {
        strColor = '0' + strColor;
    }
    return '#' + strColor;
}

function init(){
    if (isCharLoaded) {
        populateItems();
        populateColors();
        character.showCharacter();
    }
    else {
       window.setTimeout(init, 1000);
    }
}

$(document).ready(function(){

    $('.type-menu').tabs({active:0}).addClass('ui-tabs-vertical');
    $( ".type-menu li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

    $('.category-menu').tabs({active:0});
    
    init();
});