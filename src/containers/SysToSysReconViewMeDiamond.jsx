
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReconSideBarDashboard from './ReconSideBarDashboard';
import App from '../components/App';
import SysToSysReconViewDataMeDiamond from '../components/SysToSysReconViewDataMeDiamond';
import * as constValues from '../utils/DashboardConstants';
 
 
class SysToSysReconViewMeDiamond extends Component {
    render() {
         const submenu = ReconSideBarDashboard.RECON_SUBMENU_DASHBOARD_VIEW;
        return (
            <App>
                <div >
                <div>
                    <ReconSideBarDashboard submenutitles={submenu} />
                    
                </div>
                <div className="div-label-container" style={{ 'width' :'77%' }}> 
                    <SysToSysReconViewDataMeDiamond />
                 </div>
                </div>    
            </App>
        );
    }
}
 
SysToSysReconViewMeDiamond.propTypes = {
 
};
 
export default SysToSysReconViewMeDiamond;

