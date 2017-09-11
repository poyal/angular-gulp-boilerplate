(function () {
  'use strict';

  angular.module('app.chart')
    .controller('ChartLineController', ChartLineController);

  ChartLineController.$inject = [];

  function ChartLineController() {
    var vm = this;

    vm.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function (data) {
          return data.x;
        },
        y: function (data) {
          return data.y;
        },
        useInteractiveGuideline: true,
        dispatch: {
          stateChange: function (event) {
            console.log("stateChange", event);
          },
          changeState: function (event) {
            console.log("changeState", event);
          },
          tooltipShow: function (event) {
            console.log("tooltipShow", event);
          },
          tooltipHide: function (event) {
            console.log("tooltipHide", event);
          }
        },
        xAxis: {
          axisLabel: 'Time (ms)'
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          tickFormat: function (d) {
            // console.log(d3.format());
            // console.log(d, d3.format('.02f')(d));
            // return d3.format('.02f')(d);
            // return d;
          },
          axisLabelDistance: -10
        },
        callback: function (chart) {
          console.log("!!! lineChart callback !!!");
        }
      },
      title: {
        enable: true,
        html: '<h1>title</h1>',
        css: {'color': 'red'}
      },
      subtitle: {
        enable: true,
        html: '<p>subtitle</p>',
        css: {'color': 'blue'}
      },
      caption: {
        enable: true,
        html: '<p>caption</p>',
        css: {'color': 'paule'}
      }
    };

    vm.data = sinAndCos();

    /*Random Data Generator */
    function sinAndCos() {
      var data1 = [];
      var data2 = [];
      var data3 = [];
      //Data is represented as an array of {x,y} pairs.
      for (var i = 0; i < 100; i++) {
        if (i === 0) {
          data1.push({x: i, y: Math.random()});
          data2.push({x: i, y: Math.random()});
          data3.push({x: i, y: Math.random()});
        } else {
          data1.push({x: i, y: Math.random() + data1[i - 1].y});
          data2.push({x: i, y: (Math.random()) / 2 + data2[i - 1].y});
          data3.push({x: i, y: (Math.random()) / 3 + data3[i - 1].y});
        }
      }

      return [{
        values: data1,
        key: 'Data1',
        color: 'red'
      }, {
        values: data2,
        key: 'Data2',
        color: '#2ca02c'
      }, {
        values: data3,
        key: 'Data3',
        color: '#7777ff',
        area: true
      }];
    }
  }
})();