
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListViewData } from '../actions/dashboardActions';
import PropTypes from 'prop-types';
import { CSVLink, CSVDownload } from 'react-csv';
import { json2csv } from 'json2csv';
import * as constValues from '../utils/DashboardConstants';
const data1 = [{ transactionId: 1 }, { transactionId: 2 }];
class DataToCSV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.props.dispatch(fetchListViewData(constValues.GET_LIST_VIEW_URL, null));
    }


    render() {
        const { data = [] } = this.props;
        //console.log('dataTocsv', data);
        if (data.length) {
            //console.log({ arrayObj: data.slice(0, 1000) })
            return (
                <div style={{ 'float': 'right' }}><CSVLink data={data.slice(0, 1000)} filename={"ListView_Results.csv"}
                    className="button primary  btn-lg btn-color formButton" style={{ "backgroundColor": "green" ,'paddingTop':'0.4em','height':'2em'}} >Export To Excel</CSVLink></div>
            );
        }
        return null;
    }
}
function mapStateToProps(state) {

    if (state.fetchListViewData.searchTransactionRecords.length > 0) {
        return {
            data: state.fetchListViewData.searchTransactionRecords
        }
    } else {
        return {};
    }

}
export default connect(mapStateToProps)(DataToCSV);

