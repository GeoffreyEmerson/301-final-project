// Sandbox for example-sandbox
$(function() {
  var trace1 = {
    z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
    type: 'heatmap'
  };

  var data = [trace1];

  var layout = {
    title:'Redraw'
  };

  Plotly.newPlot(graphDiv, data, layout);

  graphDiv.on('plotly_hover', function(event) {
    // console.log(graphDiv);
    // graphDiv.data.push({x: [1,2,3,4], y: [4,3,2,1], mode: 'lines+markers'});
    graphDiv.data[0].z[2][2] = 80;
    Plotly.redraw(graphDiv);
  });
});
