var myGroups = ["1", "2", "3", "4"]; // Studytime values
var myVars = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]; //Grade values, full range[1,19] is not considered not because  most students didn't feel in that caterory

// below defines labels for each x and y axis
var myGroups_n = ["Studytime: 1", "Studytime: 2", "Studytime: 3", "Studytime: 4"]
var myVars_n = ["Grade: 8", "Grade: 9", "Grade: 10", "Grade: 11", "Grade: 12", "Grade: 13", "Grade: 14", "Grade: 15", "Grade: 16", "Grade: 17", "Grade: 18", "Grade: 19"]


//Read the data
Plotly.d3.csv("https://gist.githubusercontent.com/iambrj/e41d117877cbfd6c9f71286c7790a21e/raw/35e78e3916341bf3468e8293a39a171c86b4f99e/students.csv", function (data) {
    // Finding the number of students for each studytime value and graph.
    no_of_students = new Array(myGroups.length);
    for (var i = 0; i < myGroups.length; i++) {
        no_of_students[i] = [];
    }
    for (var i = 0; i < myGroups.length; i++) {
        for (var j = 0; j < myVars.length; j++) {
            arr = data.filter(function (d) {
                return (d.studytime == myGroups[i] && d.G3 == myVars[j])
            });
            // console.log("Studytime = " + myGroups[i] + "Grade is " + myVars[j] + " No. of students = " + arr.length);
            // console.log(arr);
            no_of_students[i][j] = arr.length;
        }
    }
    // creating dataset to plot a chart and various attributes are given values
    // console.log(no_of_students);
    var myPlot = document.getElementById('myDiv'),
        data_2 = [
            {
                z: no_of_students,
                x: myVars_n,
                y: myGroups_n,
                type: 'heatmap',
                hoverongaps: false,
                colorbar: {
                    title: "Number of students" //to give the heading to the color range bar.
                }
            }],
        layout = {
            hovermode: 'closest',
            title: 'Study time vs Grade ', //giving title to the graph
            xaxis: {
                ticks: '',
                side: 'bottom',

            },
            yaxis: {
                ticks: '',
                ticksuffix: ' ',
                width: 700,
                height: 700,
                autosize: false
            }
        };
        // Plotly is called to drew the data formed before.
    Plotly.newPlot('myDiv', data_2, layout);

});