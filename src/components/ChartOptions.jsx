import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();
export const defaultConfig = {
}

export function handleChartClick(evt, item) {
    var chartInstance = this.chart;
    var chartElement = chartInstance.getElementAtEvent(evt);
    var sourceClicked = chartElement[0]._model.label;
    var statusClicked = chartElement[0]._model.datasetLabel;
    //console.log(sourceClicked, statusClicked);
    //console.log(history);
    //history.replace({pathname:'/nebert/listView'});
}
export const options = {
    maintainAspectRatio: false,
    responsive: true,
    showTooltips: false,
    hover: {
        mode: false
    },
    tooltips: false,
    scales: {
        xAxes: [{
            ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                fontFamily: "tahoma",
                fontStyle: "bold",
                fontSize: 10
            },
            scaleLabel: {
                display: true               
            },
            gridLines: {
                display: false,
                lineWidth: 1,
                drawBorder: true
            },
            labels: {
                show: true
            }
        }],
        yAxes: [{
            gridLines: {
                display: true,
                lineWidth: 1,
                drawBorder: true,
                borderDash:[5,15]
            },
            ticks: {
                beginAtZero: true,
                fontStyle: "bold"
            },
            labels: {
                show: true
            },
            scaleLabel: {
                display: true,
                labelString: 'Transaction Counts'
            }
        }]
    },
    'onClick': function () {
        var chartInstance = this.chart;
        var ctx = chartInstance.ctx;
    },
    animation: {
        easing: "easeOutBack",
        duration: 1000,
        onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = 'Center';


            let sourceLength = this.data.datasets[0].data.length;
            let arr = Array(sourceLength).fill(0);
            let datasetLength = this.data.datasets.length;



            Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                for (var k = 0; k <= sourceLength; k++) {
                    arr[k] += Number(dataset.data[k]);
                }


                Chart.helpers.each(meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    if (i == (Number(datasetLength) - 1)) {
                        ctx.fillText('(' + Number(arr[index]) + ')', bar._model.x -25, bar._model.y+25);
                    }
                    if (data != '0') {
                        ctx.fillText(data, bar._model.x - 10, bar._model.y - 20);
                    }
                }));
            }));

        }
    },
    legend: {
        display: true,
        position: 'right'
    }
}

