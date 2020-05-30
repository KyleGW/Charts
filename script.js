// Our labels along the x-axis
var years = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// For drawing the lines
var t1 = [34,55,33,22,12,56,54,66,41,70];
var t2 = [282,350,411,502,635,809,947,402,700,267];
var t3 = [168,170,178,190,203,276,408,547,675,734,0,100];
var t4 = [40,20,10,16,24,38,74,167,508,784];
var t5 = [6,3,2,2,7,26,82,172,312,433];

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

