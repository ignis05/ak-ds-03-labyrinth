class Grid {
    constructor(size) {
        this.plane = null;
        this.size = size
        this.init()
    }
    init() {
        var floor = new THREE.PlaneGeometry(this.size, this.size, 25, 25);
        var materialBlack = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true
        })
        this.plane = new THREE.Mesh(floor, materialBlack);
        scene.add(this.plane);
        this.plane.position.Y = -1
        this.plane.rotation.set(Math.PI / 2, 0, 0)
    }
}