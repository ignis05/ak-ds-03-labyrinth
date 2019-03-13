class Doors {
    constructor() {
        var container = new THREE.Object3D()
        var part1 = new THREE.Mesh(Settings.hexDoorsgeometry, Settings.hexDoorsmaterial);
        var part2 = new THREE.Mesh(Settings.hexDoorsgeometry, Settings.hexDoorsmaterial);
        part1.position.x = (Settings.radius - (Settings.radius * 0.4) - (Settings.radius * 0.3))
        part2.position.x = -(Settings.radius - (Settings.radius * 0.4) - (Settings.radius * 0.3))
        container.add(part1)
        container.add(part2)
        return container
    }
}