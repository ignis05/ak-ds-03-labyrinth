class Hex3D {

    constructor(radius) {


        radius = 100 // zmienna wielkość hexagona, a tym samym całego labiryntu

        var container = new THREE.Object3D() // kontener na obiekty 3D

        var wall = new THREE.Mesh(geometry, material);

        for (var i = 0; i < 6; i++) {
            var side = wall.clone()
            side.position.x =// ???
                side.position.z = //???
                side.lookAt(container.position) // nakierowanie ścian na środek kontenera 3D  
            container.add(side)

        }
        return container
    }
}