var config = {
    hexagons: {
        offset: 20
    }
}

var tab = []

function create() {
    $("#map").find(".hexagon").remove()
    var quantity = $("#select").val()
    console.log(`creating ${quantity} hexagons`);
    var id = 0;
    tab = []
    for (var j = 0; j < quantity; j++) {
        for (var i = 0; i < quantity; i++) {
            let img = $(`<div class='hexagon' id='hexagon${id}'>`)
            img
                .css("position", "absolute")
                .css("background-image", "url('/static/img/hexagon.png')")
                .css("background-size", "contain")
                .css("left",  (77 * j) + config.hexagons.offset)
            if (j % 2 == 0) {
                img
                    .css("top", (98.5 * i) + config.hexagons.offset)
            }
            else {
                img
                    .css("top", (98.5 * i + 50) + config.hexagons.offset)
            }


            img.click(function () {
                var id = this.id.substr(7, this.id.length - 2)
                console.log(`hexagon ${id} clicked`);
                console.log(tab[id]);
                if (tab[id] == undefined) {
                    console.log("doesnt exist yet");
                    var arrow = $("<img src='/static/img/arrow.png' class='arrow' id='arrow" + id + "'>")
                    $("#hexagon" + id).append(arrow)
                    tab[id] = 0
                    var div = $("<div id='displayDiv" + id + "' class='displayDiv'>")
                    $("#hexagon" + id).append(div)
                }
                else {
                    console.log("exists");
                    if (tab[id] == 5) {
                        tab[id] = 0
                    }
                    else {
                        tab[id]++
                    }
                }
                $("#displayDiv" + id).text(tab[id])
                $("#arrow" + id).css("transform", "rotate(" + tab[id] * 60 + "deg)")
            })


            img.appendTo($("#map"))
            id++
        }

    }
}


$(document).ready(() => {
    console.log("document ready");
    $("#btCreate").click(create)
})