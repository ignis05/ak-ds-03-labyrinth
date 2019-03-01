class Net {
    constructor() { }

    saveLevel(levelTable) {
        console.log("saving level on server");
        return new Promise(promise => {
            $.ajax({
                url: "/saveLevel",
                data: { level: levelTable },
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