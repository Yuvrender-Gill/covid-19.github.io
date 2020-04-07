var covid_global = getAggrData('https://raw.githubusercontent.com/amcharts/covid-charts/master/data/json/total_timeline.json');


google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Date');
      data.addColumn('number', 'Confirmed');
      data.addColumn('number', 'Deaths');
      data.addColumn('number', 'Active');
      data.addColumn('number', 'Recovered');
      var day = 0
      for (var entry in covid_global){
          
       
            day++;
            data.addRows([
            
            [covid_global[entry]["date"], covid_global[entry]["confirmed"], covid_global[entry]["deaths"], 
            covid_global[entry]["confirmed"] - covid_global[entry]["deaths"] - covid_global[entry]["recovered"], 
            covid_global[entry]["recovered"]]
            ]);

        
      }
      
      var options = {
        chart: {
          title: "COVID-19: Global Infection Rate",
          subtitle: "Timeline"
        },
        titleTextStyle: {
            fontSize: 24, // 12, 18 whatever you want (don't specify px)
        },
        vAxis: {
            scaleType: 'log'
        },
    
        lineWidth: 10,
        width: '98%',
        height: 400,
        backgroundColor: '#f7f7f7',
        is3D: true,
        axes: {
          x: {
            0: {side: 'bottom'}
          },
          y: {
            scaleType: 'log'
          }
        }
      };

      var chart = new google.charts.Line(document.getElementById('line_top_x'));

      chart.draw(data, google.charts.Line.convertOptions(options));
    }