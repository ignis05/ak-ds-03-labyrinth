var Settings = {
    radius: 100,
    height: 100,
    create() {
        this.hexWallgeometry = new THREE.BoxGeometry(this.radius, this.height, this.radius * 0.1)
        this.hexWallmaterial = new THREE.MeshNormalMaterial()
        // hexWallmaterial: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        this.hexDoorsgeometry = new THREE.BoxGeometry(this.radius * 0.4, this.height, this.radius * 0.1)
        this.hexDoorsmaterial = new THREE.MeshNormalMaterial()
        this.hexSpaces = this.radius * Math.sqrt(3) / 2
    },
}
Settings.create()