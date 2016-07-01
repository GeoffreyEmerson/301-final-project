(function(module) {
  var CalendarView = {};
  var $container = $('#container');
  var dateArray = [];
  var aggData = [];
  var perData = [];
  // var userHash = $('#user-id').attr('data-userHash');
  CalendarView.initCalendarView = function () {
    console.log('initCalendarView called.');
    var userHash = $('#user-id').data('userhash');
    var topicId = $('#timing').data('topicid');
    console.log(userHash,topicId);
    //Build dateArray.
    for (var i = 0; i < 7; i++) {
      dateArray.unshift(new Date());
      dateArray[0].setDate(dateArray[0].getDate() + i);
    }
    //Build perData and aggData with getNewCalendarData.
    perData = CalendarView.blankArray();
    aggData = CalendarView.blankArray();
    CalendarView.getNewAggData(topicId, userHash);
    // var aggData = CalendarView.assembleArray(); //Uncomment these lines to use random dummy data.
    // var perData = aggData.map(function(ele) {
      // return [ele[0], ele[1], Math.random() * 100];});
    // //Render the Table.
    // console.log(aggData,perData);
    // CalendarView.render(); //TODO: remember, this line actually has to be properly dependent on getNewCalendarData's completion
  };

  CalendarView.blankArray = function() { //Legacy code to generate random datasets
    var arr = [];
    for (var ii = 0; ii < 24; ii++) {
      for (var iii = 0; iii < 7; iii++) {
        arr.push([ii,iii,null]);
      }
    }
    return arr;
  };

  CalendarView.updateData = function(data, globalArray, type) {
    series = [];
    var procDates = dateArray.map(function(ele){return ele.toDateString();}); // chop off hours and seconds
    data.forEach(function(ele) {
      if (procDates.indexOf(ele.date) != -1) { //This should discard votes that have fallen off the dateArray.
        var firstCoOrd = procDates.indexOf(ele.date);

        //series.push([Number(ele.xValue), firstCoOrd, ele.weight]);
        series = globalArray.map(function(cell) {
          if(cell[0] == ele.xValue && cell[1] == firstCoOrd) {
            if(type == 'Aggregate') {
              cell[2] += ele.weight; // TODO: Stop aggregating on every click cycle!
            } else {
              cell[2] = ele.weight;
            }
          }
          return cell;
        });

      }
    });
    // console.log('updateData outputs',series);
    return series;
  };

  CalendarView.render = function () {
    var topicId = $('#timing').data('topicid');
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
          return '<b> At ' + this.series.xAxis.categories[this.point.x] + ' on ' + this.series.yAxis.categories[this.point.y] + '=' + this.point.value;
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
        id: topicId, //TODO: TopicID
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
            // var userHash = 'Dummy User Hash';
            // var topicID = '5';
            // console.log(date, xValue, userHash, topicID);
            CalendarView.sendClickToDatabase(date, xValue, userHash, topicID, CalendarView.getNewAggData);
          },
        },
        borderWidth: 0,
        id: topicId, //TODO: TopicID
        colors: Highcharts.getOptions().colors[3],
        index: 0
      }
    ]
    });

    chart = $container.highcharts();

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
      console.log('sendClickToDatabase: Successful ajax call:');
      console.log(data);
      if(callback) callback(topicIdArg,userHashArg);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.log('Failed to send click to database.');
      // call the error version of the callback if any
    });
  };

  CalendarView.getNewAggData = function(topicIdArg,userHashArg) {
    //AJAXing aggData
    $.ajax({
      url: '/api/votes/',
      type: 'GET',
      cache: false
    })
    .done( function (data) {
      console.log('gNCD Agg: Successful ajax call: /api/votes/');
      console.log('gNCD Agg rawdata:', data);
      var filteredData = data.votes.filter(function(vote){
        if(vote.topicId == topicIdArg) return true;
      });
      if (!filteredData.length) {
        CalendarView.render();
        return res.send('No votes yet.');
      }
      console.log('gNCD Aggregate data:',filteredData);
      // data will be full list of vote options and weights for a specific topic
      aggData = CalendarView.updateData(filteredData,aggData,'Aggregate');
      console.log('aggData after translation',aggData);
      CalendarView.getNewPerData(topicIdArg,userHashArg);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.log('Failed to acquire preferences from database.');
      // call the error version of the callback if any
    });
  };
  CalendarView.getNewPerData = function (topicIdArg,userHashArg) {
    //AJAXing perData
    $.ajax({
      url: '/api/votes/',
      type: 'GET',
      cache: false
    })
    .done( function (data, callback) {
      console.log('gNCD Per: Successful ajax call: /api/votes/');
      // console.log('rawdata:', data);
      var filteredData = data.votes.filter(function(vote){
        if(vote.topicId == topicIdArg && vote.userHash == userHashArg) return true;
      });
      console.log('Personal data:',filteredData);
      // data will be a list of a given user's choices and weights
      if (filteredData.length) {
        perData = CalendarView.updateData(filteredData,perData,'Personal');
      }
      //Now render the chart.
      CalendarView.render();
      // console.log(aggData);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.log('Failed to acquire preferences from database.');
      // call the error version of the callback if any
    });
  };

  module.CalendarView = CalendarView;
})(window);
