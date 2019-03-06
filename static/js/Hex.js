class Hex {
    constructor(id, col, row, map, displayBlock) {
        //#region config
        this.offset = 20
        this.spaces = 5
        //#endregion

        let img = $(`<div class='hexagon' id='hexagon${id}'>`)
        img
            .css("position", "absolute")
            .css("background-image", "url('/static/img/hexagon.png')")
            .css("background-size", "contain")
            .css("left", ((86.25 + this.spaces + 1) * col) + this.offset)
        if (col % 2 == 0) {
            img.css("top", ((100 + this.spaces) * row) + this.offset)
        }
        else {
            img.css("top", ((100 + this.spaces) * row + 50) + this.offset)
        }

        img.click(function () {
            var id = this.id.substr(7, this.id.length - 2)
            console.log(`hexagon ${id} clicked`);
            console.log(`col: ${col}, row: ${row}`);
            var entry = map.level.find(hexagon => hexagon.id == id)
            if (entry == undefined) {
                console.log("doesnt exist yet - creating");
                var arrow = $("<img src='/static/img/arrow.png' class='arrow' id='arrow" + id + "'>")
                $("#hexagon" + id).append(arrow)
                var div = $("<div id='displayDiv" + id + "' class='displayDiv'>")
                $("#hexagon" + id).append(div)
                map.level.push(
                    {
                        id: id,
                        col: col,
                        row: row,
                        dirOut: 0,
                        dirIn: 3,
                        type: map.typeOfNextHex
                    }
                )
                entry = map.level.find(hexagon => hexagon.id == id)
            }
            else {
                console.log("exists - updating");
                if (entry.dirOut == 5) {
                    entry.dirOut = 0
                }
                else {
                    entry.dirOut++
                }
                entry.dirIn = (3 + entry.dirOut) % 6
                entry.type = map.typeOfNextHex
            }
            console.log("dirin: " + entry.dirIn);
            $("#displayDiv" + id).text(entry.dirOut)
            img.css("transform", "rotate(" + entry.dirOut * 60 + "deg)")
            displayBlock.innerText = JSON.stringify(map, null, 4)
        })

        img.appendTo($("#map"))
        var object = map.level.find(hexagon => hexagon.id == id)
        if (object != undefined) {
            console.log("exists");
            let id = object.id
            var arrow = $("<img src='/static/img/arrow.png' class='arrow' id='arrow" + id + "'>")
            $("#hexagon" + id).append(arrow)
            var div = $("<div id='displayDiv" + id + "' class='displayDiv'>")
            $("#hexagon" + id).append(div)
            $("#displayDiv" + id).text(object.dirOut)
            img.css("transform", "rotate(" + object.dirOut * 60 + "deg)")
        }
    }
}