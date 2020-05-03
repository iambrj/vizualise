var svg = d3.select("svg");   //selecting the svg tag to add the graph

// appropriate dimensions are set

var margin = 200;
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;
var x = d3.scaleLinear().range([0, width]);   //defines x axis values range
var y = d3.scaleLinear().range([height, 0]);  //defines y axis values range
var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

// Reading the csv data 
d3.csv("https://gist.githubusercontent.com/iambrj/e41d117877cbfd6c9f71286c7790a21e/raw/35e78e3916341bf3468e8293a39a171c86b4f99e/students.csv", function (data) {

    data.sort(function (a, b) { return a.age - b.age; }); 
    // to define the domain for x and y axis
    x.domain(d3.extent(data, function (d) {
        return d.age;

    }));
    y.domain([0, d3.max(data, function (d) {
        return d.goout;
    })]);
    
    d3.line()
        .x(function (d) {
            return x(d.age);
        })
        .y(function (d) {
            return y(d.goout);
        });

    svg.append("text")  //styling for text
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")

    const x_ticks = x.ticks()  //adding x axis ticks
        .filter(tick => Number.isInteger(tick));

    var xaxis = g.append("g")    //creating x axis 
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(x_ticks).tickFormat(d3.format('d')));



    xaxis.append("text")
        .attr("x", 200)
        .attr("y", 50)
        .attr("fill", "#000")
        .attr("font-size", "12px")
        .attr("text-anchor", "start")
        .text("Quality of relationships");  

    const y_ticks = y.ticks()    //adding y axis ticks
        .filter(tick => Number.isInteger(tick));
    var yaxis = g.append("g")     //creating y axis 
        .call(d3.axisLeft(y).tickValues(y_ticks).tickFormat(d3.format('d')));

    // styling of text of y-axis
    yaxis.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("font-size", "12px")
        .attr("text-anchor", "end")
        .attr("stroke", "blue")
        .text("Degree of going out going out");

    xaxis.selectAll("text").style("stroke", "blue");

    yaxis.selectAll("text").style("stroke", "blue");

    xaxis.selectAll("line").style("stroke", "purple");

    yaxis.selectAll("line").style("stroke", "green");

    // creating the circling using the data provided
    g.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function (d) {
            return 2 * d.Dalc;     //twice of alcohol consumption during weekdays is considered as radius 
        })
        .attr("cx", function (d) {
            return x(d.age);
        })
        .attr("cy", function (d) {
            return y(d.goout);
        })
        .attr("fill", "#32CD32");   //to fill color in circle

});
