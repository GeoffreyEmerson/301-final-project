$(function() {
  calendarView = {};

  var $container = $('#container');

  calendarView.render = function () {
    $container.highcharts({
      chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
      },
      title: {
        text: null
      },
      xAxis: {
        categories: ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12a', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p', '12p']
      },
      yAxis: {
        categories: ['Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday'],
        title: null
      },
      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },
      tooltip: {
        formatter: function () {
          return '<b> At ' + this.series.xAxis.categories[this.point.x] + ' on ' + this.series.yAxis.categories[this.point.y] + ':</b> <br> '; //TODO: List of guests with preference greater than 0.
        }
        // formatter: function () {
        //   // console.log(this);
        //   return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
        //       this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        // }
      },
      series: [{
        name: 'Availability',
        borderWidth: 1,
        data: [[0, 0, null], [0, 1, null], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 30], [9, 4, 91], [23, 6, 150]],
        dataLabels: {
          enabled: false,
        },
        events:  {
          click: function() {
            console.log(event.point.series.xAxis.categories[event.point.x],
              event.point.series.yAxis.categories[event.point.y],
            event.point.series.name);
            console.log(this.userOptions.id);
          },
        },
        // color: '#000000',
        borderWidth: 0,
        id: 5 //TopicID
      }]
    });

    chart = $container.highcharts();
  };

  calendarView.render(); //this should be invoked elsewhere.
});
