
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as reconConstValues from '../utils/ReconConstants';
class SideBarRecon extends Component {
    render() {
        const submenuArray = this.props.submenutitles;
        return (
            <div className="nav-side-menu">
                <div className="brand">{submenuArray[0]}</div>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">
                        <li>
                        <NavLink to={reconConstValues.CIP_RECON_VIEW_URL}><i className="fa fa-dashboard fa-lg"></i>{submenuArray[1]}</NavLink>
                        </li>
                        
                        <li><NavLink to={reconConstValues.ME_RECON_VIEW_URL}><i className="fa fa-list fa-lg"></i>{submenuArray[2]}</NavLink></li>
                        
                        <li><Link to={reconConstValues.ME_RECON_VIEW_URL}><i className="fa fa-list fa-lg"></i>{submenuArray[3]}</NavLink></li>
                    </ul>
                </div>
            </div>
        );
    }
}
SideBar.propTypes = {
};
export default SideBar;








