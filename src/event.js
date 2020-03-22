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
window.addEventListener('keypress', function(e){

    if (e.code == 'KeyS')
    {
        let body = scene.getObjectByName("body_MSH");
        body.morphTargetInfluences[2] = 1;
    }
})

function selectItem(category, itemIndex){

    character.selectItem(category, itemIndex);
    
    // Color the selected item accordingly
    let colorIndex = character.data[category].selectedColorIndex; 
    character.colorItem(colorIndex, category, itemIndex);
}

function selectColor(colorIndex, category, itemIndex){
    
    character.colorItem(colorIndex, category, itemIndex);
}

function populateItems(){

    let categories = Object.keys(character.data);
    for (let i in categories) {
        let category = categories[i];
        let categoryElement = document.getElementById(category);
        if (categoryElement) {

            // Create div to hold item buttons
            let itemDiv = document.createElement('DIV');
            $(itemDiv).addClass('item-div');
            categoryElement.appendChild(itemDiv);

            // Create button for each item
            let categoryItems = character.data[category].items;
            for (let i in categoryItems) {
                let newButton = document.createElement('LI');
                newButton.className += "item-button";
                newButton.innerHTML = categoryItems[i];
                itemDiv.appendChild(newButton);
            }

            // Add item selection callback function
            $(itemDiv).selectable({
                selected: function(event, ui){
                    let itemIndex = Array.from(ui.selected.parentNode.childNodes).indexOf(ui.selected);
                    selectItem(category, itemIndex);

                    // Disallow multi-select
                    $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
                }
            });

            // Select first item in each category by default
            let itemMenu = categoryElement.children[0];
            if (itemMenu.children[0]) {
                itemMenu.children[0].classList.add('ui-selected');
                selectItem(category, 0); 
            }
        }
    }
}

function populateColors(){
    
    let categories = Object.keys(character.data);
    for (let i in categories) {
        let category = categories[i];
        let categoryElement = document.getElementById(category);
        if (categoryElement) {

            // Create div to hold color buttons
            let colorDiv = document.createElement('DIV');
            $(colorDiv).addClass('color-div');
            categoryElement.appendChild(colorDiv);

            // Create button for each color
            let categoryColors = character.data[category].colors;
            for (let i in categoryColors) {
                let newButton = document.createElement('LI');
                $(newButton).addClass('color-button');
                newButton.style.backgroundColor = getHexColorAsString(categoryColors[i]);
                colorDiv.appendChild(newButton);
            }

            // Add color selection callback function
            $(colorDiv).selectable({
                selected: function(event, ui){
                    let colorIndex = Array.from(ui.selected.parentNode.childNodes).indexOf(ui.selected);
                    let itemIndex = character.data[category].selectedItemIndex;

                    selectColor(colorIndex, category, itemIndex);

                    // Disallow multi-select
                    $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
                }
            });

            // Select first color in each category by default
            let colorMenu = categoryElement.children[1];
            if (colorMenu.children[0]) {
                colorMenu.children[0].classList.add('ui-selected');
                let itemIndex = character.data[category].selectedItemIndex;
                selectColor(0, category, itemIndex);
            }
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