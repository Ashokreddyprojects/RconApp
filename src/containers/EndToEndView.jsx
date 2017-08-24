import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBarDashboard';
import App from '../components/App';
import HorizontalBarChart from '../components/HorizontalBarChart';
import ReadOnlyDate from '../components/ReadOnlyDate';
import * as constValues from '../utils/DashboardConstants';
import Spinner from 'react-spinner-material';
class EndToEndView extends Component {
    constructor(props) {
        super(props);
    
        this.getModalValues = this.getModalValues.bind(this);
    }
    getModalValues(data) {
     
        this.setState({ filteredValues: data });

    }

    render() {
        const submenu = constValues.SUBMENU_DASHBOARD_VIEW;
        return (
            <App>
                <div>
                    <SideBar submenutitles={submenu} />
                    <div>
                        <label className="pageHeaderText"> End To End View</label>
                    </div>
                    <div>
                        <ReadOnlyDate receiveModalValues={this.getModalValues} />
                    </div>
                  
                    <div className="div-chart-container" style={{ "background": "#f8f8f8", "border": "1px solid lightgrey", "height": "65%" }}>
                        <HorizontalBarChart dataForChart={this.state.filteredValues} />
                    </div>
                </div>
            </App>
        );
    }
}
EndToEndView.propTypes = {
};
export default EndToEndView;

