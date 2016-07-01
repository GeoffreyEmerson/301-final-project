(function(module) {
  var CalendarView = {};
  var $container = $('#container');
  var dateArray = [];
  var aggData = [];
  var perData = [];
  // var userHash = $('#user-id').attr('data-userHash');
  var userHash = $('#user-id').data('userhash'); //Do both versions of this still work?

  CalendarView.initCalendarView = function () {
    //Build dateArray.
    for (var i = 0; i < 7; i++) {
      dateArray.unshift(new Date());
      dateArray[0].setDate(dateArray[0].getDate() + i);
    }
    //Build perData and aggData with getNewCalendarData.
    CalendarView.getNewCalendarData(5, userHash); //TODO: populate this with arguments
    //Render the Table.
    CalendarView.render(); //TODO: remember, this line actually has to be properly dependent on getNewCalendarData's completion
  };

  CalendarView.assembleArray = function() { //Legacy code to generate random datasets
    var arr = [];
    for (var ii = 0; ii < 24; ii++) {
      for (var iii = 0; iii < 6; iii++) {
        arr.push([ii,iii,Math.random() * 150]);
      }
    }
    return arr;
  };

  var aggData = CalendarView.assembleArray();
  // var aggData = [[0, 0, null], [0, 1, null], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 30], [9, 4, 91], [23, 6, 150]];

  // CalendarView.colorTranslater = function(ele) {
  //   if (ele[2] == 0 || ele[2] == 1 || ele[2] == 2) {
  //     return ele[2];
  //   } else {
  //     return 3;
  //   }
  // };

  CalendarView.updateData = function(data, series) { //TODO: function here translates AJAX response into an array usable by render.

  };

  CalendarView.render = function () {
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
        categories: dateArray.map(function(ele){return ele.toDateString().slice(0,-5);}),
        title: null,
      },
      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0],
        reversed: true
      },
      plotOptions: {
        heatmap: {
          colorbyPoint: true,
        }
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
          return '<b> At ' + this.series.xAxis.categories[this.point.x] + ' on ' + this.series.yAxis.categories[this.point.y];
          //  + ':</b> <br> '; //TODO: List of guests with preference greater than 0.
        }
      },
      series: [{
        name: 'Aggregate Prefs',
        borderWidth: 1,
        data: aggData,
        dataLabels: {
          enabled: false,
        },
        borderWidth: 0,
        id: 5, //TODO: TopicID
        index: 1
      },
//start of personal preference data series
      {
        name: 'Personal Prefs',
        borderWidth: 1,
        data: aggData.map(function(ele) {
          return [ele[0], ele[1], Math.random() * 100];
        }),
        dataLabels: {
          enabled: false,
        },
        events:  {
          click: function() {
            //Sends relevant information to backend.
              // console.log(vote);
              // console.log(
              //   event.point.series.xAxis.categories[event.point.x],
              //   event.point.series.yAxis.categories[event.point.y],
              //   event.point.series.name,
              //   this.userOptions.id);
            var vote = dateArray[event.point.y].toDateString() + '@' + event.point.series.xAxis.categories[event.point.x];
            var topicID = this.userOptions.id;
            CalendarView.sendClickToDatabase(vote, userHash, topicID, getNewCalendarData);
          },
        },
        borderWidth: 0,
        id: 5, //TODO: TopicID
        colors: Highcharts.getOptions().colors[3],
        index: 0
      }
    ]
    });

    chart = $container.highcharts();
  };

  // $('.highcharts-series-1').on('click', function() {
  //   console.log(this);
  //   $(this).css('background-color', 'red !important');
  // });

  CalendarView.sendClickToDatabase = function(vote,userHashArg,topicIdArg, callback) {
    $.ajax({
      url: '/api/votes',
      type: 'POST',
      data: {name: vote,userHash: userHashArg, topicId: topicIdArg},
      cache: false
    })
    .done( function (data) {
      // call the callback function here
      console.log('Successful ajax call:');
      console.log(data);
      if(callback) callback(topicIdArg,userHashArg);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.log('Failed to send click to database.');
      // call the error version of the callback if any
    });
  };

  CalendarView.getNewCalendarData = function(topicIdArg,userHashArg) {
  //AJAXing aggData
    $.ajax({
      url: '/api/votes/' + topicIdArg,
      type: 'GET',
      cache: false
    })
    .done( function (data) {
      // call the callback function here
      console.log('Successful ajax call:');
      console.log(data);
      // data will be full list of vote options and weights for a specific topic
      CalendarView.updateData(data, aggData);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.log('Failed to acquire preferences from database.');
      // call the error version of the callback if any
    });
//AJAXing perData
    $.ajax({
      url: '/api/votes/' + topicIdArg + '/' + userHashArg,
      type: 'GET',
      cache: false
    })
    .done( function (data, callback) {
      // call the callback function here
      console.log('Successful ajax call:');
      console.log(data);
      // data will be a list of a given user's choices and weights
      CalendarView.updateData(data, perData);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.log('Failed to acquire preferences from database.');
      // call the error version of the callback if any
    });
  };

  $('g.highcharts-series-group').hover(
    function() {
      chart.series[1].setVisible();
      chart.setTitle({text: 'Click on times to set your preferences.'});
    },
    function () {
      chart.series[1].setVisible();
      chart.setTitle({text: null});
    });
  module.CalendarView = CalendarView;
})(window);
