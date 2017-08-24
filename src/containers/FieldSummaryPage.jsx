
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import SideBar from './SideBarDashboard';
import RcnoandRcniSideBar from './RcnoandRcniSideBar';
import App from '../components/App';
import FieldSummaryPageData from '../components/FieldSummaryPageData';
//import * as constValues from '../utils/DashboardConstants';
 
 
class FieldSummaryPage extends Component {
    render() {
         
        return (
            <App>
                <div >
                <div>
                    <RcnoandRcniSideBar  />
                    
                </div>
                <div className="div-label-container" style={{ 'width' :'77%' }}> 
                   <FieldSummaryPageData />
                 </div>
                </div>    
            </App>
        );
    }
}
 
FieldSummaryPage.propTypes = {
 
};
 
export default FieldSummaryPage;