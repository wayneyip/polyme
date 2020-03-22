class Lights extends THREE.Group 
{
  constructor(...args) 
  {
    super(...args);

    const dir = new THREE.DirectionalLight(0xFFFFFF, 0.1);
    const spot = new THREE.SpotLight(0xFFFFFF, 0.2, 0, 0.8, 1, 1);
    const ambi = new THREE.AmbientLight( 0x404040 , 0.66);
    const hemi = new THREE.HemisphereLight( 0xFFFFFF, 0x080820, 1 )

    spot.position.set(0, 50, 100);
    spot.target.position.set(0,0,0);

    dir.position.set(50, 100, 100);
    dir.target.position.set(-20, -50, -100);

    dir.castShadow = true;
    const d = 50;
    dir.shadow.camera.near = 1;
    dir.shadow.camera.far = 300;
    dir.shadow.camera.left = -d;
    dir.shadow.camera.right = d;
    dir.shadow.camera.top = d;
    dir.shadow.camera.bottom = -d;

    this.add(ambi, hemi, dir, dir.target, spot);

  }
}
