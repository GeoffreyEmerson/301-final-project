// Sandbox for example-sandbox
$(function() {
  //Define datasets
  var aggTrace = {
    z: [[1, 20, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    y: ['Morning', 'Afternoon', 'Evening'],
    type: 'heatmap'
  };
  var perTrace = {
    z: [[1, 0, 0, 0, 1], [0, 1, 0, 0, 0], [0, 0, 1, -1, 2]],
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], //Are labels needed?
    y: ['Morning', 'Afternoon', 'Evening'],
    type: 'heatmap'
  };
  var data = [perTrace, aggTrace];

  //Graph the plot.
  Plotly.newPlot('graphDiv', data);

  //Event Handlers
  graphDiv.on('plotly_hover', function() {
    console.log('personal data to front');
    graphDiv.data[1].opacity = 0;
    Plotly.redraw(graphDiv);
  });
  graphDiv.on('plotly_unhover', function() {
    console.log('aggregate data to front');
    graphDiv.data[1].opacity = 1;
    Plotly.redraw(graphDiv);
  });
  graphDiv.on('plotly_click', function(event) {
    //Copy existing data into vars
    var newAggTrace = aggTrace;
    var newPerTrace = perTrace;
    //Modify data vars
    newAggTrace.z[
      event.points[0].pointNumber[0]
    ][
      event.points[0].pointNumber[1]
    ] ++;
    newPerTrace.z[
      event.points[0].pointNumber[0]
    ][
      event.points[0].pointNumber[1]
    ] ++;
    //Return modified data to global vars (Probably unnecessary.)
    // aggTrace = newAggTrace;
    // perTrace = newPerTrace;

    //render graphDiv
    // graphDiv.data[0] = newPerTrace;
    // graphDiv.data[1] = newAggTrace;
    graphDiv.data = [newPerTrace, newAggTrace];

    Plotly.redraw(graphDiv);
  });
});
