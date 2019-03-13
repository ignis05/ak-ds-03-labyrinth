class Level {
    constructor() {
        this.net = new Net()
        this.map = null
        this.net.loadlevel().then(map => {
            this.map = map
            console.log(this.map);
            if(this.map.level){
                this.create()
            }
            else {
                window.alert("no map found on server")
                window.location = "/"
            }
        })
    }

    create(){
        console.log("creating level");
    }
}