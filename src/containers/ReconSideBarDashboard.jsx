
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
//import  constValues from '../utils/DashboardConstants';
import * as ReconConstants from '../utils/ReconConstants';
import { reactLocalStorage } from 'reactjs-localstorage';
 
class ReconSideBarDashboard extends Component {
       sideBarLocalClearCip() {  
          
        reactLocalStorage.setObject('setDataListCipsetDataListCip', "");

    }
    sideBarLocalClearMe() {
       
        reactLocalStorage.setObject('setDataListMe', "");


    }
    
    sideBarLocalClearAll() 
    {
       
//        console.log("date check1:"+ ViewFromDate)
//        console.log("date check2:"+ ViewThruDate)
        reactLocalStorage.setObject('setDataListViewData', "");
        
        
    }
    
    render() {
         
        
        return (
            <div className="nav-side-menu">
                <div className="brand">{ReconConstants.RECON_SUBMENU_DASHBOARD_NAME}</div>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">
                          <li>
                             <NavLink to={ReconConstants.SYSTEM_TO_SYSTEM_RECON_PAGE_URL}  onClick={this.sideBarLocalClearAll.bind(this)} style={{'padding': '10px 240px 10px 10px'}}>
                                 <i className="fa fa-globe fa-lg"></i>
                                 
                                 {ReconConstants.RECON_VIEW_ALL}</NavLink>
                        </li>
                        
                        <li>
                             <NavLink to={ReconConstants.CIP_DIAMOND_RECON_URL} onClick={this.sideBarLocalClearCip.bind(this)} style={{'padding': '10px 135px 10px 10px'}}>
                                 <i className="fa fa-dashboard fa-lg"></i>
                                 {ReconConstants.RECON_SUBMENU_CIP_DIAMOND_RECON_NAME}</NavLink>
                        </li>
                        <li><NavLink to={ReconConstants.ME_CIP_RECON_URL} onClick={this.sideBarLocalClearMe.bind(this)} style={{'padding': '10px 171px 10px 10px'}}>
                            <i className="fa fa-list fa-lg"></i>
                            {ReconConstants.RECON_SUBMENU_ME_CIP_RECON_NAME}</NavLink></li>
                             
                             
                           {/*  <Link to={ReconConstants.CIP_DIAMOND_RECON_UR}><i className="fa fa-dashboard fa-lg"></i>{ReconConstants.RECON_SUBMENU_CIP_DIAMOND_RECON_NAME}</Link>
                        </li>
                        <li><Link to={ReconConstants.ME_CIP_RECON_URL}><i className="fa fa-list fa-lg"></i>{ReconConstants.RECON_SUBMENU_ME_CIP_RECON_NAME}</Link></li>  */}
                    </ul>
                </div>
            </div>
        );
    }
}
 
ReconSideBarDashboard.propTypes = {
 
};
 
export default ReconSideBarDashboard;

