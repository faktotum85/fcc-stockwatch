(function() {
  document.querySelector('#addStock').addEventListener('click', function(e) {
    var stock = document.querySelector('#stock');
    fetchStock(stock.value);
    stock.value = '';
  });

  var chart = Highcharts.chart('container', {
      chart: {
          zoomType: 'x'
      },
      title: {
          text: 'Stock market timeline data'
      },
      subtitle: {
          text: document.ontouchstart === undefined ?
                  'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
          type: 'datetime'
      },
      yAxis: {
          title: {
              text: 'Price'
          }
      },
      legend: {
          enabled: true
      },
      plotOptions: {
          line: {}
      },
      series: []
    });

  function fetchStock(stock) {
    axios
      .get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + stock + '&apikey=VO2QD91UA52UWBIX')
      .then(function(res) {

        if (res.data["Error Message"]) {
          return alert(res.data["Error Message"]);
        }

        var data = res.data["Time Series (Daily)"];
        var keys = Object.keys(data).sort(function (a, b) {
          return new Date(a).getTime() - new Date(b).getTime();
        });

        chart.addSeries({
            type: 'line',
            name: stock,
            data: keys.map(function(key) {
              return [new Date(key).getTime(), parseFloat(data[key]["4. close"])]
            }),
            marker: {
              enabled: false
            }
        });
      })
      .catch(function(err) {
        console.error(err);
      });
  }


})()
