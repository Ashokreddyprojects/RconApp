
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import SideBar from './SideBarDashboard';
import ReconSideBarDashboard from './ReconSideBarDashboard';
import App from '../components/App';
import SysToSysReconViewDataCipDiamond from '../components/SysToSysReconViewDataCipDiamond';
import * as constValues from '../utils/DashboardConstants';
 
 
class SysToSysReconViewCipDiamond extends Component {
    render() {
         
        return (
            <App>
                <div >
                <div>
                    <ReconSideBarDashboard  />
                    
                </div>
                <div className="div-label-container" style={{ 'width' :'77%' }}> 
                    <SysToSysReconViewDataCipDiamond />
                 </div>
                </div>    
            </App>
        );
    }
}
 
SysToSysReconViewCipDiamond.propTypes = {
 
};
 
export default SysToSysReconViewCipDiamond;

