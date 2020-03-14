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
	else if (e.code == 'KeyC')
	{
		var underwear = scene.getObjectByName("underwear_MSH");
		var pants = scene.getObjectByName("pants_MSH");
		var jeans = scene.getObjectByName("jeans_MSH");
		underwear.material.visible = false;
		pants.material.visible = false;
		jeans.material.visible = true;
	}
})

function selectItem(){
	// Make all other items in category not visible

	// Make selected item visible
	
}

function populateItem(categoryName){
	var group = character.getObjectByName(categoryName+"_GRP");
	var list = group.children;
	var categoryElement = document.getElementById(categoryName);
	for (var i=0; i < list.length; i++)
	{
		var itemName = list[i].name;
		if (categoryElement)
		{
			categoryElement.innerHTML += '<button class="item-button" onclick="selectItem()">'+itemName+'</button>';
		}
	}
}

function populateItems(){

	if(isCharLoaded) {
		var character = scene.children[0].getObjectByName('character_GRP');
		console.log(character.data);
		populateItem("hair");
		populateItem("top");
		populateItem("bottom");
    } 
    else {
       window.setTimeout(populateItems, 1000);
    }
}

function openTypeTab(event, typeName){
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

	// Highlight selected tab
	var typeButtons = document.getElementsByClassName("type-button");
	for (var i=0; i < typeButtons.length; i++)
	{
		typeButtons[i].className = typeButtons[i].className.replace(" type-button-selected", "");
	}
	event.currentTarget.className += " type-button-selected";
}

function openCategoryTab(evt, categoryName){
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

	// Highlight selected tab
	var categoryButtons = document.getElementsByClassName("category-button");
	for (var i=0; i < categoryButtons.length; i++)
	{
		categoryButtons[i].className = categoryButtons[i].className.replace(" category-button-selected", "");
	}
	evt.currentTarget.className += " category-button-selected";
}

populateItems();
document.getElementById('body-button').click();
document.getElementById('overall-button').click();