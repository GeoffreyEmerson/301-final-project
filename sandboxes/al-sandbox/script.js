var plog = $('#plog')[0];
function clearlog() { plog.innerHTML = ''; }
function mylog(v) { plog.innerHTML += v + '<br>'; }
clearlog();

var data = [
    { z:[ [1, 20, 30],
          [20, 1, 60],
          [30, 60, 1]],
      x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      type: 'heatmap'
    }
];

Plotly.newPlot('mydiv', data);

$('button').on('click', function() {
  mylog('clicked');

  var new_data = [
    { z:[ [1.5, 20.5,  0.5],
          [20.5, 1.5, 60.5],
          [30.5, 60.5, 100.5] ],
      type: 'heatmap'
    }
  ];

  mydiv.data = new_data; // This works w/ Plotly.redraw(...);

  // These lines don't work:
//mydiv.data[0].z[0][0] = 123.456;
//mydiv.data[0].type = 'heatmap';

  Plotly.redraw('mydiv');
});
