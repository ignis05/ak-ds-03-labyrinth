class Player {
    constructor(model) {
        this.container = new THREE.Object3D()
        this.player = model
        this.player.rotation.y = Math.PI / 2
        this.container.add(this.player)
        this.axes = new THREE.AxesHelper(200)
        this.axes.rotation.y = -Math.PI / 2
        this.player.add(this.axes)
        this.player.position.y = 25 + (Settings.radius * 0.1)
    }

    getPlayerCont() {
        return this.container
    }

    getPlayerMesh() {
        return this.player
    }

    addTo(scene) {
        scene.add(this.container)
    }

}