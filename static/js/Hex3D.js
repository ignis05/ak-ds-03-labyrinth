class Hex3D {

    constructor() {


        var radius = Settings.radius

        var container = new THREE.Object3D() // kontener na obiekty 3D

        var wall = new THREE.Mesh(Settings.hexWallgeometry, Settings.hexWallmaterial);

        for (var i = 0; i < 6; i++) {
            var side = wall.clone()
            side.position.x = radius * Math.sin(Math.PI / 3 * i)
            side.position.y =0
            side.position.z = radius * Math.cos(Math.PI / 3 * i)
            side.lookAt(container.position) // nakierowanie ścian na środek kontenera 3D  
            container.add(side)
        }
        container.position.y = radius /2
        return container
    }
}