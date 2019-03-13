class Level {
    constructor() {
        this.net = new Net()
        this.map = null
        this.hexagons = []
        this.net.loadlevel().then(map => {
            this.map = map
            console.log(this.map);
            if (this.map.level) {
                this.create()
            }
            else {
                window.alert("no map found on server")
                window.location = "/"
            }
        })
    }

    create() {
        console.log("creating level");
        for (var location of this.map.level) {
            let model = new Hex3D(location)
            scene.add(model)
            model.position.x = Settings.radius * 2 * location.row
            if (location.row % 2 == 0) {
                model.position.z = ((Settings.radius * 2) * location.col)
            }
            else {
                model.position.z = ((Settings.radius * 2) * location.col + Settings.radius)
            }
            this.hexagons.push(model)
        }
    }
}