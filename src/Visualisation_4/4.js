const csvUrl =
"https://gist.githubusercontent.com/iambrj/e41d117877cbfd6c9f71286c7790a21e/raw/35e78e3916341bf3468e8293a39a171c86b4f99e/students.csv";
const absencesColumn = "absences";
const failureColumn = "failures";
const pstatusColumn = "Pstatus";
const badCsv =
"https://gist.githubusercontent.com/iambrj/399e7cc0061af90217e45d5974c28e3e/raw/62e703dcb668269c9799175e8f14e5f221be99ea/blah.csv";
const parseDate = d3.timeParse("%Y/%m/%d %H:%M");



d3.csv(csvUrl, type, function(error, data) {
    if (error) throw error;

    const absencesValues = [...new Set((data.map(datum => datum[absencesColumn]).sort()))].map(a => +a);
    const failureValues = [...new Set((data.map(datum => datum[failureColumn]).sort()))];
    const pstatusValues = [...new Set((data.map(datum => datum[pstatusColumn]).sort()))];

    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scaleOrdinal()
        .domain(["A", "T"])
        .range(["rgba(249, 208, 87, 0.7)", "rgba(54, 174, 175, 0.65)"]);

    var x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = color;

    var area = d3.area()
        .curve(d3.curveMonotoneX)
        .x(function(d) { return x(d.absences); })
        .y0(y(0))
        .y1(function(d) { return y(d.failures); });
    
    var sources = pstatusValues.map(function(id) {
          return {
            id: id,
            values: data.filter(function(d) {
                return d[pstatusColumn] == id;
            })
        };
    });

    console.log(absencesValues);

    x.domain([0, Math.max(...absencesValues)]);

    y.domain([0, 4]);

    z.domain(sources.map(function(c) { return c.id; }));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("Failures");

    var source = g.selectAll(".area")
        .data(sources)
        .enter().append("g")
        .attr("class", function(d) { return `area ${d.id}`; })

    source.append("path")
        .attr("d", function(d) { return area(d.values); })
        .style("fill", function(d) { return z(d.id); });
});

function type(d, _, columns) {
    //d.date = parseDate(d.date);
    for (var i = 1, n = columns.length, c; i < n; ++i) {
        c = columns[i];
        if(parseInt(d[c]))
            d[c] = +d[c];
    }
    return d;
}