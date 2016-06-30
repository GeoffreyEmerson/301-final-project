//Graphing Aggregate Data
var aggGraph = document.getElementById('aggregateGraph');
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
var aggData = [perTrace, aggTrace];
Plotly.newPlot('aggregateGraph', aggData);
//Hover Events

aggregateGraph.on('plotly_hover', function(event) {
  console.log('fading out');
  aggGraph.data[1].opacity = 0;
  Plotly.redraw(aggregateGraph);
});

aggregateGraph.on('plotly_unhover', function(event) {
  console.log('fading in');
  aggGraph.data[1].opacity = 1;
  Plotly.redraw(aggregateGraph);
});

aggregateGraph.on('plotly_click', function(event) {
  console.log('ping');
  Plotly.moveTraces(aggGraph,0);
  Plotly.redraw(aggregateGraph);
});

//Event Listener to support updating and re-rendering graphs.
// (function userClick() {
//   aggGraph.on('plotly_click', function(event){
//     // console.log(event);
//     // console.log(perData[0].z);
//     perData[0].z[
//       event.points[0].pointNumber[0]
//     ][
//       event.points[0].pointNumber[1]
//     ] += 10;
//     aggData[0].z[
//       event.points[0].pointNumber[0]
//     ][
//       event.points[0].pointNumber[1]
//     ] += 10;
//     Plotly.purge($('allgraphs'));
//     Plotly.newPlot('aggregateGraph', aggData);
//     userClick();
//   });
// }) ();

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
