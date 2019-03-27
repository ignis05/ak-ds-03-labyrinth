class Player {
    constructor() {
        this.container = new THREE.Object3D()
        this.player = new THREE.Mesh(Settings.playerGeometry, Settings.playerMaterial); // player sześcian
        this.container.add(this.player) // kontener w którym jest player
        this.axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu
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