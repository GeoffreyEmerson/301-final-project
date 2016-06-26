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

var data = [
  {
    z: [[1, 20, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
    x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    y: ['Morning', 'Afternoon', 'Evening'],
    type: 'heatmap'
  }
];
Plotly.newPlot('myDiv', data);

myPlot.on('plotly_click', function(ctx){
  // console.log(ctx);
  // console.log(ctx.points[0].z);
  // console.log('You clicked on date= ' + ctx.points[0].x + ' time= ' + ctx.points[0].y);
  // console.log('You clicked on y= ' + ctx.points[0].pointNumber[0] + ' x= ' + ctx.points[0].pointNumber[1]);
  data[0].z[
            ctx.points[0].pointNumber[0]
            ][
            ctx.points[0].pointNumber[1]
            ] += 10;
  // // console.log(data[0]);
  // console.log(data[0].z[2][4]);
  // myPlot.data[0].opacity = 0.2;
  // Plotly.redraw(myPlot);
  Plotly.newPlot('myDiv', data);
});
