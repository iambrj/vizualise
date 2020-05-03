// By default romantic relationship chart is shown
graph("romantic");
function getOption() {
    selectElement = document.querySelector('#dropdw_button')
    // Checking the option selected 
    output = selectElement.value;
    di = document.getElementById('tes');
    if (output == "romantic") {
        di.innerHTML = "Romantic Relational Status vs Alcohol consumption during weekdays";
    }
    if (output == "sex") {
        di.innerHTML = "Sex vs Alcohol consumption during weekdays";
    }
    if (output == "schoolsup") {
        di.innerHTML = "Extra Educational Support vs Alcohol consumption during weekdays";
    }
    if (output == "famsup") {
        di.innerHTML = "Family Educational Support vs Alcohol consumption during weekdays";
    }
    // Callng graph function to draw the chart with the option selected.
    graph(output);
}
function graph(output) {
    const csvUrl =
        "https://gist.githubusercontent.com/iambrj/e41d117877cbfd6c9f71286c7790a21e/raw/35e78e3916341bf3468e8293a39a171c86b4f99e/students.csv";
// Reading the csv file for data
    Plotly.d3.csv(csvUrl, function (data) {
        // Based on the option selected the data is filtered
        if (output == "romantic") {
            // To find the number of students who are in relationship
            yes = data.filter(function (d) {
                return (d.romantic == "yes")
            });
            // To find the number of students who are not in relationship
            no = data.filter(function (d) {
                return (d.romantic == "no")
            });
            // To find the number of students who are in relationship and whose level of alcohol consumption is i, for each i in range [1,5]
            yes1 = data.filter(function (d) {
                return (d.romantic == "yes" && d.Dalc == "1")
            });
            yes2 = data.filter(function (d) {
                return (d.romantic == "yes" && d.Dalc == "2")
            });
            yes3 = data.filter(function (d) {
                return (d.romantic == "yes" && d.Dalc == "3")
            });
            yes4 = data.filter(function (d) {
                return (d.romantic == "yes" && d.Dalc == "4")
            });
            yes5 = data.filter(function (d) {
                return (d.romantic == "yes" && d.Dalc == "5")
            });
            no1 = data.filter(function (d) {
                return (d.romantic == "no" && d.Dalc == "1")
            });
            no2 = data.filter(function (d) {
                return (d.romantic == "no" && d.Dalc == "2")
            });
            no3 = data.filter(function (d) {
                return (d.romantic == "no" && d.Dalc == "3")
            });
            no4 = data.filter(function (d) {
                return (d.romantic == "no" && d.Dalc == "4")
            });
            no5 = data.filter(function (d) {
                return (d.romantic == "no" && d.Dalc == "5")
            });
            // Data set is created to make sunburst graph
            var data2 = [
                {
                    type: "sunburst",
                    // Id's are created to distinguish each of the sections of the graph. yes - Level4, Level4 is child of yes
                    ids: ["romantic", "yes", "no", "yes - Level1", "yes - Level2", "yes - Level3", "yes - Level4", "yes - Level5", "no - Level1", "no - Level2", "no - Level3", "no - Level4", "no - Level5"],
                    // labels are given to each ids
                    labels: ["Relationship Status", "Yes", "No", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
                    // Parents is defined for each ids
                    parents: ["", "romantic", "romantic", "yes", "yes", "yes", "yes", "yes", "no", "no", "no", "no", "no"],
                    // value of each section : number of students with such id and parents
                    values: [data.length, yes.length, no.length, yes1.length, yes2.length, yes3.length, yes4.length, yes5.length, no1.length, no2.length, no3.length, no4.length, no5.length],
                    leaf: { "opacity": 0.4 },
                    // A color range is give each ids a specific color
                    marker: { "line": { "width": 2 }, "colors": ["#FFFFFF", "#191970", "#900C3F", "#bdbdea", "#7e7ee9", "#1c1c95", "#060670", "#060654", "#f2cbc2", "#ed7d63", "#f23a0f", "#a42407", "#501203"] },
                    branchvalues: 'total'

                }
            ];
        }
        // Similar to above option rest of the option is done
        else if (output == "sex") {
            // To find the number of students who are Female
            F = data.filter(function (d) {
                return (d.sex == "F")
            });
            // To find the number of students who are Male

            M = data.filter(function (d) {
                return (d.sex == "M")
            });
            // To find the number of students who are in female and whose level of alcohol consumption is i, for each i in range [1,5]
            F1 = data.filter(function (d) {
                return (d.sex == "F" && d.Dalc == "1")
            });
            F2 = data.filter(function (d) {
                return (d.sex == "F" && d.Dalc == "2")
            });
            F3 = data.filter(function (d) {
                return (d.sex == "F" && d.Dalc == "3")
            });
            F4 = data.filter(function (d) {
                return (d.sex == "F" && d.Dalc == "4")
            });
            F5 = data.filter(function (d) {
                return (d.sex == "F" && d.Dalc == "5")
            });
            // To find the number of students who are in male and whose level of alcohol consumption is i, for each i in range [1,5]
            M1 = data.filter(function (d) {
                return (d.sex == "M" && d.Dalc == "1")
            });
            M2 = data.filter(function (d) {
                return (d.sex == "M" && d.Dalc == "2")
            });
            M3 = data.filter(function (d) {
                return (d.sex == "M" && d.Dalc == "3")
            });
            M4 = data.filter(function (d) {
                return (d.sex == "M" && d.Dalc == "4")
            });
            M5 = data.filter(function (d) {
                return (d.sex == "M" && d.Dalc == "5")
            });
            console.log(M5.length);
            // Data set is created to make sunburst graph

            var data2 = [
                {
                    type: "sunburst",
                    ids: ["Sex", "F", "M", "F - Level1", "F - Level2", "F - Level3", "F - Level4", "F - Level5", "M - Level1", "M - Level2", "M - Level3", "M - Level4", "M - Level5"],
                    labels: ["Sex", "Female", "Male", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
                    parents: ["", "Sex", "Sex", "F", "F", "F", "F", "F", "M", "M", "M", "M", "M"],
                    values: [data.length, F.length, M.length, F1.length, F2.length, F3.length, F4.length, F5.length, M1.length, M2.length, M3.length, M4.length, M5.length],
                    leaf: { "opacity": 0.4 },
                    marker: { "line": { "width": 2 }, "colors": ["#FFFFFF", "#191970", "#900C3F", "#bdbdea", "#7e7ee9", "#1c1c95", "#060670", "#060654", "#f2cbc2", "#ed7d63", "#f23a0f", "#a42407", "#501203"] },
                    branchvalues: 'total'

                }
            ];
        }
        else if (output == "schoolsup") {
            yes = data.filter(function (d) {
                return (d.schoolsup == "yes")
            });
            no = data.filter(function (d) {
                return (d.schoolsup == "no")
            });
            yes1 = data.filter(function (d) {
                return (d.schoolsup == "yes" && d.Dalc == "1")
            });
            yes2 = data.filter(function (d) {
                return (d.schoolsup == "yes" && d.Dalc == "2")
            });
            yes3 = data.filter(function (d) {
                return (d.schoolsup == "yes" && d.Dalc == "3")
            });
            yes4 = data.filter(function (d) {
                return (d.schoolsup == "yes" && d.Dalc == "4")
            });
            yes5 = data.filter(function (d) {
                return (d.schoolsup == "yes" && d.Dalc == "5")
            });
            no1 = data.filter(function (d) {
                return (d.schoolsup == "no" && d.Dalc == "1")
            });
            no2 = data.filter(function (d) {
                return (d.schoolsup == "no" && d.Dalc == "2")
            });
            no3 = data.filter(function (d) {
                return (d.schoolsup == "no" && d.Dalc == "3")
            });
            no4 = data.filter(function (d) {
                return (d.schoolsup == "no" && d.Dalc == "4")
            });
            no5 = data.filter(function (d) {
                return (d.schoolsup == "no" && d.Dalc == "5")
            });

            var data2 = [
                {
                    type: "sunburst",
                    ids: ["schoolsup", "yes", "no", "yes - Level1", "yes - Level2", "yes - Level3", "yes - Level4", "yes - Level5", "no - Level1", "no - Level2", "no - Level3", "no - Level4", "no - Level5"],
                    labels: ["Extra School Support", "Yes", "No", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
                    parents: ["", "schoolsup", "schoolsup", "yes", "yes", "yes", "yes", "yes", "no", "no", "no", "no", "no"],
                    values: [data.length, yes.length, no.length, yes1.length, yes2.length, yes3.length, yes4.length, yes5.length, no1.length, no2.length, no3.length, no4.length, no5.length],
                    leaf: { "opacity": 0.4 },
                    marker: { "line": { "width": 2 }, "colors": ["#FFFFFF", "#191970", "#900C3F", "#bdbdea", "#7e7ee9", "#1c1c95", "#060670", "#060654", "#f2cbc2", "#ed7d63", "#f23a0f", "#a42407", "#501203"] },
                    branchvalues: 'total'

                }
            ];
        }
        else if (output == "famsup") {
            yes = data.filter(function (d) {
                return (d.famsup == "yes")
            });
            no = data.filter(function (d) {
                return (d.famsup == "no")
            });
            yes1 = data.filter(function (d) {
                return (d.famsup == "yes" && d.Dalc == "1")
            });
            yes2 = data.filter(function (d) {
                return (d.famsup == "yes" && d.Dalc == "2")
            });
            yes3 = data.filter(function (d) {
                return (d.famsup == "yes" && d.Dalc == "3")
            });
            yes4 = data.filter(function (d) {
                return (d.famsup == "yes" && d.Dalc == "4")
            });
            yes5 = data.filter(function (d) {
                return (d.famsup == "yes" && d.Dalc == "5")
            });
            no1 = data.filter(function (d) {
                return (d.famsup == "no" && d.Dalc == "1")
            });
            no2 = data.filter(function (d) {
                return (d.famsup == "no" && d.Dalc == "2")
            });
            no3 = data.filter(function (d) {
                return (d.famsup == "no" && d.Dalc == "3")
            });
            no4 = data.filter(function (d) {
                return (d.famsup == "no" && d.Dalc == "4")
            });
            no5 = data.filter(function (d) {
                return (d.famsup == "no" && d.Dalc == "5")
            });
            max_yes = Math.max(yes1.length, yes2.length, yes3.length, yes4.length, yes5.length);
            max_no = Math.max(no1.length, no2.length, no3.length, no4.length, no5.length);

            // console.log(maxvalue);
            var data2 = [
                {
                    type: "sunburst",
                    // Id's are created to distinguish each of the sections of the graph. yes - Level4, Level4 is child of yes
                    ids: ["famsup", "yes", "no", "yes - Level1", "yes - Level2", "yes - Level3", "yes - Level4", "yes - Level5", "no - Level1", "no - Level2", "no - Level3", "no - Level4", "no - Level5"],
                    labels: ["Family Education Support", "Yes", "No", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
                    parents: ["", "famsup", "famsup", "yes", "yes", "yes", "yes", "yes", "no", "no", "no", "no", "no"],
                    values: [data.length, yes.length, no.length, yes1.length, yes2.length, yes3.length, yes4.length, yes5.length, no1.length, no2.length, no3.length, no4.length, no5.length],
                    leaf: { "opacity": 0.4 },
                    marker: { "line": { "width": 2 }, "colors": ["#FFFFFF", "#191970", "#900C3F", "#bdbdea", "#7e7ee9", "#1c1c95", "#060670", "#060654", "#f2cbc2", "#ed7d63", "#f23a0f", "#a42407", "#501203"] },
                    branchvalues: 'total'

                }
            ];
        }
        // setting a layout
        var layout = {
            "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
        };
        // Calling plotly to plot the chart 
        Plotly.newPlot('myDiv', data2, layout, { showSendToCloud: true })
    });
}