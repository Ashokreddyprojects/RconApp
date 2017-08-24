import React from 'react';
import PropTypes from 'prop-types';
let defaultClass = {
    container: {
        display: 'flex',
        alignItems: 'center',
        height: 70,
        fontWeight: 300,
        width: '100%',
        textAlign: 'center',
        margin: 'auto'
    },
    chart: {
        margin: '10 auto',
        width: '100%',
        height: 40
    },
    label: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        whiteSpace: 'nowrap',
        textOverflow: 'clip',
        padding: 'auto 2px'
    }
};
let Colors = [
    '#3D97D2',
    '#4EB970',
    '#EEC518',
    '#E74D3A',
    '#FFA858',
    '#66ff66',
    '#C05800',
    '#888844',
    '#ff99ff',
    '#b3b300',
    '#e066ff',
    '#5c5c8a'
];
export default class CapsuleBarChart extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.colors !== undefined) {
            Colors = this.props.colors;
        }
        this.state = this.getInitialState();
        this
            .handleChange
            .bind(this);
        this
            .getChartElements
            .bind(this);
    }
    getInitialState() {
        let chartComp = this.getChartElements(this.props.chartData);
        return { chartComp };
    }
    getChartElements(data) {
        let chartComp = [];
        let totalChartElement = data.length;
        let totalChartWeight = 0;
        data.forEach((d) => {
            totalChartWeight += d.weight;
        });
        data.forEach((d, index) => {
            let style = {
                backgroundColor: Colors[index % Colors.length],
                width: String(Math.floor(d.weight * 100 / totalChartWeight)) + '%',
                height: defaultClass.chart.height,
                display: 'inline-flex',
                alignItems: 'center',
                textAlign: 'center',
                margin: '0 !important'
            }
            if (index == totalChartElement - 1) {
                style.borderTopRightRadius = defaultClass.chart.height / 2,
                    style.borderBottomRightRadius = defaultClass.chart.height / 2
            }
            if (index == 0) {
                style.borderTopLeftRadius = defaultClass.chart.height / 2,
                    style.borderBottomLeftRadius = defaultClass.chart.height / 2
            }
            let el = <span key={index} style={style}>
                <span style={defaultClass.label}>{d.label}</span>
            </span>;
            chartComp.push(el);
        });
        return chartComp;
    }
    handleChange() {
    }
    componentWillReceiveProps(nextProps) {
        let chartComp = this.getChartElements(nextProps.chartData);
        this.setState({
            chartComp
        })
    }
    render() {
        return (
            <div className="capsule-chart-container" style={defaultClass.container}>
                <div style={defaultClass.chart}>
                    {this.state.chartComp}
                </div>
            </div>
        )
    }
}
CapsuleBarChart.propTypes = {
    chartData: PropTypes.array.isRequired,
    colors: PropTypes.array
};




