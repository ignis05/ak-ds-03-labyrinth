class Net {
    constructor() { }

    saveLevel(mapObject) {
        console.log("saving level on server");
        return new Promise(promise => {
            $.ajax({
                url: "/saveLevel",
                data: JSON.stringify(mapObject) ,
                type: "POST",
                success: data => {
                    var obj = JSON.parse(data)
                    promise(obj)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    throw "error"
                },
            });
        })
    }

    loadlevel() {
        console.log("loading level from server");
        return new Promise(promise => {
            $.ajax({
                url: "/loadLevel",
                data: {},
                type: "POST",
                success: data => {
                    var obj = JSON.parse(data)
                    promise(obj)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    throw "error"
                },
            });
        })
    }

}