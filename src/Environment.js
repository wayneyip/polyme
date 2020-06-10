class Environment extends THREE.Group 
{
  constructor(...args) 
  {
    super(...args);

	const floorGeo = new THREE.PlaneGeometry(10000, 10000);
	const floorMat = new THREE.MeshLambertMaterial( {color: 0xaaaaaa, side: THREE.DoubleSide} );
	let floor = new THREE.Mesh( floorGeo, floorMat );
	floor.name = "floor";
	floor.rotateX(1.57);
	floor.receiveShadow = true;

    this.add(floor);
  }
}