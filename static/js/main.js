var net = new Net()

var config = {
    hexagons: {
        offset: 20,
        spaces: 5,
    }
}

var level = []

function create() {
    $("#map").find(".hexagon").remove()
    var quantity = $("#select").val()
    console.log(`creating ${quantity} hexagons`);
    var id = 0;
    level = []
    for (let j = 0; j < quantity; j++) {
        for (let i = 0; i < quantity; i++) {
            let img = $(`<div class='hexagon' id='hexagon${id}'>`)
            img
                .css("position", "absolute")
                .css("background-image", "url('/static/img/hexagon.png')")
                .css("background-size", "contain")
                .css("left", ((86.25 + config.hexagons.spaces + 1) * j) + config.hexagons.offset)
            if (j % 2 == 0) {
                img
                    .css("top", ((100 + config.hexagons.spaces) * i) + config.hexagons.offset)
            }
            else {
                img
                    .css("top", ((100 + config.hexagons.spaces) * i + 50) + config.hexagons.offset)
            }

            img.click(function () {
                var id = this.id.substr(7, this.id.length - 2)
                console.log(`hexagon ${id} clicked`);
                console.log(`col: ${j}, row: ${i}`);
                var entry = level.find(hexagon => hexagon.id == id)
                if (entry == undefined) {
                    console.log("doesnt exist yet - creating");
                    var arrow = $("<img src='/static/img/arrow.png' class='arrow' id='arrow" + id + "'>")
                    $("#hexagon" + id).append(arrow)
                    var div = $("<div id='displayDiv" + id + "' class='displayDiv'>")
                    $("#hexagon" + id).append(div)
                    level.push(
                        {
                            id: id,
                            col: j,
                            row: i,
                            dir: 0,
                        }
                    )
                    entry = level.find(hexagon => hexagon.id == id)
                }
                else {
                    console.log("exists - updating");
                    if (entry.dir == 5) {
                        entry.dir = 0
                    }
                    else {
                        entry.dir++
                    }
                }
                $("#displayDiv" + id).text(entry.dir)
                img.css("transform", "rotate(" + entry.dir * 60 + "deg)")
            })

            img.appendTo($("#map"))
            id++
        }
    }
}


$(document).ready(() => {
    console.log("document ready");

    $("#btCreate").click(create)
    $("#btSave").click(async function() {
        console.log("sending");
        var res = await net.saveLevel(level)
        if(res === true){
            console.log("saving successful");
            $(this).text("SUCCESS!")
            setTimeout(()=>{
                $(this).text("Save on server")
            },2000)
        }
        else {
            console.error("level saving error");
        }
    })
})