import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from '../components/App';
import { Row, Column } from 'react-foundation';
import { Field, reduxForm } from 'redux-form';
import FromDatePicker from '../components/FromDatePicker';
import DataTable from '../components/DataTable';
import SelectInput from '../components/MultiSelect';
import ReconSideBarDashboard from './ReconSideBarDashboard';
import * as constValues from '../utils/ReconConstants';
import { fetchReconData } from '../actions/reconActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Spinner from 'react-spinner-material';
import { reactLocalStorage } from 'reactjs-localstorage';


class SysToSysReconView extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            SysToSysReconViewShow: true,
            SysToSysReconViewDisplay: true,

            filteredObject: {
                reconType: 'ALL',
                fromDate: moment().subtract(12, 'days').format('MM/DD/YYYY'),
                thruDate: moment().format('MM/DD/YYYY'),
            }

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchRecons = this.fetchRecons.bind(this);
     

    }


    componentDidMount() {
          //d2= this.state.filteredObject.thruDate;
       // d1=this.state.filteredObject.fromDate
        var previousdata = reactLocalStorage.getObject('setDataListViewData');
        console.log("local Storage Data:",previousdata)
        if((this.state.filteredObject.reconType=="ALL")||(this.state.filteredObject.reconType=="CIP Diamond Recon")||(this.state.filteredObject.reconType=="ME CIP Recon"))
            {
        this.state.filteredObject=previousdata;
      
        this.fetchRecons();
      
                
            }
        else{
            
          this.filteredObject.reconType= 'ALL';
        this.filteredObject.fromDate= moment().subtract(12, 'days').format('MM/DD/YYYY');
        this.filteredObject.thruDate= moment().format('MM/DD/YYYY');
            }

        this.fetchRecons();
            
            
            }
    
    
    handleSubmit(values, event) {
       

        this.state.filteredObject = values;
        this.fetchRecons();
    }
    fetchRecons() {
         reactLocalStorage.setObject('setDataListViewData', this.state.filteredObject);
        let paramString = 'fromDate=' + this.state.filteredObject.fromDate + '&thruDate=' + this.state.filteredObject.thruDate + '&reconType=' + this.state.filteredObject.reconType;
        console.log("check url:",paramString);
        this.props.dispatch(fetchReconData(constValues.GET_RECON_VIEW_URL, paramString));

    }

    render() {
        const { handleSubmit, pristine, reset, submitting, receiveFilteredValues } = this.props
        const { enrollmentFromDate, enrollmentthroughDate, transactionType,
            contractEffDate, contractExpDate, marketSegment, productType, sourceSystem, transactionStatus, pageNo } = this.props
        const required = value => (value ? undefined : 'Field required.')
        const submenu = constValues.SUBMENU_RECON_VIEW;



        // console.log("check value11:", this.props.SysToSysReconViewShow);
        // console.log("check value22:", this.props.SysToSysReconViewDisplay);
        this.state.SysToSysReconViewShow = this.props.SysToSysReconViewShow;
        this.state.SysToSysReconViewDisplay = this.props.SysToSysReconViewDisplay;
//        this.state.SysToSysReconViewShow = d1;
//        this.state.SysToSysReconViewDisplay = d1;
//
        console.log("check value11:", this.state.SysToSysReconViewShow);
        console.log("check value22:", this.state.SysToSysReconViewDisplay);





        return (
            <App>
                <div >
                    <div>
                        <ReconSideBarDashboard submenutitles={submenu} />

                    </div>
                    <div className="div-label-container" style={{ 'width': '77%' }}>
                        <div className="modal-header" style={{ 'backgroundColor': '#1779ba' }}>
                            <h4 className="modal-title"><p className="modal-title-header">System Reconciliation</p></h4>
                        </div>

                        <form onSubmit={handleSubmit(this.handleSubmit)}>
                              <div style={{
                        'border': '1px solid #5dade2',
                        'borderLeft': '4px solid #5dade2',
                        'padding': '10px 16px',
                        'marginBottom': '30px',
                        'borderRadius': '3px 6px 6px 3px'
                    }}>
                            <Row >
                            </Row>
                            {/*Recon Type dropdown Menu*/}
                            <Row style={{ "paddingTop": "10px" }}> {/* 125px */}
                                <Column medium={3}>
                                    <label className="formLabel"> Recon Type:
                                        <Field name='reconType' component={SelectInput} options={constValues.RECON_TYPE_OPTIONS} defaultValue={this.state.filteredObject.reconType} />
                                    </label>
                                </Column>
                                {/*From Date  */}

                                <Column style={{ "float": "right" }} medium={3}>
                                    <label className="formLabel"> Through Date:
                                        <Field name="thruDate" component={FromDatePicker} defaultValue={this.state.filteredObject.thruDate}
                                            type='text' className="formInput" />
                                    </label>
                                </Column>
                                <Column style={{ "float": "right", }} medium={3}>
                                    <label className="formLabel"> From Date:
                                        <Field name="fromDate" component={FromDatePicker} value={this.state.filteredObject.fromDate} defaultValue={this.state.filteredObject.fromDate}
                                            type='text' className="formInput" style={{ "borderRadius": "0.4rem" }} />
                                    </label>
                                </Column>
                            </Row>

                            <Row className="PaddingTop10">
                                <div className="modal-footer">
                                    <div style={{ "display": "inline", "float": "left", "paddingRight": "5em", "paddingTop": "2em" }}>
                                        <button className='button primary btn-lg btn-color formButton' type="submit" disabled={pristine || submitting} onClick={reset}>Reset</button>
                                    </div>
                                    <div style={{ "display": "inline", "float": "right", "paddingRight": "2em", "paddingTop": "2em" }}>
                                        <button className='button primary btn-lg btn-color formButton' type="submit" style={{ "backgroundColor": "green" }} disabled={submitting}>Update View</button>
                                    </div>
                                </div>
                            </Row>
                            </div>
                        </form>
                        <label className="User Portal" style={{ "fontSize": "0.95em", "marginBottom": "35px", "marginTop": "30px" }} >To view the reconciliation result reports, you will require the access to the folder, I:\Delivery Systems\neb. Please Submit an access request via:
                                <a target="_blank" href="http://fasst/UserPortal.aspx"><code>"http://fasst/UserPortal.aspx"</code></a>
                        </label>
                        <center>
                            <div className="mask" style={{ display: this.state.SysToSysReconViewDisplay ? 'block' : 'none' }}>
                                <Spinner width={100}
                                    height={120}
                                    spinnerColor={"#5dade2"}
                                    spinnerWidth={2}
                                    show={this.state.SysToSysReconViewShow} />
                            </div>
                        </center>

                        <div>
                            <DataTable data={this.props.data} limit={25} totalCounts={3} rowHeight={30} headerHeight={40} width={935} height={300}
                                headerFields={[
                                    { id: 'reconRundate', header: 'Recon Run Date and Time', width: 311, height: 30, link: false },
                                    { id: 'reconType', header: 'Recon Type', width: 312, height: 334, link: true },
                                    { id: 'totalError', header: 'Total Errors', width: 311, height: 332, link: false },
                                ]}
                                pageCount={1} />
                        </div>
                    </div>
                </div>
            </App>

        );
    }
}
SysToSysReconView.propTypes = {
    SysToSysReconViewShow: React.PropTypes.bool.isRequired,
    SysToSysReconViewDisplay: React.PropTypes.bool.isRequired


};
SysToSysReconView.defaultProps = {
    SysToSysReconViewShow: true,
    SysToSysReconViewDisplay: true
};

const SpinnerViewFun = function () {

   



}



function mapStateToProps(state, actions) {
    SpinnerViewFun();
    // console.log("results 2=>", actions);
     console.log("results 1=>", state.fetchReconData);

    if (state.fetchReconData && state.fetchReconData.reconRecords && state.fetchReconData.reconRecords.length > 0) {

        //debugger;
        return {
            data: state.fetchReconData.reconRecords,
            SysToSysReconViewShow: false,
            SysToSysReconViewDisplay: false


        }
    } else {
        return {};
    }

}
// Decorate with redux-form
SysToSysReconView = reduxForm({
    form: 'SysToSysReconViewValues' // a unique identifier for this form
})(SysToSysReconView)
SysToSysReconView = connect(
    state => ({
        initialValues: {
            reconType: "ALL",
            fromDate:moment().subtract(12, 'days').format('MM/DD/YYYY'),
            thruDate: moment().format('MM/DD/YYYY')
        }
    })
)(SysToSysReconView)

export default connect(mapStateToProps)(SysToSysReconView);



