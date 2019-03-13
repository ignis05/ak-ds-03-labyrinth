class Hex3D {

    constructor(location) {

        console.log("creating hex");
        var radius = Settings.radius

        var container = new THREE.Object3D() // kontener na obiekty 3D

        var wall = new THREE.Mesh(Settings.hexWallgeometry, Settings.hexWallmaterial);

        for (var i = 0; i < 6; i++) {
            if (i != location.dirOut) {
                var side = wall.clone()
            }
            else {
                var side = new Doors()
            }
            side.position.x = (radius * Math.sqrt(3) / 2) * Math.sin(Math.PI / 3 * i)
            side.position.y = 0
            side.position.z = (radius * Math.sqrt(3) / 2) * Math.cos(Math.PI / 3 * i)
            side.lookAt(container.position) // nakierowanie ścian na środek kontenera 3D  
            container.add(side)
        }
        container.position.y = Settings.height / 2
        return container
    }
}