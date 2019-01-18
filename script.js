$(document).ready(function () {
    var data = [
        {
            letter: "A",
            count: 25,
        },
        {
            letter: "B",
            count: 35,
        },
        {
            letter: "C",
            count: 30,
        },
        {
            letter: "D",
            count: 15,
        },
        {
            letter: "E",
            count: 20,
        },
        {
            letter: "F",
            count: 45,
        },
        {
            letter: "G",
            count: 30,
        }
    ];

    var margin = {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
    };

    var barSize = {
        height: 20
    }

    var width = 400 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    x.domain([0, d3.max(data, function(d) { return d.count })]);
    y.domain(data.map(function(d) { return d.letter }));
    y.paddingInner(0.5);

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("text")
        .text(function (d) { return d.count; })
        .attr("x", function (d) { return x(d.count) - 20; })
        .attr("y", function (d, i) { return height - ((i) * 54) - 36; })

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("width", function(d) { return x(d.count) })
        .attr("y", function(d) { return y(d.letter) })
        .attr("height", y.bandwidth());

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));
});