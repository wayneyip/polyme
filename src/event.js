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

function selectItem(event, categoryName, selectedItemName){

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
						newButton.addEventListener('click', function(){
							selectItem(event, category, itemName)
						});
						categoryElement.appendChild(newButton);
						console.log(newButton);
					}
				}
			}
		}
		// Select first item in every category by default
		let itemMenus = document.getElementsByClassName('item-menu');
		for (let i=0; i < itemMenus.length; i++) {
			if (itemMenus[i].children.length > 0) {
				itemMenus[i].children[0].classList.add('ui-selected');
				itemMenus[i].children[0].click();
			}	
		}
    } 
    else {
       window.setTimeout(populateItems, 1000);
    }
}

function selectType(event, typeName){
	// Open tab
	var types = document.getElementsByClassName("type");
	for (var i=0; i < types.length; i++)
	{
		if (!types[i].className.includes(" hidden"))
		{
			types[i].className += " hidden";
		}
	}
	selectedType = document.getElementById(typeName);
	selectedType.className = selectedType.className.replace(" hidden", "");
}

function selectCategory(evt, categoryName){
	// Open tab
	var categories = document.getElementsByClassName("category");
	for (var i=0; i < categories.length; i++)
	{
		if (!categories[i].className.includes(" hidden"))
		{
			categories[i].className += " hidden";
		}
	}
	selectedCategory = document.getElementById(categoryName);
	selectedCategory.className = selectedCategory.className.replace(" hidden", ""); 
}


$(document).ready(function(){

	$('.type-menu').tabs({active:0});
	$('.category-menu').tabs({active:0});
	$('.item-menu').selectable({
		// selecting: function(event, ui){
  //           if( $(".ui-selected, .ui-selecting").length > 1){
  //         		$("ui.selecting").removeClass("ui-selecting");
  //           }
  //     	}
	});
	populateItems();
});