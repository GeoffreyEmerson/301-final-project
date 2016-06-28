// Sandbox for example-sandbox
$(function() {
  var layout = {};
  var aggData = [{
    z: [[1, 20, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    y: ['Morning', 'Afternoon', 'Evening'],
    type: 'heatmap'
  }];
  Plotly.newPlot('aggGraph', aggData, layout, {
    staticPlot: true,
    displayModeBar: false
  });

  var perData = [{
    z: [[null, null, null, null, null], [null, null, 1, null, null], [null, null, null, -null, null]],
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], //Are labels needed?
    y: ['Morning', 'Afternoon', 'Evening'],
    type: 'heatmap'
  }];
  Plotly.newPlot('perGraph', perData, layout, {
    // staticPlot: 'true',
    displayModeBar: false
  });

//jQuery animations
  var $perGraph = $('#perGraph');
  $('#perGraph rect.drag.cursor-crosshair').hover(function() {
    $perGraph.stop();
    $perGraph.animate({
      'opacity': '1',
    }, 800);
  },function() {
    $perGraph.stop();
    $perGraph.animate({
      'opacity': '0.0',
    }, 800);
  });
  //Click Handler
  perGraph.on('plotly_click', function(event) {
    aggData[0].z[
      event.points[0].pointNumber[0]
    ][
      event.points[0].pointNumber[1]
    ] += 10;
    perData[0].z[
      event.points[0].pointNumber[0]
    ][
      event.points[0].pointNumber[1]
    ] += 10;
    perGraph.data = perData;
    aggGraph.data = aggData;
    Plotly.redraw(perGraph);
    Plotly.redraw(aggGraph);
  });
});
