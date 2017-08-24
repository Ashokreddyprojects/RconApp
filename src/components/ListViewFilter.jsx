
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import { Row, Column, Grid } from 'react-foundation'
import { fetchListViewData } from '../actions/dashboardActions';
import FromDatePicker from './FromDatePicker';
import * as constValues from '../utils/DashboardConstants';
import { connect } from 'react-redux';
import SelectInput from './MultiSelect';
import moment from 'moment';
const  { DOM: { input, select, textarea } } = React



class ListViewFilter extends Component {


    constructor(props) {
        super(props);
        this.pageNo = "1";
        this.submitValues = this.submitValues.bind(this);
    }
    submitValues(values, dispatch) {
        this.props.receiveFilteredValues(JSON.stringify(values));
        return dispatch(fetchListViewData(constValues.GET_LIST_VIEW_URL, JSON.stringify(values)));
    }


    render() {
        const { handleSubmit, pristine, reset, submitting, receiveFilteredValues } = this.props
        const { enrollmentFromDate, enrollmentthroughDate, transactionType,originSourceSystem,contractID,transactionID,socialSecurityNumber,
            contractEffDate, contractExpDate, marketSegment, productType, sourceSystem, transactionStatus, pageNo } = this.props
        return (
            <div>
                <div className="modal-header" style={{ 'backgroundColor': '#1779ba' }}>
                    <h2 className="modal-title"><p className="modal-title-header">Advanced Search</p></h2>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit(this.submitValues)}>
                        <Row style={{ "paddingTop": "25px" }}>
                            <Column medium={4}>
                                <label className="formLabel"> Enrollment Received From Date :
                               <Field name="enrollmentFromDate" component={FromDatePicker}
                                        type='text' className="formInput" style={{ "borderRadius": "0.4rem" }} />
                                </label>
                            </Column>
                            <Column medium={4}>
                                <label className="formLabel"> Enrollment Received Through Date :
                                    <Field name="enrollmentthroughDate" component={FromDatePicker}
                                        type='text' className="formInput" />
                                </label>
                            </Column>
                            <Column medium={3}>
                                <label className="formLabel"> Transaction Type:
                                <Field name='transactionType' options={constValues.TRANSACTION_TYPE_OPTIONS}
                                        component={SelectInput} multi className="formInput" />
                                </label>
                            </Column>
                        </Row>
                        <Row className="paddingTop10">
                            <Column medium={4}>
                                <label className="formLabel"> Effective From Date :
                                    <Field name="contractEffDate" component={FromDatePicker} type='text' />
                                </label>
                            </Column>
                            <Column medium={4}>
                                <label className="formLabel"> Effective Through Date :
                                    <Field name="contractExpDate" component={FromDatePicker} type='text' />
                                </label>
                            </Column>
                            <Column medium={3}>
                                <label className="formLabel"> Market Segment:
                                 <Field name='marketSegment' options={constValues.MARKET_SEGMENT_OPTIONS}
                                        component={SelectInput} multi />
                                </label>
                            </Column>
                        </Row>
                        <Row className="paddingTop10">
                            <Column style={{ "width": "28%" }}>
                                <label className="formLabel"> Product Type:
                                <Field name='productType' options={constValues.PRODUCT_TYPE_OPTIONS}
                                        component={SelectInput} multi />
                                </label>
                            </Column>
                            <Column style={{ "width": "33.3%", "paddingLeft": "4.4em" }}>
                                <label className="formLabel"> Origin Source System :
                                <Field name='originSourceSystem' options={constValues.SOURCE_SYSTEM_OPTIONS}
                                        component={SelectInput} multi />
                                </label>
                            </Column>
                            <Column style={{ "width": "30.3%", "paddingLeft": "4.4em" }}>
                                <label className="formLabel"> Target System Status :
                                <Field name='transactionStatus' options={constValues.TRANSACTION_STATUS_OPTIONS}
                                        component={SelectInput} multi />
                                </label>
                            </Column>
                        </Row>
                        <Row style={{ "paddingTop": "25px" }}>
                            <Column style={{ "width": "28.5%" }}>
                                <label className="formLabel"> Social Security Number :
                                    <Field name="socialSecurityNumber" component="input" type='text' />
                                </label>
                            </Column>
                            <Column style={{ "paddingLeft": "4em" }} medium={4}>
                                <label className="formLabel"> Contract Number  :
                                    <Field name="contractID" component="input" type='text' />
                                </label>
                            </Column>
                            <Column style={{ "paddingLeft": "4em", "width": "30.33%" }}>
                                <label className="formLabel">Target System:
                                 <Field name='sourceSystem' options={constValues.TARGET_SOURCE_SYSTEM_OPTIONS}
                                        component={SelectInput} multi />
                                </label>
                            </Column>
                        </Row>
                        <Row className="paddingTop10">
                            <Column style={{ "width": "28.5%" }}>
                                <label className="formLabel"> Last Name :
                                    <Field name="lastName" component="input" type='text' />
                                </label>
                            </Column>
                            <Column style={{ "paddingLeft": "4em" }} medium={4}>
                                <label className="formLabel">First Name  :
                                    <Field name="firstName" component="input" type='text' />
                                </label>
                            </Column>
                            <Column style={{ "paddingLeft": "4em", "width": "30.33%" }}>
                                <label className="formLabel">Transaction ID:
                                  <Field name="transactionID" component="input" type='text' />
                                </label>
                            </Column>
                        </Row>
                        <Row className="paddingTop10">
                            <div className="modal-footer">
                                <div style={{ "display": "inline", "float": "right", "paddingRight": "5em", "paddingTop": "2em" }}>
                                    <button className='button primary  btn-lg btn-color formButton' type="submit" onClick={reset}> Clear Values</button>
                                </div>
                                <div style={{ "display": "inline", "float": "right", "paddingRight": "2em", "paddingTop": "2em" }}>
                                    <button className='button primary  btn-lg btn-color formButton' type="submit" style={{ "backgroundColor": "green" }} > Update View </button>
                                </div>
                            </div>
                        </Row>
                    </form>
                </div>
            </div>
        );
    }
}
ListViewFilter.propTypes = {
};

// Decorate with redux-form
ListViewFilter = reduxForm({
    form: 'ListViewFilterValues', // a unique identifier for this form,
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true // a unique identifier for this form// a unique identifier for this form
})(ListViewFilter)

 
ListViewFilter = connect(
    state => ({
        initialValues: {
            "enrollmentFromDate": moment().subtract(1, 'days').format('MM/DD/YYYY'),
            "enrollmentthroughDate": moment().format('MM/DD/YYYY'),
            'sourceSystem': 'NASCO',     
            'productType': 'ALL',
            'marketSegment': 'ALL',
            'transactionType': 'ALL',
            'transactionStatus': 'ALL',
            'originSourceSystem':'Edifecs',
            'pageNo':'1'
        }
    })
)(ListViewFilter)

export default ListViewFilter

