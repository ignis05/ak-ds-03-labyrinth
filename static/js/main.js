var net = new Net()

var display = null;

var map = {
    typeOfNextHex: "walls",
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

function displayLoadedMap(){
    var id = 0;
    for (let j = 0; j < map.size; j++) {
        for (let i = 0; i < map.size; i++) {
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
    $("#btLoad").click(async function () {
        console.log("loading");
        var res = await net.loadlevel()
        console.log(res);
        map = res
        display.innerText = JSON.stringify(map, null, 4)
        displayLoadedMap()
    })


    // hex type changers
    $("#btWalls").addClass("btActive") //initial active:

    $(".hexButton").click(function () {
        var type = this.id.slice(2).toLowerCase()
        map.typeOfNextHex = type
        display.innerText = JSON.stringify(map, null, 4)
        $(".hexButton").removeClass("btActive")
        this.classList.add("btActive")
    })
})