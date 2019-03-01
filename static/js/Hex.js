class Hex {
    constructor(id, col, row, table) {
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
            var entry = table.find(hexagon => hexagon.id == id)
            if (entry == undefined) {
                console.log("doesnt exist yet - creating");
                var arrow = $("<img src='/static/img/arrow.png' class='arrow' id='arrow" + id + "'>")
                $("#hexagon" + id).append(arrow)
                var div = $("<div id='displayDiv" + id + "' class='displayDiv'>")
                $("#hexagon" + id).append(div)
                table.push({ id: id, col: col, row: row, dir: 0, })
                entry = table.find(hexagon => hexagon.id == id)
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
    }
}