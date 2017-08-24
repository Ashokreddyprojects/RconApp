
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as constValues from '../utils/DashboardConstants';
import { fetchEventViewData } from '../actions/dashboardActions';
import { connect } from 'react-redux';
import EventViewTop from '../components/EventViewTop';
import SideBar from './SideBarDashboard';
import App from '../components/App';
import EventViewTab from '../components/EventViewTab';
class EventDetailView extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var jsonObj = JSON.stringify(
            {
                "transactionId": this.props.match.params.transactionId
            });
        this.props.fetchEventData(constValues.GET_EVENT_VIEW_URL, jsonObj);
    }
    render() {
        const submenu = constValues.SUBMENU_DASHBOARD_VIEW;
        if (this.props.eventData !== undefined) {
            return (
                <App>
                    <div>
                        <SideBar submenutitles={submenu} />
                        <div>
                            <label className="pageHeaderText"> Event Detail View : {this.props.match.params.transactionId}</label>
                        </div>
                        <div>
                            <EventViewTop />
                        </div>
                        <div className="div-chart-container" style={{ "padding": "0" }}>
                            <EventViewTab {...this.props} />
                        </div>
                    </div>
                </App>

            );
        }
        else
            return null;
    }
}
EventDetailView.propTypes = {
    fetchEventData: PropTypes.func,
    eventData: PropTypes.object,
    hasEventErrored: PropTypes.bool,
    isEventLoading: PropTypes.bool
};
const mapStateToProps = (state) => {
    return {
        eventData: state.fetchEventViewData,
        hasEventErrored: state.fetchEventDataFailed,
        isEventLoading: state.fetchEventDataLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchEventData: (url, data) => dispatch(fetchEventViewData(url, data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EventDetailView);



