//Graphing Aggregate Data
var aggGraph = document.getElementById('aggregateGraph');
var aggTrace = {
  z: [[1, 20, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
  x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  y: ['Morning', 'Afternoon', 'Evening'],
  type: 'heatmap'
};
var aggData = [aggTrace];
Plotly.newPlot('aggregateGraph', aggData);
//Graphing Personal Data //suspect that wrapping these in functions allows clearer namespace. Use FP in production version of code.
var perGraph = document.getElementById('personalGraph');
var perTrace = {
  z: [[1, 0, 0, 0, 1], [0, 1, 0, 0, 0], [0, 0, 1, -1, 2]],
  x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], //Are labels needed?
  y: ['Morning', 'Afternoon', 'Evening'],
  type: 'heatmap'
};
var perData = [perTrace];
Plotly.newPlot('personalGraph', perData);
//jQuery Animation //Standardize everything to jQ selections?
function establishAnims() {
  $('#personalGraph rect.drag.cursor-crosshair').hover(function() {
    // console.log('in');
    $('#personalGraph').animate({
      'opacity': '1',
    }, 800);
  },function() {
    // console.log('out');
    $('#personalGraph').animate({
      'opacity': '0.0',
    }, 800);
  });
};
establishAnims();

//Event Listener to support updating and re-rendering graphs.
(function userClick() {
  personalGraph.on('plotly_click', function(event){
    // console.log(event);
    // console.log(perData[0].z);
    perData[0].z[
      event.points[0].pointNumber[0]
    ][
      event.points[0].pointNumber[1]
    ] += 10;
    aggData[0].z[
      event.points[0].pointNumber[0]
    ][
      event.points[0].pointNumber[1]
    ] += 10;
    Plotly.purge($('allgraphs'));
    Plotly.newPlot('personalGraph', perData);
    Plotly.newPlot('aggregateGraph', aggData);
    userClick();
    establishAnims();
  });
}) ();

// (function listen() {
//   myPlot.on('plotly_click', function(ctx){
//     console.log(ctx);
//     trace1.z[
//             ctx.points[0].pointNumber[0]
//             ][
//             ctx.points[0].pointNumber[1]
//             ] += 10;
//     Plotly.purge(myPlot);
//     Plotly.plot('myDiv', data);
//     listen();
//   });
// }) ();
