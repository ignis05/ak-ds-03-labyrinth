var Settings = {
    radius: 100,
    height: 100,
    create() {
        this.hexWallMaterial = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            side: THREE.DoubleSide,
            //map: new THREE.TextureLoader().load("./mats/stone.png"),
        })
        this.hexWallGeometry = new THREE.BoxGeometry(this.radius, this.height, this.radius * 0.1)
        this.hexDoorsGeometry = new THREE.BoxGeometry(this.radius * 0.4, this.height, this.radius * 0.1)
        this.hexSpaces = this.radius * Math.sqrt(3) / 2
        this.hexFloorGeometry = new THREE.CylinderGeometry(this.radius * 1.1, this.radius, 5, 6);
        this.Icosahedron = new THREE.IcosahedronBufferGeometry(25)
        this.yellowWireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            wireframe: true,
        })
    },
}
Settings.create()