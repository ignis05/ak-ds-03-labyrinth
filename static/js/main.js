var tab = []

function create() {
    $("#root").find(".hexagon").remove()
    var quantity = $("#select").val()
    console.log(`creating ${quantity} hexagons`);
    var id = 0;
    tab = []
    for (var j = 0; j < quantity * 2; j++) {
        for (var i = 0; i < quantity / 2; i++) {
            let img = $(`<div class='hexagon' id='hexagon${id}'>`)
            img
                .css("position", "absolute")
                .css("background-image", "url('/static/img/hexagon.png')")
                .css("background-size", "contain")
            if (j % 2 == 0) {
                img
                    .css("top", (50 * j))
                    .css("left", 200 + 150 * i)
            }
            else {
                img
                    .css("top", (50 * j))
                    .css("left", (200 + 150 * i) + 75)
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
                        tab = 0
                    }
                    else {
                        tab[id]++
                    }
                }
                $("#displayDiv" + id).text(tab[id])
            })


            img.appendTo($("#root"))
            id++
        }

    }
}


$(document).ready(() => {
    console.log("document ready");
    $("#create").click(create)
})