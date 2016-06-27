// Sandbox for example-sandbox
$(function() {
  // var trace1 = {
  //   z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
  //   type: 'heatmap'
  // };

  var trace1 = {x: [1,2,3,4], y: [4,3,2,1], mode: 'lines+markers'};

  var data = [trace1];

  var layout = {
    title:'Redraw'
  };

  Plotly.newPlot(graphDiv, data, layout);

  graphDiv.on('plotly_hover', function(event) {
    // console.log(graphDiv);

    //Direct changes to data.
    // graphDiv.data.push({x: [1,2,3,4], y: [4,3,2,1], mode: 'lines+markers'});
    // graphDiv.data[0].z[2][2] = 60;

    //Updating graph using restyle.
    // var update = {z: [[[1, 20, 30], [20, 1, 60], [30, 60,
    //   Math.floor(Math.random() * 60)
    // ]]]};
    // Plotly.restyle(graphDiv, update, [0]);
    // graphDiv.data[0].opacity = Math.random();

    //redrawing a line plot
    var update = {x: [[Math.random(),Math.random(),Math.random(),Math.random()]],
                  y: [[Math.random(),Math.random(),Math.random(),Math.random()]],
                  mode: 'lines+markers'};
    Plotly.restyle(graphDiv, update, [0]);

    // Plotly.redraw(graphDiv);
  });
});
