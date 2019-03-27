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
        this.TreasureGeometry = new THREE.BoxGeometry(this.radius / 2, this.radius / 2, this.radius / 2);
        this.TreasureMaterial = [];
        this.TreasureMaterial.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('/static/textures/emerald_block.png') }));
        this.TreasureMaterial.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('/static/textures/emerald_block.png') }));
        this.TreasureMaterial.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('/static/textures/emerald_block.png') }));
        this.TreasureMaterial.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('/static/textures/emerald_block.png') }));
        this.TreasureMaterial.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('/static/textures/emerald_block.png') }));
        this.TreasureMaterial.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('/static/textures/emerald_block.png') }));
    },
    playerMaterial: new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true }),
    playerGeometry: new THREE.BoxGeometry(50, 50, 50, 5, 5, 5),
    playerMaterialURL: "/static/textures/skeleton_blue.png",
    playerGeometryURL: "/static/models/skeleton_armed.json",
}
Settings.create()