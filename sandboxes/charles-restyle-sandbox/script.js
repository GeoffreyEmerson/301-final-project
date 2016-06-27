var myPlot = document.getElementById('myDiv');
//   d3 = Plotly.d3,
//   N = 16,
//   x = d3.range(N),
//   y = d3.range(N).map( d3.random.normal() ),
//   data = [ { x:x, y:y, type:'scatter',
//           mode:'markers', marker:{size:16} } ],
//   layout = {
//     hovermode:'closest',
//     title:'Click on Points'
//   };
//
// Plotly.newPlot('myDiv', data, layout);
var trace1 = {
  z: [[1, 20, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
  x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  y: ['Morning', 'Afternoon', 'Evening'],
  type: 'heatmap'
};

var data = [trace1];
Plotly.newPlot('myDiv', data);

(function listen() {
  myPlot.on('plotly_click', function(ctx){
    console.log(ctx);
    trace1.z[
            ctx.points[0].pointNumber[0]
            ][
            ctx.points[0].pointNumber[1]
            ] += 10;
  // update = {
  //   z: [[[1, 2, 3, 5, 1], [2, 1, 6, 8, 3], [3, 6, 1, -1, 2]]]
  // };
  // var update = {
  //   'z':[[['1', '2', '3', '3', '2'], ['3', '1', '4', '6', '3'], ['2', '4', '1', '1', '-1']]]
  // };
  // console.log(trace1.z);
  // Plotly.restyle(myPlot, update);
    Plotly.purge(myPlot);
  // Plotly.redraw(myPlot);
    Plotly.plot('myDiv', data);
    listen();
  });
}) ();
