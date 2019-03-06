class Net {
    constructor() { }

    saveLevel(mapObject) {
        console.log("saving level on server");
        return new Promise(promise => {
            $.ajax({
                url: "/saveLevel",
                data: { 
                    size: mapObject.size,
                    level: mapObject.level
                 },
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