class Light{
    constructor(){
        var container = new THREE.Object3D();
        var light = new THREE.PointLight( 0xffffff, 1, 1000 );
        //light.castShadow = true
        container.add(light);
        var mesh = new THREE.Mesh(Settings.Icosahedron, Settings.yellowWireframeMaterial)
        container.add(mesh);
        return container
    }
}