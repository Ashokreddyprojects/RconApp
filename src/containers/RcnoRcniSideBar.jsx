
// import React, { Component } from 'react';
import React, { Component } from 'react';
import { Row, Column } from 'react-foundation'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as rcnorcni from '../utils/RcnoRcni';
import * as ReconConstants from '../utils/ReconConstants';
import Collapsible from 'react-collapsible';
import '../nebert/css/rc-collapse.css';
import Collapse, { Panel } from 'rc-collapse';
class RcnoRcniSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.state = this.getInitialState();
        [
            'onChange'
        ].map(fn => this[fn] = this[fn].bind(this));
    }
    getInitialState() {
        return {activeKey: [this.props.activeKey]}
    }
    onChange(activeKey) {
        this.setState({ activeKey });
    }
    render() {
        return (
            <div className="record-summary-details-sidebar">
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <h3>
                            RCNO/RCNI
                        </h3>
                        <hr style={{ "borderTop": "1px dotted" }} />
                        <br />
                        <p>
                            Content
                        </p>
                        <br />
                    </div>
                </div>
                <Collapse accordion={true} onChange={this.onChange} activeKey={this.state.activeKey}>
                    <Panel header={`Record Summary Page`} key={'1'}>
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_RECORD_SUMMARY_DETAILS_URL)} to={rcnorcni.RCNO_RCNI_RECORD_SUMMARY_DETAILS_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_RECORD_SUMMARY_DETAILS_SIDEBARNAME}</NavLink>
                        <hr className="hrstyle2" />
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_RECORD_SUMMARY_COMPARE_URL)} to={rcnorcni.RCNO_RCNI_RECORD_SUMMARY_COMPARE_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_RECORD_SUMMARY_COMPARE_SIDEBARNAME}</NavLink>
                    </Panel>
                    <Panel header={`Field Summary Page`} key={'2'}>
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_FIELD_SUMMARY_DETAILS_URL)} to={rcnorcni.RCNO_RCNI_FIELD_SUMMARY_DETAILS_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_FIELD_SUMMARY_DETAILS_SIDEBARNAME}</NavLink>
                        <hr className="hrstyle2" />
                        <NavLink  className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_FIELD_SUMMARY_COMPARE_URL)} to={rcnorcni.RCNO_RCNI_FIELD_SUMMARY_COMPARE_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_FIELD_SUMMARY_COMPARE_SIDEBARNAME}</NavLink>
                    </Panel>
                    <Panel header={`List View Page`} key={'3'}>
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_LIST_VIEW_PAGE_URL)} to={rcnorcni.RCNO_RCNI_LIST_VIEW_PAGE_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_LIST_VIEW_PAGE_SIDEBARNAME}</NavLink>
                        <hr className="hrstyle2" />
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_DETAILS_PAGE_URL)} to={rcnorcni.RCNO_RCNI_DETAILS_PAGE_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_DETAILS_PAGE_SIDEBARNAME}</NavLink>
                    </Panel>
                    <Panel header={`Error Page`} key={'4'}>
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERROR_URL)} to={rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERROR_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERROR_SIDEBARNAME}</NavLink>
                    </Panel>
                    <Panel header={`ER&R Form Page`} key={'5'}>
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERR_FORM_URL)} to={rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERR_FORM_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERR_FORM_SIDEBARNAME}</NavLink>
                        <hr className="hrstyle2" />
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_ENTER_AND_EDIT_ERR_FORM_URL)} to={rcnorcni.RCNO_RCNI_ENTER_AND_EDIT_ERR_FORM_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_ENTER_AND_EDIT_ERR_FORM_SIDEBARNAME}</NavLink>
                    </Panel>
                    <Panel header={`Admin Page`} key={'6'}>
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERROR_ADMIN_SIDEBARNAME)} to={rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERROR_ADMIN_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERROR_ADMIN_SIDEBARNAME}</NavLink>
                        <hr className="hrstyle2" />
                        <NavLink className={'sidebar-highlight-link-'+ (window.location.pathname == rcnorcni.RCNO_RCNI_ENTER_AND_EDIT_ERROR_ADMIN_URL)} to={rcnorcni.RCNO_RCNI_ENTER_AND_EDIT_ERROR_ADMIN_URL}>
                            <i className="fa fa-minus-square-o fa-lg"></i> {rcnorcni.RCNO_RCNI_ENTER_AND_EDIT_ERROR_ADMIN_SIDEBARNAME}</NavLink>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}
RcnoRcniSideBar.propTypes = {};
export default RcnoRcniSideBar;


