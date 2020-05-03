const csvUrl =
    "https://gist.githubusercontent.com/iambrj/e41d117877cbfd6c9f71286c7790a21e/raw/35e78e3916341bf3468e8293a39a171c86b4f99e/students.csv";
// First we read the csv file from the link

d3.csv(csvUrl, function (data) {

    // Filter the data to find number of students with ith famrel value and small family for all the values of quality of family relationships

    q_1_small = data.filter(function (d) {
        return (d.famrel == "1" && d.famsize == 'LE3')
    });
    m_q_1_small = Math.floor(d3.mean(q_1_small, function (d) { return +(d.Walc) })).toString();
    q_2_small = data.filter(function (d) {
        return (d.famrel == "2" && d.famsize == 'LE3')
    });
    m_q_2_small = Math.floor(d3.mean(q_2_small, function (d) { return +(d.Walc) })).toString();
    q_3_small = data.filter(function (d) {
        return (d.famrel == "3" && d.famsize == 'LE3')
    });
    m_q_3_small = Math.floor(d3.mean(q_3_small, function (d) { return +(d.Walc) })).toString();
    q_4_small = data.filter(function (d) {
        return (d.famrel == "4" && d.famsize == 'LE3')
    });
    m_q_4_small = Math.floor(d3.mean(q_4_small, function (d) { return +(d.Walc) })).toString();
    q_5_small = data.filter(function (d) {
        return (d.famrel == "5" && d.famsize == 'LE3')
    });
    m_q_5_small = Math.floor(d3.mean(q_5_small, function (d) { return +(d.Walc) })).toString();

    // Filter the data to find number of students with ith famrel value and large family for all the values of quality of family relationships


    q_1_big = data.filter(function (d) {
        return (d.famrel == "1" && d.famsize == 'GT3')
    });
    m_q_1_big = Math.floor(d3.mean(q_1_big, function (d) { return +(d.Walc) })).toString();
    q_2_big = data.filter(function (d) {
        return (d.famrel == "2" && d.famsize == 'GT3')
    });
    m_q_2_big = Math.floor(d3.mean(q_2_big, function (d) { return +(d.Walc) })).toString();
    q_3_big = data.filter(function (d) {
        return (d.famrel == "3" && d.famsize == 'GT3')
    });
    m_q_3_big = Math.floor(d3.mean(q_3_big, function (d) { return +(d.Walc) })).toString();
    q_4_big = data.filter(function (d) {
        return (d.famrel == "4" && d.famsize == 'GT3')
    });
    m_q_4_big = Math.floor(d3.mean(q_4_big, function (d) { return +(d.Walc) })).toString();
    q_5_big = data.filter(function (d) {
        return (d.famrel == "5" && d.famsize == 'GT3')
    });
    m_q_5_big = Math.floor(d3.mean(q_5_big, function (d) { return +(d.Walc) })).toString();

    // Following code to plot stacked plot

    var names = ["1", "2", "3", "4", "5"];  // this represents x-axis
    var x_co = [m_q_1_small, m_q_2_small, m_q_3_small, m_q_4_small, m_q_5_small];   // this is for lower bars
    var y_co = [m_q_1_big, m_q_2_big, m_q_3_big, m_q_4_big, m_q_5_big]; // this is for upper bars
    arr = [];
    for (i = 0; i < 5; i++) {
        dic = {
            Names: names[i],
            x_cod: x_co[i],
            y_cod: y_co[i]
        }
        arr.push(dic);
    }

    data = arr;

// Setting appropriate margins and width
    
    var margin = {
        top: 100,
        right: 160,
        bottom: 35,
        left: 400
    };

    var width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var tooltip = d3.select("body")    //for styling text which appear on hovering 
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "14px")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style('fill', 'rgb(0, 253, 190)')

// Following svg will contain the graph

    var svg = d3.select("#graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//  A new dataset is created to add define x and y coordinate of stacked bar

    var dataset = d3.layout.stack()(["x_cod", "y_cod"].map(function (fr) {
        return data.map(function (d) {
            return {
                x: d.Names,
                y: +d[fr]
            };
        });
    }));

    //  for the lower bar

    var x = d3.scale.ordinal()
        .domain(dataset[0].map(function (d) {
            return d.x;
        }))
        .rangeRoundBands([10, width - 10], 0.02);

        // for upper bar 

    var y = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d3.max(d, function (d) {
                return d.y0 + d.y;
            });
        })])
        .range([height, 0]);
 
    var colors = ["#a9a9a9", "#4682b4"];   // colors for each graph


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat(function (d) {
            return d
        });

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(0);

    
    svg.append("g")              // creating y axis with label
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("x", -300)
        .attr("y", y(y.ticks().pop()) - 200)
        .attr("dy", "15em")
        .attr("fill", "#000")

        .attr("font-weight", "bold")
        .attr("font-size", "12px")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(-90)")
        .text("Level of avg. alcohol consumption");

    svg.append("g")                 // creating x axis with label
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", 120)
        .attr("y", 30)
        // .attr("dy", "15em")
        .attr("fill", "#000")

        .attr("font-weight", "bold")
        .attr("font-size", "12px")
        .attr("text-anchor", "start")
        .text("Quality of relationships");
    // xAxis.append("text")



    var groups = svg.selectAll("g.cost")     
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function (d, i) {
            return colors[i];
        });
// Following code creates bars by adding rect
    var rect = groups.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.x);           // x coordinate of bar 
        })
        .attr("y", function (d) {
            return y(d.y0 + d.y);                     
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y0 + d.y);
        })
        .attr("width", x.rangeBand())
        .on("mouseover", function (d) {
            if (d.y0 == 0) {

                return tooltip.style("visibility", "visible").text("Average Alcohol Consumption Level = " + (d.y - d.y0).toString(10));

            }
            else {
                return tooltip.style("visibility", "visible").text("Average Alcohol Consumption Level = " + (d.y).toString(10));

            }
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        })
        .on("mousemove", function (d) {

            if (d.y0 == 0) {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px").text("Average Alcohol Consumption Level = " + (d.y - d.y0).toString(10));
            }
            else {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px").text("Average Alcohol Consumption Level = " + (d.y).toString(10));

            }
        });


    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(30," + i * 19 + ")";
        });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d, i) {
            return colors.slice().reverse()[i];
        });

        // For labeling the colors 
        
    legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d, i) {
            if (i == 0) {
                return "Having Large family"
            } else return "Having Small family"

        });

});
