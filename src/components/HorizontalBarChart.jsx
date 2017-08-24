
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { options } from './ChartOptions';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { countsFetchData } from '../actions/dashboardActions';
import * as constValues from '../utils/DashboardConstants';




function chartData(dataVal) {
    return {
        labels: dataVal.source,
        datasets: [
            {
                label: 'Successful',
                backgroundColor: '#46a049',
                borderWidth: 1,
                data: dataVal.success
            },
            {
                label: 'Error',
                backgroundColor: '#ff9800',
                borderWidth: 1,
                data: dataVal.error
            },
            {
                label: 'Reconciled',
                backgroundColor: '#0b7dda',
                borderWidth: 1,
                data: dataVal.recon
            }
        ]
    };
}



class HorizontalBarChart extends Component {


    componentDidMount() {
        this.props.fetchData(constValues.GET_TXN_COUNTS_URL, null);
    }

    render() {
        if (this.props.txnCounts && this.props.txnCounts.source.length) {
            return (
                <div>
                    <Bar data={chartData(this.props.txnCounts)}
                        width={70}
                        height={500}
                        options={options} onElementsClick={()=>this.context.router.history.push('/nebert/listView')} />
                </div>
            );
        } else {
            return (<div><label className="noChartResults">No Chart Data available for the given Date Range.</label></div>);
        }
    }
}
HorizontalBarChart.propTypes = {
    fetchData: PropTypes.func,
    txnCounts: PropTypes.objectOf(PropTypes.array),
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool
};
HorizontalBarChart.contextTypes = {
    router: React.PropTypes.object
}
const mapStateToProps = (state) => {
    return {
        txnCounts: state.fetchTransactionData,
        hasErrored: state.fetchFailed,
        isLoading: state.fetchDataLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, data) => dispatch(countsFetchData(url, data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBarChart);

