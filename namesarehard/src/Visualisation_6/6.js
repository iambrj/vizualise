var svg = d3.select("svg");
    // svg.selectAll("*").remove();
    var margin = 200;
    // width = 700 - margin.left - margin.right;
    // height = 500 - margin.top - margin.bottom;
    var width = svg.attr("width") - margin;
    var height = svg.attr("height") - margin;


    // var x = d3.scaleTime().range([0, width]);
    // var x = d3.scaleBand().range([0, width]).padding(0.4);
    // var margin = 200;
    // var width = svg.attr("width") - margin;
    // var height = svg.attr("height") - margin;
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("https://gist.githubusercontent.com/iambrj/e41d117877cbfd6c9f71286c7790a21e/raw/35e78e3916341bf3468e8293a39a171c86b4f99e/students.csv", function(data){
        console.log(data);
        data.sort(function(a, b){ return a.age - b.age;});
        console.log(data);

        // console.log("I am right above each domain");

        x.domain(d3.extent(data, function(d) {
  
            return d.age;
            
        }));

        y.domain([0, d3.max(data, function(d) {

            return d.goout;

            
        })]);

        d3.line()
        .x(function(d) {

          return x(d.age);
            // return x(d.X2011);
        })
        .y(function(d) {

            return y(d.goout);
            // return y(d.Y2011);
        });
        // console.log("I am right above #scatter plot")
    
    
    
    svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", 50)
    .attr("y", 50)
    .attr("font-size", "24px")
    const x_ticks = x.ticks()
            .filter(tick => Number.isInteger(tick));
   
    var xaxis = g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickValues(x_ticks).tickFormat(d3.format('d')));

    // .call(d3.axisBottom(x).tickFormat(function(d){
    //     return d;
    // }));
    xaxis.append("text")
    .attr("y", height - 250)
    .attr("x", width - 100)
    .attr("text-anchor", "end")
    .attr("stroke", "blue")
    .text("Year");
    const y_ticks = y.ticks()
            .filter(tick => Number.isInteger(tick));
    var yaxis = g.append("g")
        .call(d3.axisLeft(y).tickValues(y_ticks).tickFormat(d3.format('d')));
    yaxis.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5.1em")
    .attr("text-anchor", "end")
    .attr("stroke", "blue")
    .text("Degree of going out going out");

    xaxis.selectAll("text").style("stroke", "blue");

    yaxis.selectAll("text").style("stroke", "blue");

    xaxis.selectAll("line").style("stroke", "purple");

    yaxis.selectAll("line").style("stroke", "green");


    g.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d){
            return 2 * d.Dalc;
        })
        .attr("cx", function(d) {
            return x(d.age);
            // return x(d.X2011);
        })
        .attr("cy", function(d) {
            return y(d.goout);
        })
        .attr("fill", "#32CD32");
    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .style("z-index", "10")
        .style("visibility", "hidden");
});
