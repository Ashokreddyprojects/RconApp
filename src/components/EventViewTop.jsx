
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Column, Grid } from 'react-foundation';
import { connect } from 'react-redux';
import { fetchEventViewData } from '../actions/dashboardActions';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';
import * as constValues from '../utils/DashboardConstants';
export const customStyles = {
    content: {
        top: '15.5%',
        left: '25.7%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate (-50%,-50%)',
        padding: '0',
        minWidth: '930px',
        minHeight: '450px',
        borderbottomColor: '#1779ba',
        borderRadius: '0.6rem'
    }
}

class EventViewTop extends Component {
    constructor(props) {
        super(props);
        this.submitValues = this.submitValues.bind(this);
    }
    submitValues(values, dispatch) {
        console.log(this.props.transactionId);
        return dispatch(fetchEventViewData(constValues.GET_EVENT_VIEW_URL, JSON.stringify(values)));
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div>
                <form className="div-form-container" onSubmit={handleSubmit(this.submitValues)}>
                    <div style={{
                        'border': '1px solid #5dade2',
                        'borderLeft': '4px solid #5dade2',
                        'padding': '10px 16px',
                        'marginBottom': '30px',
                        'borderRadius': '3px 6px 6px 3px'
                    }}>
                        <Row className="fieldLabel">
                            <Column medium={3}>
                                <label className="formLabel">Transaction ID
                                  <Field name="transactionId" component="input" type='text' />
                                </label>
                            </Column>
                            <Column medium={3}>
                                <label className="formLabel"> Contract Number
                                    <Field name="contractId" component="input" type='text' />
                                </label>
                            </Column>
                            <Column medium={3}>
                                <label className="formLabel"> Exchange Subscriber Id
                                    <Field name="exchangeSubscriberId" component="input" type='text' />
                                </label>
                            </Column>
                            <Column medium={3} style={{ "paddingTop": "1.5em" }}>
                                <button className='button primary  btn-lg btn-color formButton' type="submit" onClick={reset}> Search</button>
                            </Column>
                        </Row>
                    </div>
                </form>
            </div>

        );
    }
}
EventViewTop.propTypes = {
    transactionId: PropTypes.string,
    contractId: PropTypes.string,
    exchangeSubscriberId: PropTypes.string
};
// Decorate with redux-form
EventViewTop = reduxForm({
    form: 'EventViewTopValues', // a unique identifier for this form
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true // a unique identifier for this form
})(EventViewTop)
EventViewTop = connect(
    state => ({
        initialValues: {}
    }))(EventViewTop)
export default EventViewTop;

