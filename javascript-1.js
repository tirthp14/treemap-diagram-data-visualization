let videoGamesDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"

let gamesData

let canvas = d3.select("#canvas")
let tooltip = d3.select("#tooltip")
let legend = d3.select("#legend")

let drawTreeMap = () => {

    let hierarchy = d3.hierarchy(gamesData, (node) => {
        return node["children"]
    }).sum((node) => {
        return node["value"]
    }).sort((node1, node2) => {
        return node2["value"] - node1["value"]
    })

    let createTreeMap = d3.treemap()
                            .size([1000, 600])

    createTreeMap(hierarchy)

    let gamesTiles = hierarchy.leaves()

    let block = canvas.selectAll("g")
            .data(gamesTiles)
            .enter()
            .append("g")
            .attr("transform", (game) => {
                return "translate(" + game["x0"] + ", " + game["y0"] + ")"
            })

    block.append("rect")
            .attr("class", "tile")
            .attr("fill", (game) => {
                let category = game["data"]["category"]

                let colors = ["#5a9dd7", "#c6ddee", "#ffaf70", "#ffccaa", "#5fcf56", "#c1f9b0", "#e94e4a", "#ffb7b7", "#ad97cc", "#d0c4eb", "#a9837e", "#dcb3ac", "#ec9ab8", "#fbc6da", "#999999", "#c7c7c7", "#c8c433", "#e5e5b3", "#45b2d1", "#9ddbe5"]

                if (category === "Wii") {
                    return colors[0]
                } else if (category === "DS") {
                    return colors[1]
                } else if (category === "X360") {
                    return colors[2]
                } else if (category === "GB") {
                    return colors[3]
                } else if (category === "PS3") {
                    return colors[4]
                } else if (category === "NES") {
                    return colors[5]
                } else if (category === "PS2") {
                    return colors[6]
                } else if (category === "3DS") {
                    return colors[7]
                } else if (category === "PS4") {
                    return colors[8]
                } else if (category === "SNES") {
                    return colors[9]
                } else if (category === "PS") {
                    return colors[10]
                } else if (category === "N64") {
                    return colors[11]
                } else if (category === "GBA") {
                    return colors[12]
                } else if (category === "XB") {
                    return colors[13]
                } else if (category === "PC") {
                    return colors[14]
                } else if (category === "2600") {
                    return colors[15]
                } else if (category === "PSP") {
                    return colors[16]
                } else if (category === "XOne") {
                    return colors[17]
                } else {
                    return colors[18]
                }
            })
            .attr("data-name", (game) => {
                return game["data"]["name"]
            })
            .attr("data-category", (game) => {
                return game["data"]["category"]
            })
            .attr("data-value", (game) => {
                return game["data"]["value"]
            })
            .attr("width", (game) => {
                return game["x1"] - game["x0"]
            })
            .attr("height", (game) => {
                return game["y1"] - game["y0"]
            })
            .attr("stroke", "white")
            .on("mouseover", (event, game) => {

                tooltip.style("opacity", 0.9)
                tooltip.style("border-radius", 15 + "px")
                tooltip
                .html(
                    "<p>" +
                        "Name: " + game["data"]["name"] + "</br>" + "Category: " + game["data"]["category"] + "</br>" + "Value: " + game["data"]["value"] +
                    "</p>"
                    )
                .attr("data-value", game["data"]["value"])
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 28 + "px")
            })
            .on("mouseout", (item) => {
                tooltip.style("opacity", 0)
            })

    block.append("text")
            .selectAll('tspan')
            .data((movie) => {
                return movie["data"]["name"].split(/(?=[A-Z][^A-Z])/g);
            })
            .enter()
            .append('tspan')
            .attr('x', 4)
            .attr('y', (movie, i) => {
                return 13 + i * 10;
            })
            .text((movie) => {
                return movie;
            })
            .style("font-size", 11 + "px")
            .attr("class", "tile-text")
}

let drawLegend = () => {

    let colors = ["#5a9dd7", "#c6ddee", "#ffaf70", "#ffccaa", "#5fcf56", "#c1f9b0", "#e94e4a", "#ffb7b7", "#ad97cc", "#d0c4eb", "#a9837e", "#dcb3ac", "#ec9ab8", "#fbc6da", "#999999", "#c7c7c7", "#c8c433", "#e5e5b3", "#45b2d1", "#9ddbe5"]
    
    let legendItems = [
        { label: "Wii", color: colors[0] },
        { label: "DS", color: colors[1] },
        { label: "X360", color: colors[2] },
        { label: "GB", color: colors[3] },
        { label: "PS3", color: colors[4] },
        { label: "NES", color: colors[5] },
        { label: "PS2", color: colors[6] },
        { label: "3DS", color: colors[7] },
        { label: "PS4", color: colors[8] },
        { label: "SNES", color: colors[9] },
        { label: "PS", color: colors[10] },
        { label: "N64", color: colors[11] },
        { label: "GBA", color: colors[12] },
        { label: "XB", color: colors[13] },
        { label: "PC", color: colors[14] },
        { label: "2600", color: colors[15] },
        { label: "PSP", color: colors[16] },
        { label: "XOne", color: colors[17] }
    ];

    let legendGroup = legend.selectAll("g")
        .data(legendItems)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(${Math.floor(i / 3) * 150 + 100}, ${i % 3 * 40})`);

    legendGroup.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("class", "legend-item")
        .attr("fill", d => d.color);

    legendGroup.append("text")
        .text(d => d.label)
        .attr("x", 26)
        .attr("y", 16)
        .style("font-size", 16 + "px");
}

d3.json(videoGamesDataURL).then(
    (data, error) => {
        if (error) {
            console.log("error")
        } else {
            gamesData = data
            console.log(gamesData)
            drawTreeMap()
            drawLegend()
        }
    }
)