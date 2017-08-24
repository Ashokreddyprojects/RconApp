
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBarDashboard';
import App from '../components/App';
import * as constValues from '../utils/DashboardConstants';

class ErrorExceptionsView extends Component {
    render() {
         const submenu = constValues.SUBMENU_DASHBOARD_VIEW;
        return (
            <App>
                <div>
                    <SideBar submenutitles={submenu} />
                    <div>
                        <label className="div-label-container"> Error/Exceptions</label>
                    </div>


                </div>
            </App>
        );
    }
}
ErrorExceptionsView.propTypes = {
};
export default ErrorExceptionsView;

