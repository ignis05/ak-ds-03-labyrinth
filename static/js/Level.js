class Level {
    constructor() {
        this.net = new Net()
        this.map = null
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
        var models = []
        console.log(this.map.level);
        for (let j = 0; j < this.map.size; j++) {
            for (let i = 0; i < this.map.size; i++) {
                let model = new Hex3D()
                scene.add(model)
                model.position.x = Settings.radius * 2 * j
                if (j % 2 == 0) {
                    model.position.z = ((Settings.radius * 2) * i)
                }
                else {
                    model.position.z = ((Settings.radius * 2) * i + Settings.radius)
                }
            }
        }
    }
}