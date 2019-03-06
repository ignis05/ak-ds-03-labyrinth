var net = new Net()

var display = null;

var map = {
    size: null,
    level: [],
}

function create() {
    $("#map").find(".hexagon").remove()
    var quantity = $("#select").val()
    map.size = quantity
    console.log(`creating ${quantity} hexagons`);
    var id = 0;
    map.level = []
    for (let j = 0; j < quantity; j++) {
        for (let i = 0; i < quantity; i++) {
            new Hex(id, j, i, map, display)
            id++
        }
    }
}


$(document).ready(() => {
    console.log("document ready");

    display = document.getElementById("display")

    $("#btCreate").click(create)
    $("#btSave").click(async function () {
        console.log("sending");
        var res = await net.saveLevel(map)
        if (res === true) {
            console.log("saving successful");
            $(this).text("SUCCESS!")
            setTimeout(() => {
                $(this).text("Save on server")
            }, 2000)
        }
        else {
            console.error("map saving error");
        }
    })
})