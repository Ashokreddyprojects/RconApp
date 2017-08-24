
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchListViewData } from '../actions/dashboardActions';
import * as constValues from '../utils/DashboardConstants';
import ListViewData from '../components/ListViewData';
import ListViewTop from '../components/ListViewTop';
import SideBar from './SideBarDashboard';
import App from '../components/App';
import DataToCSV from '../components/DataToCSV';

class ListView extends Component {
    constructor(props) {
        super(props);
        this.getModalValues = this.getModalValues.bind(this);
    }
    getModalValues(data) {
        this.setState({ filteredValues: data });
    }
    render() {
        const submenu = constValues.SUBMENU_DASHBOARD_VIEW;
        const { filteredValues } = this.props
        return (
            <App>
                <div>
                    <SideBar submenutitles={submenu} />
                    <div>
                        <label className="pageHeaderText"> List View</label>
                    </div>
                    <div>
                        <ListViewTop receiveModalValues={this.getModalValues} />
                    </div>
                    <div className="div-chart-container" style={{"padding":"0","width":"auto"}}>
                        <DataToCSV />
                        <ListViewData modalValues={this.props.filteredValues}{...this.props} />
                    </div>
                   
                </div>
            </App>
        );
    }
}
ListView.propTypes = {
    filteredValues: PropTypes.string
};
function mapStateToProps(state) {
    if (state.fetchListViewData.searchTransactionRecords) {
        if (state.fetchListViewData.searchTransactionRecords.length > 0) {           
            return {
                data: state.fetchListViewData.searchTransactionRecords,
                dataCounts: state.fetchListViewData.count
            }
        } else {
            return {};
        }
    } else {
        return {};
    }
}
export default connect(mapStateToProps)(ListView);

