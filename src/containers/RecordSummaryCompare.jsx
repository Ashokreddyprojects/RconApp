
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import SideBar from './SideBarDashboard';
import RcnoandRcniSideBar from './RcnoRcniSideBar';
import App from '../components/App';
import RecordSummaryCompareData from '../components/RecordSummaryCompareData';
//import * as constValues from '../utils/DashboardConstants';


class RecordSummaryCompare extends Component {
    render() {

        return (
            <App>
                <div >
                <div>
                    <RcnoandRcniSideBar  />

                </div>
                <div className="div-label-container" style={{ 'width' :'77%' }}>
                   <RecordSummaryCompareData />
                 </div>
                </div>
            </App>
        );
    }
}

RecordSummaryCompare.propTypes = {

};

export default RecordSummaryCompare;