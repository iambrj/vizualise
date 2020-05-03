// By default we want father's visualisation to be visible.
graph("father");
function getOption() {
    // Cheching the selected option in case submit button is clicked. 
    selectElement = document.querySelector('#dropdw_button')
    output = selectElement.value;
    di = document.getElementById('tes');
    // Based on the option the heading will change 
    if (output == "father") {
        di.innerHTML = "Family support, father job, father education";
    }
    if (output == "mother") {
        di.innerHTML = "Family support, mother job, mother education";
    }
    // graph function is called with the obtained option to make visualisation
    graph(output);
}
// Following function will be used to draw the visualisation
function graph(output) {
    // Setting an appropriate margin
    var margin = { top: 0, right: 120, bottom: 50, left: 0 },
        width = 960 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    if (output == "father") {
        var chart = d3.parsets()
            .width(height)
            .height(width)
            .dimensions(["famsup", "Fjob", "Fedu"]);
    }
    else if (output == "mother") {
        var chart = d3.parsets()
            .width(height)
            .height(width)
            .dimensions(["famsup", "Mjob", "Medu"]);
    }
// Removing old visualisation to new when option is changed
    d3.selectAll("svg").remove();
    // vis variable will contain all the chart code hence first we append svg and set appr. wit
    var vis = d3.select("#vis").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(0," + height + ")rotate(-90)");
    // Partition is created to make different sections for each value of an attribute
    var partition = d3.layout.partition()
        .sort(null)
        .size([chart.width(), chart.height() * 5 / 4])
        .children(function (d) { return d.children ? d3.values(d.children) : null; })
        .value(function (d) { return d.count; });

    var ice = false;
    // Read the csv file passed and make basic setting for the chart
    d3.csv("https://gist.githubusercontent.com/iambrj/e41d117877cbfd6c9f71286c7790a21e/raw/35e78e3916341bf3468e8293a39a171c86b4f99e/students.csv", function (csv) {
        vis.datum(csv).call(chart);
        vis.selectAll(".category text")
            .attr("dx", 5)
            .attr("transform", "rotate(90)");
        vis.selectAll(".category rect")
            .attr("y", 0);
        vis.selectAll("text.dimension")
            .attr("dy", "1.5em")
            .attr("transform", "rotate(90)");
        vis.selectAll("text.dimension .sort.alpha")
            .attr("x", 0)
            .attr("dx", 0)
            .attr("dy", "1.5em");
        vis.selectAll("text.dimension .sort.size")
            .attr("dx", "1em");


        window.icicle = function () {
            var newIce = this.checked,
                tension = chart.tension();
            if (newIce === ice) return;
            if (ice = newIce) {
                var dimensions = [];
                vis.selectAll("g.dimension")
                    .each(function (d) { dimensions.push(d); });
                dimensions.sort(function (a, b) { return a.y - b.y; });
                var root = d3.parsets.tree({ children: {} }, csv, dimensions.map(function (d) { return d.name; }), function () { return 1; }),
                    nodes = partition(root),
                    nodesByPath = {};
                nodes.forEach(function (d) {
                    var path = d.data.name,
                        p = d;
                    while ((p = p.parent) && p.data.name) {
                        path = p.data.name + "\0" + path;
                    }
                    if (path) nodesByPath[path] = d;
                });
                var data = [];
                vis.on("mousedown.icicle", stopClick, true)
                    .select(".ribbon").selectAll("path")
                    .each(function (d) {
                        var node = nodesByPath[d.path],
                            s = d.source,
                            t = d.target;
                        s.node.x0 = t.node.x0 = 0;
                        s.x0 = t.x0 = node.x;
                        s.dx0 = s.dx;
                        t.dx0 = t.dx;
                        s.dx = t.dx = node.dx;
                        data.push(d);
                    });
                iceTransition(vis.selectAll("path"))
                    .attr("d", function (d) {
                        var s = d.source,
                            t = d.target;
                        return ribbonPath(s, t, tension);
                    })
                    .style("stroke-opacity", 1);
                iceTransition(vis.selectAll("text.icicle")
                    .data(data)
                    .enter().append("text")
                    .attr("class", "icicle")
                    .attr("text-anchor", "middle")
                    .attr("dy", ".3em")
                    .attr("transform", function (d) {
                        return "translate(" + [d.source.x0 + d.source.dx / 2, d.source.dimension.y0 + d.target.dimension.y0 >> 1] + ")rotate(90)";
                    })
                    .text(function (d) {
                        return d.source.dx > 15 ? d.node.name : null;
                        // return d.node.name; 

                    })
                    .style("opacity", 1e-6))
                    .style("opacity", 1);
                iceTransition(vis.selectAll("g.dimension rect, g.category")
                    .style("opacity", 1))
                    .style("opacity", 1e-6)
                    .each("end", function () { d3.select(this).attr("visibility", "hidden"); });
                iceTransition(vis.selectAll("text.dimension"))
                    .attr("transform", "translate(0,-5)");
                vis.selectAll("tspan.sort").style("visibility", "hidden");
            } else {
                vis.on("mousedown.icicle", null)
                    .select(".ribbon").selectAll("path")
                    .each(function (d) {
                        var s = d.source,
                            t = d.target;
                        s.node.x0 = s.node.x;
                        s.x0 = s.x;
                        s.dx = s.dx0;
                        t.node.x0 = t.node.x;
                        t.x0 = t.x;
                        t.dx = t.dx0;
                    });
                iceTransition(vis.selectAll("path"))
                    .attr("d", function (d) {
                        var s = d.source,
                            t = d.target;
                        return ribbonPath(s, t, tension);
                    })
                    .style("stroke-opacity", null);
                iceTransition(vis.selectAll("text.icicle"))
                    .style("opacity", 1e-6).remove();
                iceTransition(vis.selectAll("g.dimension rect, g.category")
                    .attr("visibility", null)
                    .style("opacity", 1e-6))
                    .style("opacity", 1);
                iceTransition(vis.selectAll("text.dimension"))
                    .attr("transform", "translate(0,-25)");
                vis.selectAll("tspan.sort").style("visibility", null);
            }
        };
        d3.select("#icicle")
            .on("change", icicle)
            .each(icicle);
    });

    function iceTransition(g) {
        return g.transition().duration(1000);
    }

    function ribbonPath(s, t, tension) {
        var sx = s.node.x0 + s.x0,
            tx = t.node.x0 + t.x0,
            sy = s.dimension.y0,
            ty = t.dimension.y0;
        return (tension === 1 ? [
            "M", [sx, sy],
            "L", [tx, ty],
            "h", t.dx,
            "L", [sx + s.dx, sy],
            "Z"]
            : ["M", [sx, sy],
                "C", [sx, m0 = tension * sy + (1 - tension) * ty], " ",
                [tx, m1 = tension * ty + (1 - tension) * sy], " ", [tx, ty],
                "h", t.dx,
                "C", [tx + t.dx, m1], " ", [sx + s.dx, m0], " ", [sx + s.dx, sy],
                "Z"]).join("");
    }

    function stopClick() { d3.event.stopPropagation(); }

    // Given a text function and width function, truncates the text if necessary to
    // fit within the given width.
    function truncateText(text, width) {
        return function (d, i) {
            var t = this.textContent = text(d, i),
                w = width(d, i);
            if (this.getComputedTextLength() < w) return t;
            this.textContent = "…" + t;
            var lo = 0,
                hi = t.length + 1,
                x;
            while (lo < hi) {
                var mid = lo + hi >> 1;
                if ((x = this.getSubStringLength(0, mid)) < w) lo = mid + 1;
                else hi = mid;
            }
            return lo > 1 ? t.substr(0, lo - 2) + "…" : "";
        };
    }

    d3.select("#file").on("change", function () {
        var file = this.files[0],
            reader = new FileReader;
        reader.onloadend = function () {
            var csv = d3.csv.parse(reader.result);
            vis.datum(csv).call(chart
                .value(csv[0].hasOwnProperty("Number") ? function (d) { return +d.Number; } : 1)
                .dimensions(function (d) { return d3.keys(d[0]).filter(function (d) { return d !== "Number"; }).sort(); }));
        };
        reader.readAsText(file);
    });
}