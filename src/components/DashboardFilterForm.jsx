
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import { Row, Column, Grid } from 'react-foundation'
import { countsFetchData } from '../actions/dashboardActions';
import FromDatePicker from './FromDatePicker';
import * as constValues from '../utils/DashboardConstants';
import { connect } from 'react-redux';
import SelectInput from './MultiSelect';
import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';
const { DOM: { input, select, textarea } } = React



class DashboardFilter extends Component {


    constructor(props) {
        super(props);
        this.submitValues = this.submitValues.bind(this);
    }
    
    
              componentWillMount() {
            var previousdata = reactLocalStorage.getObject('EndToEndData');
            if(previousdata.enrollmentFromDate== "CIP Diamond Recon") //mandatory fields condition check petandi
                {
                    
            this.props.receiveFilteredValues(JSON.stringify(previousdata));
            return dispatch(countsFetchData(constValues.GET_TXN_COUNTS_URL, JSON.stringify(previousdata)));
                  
                    
                }
            
          
        
            
            
            
        }
    
    
    submitValues(values, dispatch) {
        
            reactLocalStorage.setObject('EndToEndData',values);
        this.props.receiveFilteredValues(JSON.stringify(values));
        return dispatch(countsFetchData(constValues.GET_TXN_COUNTS_URL, JSON.stringify(values)));
    }


    render() {
        const { handleSubmit, pristine, reset, submitting, receiveFilteredValues } = this.props
        const { enrollmentFromDate, enrollmentthroughDate, transactionType,
            contractEffDate, contractExpDate, marketSegment, productType, sourceSystem, transactionStatus } = this.props
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
                                <Field name='sourceSystem' options={constValues.SOURCE_SYSTEM_OPTIONS}
                                        component={SelectInput} multi />
                                </label>
                            </Column>
                            <Column style={{ "width": "30.3%", "paddingLeft": "4.4em" }}>
                                <label className="formLabel"> Transaction Status :
                                <Field name='transactionStatus' options={constValues.TRANSACTION_STATUS_OPTIONS}
                                        component={SelectInput} multi />
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
DashboardFilter.propTypes = {
};

// Decorate with redux-form
DashboardFilter = reduxForm({
    form: 'EndToEndViewFilterValues',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true // a unique identifier for this form// a unique identifier for this form
})(DashboardFilter)

DashboardFilter = connect(
    state => ({
        initialValues: {
            "enrollmentFromDate": moment().subtract(1, 'days').format('MM/DD/YYYY'),
            "enrollmentthroughDate": moment().format('MM/DD/YYYY'),
            'sourceSystem': 'ALL',     
            'productType': 'ALL',
            'marketSegment': 'ALL',
            'transactionType': 'ALL',
            'transactionStatus': 'ALL'
        }
    })
)(DashboardFilter)



export default DashboardFilter

