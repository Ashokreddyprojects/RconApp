
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as constValues from '../utils/DashboardConstants';
class SideBar extends Component {
    
    ENDTOENDViewLocalStorage()
    {
        reactLocalStorage.setObject('EndToEndData',{});
        
    }
    
    
    
    render() {
        const submenuArray = this.props.submenutitles;
        
        
        
        return (
            <div className="nav-side-menu">
                <div className="brand">{submenuArray[0]}</div>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">

                        
                        <li>
                            <NavLink to={constValues.END_TO_END_PAGE_URL} onClick={this.ENDTOENDViewLocalStorage.bind(this)}><i className="fa fa-dashboard fa-lg"></i>{submenuArray[1]}</NavLink>
                        </li>
                        <li><NavLink to={constValues.LIST_VIEW_URL}><i className="fa fa-list fa-lg"></i>{submenuArray[2]}</NavLink></li>
                         <li>
                            <NavLink to={constValues.EVENT_DETAIL_VIEW_URL}><i className="fa fa-dashboard fa-lg"></i>{submenuArray[3]}</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
SideBar.propTypes = {
};
export default SideBar;








