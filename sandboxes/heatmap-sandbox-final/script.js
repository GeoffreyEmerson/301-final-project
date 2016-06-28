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
    z: [[null, null, null, null, null], [0, 1, 0, 0, 0], [0, 0, 1, -1, 2]],
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], //Are labels needed?
    y: ['Morning', 'Afternoon', 'Evening'],
    type: 'heatmap'
  };
  var data = [perTrace, aggTrace];
  var layout = {
    title: 'Wheeee!',
    showlegend: 'true'
  };

  //Graph the plot.
  Plotly.newPlot('graphDiv', data, layout, {
    // staticPlot: 'true'
    displayModeBar: 'false'
  });

  //Event Handlers
  // graphDiv.on('plotly_hover', function() {
  //   console.log('personal data to front');
  //   graphDiv.data[1].opacity = 0;
  //   Plotly.redraw(graphDiv);
  // });
  // graphDiv.on('plotly_unhover', function() {
  //   console.log('aggregate data to front');
  //   graphDiv.data[1].opacity = 1;
  //   Plotly.redraw(graphDiv);
  // });
  graphDiv.on('plotly_click', function(event) {
    aggTrace.z[
      event.points[0].pointNumber[0]
    ][
      event.points[0].pointNumber[1]
    ] += 10;
    perTrace.z[
      event.points[0].pointNumber[0]
    ][
      event.points[0].pointNumber[1]
    ] += 10;
    newData =
    // [];
    // newData[0] = {};
    // newData[0].z = aggTrace.z.slice();
    // newData[0].y = aggTrace.y.slice();
    // newData[0].x = aggTrace.x.slice();
    // newData[0].type = 'heatmap';
    [
      { z: [[Math.random() * 5,Math.random() * 5,Math.random() * 5,Math.random() * 5,Math.random() * 5],
            [Math.random() * 5,Math.random() * 5,Math.random() * 5,Math.random() * 5,Math.random() * 5],
            [Math.random() * 5,Math.random() * 5,Math.random() * 5,Math.random() * 5,Math.random() * 5]],
       x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], //Are labels needed?
       y: ['Morning', 'Afternoon', 'Evening'],
       type: 'heatmap'
      }
    ];
    console.log('click');
    // [ JSON.parse(JSON.stringify(perTrace)), JSON.parse(JSON.stringify(aggTrace)) ];
    //Copy existing data into vars
    // var newAggTrace = aggTrace.slice();
    // var newPerTrace = perTrace.slice();
    //Modify data vars
    //Return modified data to global vars (Probably unnecessary.)
    // aggTrace = newAggTrace;
    // perTrace = newPerTrace;

    //render graphDiv
    // graphDiv.data[0] = newPerTrace;
    // graphDiv.data[1] = newAggTrace;
    graphDiv.data = newData;

    Plotly.redraw('graphDiv');
  });
});
