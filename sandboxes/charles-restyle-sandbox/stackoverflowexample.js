var element = document.getElementById(scope.changeid); //caching DOM query. Keep an eye open for scope.

function getData(division,redraw) {
  var employeeData = [];
  if (!division) {
    $http.get(api.getUrl('competenceUserAverageByMyDivisions', null)).success(function (response) {
      processData(response,redraw);
    });
}
else {
     $http.get(api.getUrl('competenceUserAverageByDivision', division)).success(function (response) {
         processData(response,redraw);
     })
 }

}

function processData(data,redraw) {
 var y = [],
     x1 = [],
     x2 = [];

 data.forEach(function (item) {
     y.push(item.user.profile.firstname);
     x1.push(item.current_level);
     x2.push(item.expected);
 });

 var charData = [{ //turning x, x,y into traces
         x: x1,
         y: y,
         type: 'bar',
         orientation: 'h',

         name: 'Nuværende'
     }, {
         x: x2,
         y: y,
         type: 'bar',
         orientation: 'h',

         name: 'Forventet'
     }],
     layout = {
         barmode: 'stack',
         legend: {
             traceorder: 'reversed',
             orientation: 'h'

         }
     };

 if(!redraw){
     Plotly.plot(element, charData, layout);
 }
 else
 {
     Plotly.redraw(element,charData,layout);
 }
}

scope.$watch('divisionId', function (newValue, oldValue) {
 if (newValue) {
     getData(newValue.id,true);
 }
}, true);

getData(null,false);
