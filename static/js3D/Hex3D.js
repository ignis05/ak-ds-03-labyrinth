class Hex3D {

    constructor(location) {

        console.log("creating hex");
        var radius = Settings.radius

        var container = new THREE.Object3D() // kontener na obiekty 3D

        var wall = new THREE.Mesh(Settings.hexWallGeometry, Settings.hexWallMaterial);

        console.log(location.dirOut, location.dirIn);
        for (var i = 0; i < 6; i++) {
            if (i == location.dirOut) {
                var side = new Doors()
            }
            else if (location.dirIn.includes(i)) {
                console.log("dirin");
                continue
            }
            else {
                var side = wall.clone()
            }
            side.position.x = -(radius * Math.sqrt(3) / 2) * Math.sin((Math.PI / 3 * i)+Math.PI)
            side.position.y = 0
            side.position.z = (radius * Math.sqrt(3) / 2) * Math.cos((Math.PI / 3 * i)+Math.PI)
            side.lookAt(container.position) // nakierowanie ścian na środek kontenera 3D  
            container.add(side)
        }
        container.position.y = Settings.height / 2
        return container
    }
}