
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import SideBar from './SideBarDashboard';
import RcnoandRcniSideBar from './RcnoandRcniSideBar';
import App from '../components/App';
import RcnoandRcniListDetailsPageData from '../components/RcnoandRcniListDetailsPageData';
//import * as constValues from '../utils/DashboardConstants';
 
 
class RcnoandRcniDetailsPage extends Component {
    render() {
         
        return (
            <App>
                <div >
                <div>
                    <RcnoandRcniSideBar  />
                    
                </div>
                <div className="div-label-container" style={{ 'width' :'77%' }}> 
                  <RcnoandRcniListDetailsPageData />
                 </div>
                </div>    
            </App>
        );
    }
}
 
RcnoandRcniDetailsPage.propTypes = {
 
};
 
export default RcnoandRcniDetailsPage;