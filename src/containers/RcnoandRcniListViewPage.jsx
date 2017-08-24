
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import SideBar from './SideBarDashboard';
import RcnoandRcniSideBar from './RcnoandRcniSideBar';
import App from '../components/App';
import RcnoandRcniListViewData from '../components/RcnoandRcniListViewData';
//import * as constValues from '../utils/DashboardConstants';
 
 
class RcnoandRcniListViewPage extends Component {
    render() {
         
        return (
            <App>
                <div >
                <div>
                    <RcnoandRcniSideBar  />
                    
                </div>
                <div className="div-label-container" style={{ 'width' :'77%' }}> 
                   <RcnoandRcniListViewData />
                 </div>
                </div>    
            </App>
        );
    }
}
 
RcnoandRcniListViewPage.propTypes = {
 
};
 
export default RcnoandRcniListViewPage;