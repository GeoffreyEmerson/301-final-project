$(function() {
  var layout = {};
  var aggData = [{
    z: [[1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1], [20, 1, 60, 80, 30, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1], [30, 60, 1, -10, 20, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1],[30, 60, 1, -10, 20, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1],[30, 60, 1, -10, 20, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1],[30, 60, 1, -10, 20, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1],[30, 60, 1, -10, 20, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1, 20, 30, 50, 1]],
    x: ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12a', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p', '12p'],
    y: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
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
});
