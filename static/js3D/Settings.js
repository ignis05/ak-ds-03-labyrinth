var Settings = {
    radius: 100,
    height: 100,
    create() {
        this.hexWallGeometry = new THREE.BoxGeometry(this.radius, this.height, this.radius * 0.1)
        this.hexWallMaterial = new THREE.MeshNormalMaterial()
        this.hexDoorsGeometry = new THREE.BoxGeometry(this.radius * 0.4, this.height, this.radius * 0.1)
        this.hexDoorsMaterial = new THREE.MeshNormalMaterial()
        this.hexSpaces = this.radius * Math.sqrt(3) / 2
        this.hexFloorGeometry = new THREE.CylinderGeometry(this.radius, this.radius, 5, 6);
    },
}
Settings.create()