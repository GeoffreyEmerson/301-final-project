(function(module) {
  var CalendarView = {};
  var $container = $('#container');
  var dateArray = [];
  var aggData = [];
  var perData = [];
  // var userHash = $('#user-id').attr('data-userHash');
  var userHash = $('#user-id').data('userhash'); //Do both versions of this still work?
  console.log(userHash); //TODO: this is undefined because it isn't preceeded by initEventPage

  CalendarView.initCalendarView = function () {
    //Build dateArray.
    for (var i = 0; i < 7; i++) {
      dateArray.unshift(new Date());
      dateArray[0].setDate(dateArray[0].getDate() + i);
    }
    //Build perData and aggData with getNewCalendarData.
    // CalendarView.getNewCalendarData(5, userHash); //TODO: populate this with arguments
    //Render the Table.
    CalendarView.render(); //TODO: remember, this line actually has to be properly dependent on getNewCalendarData's completion
    //Set Hover Behavior
    $('g.highcharts-series-group').hover(
      function() {
        chart.series[1].setVisible();
        chart.setTitle({text: 'Click on times to set your preferences.'});
      },
      function () {
        chart.series[1].setVisible();
        chart.setTitle({text: null});
      });
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
  var perData = aggData.map(function(ele) {
    return [ele[0], ele[1], Math.random() * 100];});

  CalendarView.updateData = function(data, series) { //TODO: function here translates AJAX response into an array usable by render.
    series = [];
    data.forEach(function(ele) {
      console.log(ele);
      if (dateArray.indexOf(ele[0]) != -1) { //This should discard votes that have fallen off the dateArray.
        var firstCoOrd = dateArray.indexOf(ele[0]);
        series.push([firstCoOrd, ele[1], ele[2]]);
      }
    });
    console.log(series);
    return series;
  };

  var testSeries = [];
  CalendarView.updateData(
    [['Fri Jul 01 2016', 12, 15], ['Fri Jul 02 2016', 35, 15], ['Fri Jun 28 2016', 1, 55]]
    , testSeries);
  console.log(testSeries);

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
        data: perData,
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
            // var vote = dateArray[event.point.y].toDateString() + '@' + event.point.series.xAxis.categories[event.point.x];
            var date = dateArray[event.point.y].toDateString();
            var xValue = event.point.x;
            var userHash = $('#user-id').data('userhash');
            var topicID = this.userOptions.id;
            // console.log(date, xValue, userHash, topicID);
            CalendarView.sendClickToDatabase(date, xValue, userHash, topicID, CalendarView.getNewCalendarData);
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

  CalendarView.sendClickToDatabase = function(dateArg, xValueArg, userHashArg,topicIdArg, callback) {
    $.ajax({
      url: '/api/votes',
      type: 'POST',
      data: {date: dateArg, xValue: xValueArg, userHash: userHashArg, topicId: topicIdArg},
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
  module.CalendarView = CalendarView;
})(window);
