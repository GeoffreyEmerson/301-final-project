// Sandbox for example-sandbox
$(function() {
  var aggData = [{
    z: [[1, 20, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    y: ['Morning', 'Afternoon', 'Evening'],
    type: 'heatmap'
  }];
  Plotly.newPlot('aggGraph', aggData);

  var perData = [{
    z: [[null, null, null, null, null], [null, null, 1, null, null], [null, null, null, -null, null]],
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], //Are labels needed?
    y: ['Morning', 'Afternoon', 'Evening'],
    type: 'heatmap'
  }];
  Plotly.newPlot('perGraph', perData);

//jQuery animations
  var $perGraph = $('#perGraph');
  $('#personalGraph rect.drag.cursor-crosshair').hover(function() {
    console.log('in');
    $perGraph.stop();
    $perGraph.animate({
      'opacity': '1',
    }, 800);
  },function() {
    console.log('out');
    $perGraph.stop();
    $perGraph.animate({
      'opacity': '0.0',
    }, 800);
  });
});
