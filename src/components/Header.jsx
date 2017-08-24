import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HomeLogo from '../Images/EMBDashboard_logo.png';
import {Link} from 'react-router-dom'
import * as constValues from '../utils/DashboardConstants'
import {Row, Column} from 'react-foundation';

class Header extends Component {
    render() {
        return (
            <div className="top-header">
                <Link to={'/'}>
                    <div className="header-logo"></div>
                </Link>
                <div className="top-header-controls">
                    <ul className="top-header-menu">
                        <li>
                            <span className="top-header-round-button ">
                                <i className="fa fa-th" aria-hidden="true"></i>
                            </span>
                        </li>
                        <li>
                            <span className="top-header-round-button-long header-user-data">
                                <span className="top-header-avatar">
                                    <img src="http://www.placecage.com/300/300"/>
                                </span>{this.props.userName}</span>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}
Header.propTypes = {
    userName: PropTypes.string
};
export default Header;
