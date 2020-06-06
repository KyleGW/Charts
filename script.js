// Our labels along the x-axis
var years = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var months2 = ["August","September","October","November","December","January","February","March","April","May","June"];

// For drawing the lines
var t1 = [34,55,33,22,12,56,54,66,41,70];
var t2 = [282,350,411,502,635,809,947,402,700,267];
var t3 = [168,170,178,190,203,276,408,547,675,734,0,100];
var t4 = [40,20,10,16,24,38,74,167,508,784];
var t5 = [6,3,2,2,7,26,82,172,312,433];
var t6 = [4,3,2,4,6,3,9,4,8,1,0];
var t7 = [7,10,8,9,13,16,13,36,19,3,0];

var ctx1 = document.getElementById("myChart");
var myChart = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: years,
    datasets: [
      { 
        data: t1,
        label: "Type 1",
        borderColor: "#3e95cd",
        fill: false
      },
      { 
        data: t2,
        label: "Type 2",
        borderColor: "#8e5ea2",
        fill: false
      },
      { 
        data: t3,
        label: "Type 3",
        borderColor: "#3cba9f",
        fill: false
      },
      { 
        data: t4,
        label: "Type 4",
        borderColor: "#e8c3b9",
        fill: false
      },
      { 
        data: t5,
        label: "Type 5",
        borderColor: "#c45850",
        fill: false
      }
    ]
  }
});

var ctx2 = document.getElementById("myChart2");
var myChart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: years,
    datasets: [
      { 
        data: t1,
        label: "Type 1",
        backgroundColor: "#3e95cd"
      },
      { 
        data: t2,
        label: "Type 2",
        backgroundColor: "#8e5ea2",
      },
      { 
        data: t3,
        label: "Type 3",
        backgroundColor: "#3cba9f",
      },
      { 
        data: t4,
        label: "Type 4",
        backgroundColor: "#e8c3b9",
      },
      { 
        data: t5,
        label: "Type 5",
        backgroundColor: "#c45850",
      }
    ]
  }
});

var ctx3 = document.getElementById("stackedBar");

var barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',"August","September","October"],
  datasets: [{
    label: 'Dataset 1',
    backgroundColor: "#3cba9f",
    data: t1    
  }, {
    label: 'Dataset 2',
    backgroundColor: "#e8c3b9",
    data: t2
  }, {
    label: 'Dataset 3',
    backgroundColor: "#c45850",
    data: t3   
  }]
};

var stackedBar = new Chart(ctx3, {
  type: 'bar',
  data: barChartData,
  options: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true
      }]
    }
  }
});

var ctx4 = document.getElementById("myChart3");

var myChart3 = new Chart(ctx4, {
  type: 'bar',
  data: {
    labels: months2,
    datasets: [
      { 
        data: t6,
        label: "Type 6",
        backgroundColor: "#3e95cd"
      },
      { 
        data: t7,
        label: "Type 7",
        backgroundColor: "#c45850",
      }
    ]
  }
});

Chart.defaults.groupableBar = Chart.helpers.clone(Chart.defaults.bar);

var helpers = Chart.helpers;
Chart.controllers.groupableBar = Chart.controllers.bar.extend({
  calculateBarX: function (index, datasetIndex) {
    // position the bars based on the stack index
    var stackIndex = this.getMeta().stackIndex;
    return Chart.controllers.bar.prototype.calculateBarX.apply(this, [index, stackIndex]);
  },

  hideOtherStacks: function (datasetIndex) {
    var meta = this.getMeta();
    var stackIndex = meta.stackIndex;

    this.hiddens = [];
    for (var i = 0; i < datasetIndex; i++) {
      var dsMeta = this.chart.getDatasetMeta(i);
      if (dsMeta.stackIndex !== stackIndex) {
        this.hiddens.push(dsMeta.hidden);
        dsMeta.hidden = true;
      }
    }
  },

  unhideOtherStacks: function (datasetIndex) {
    var meta = this.getMeta();
    var stackIndex = meta.stackIndex;

    for (var i = 0; i < datasetIndex; i++) {
      var dsMeta = this.chart.getDatasetMeta(i);
      if (dsMeta.stackIndex !== stackIndex) {
        dsMeta.hidden = this.hiddens.unshift();
      }
    }
  },

  calculateBarY: function (index, datasetIndex) {
    this.hideOtherStacks(datasetIndex);
    var barY = Chart.controllers.bar.prototype.calculateBarY.apply(this, [index, datasetIndex]);
    this.unhideOtherStacks(datasetIndex);
    return barY;
  },

  calculateBarBase: function (datasetIndex, index) {
    this.hideOtherStacks(datasetIndex);
    var barBase = Chart.controllers.bar.prototype.calculateBarBase.apply(this, [datasetIndex, index]);
    this.unhideOtherStacks(datasetIndex);
    return barBase;
  },

  getBarCount: function () {
    var stacks = [];

    // put the stack index in the dataset meta
    Chart.helpers.each(this.chart.data.datasets, function (dataset, datasetIndex) {
      var meta = this.chart.getDatasetMeta(datasetIndex);
      if (meta.bar && this.chart.isDatasetVisible(datasetIndex)) {
        var stackIndex = stacks.indexOf(dataset.stack);
        if (stackIndex === -1) {
          stackIndex = stacks.length;
          stacks.push(dataset.stack);
        }
        meta.stackIndex = stackIndex;
      }
    }, this);

    this.getMeta().stacks = stacks;
    return stacks.length;
  },
});

var dataexample = {
  labels: ["January", "February", "March"],
  datasets: [
    {
      label: "Apples Type 1",
      backgroundColor: "rgba(99,255,132,0.2)",
      data: [25, 5, 30],
      stack: 1
    },
    {
      label: "Bananas Type 1",
      backgroundColor: "rgba(99,132,255,0.2)",
      data: [40, 50, 20],
      stack: 1
    },
    {
      label: "Cookies Type 1",
      backgroundColor: "rgba(255,99,132,0.2)",
      data: [60, 20, 20],
      stack: 1
    },
    {
      label: "Apples Type 2",
      backgroundColor: "rgba(99,255,132,0.2)",
      data: [20, 10, 30],
      stack: 2
    },
    {
      label: "Bananas Type 2",
      backgroundColor: "rgba(99,132,255,0.2)",
      data: [40, 50, 20],
      stack: 2
    },
    {
      label: "Cookies Type 2",
      backgroundColor: "rgba(255,99,132,0.2)",
      data: [60, 20, 20],
      stack: 2
    },
    {
      label: "Apples",
      backgroundColor: "rgba(99,255,132,0.2)",
      data: [20, 10, 30],
      stack: 3
    },
    {
      label: "Bananas",
      backgroundColor: "rgba(99,132,255,0.2)",
      data: [40, 50, 20],
      stack: 3
    },
    {
      label: "Cookies",
      backgroundColor: "rgba(255,99,132,0.2)",
      data: [60, 20, 20],
      stack: 3
    },
  ]
};

var ctx5 = document.getElementById("groupedStackedBar").getContext("2d");

var groupedStackedBar = new Chart(ctx5, {
  type: 'bar',
  data: dataexample,
  options: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true
      }]
    }
  }
});