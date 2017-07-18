var margin = { top: 50, right: 0, bottom: 100, left: 30 },
  width = 960 - margin.left - margin.right,
  height = 430 - margin.top - margin.bottom,
  gridSize = Math.floor(width / 24),
  legendElementWidth = gridSize*2,
  buckets = 9,
  colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
  days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
  datasets = ["data.tsv"];
  // datasets = 'file:///Users/Spencer/codecore/final%20project/mapSPA/data.tsv';

var svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dayLabels = svg.selectAll(".dayLabel")
  .data(days)
  .enter().append("text")
    .text(function (d) { return d; })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

var timeLabels = svg.selectAll(".timeLabel")
  .data(times)
  .enter().append("text")
  .text(function(d) { return d; })
  .attr("x", function(d, i) { return i * gridSize; })
  .attr("y", 0)
  .style("text-anchor", "middle")
  .attr("transform", "translate(" + gridSize / 2 + ", -6)")
  .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });


var myArrayOfObjects = [
  {day: 1, hour: 1, value: 0},
  {day: 1, hour: 2, value: 0},
  {day: 1, hour: 3, value: 0},
  {day: 1, hour: 4, value: 0},
  {day: 1, hour: 5, value: 0},
  {day: 1, hour: 6, value: 0},
  {day: 1, hour: 7, value: 0},
  {day: 1, hour: 8, value: 0},
  {day: 1, hour: 9, value: 0},
  {day: 1, hour: 10, value: 0},
  {day: 1, hour: 11, value: 0},
  {day: 1, hour: 12, value: 0},
  {day: 1, hour: 13, value: 0},
  {day: 1, hour: 14, value: 0},
  {day: 1, hour: 15, value: 0},
  {day: 1, hour: 16, value: 0},
  {day: 1, hour: 17, value: 0},
  {day: 1, hour: 18, value: 0},
  {day: 1, hour: 19, value: 0},
  {day: 1, hour: 20, value: 0},
  {day: 1, hour: 21, value: 0},
  {day: 1, hour: 22, value: 0},
  {day: 1, hour: 23, value: 0},
  {day: 1, hour: 24, value: 0},
  /////////////////////////
  {day: 2, hour: 1, value: 0},
  {day: 2, hour: 2, value: 0},
  {day: 2, hour: 3, value: 0},
  {day: 2, hour: 4, value: 0},
  {day: 2, hour: 5, value: 0},
  {day: 2, hour: 6, value: 0},
  {day: 2, hour: 7, value: 0},
  {day: 2, hour: 8, value: 0},
  {day: 2, hour: 9, value: 0},
  {day: 2, hour: 10, value: 0},
  {day: 2, hour: 11, value: 0},
  {day: 2, hour: 12, value: 0},
  {day: 2, hour: 13, value: 0},
  {day: 2, hour: 14, value: 0},
  {day: 2, hour: 15, value: 0},
  {day: 2, hour: 16, value: 0},
  {day: 2, hour: 17, value: 0},
  {day: 2, hour: 18, value: 0},
  {day: 2, hour: 19, value: 0},
  {day: 2, hour: 20, value: 0},
  {day: 2, hour: 21, value: 0},
  {day: 2, hour: 22, value: 0},
  {day: 2, hour: 23, value: 0},
  {day: 2, hour: 24, value: 0},
  //
  {day: 3, hour: 1, value: 0},
  {day: 3, hour: 2, value: 0},
  {day: 3, hour: 3, value: 0},
  {day: 3, hour: 4, value: 0},
  {day: 3, hour: 5, value: 0},
  {day: 3, hour: 6, value: 0},
  {day: 3, hour: 7, value: 0},
  {day: 3, hour: 8, value: 0},
  {day: 3, hour: 9, value: 0},
  {day: 3, hour: 10, value: 0},
  {day: 3, hour: 11, value: 0},
  {day: 3, hour: 12, value: 0},
  {day: 3, hour: 13, value: 0},
  {day: 3, hour: 14, value: 0},
  {day: 3, hour: 15, value: 0},
  {day: 3, hour: 16, value: 0},
  {day: 3, hour: 17, value: 0},
  {day: 3, hour: 18, value: 0},
  {day: 3, hour: 19, value: 0},
  {day: 3, hour: 20, value: 0},
  {day: 3, hour: 21, value: 0},
  {day: 3, hour: 22, value: 0},
  {day: 3, hour: 23, value: 0},
  {day: 3, hour: 24, value: 0},
  //
  {day: 4, hour: 1, value: 0},
  {day: 4, hour: 2, value: 0},
  {day: 4, hour: 3, value: 0},
  {day: 4, hour: 4, value: 0},
  {day: 4, hour: 5, value: 0},
  {day: 4, hour: 6, value: 0},
  {day: 4, hour: 7, value: 0},
  {day: 4, hour: 8, value: 0},
  {day: 4, hour: 9, value: 0},
  {day: 4, hour: 10, value: 0},
  {day: 4, hour: 11, value: 0},
  {day: 4, hour: 12, value: 0},
  {day: 4, hour: 13, value: 0},
  {day: 4, hour: 14, value: 0},
  {day: 4, hour: 15, value: 0},
  {day: 4, hour: 16, value: 0},
  {day: 4, hour: 17, value: 0},
  {day: 4, hour: 18, value: 0},
  {day: 4, hour: 19, value: 0},
  {day: 4, hour: 20, value: 0},
  {day: 4, hour: 21, value: 0},
  {day: 4, hour: 22, value: 0},
  {day: 4, hour: 23, value: 0},
  {day: 4, hour: 24, value: 0},
  //
  {day: 5, hour: 1, value: 0},
  {day: 5, hour: 2, value: 0},
  {day: 5, hour: 3, value: 0},
  {day: 5, hour: 4, value: 0},
  {day: 5, hour: 5, value: 0},
  {day: 5, hour: 6, value: 0},
  {day: 5, hour: 7, value: 0},
  {day: 5, hour: 8, value: 0},
  {day: 5, hour: 9, value: 0},
  {day: 5, hour: 10, value: 0},
  {day: 5, hour: 11, value: 0},
  {day: 5, hour: 12, value: 0},
  {day: 5, hour: 13, value: 0},
  {day: 5, hour: 14, value: 0},
  {day: 5, hour: 15, value: 0},
  {day: 5, hour: 16, value: 0},
  {day: 5, hour: 17, value: 0},
  {day: 5, hour: 18, value: 0},
  {day: 5, hour: 19, value: 0},
  {day: 5, hour: 20, value: 0},
  {day: 5, hour: 21, value: 0},
  {day: 5, hour: 22, value: 0},
  {day: 5, hour: 23, value: 0},
  {day: 5, hour: 24, value: 0},
  //
  {day: 6, hour: 1, value: 0},
  {day: 6, hour: 2, value: 0},
  {day: 6, hour: 3, value: 0},
  {day: 6, hour: 4, value: 0},
  {day: 6, hour: 5, value: 0},
  {day: 6, hour: 6, value: 0},
  {day: 6, hour: 7, value: 0},
  {day: 6, hour: 8, value: 0},
  {day: 6, hour: 9, value: 0},
  {day: 6, hour: 10, value: 0},
  {day: 6, hour: 11, value: 0},
  {day: 6, hour: 12, value: 0},
  {day: 6, hour: 13, value: 0},
  {day: 6, hour: 14, value: 0},
  {day: 6, hour: 15, value: 0},
  {day: 6, hour: 16, value: 0},
  {day: 6, hour: 17, value: 0},
  {day: 6, hour: 18, value: 0},
  {day: 6, hour: 19, value: 0},
  {day: 6, hour: 20, value: 0},
  {day: 6, hour: 21, value: 0},
  {day: 6, hour: 22, value: 0},
  {day: 6, hour: 23, value: 0},
  {day: 6, hour: 24, value: 0},
  //
  {day: 7, hour: 1, value: 0},
  {day: 7, hour: 2, value: 0},
  {day: 7, hour: 3, value: 0},
  {day: 7, hour: 4, value: 0},
  {day: 7, hour: 5, value: 0},
  {day: 7, hour: 6, value: 0},
  {day: 7, hour: 7, value: 0},
  {day: 7, hour: 8, value: 0},
  {day: 7, hour: 9, value: 0},
  {day: 7, hour: 10, value: 0},
  {day: 7, hour: 11, value: 0},
  {day: 7, hour: 12, value: 0},
  {day: 7, hour: 13, value: 0},
  {day: 7, hour: 14, value: 0},
  {day: 7, hour: 15, value: 0},
  {day: 7, hour: 16, value: 0},
  {day: 7, hour: 17, value: 0},
  {day: 7, hour: 18, value: 0},
  {day: 7, hour: 19, value: 0},
  {day: 7, hour: 20, value: 0},
  {day: 7, hour: 21, value: 0},
  {day: 7, hour: 22, value: 0},
  {day: 7, hour: 23, value: 0},
  {day: 7, hour: 24, value: 0},
];


var heatmapChart = function(data) {

var colorScale = d3.scale.quantile()
    .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
    .range(colors);

var cards = svg.selectAll(".hour")
    .data(data, function(d) {return d.day+':'+d.hour;});

cards.append("title");

cards.enter().append("rect")
    .attr("x", function(d) { return (d.hour - 1) * gridSize; })
    .attr("y", function(d) { return (d.day - 1) * gridSize; })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("class", "hour bordered")
    .attr("width", gridSize)
    .attr("height", gridSize)
    .style("fill", colors[0]);


cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.value); });

cards.select("title").text(function(d) { return d.value; });

cards.exit().remove();

var legend = svg.selectAll(".legend")
  .data([0].concat(colorScale.quantiles()), function(d) { return d; });

legend.enter().append("g")
  .attr("class", "legend");

legend.append("rect")
  .attr("x", function(d, i) { return legendElementWidth * i; })
  .attr("y", height)
  .attr("width", legendElementWidth)
  .attr("height", gridSize / 2)
  .style("fill", function(d, i) { return colors[i]; });

legend.append("text")
  .attr("class", "mono")
  .text(function(d) { return "≥ " + Math.round(d); })
  .attr("x", function(d, i) { return legendElementWidth * i; })
  .attr("y", height + gridSize);

legend.exit().remove();
    // });
  };


 var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
   .data(datasets);

 datasetpicker.enter()
   .append("input")
   .attr("value", function(d){ return "Dataset " + d })
   .attr("type", "button")
   .attr("class", "dataset-button")
   .on("click", function(d) {
     heatmapChart(d);
   });

   $('.heat-button').click(function(){
     console.log(crimeEnd);
     for(let i = 0; i<myArrayOfObjects.length; i++){
       myArrayOfObjects[i]['value'] = 0;
     }

     let hold = [];
     let c,day,count;
     let b = crimeEnd;
      for (let i = 0; i<b.length; i++){
          c = `${b[i]['year']}-${b[i]['month']}-${b[i]['day']}`;
          day = (moment(c).day());
          b[i]['dayofweek'] = day;
          b[i]['hour'] = (b[i]['hour'] + 1)
      }

    for (let i = 0; i<7; i++){
      for(let x = 1; x < 25; x++){
        result = (_.where(b, {dayofweek: i, hour:x})).length;
        if(i === 1){
          count = (24 + (x-1));
        }
        else if (i > 1){
          count = (((i)*24) + (x-1));
        }
        else{
          count = (x-1);
        }
        myArrayOfObjects[count]['value'] = result;
      }
    }
    for (let i = 0; i<b.length; i++){
        b[i]['hour'] = (b[i]['hour'] - 1);
    }
   heatmapChart(myArrayOfObjects);
 });

 $('#clear-heat-button').click(function(){
   for(let i = 0; i<myArrayOfObjects.length; i++){
     myArrayOfObjects[i]['value'] = 0;
   }
   heatmapChart(myArrayOfObjects);
   console.log(myArrayOfObjects);
 });
