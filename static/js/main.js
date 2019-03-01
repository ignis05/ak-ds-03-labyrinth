var net = new Net()

var level = []

function create() {
    $("#map").find(".hexagon").remove()
    var quantity = $("#select").val()
    console.log(`creating ${quantity} hexagons`);
    var id = 0;
    level = []
    for (let j = 0; j < quantity; j++) {
        for (let i = 0; i < quantity; i++) {
            new Hex(id, j, i, level)
            id++
        }
    }
}


$(document).ready(() => {
    console.log("document ready");

    $("#btCreate").click(create)
    $("#btSave").click(async function () {
        console.log("sending");
        var res = await net.saveLevel(level)
        if (res === true) {
            console.log("saving successful");
            $(this).text("SUCCESS!")
            setTimeout(() => {
                $(this).text("Save on server")
            }, 2000)
        }
        else {
            console.error("level saving error");
        }
    })
})