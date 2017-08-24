import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from '../components/App';
import { Row, Column } from 'react-foundation';
import { Field, reduxForm } from 'redux-form';
import FromDatePicker from '../components/FromDatePicker';
import DataTable from '../components/DataTableRecon';
import SelectInput from '../components/MultiSelect';
import ReconSideBarDashboard from './ReconSideBarDashboard';
import * as constValues from '../utils/ReconConstants';
import { fetchReconData } from '../actions/reconActions';
import { connect } from 'react-redux';
//import { fetchReconData } from '../actions/dashboardActions';
import moment from 'moment';
import Spinner from 'react-spinner-material';
import { reactLocalStorage } from 'reactjs-localstorage';

var ViewFromDate, ViewThruDate;


class SysToSysReconView extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            spinnerShowView: true,
            spinnerShowDisplayView: true,
            SystoSysViewdataFound: true,
            filteredObject: {
                reconType: 'ALL',
                fromDate: moment().subtract(12, 'days').format('MM/DD/YYYY'),
                thruDate: moment().format('MM/DD/YYYY'),
            },
            reconResults: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchRecons = this.fetchRecons.bind(this);
    }
    componentDidMount() {
        var previousdata = reactLocalStorage.getObject('setDataListViewData');
        console.log("local Storage Data:", previousdata)
        if ((previousdata.reconType == "ALL") || (previousdata.reconType == "CIP Diamond Recon") || (previousdata.reconType == "ME CIP Recon")) {
            this.state.filteredObject = previousdata;
                ViewFromDate = previousdata.fromDate;
                ViewThruDate = previousdata.thruDate;
            this.fetchRecons();
            console.log("old data")

        }
        else {
                ViewFromDate = this.state.filteredObject.fromDate;
                ViewThruDate = this.state.filteredObject.thruDate;
            console.log("new  data")
           // this.filteredObject.reconType = 'ALL';
            //this.filteredObject.fromDate = moment().subtract(12, 'days').format('MM/DD/YYYY');
            //this.filteredObject.thruDate = moment().format('MM/DD/YYYY');
        }
        this.fetchRecons();

    }
    handleSubmit(values, event) {


        this.state.filteredObject = values;
        this.setState({ spinnerShowView: true });
        this.setState({ spinnerShowDisplayView: true });
        this.fetchRecons();
    }
    fetchRecons() {
        ViewFromDate=this.state.filteredObject.fromDate;
        ViewThruDate=this.state.filteredObject.thruDate;
       
        reactLocalStorage.setObject('setDataListViewData', this.state.filteredObject);
        var Url = constValues.GET_RECON_VIEW_URL + '?fromDate=' + this.state.filteredObject.fromDate + '&thruDate=' + this.state.filteredObject.thruDate + '&reconType=' + this.state.filteredObject.reconType;
        
       // let paramString = 'fromDate=' + this.state.filteredObject.fromDate + '&thruDate=' + this.state.filteredObject.thruDate + '&reconType=' + this.state.filteredObject.reconType;
        console.log("check url:", Url);

        // var Url = 'http://localhost:9080/nebert/ui/reconview/getreconcounts?fromDate=' + apirequirements.ReconFromDateCip + '&thruDate=' + apirequirements.ReconthroughDataCip + '&reconType=' + apirequirements.ReconTypeCip;
         var Url2='https://blj8082.github.io/ApiData/ReconData.json';
        fetch(Url2, { credentials: "same-origin" })
            .then(result => result.json())
            .then(params => {
//                debugger;
                this.setState({ spinnerShowView: false });
                this.setState({ spinnerShowDisplayView: false });
                var apircondatalist = params.reconRecords;
               reactLocalStorage.setObject('setDataListViewData', apircondatalist);
                this.setState({ reconResults: apircondatalist });
                if (apircondatalist.length > 0) {
                    this.setState({ SystoSysViewdataFound: true });
                }
                else {
                    this.setState({ SystoSysViewdataFound: false });
                }

            });
    }


   
    render() {
        const { handleSubmit, pristine, reset, submitting, receiveFilteredValues } = this.props
        const { enrollmentFromDate, enrollmentthroughDate, transactionType,
            contractEffDate, contractExpDate, marketSegment, productType, sourceSystem, transactionStatus, pageNo } = this.props
        const required = value => (value ? undefined : 'Field required.')
        const submenu = constValues.SUBMENU_RECON_VIEW;
        return (
            //  <App>
            //      <ReconSideBarDashboard submenutitles={submenu}/>
            //      <div style={{"marginLeft": "24%"}}>
            //          <div>
            //          <label className = "div-label-container" style={{"padding":"10px", "marginTop": "85px", "backgroundColor":"#8ab1db", "width":"101%", "fontSize":"1.2em", "height":"46" }}><i><em> Search Reconciliation Results</em></i></label>
            //             {/*<div className="modal-header" style{{"backgroundColor":"#1779ba",}}>*/}
            //          </div> 
            <App>
                <div>
                    <div>
                        <ReconSideBarDashboard submenutitles={submenu} />
                    </div>
                    <div className="div-label-container" style={{ 'width': '77%' }}>
                        <div className="modal-header" style={{ 'backgroundColor': '#1779ba' }}>
                            <h4 className="modal-title"><p className="modal-title-header">System Reconciliation Reports</p></h4>
                        </div>
                        <form onSubmit={handleSubmit(this.handleSubmit)} >
                            <div style={{
                                'border': '1px solid #5dade2',
                                'borderLeft': '4px solid #5dade2',
                                'padding': '10px 16px',
                                'marginBottom': '30px',
                                'borderRadius': '3px 6px 6px 3px',
                            }}>
                                <Row >
                                </Row>
                                                    <Row style={{ "paddingTop": "0px" }}> {/* 125px */}
                                    <Column small={12} medium={4}>
                                        <label style={{ "fontWeight": "400" }} className="formLabel"> From Date:
                                        <Field name='fromDate' component={FromDatePicker} validate={required} value={this.state.filteredObject.fromDate} defaultValue={this.state.filteredObject.fromDate}  />
                                        </label>
                                    </Column>
                                    {/*From Date  */}
                                    <Column small={12} medium={4}>
                                        <label style={{ "fontWeight": "400" }} className="formLabel"> Through Date:
                                        <Field name="thruDate" component={FromDatePicker} alidate={required} value={this.state.filteredObject.thruDate} defaultValue={this.state.filteredObject.thruDate}  />
                                        </label>
                                    </Column>
                                    <Row className="PaddingTop10">
                                        <Column small={12} medium={4} style={{ "float": "right" }}>
                                            <div className="modal-footer">
                                                <div style={{ "display": "inline", "float": "right", "marginTop": "-9px", "paddingRight": "2em", "paddingTop": "1em" }}>
                                                    <button className='button primary btn-lg btn-color formButton' type="submit" disabled={pristine || submitting} onClick={reset}>Reset</button>
                                                </div>
                                                <div style={{ "display": "inline", "float": "right", "marginTop": "-9px", "paddingRight": "1em", "paddingTop": "1em" }}>
                                                    <button className='button primary btn-lg btn-color formButton' type="submit" style={{ "backgroundColor": "green" }} disabled={submitting}>Update View</button>
                                                </div>
                                            </div>
                                        </Column>
                                    </Row>
                                </Row>
                                {/*Buttons Reset and Update*/}
                            </div>
                        </form>
                        <label className="User Portal" style={{ "fontSize": "0.75em", "marginBottom": "35px", "marginTop": "30px" }} >To view the reconciliation result reports, you will require the access to the folder, I:\Delivery Systems\neb. Please Submit an access request via:
                                <a target="_blank" href="http://fasst/UserPortal.aspx"><code>"http://fasst/UserPortal.aspx"</code></a>
                        </label>
                        <center>
                            <div className="mask" style={{ display: this.state.spinnerShowDisplayView ? 'block' : 'none' }}>
                                <Spinner width={100}
                                    height={120}
                                    spinnerColor={"#5dade2"}
                                    spinnerWidth={2}
                                    show={this.state.spinnerShowView} />
                            </div>
                        </center>
                        {/*Table*/}
                        <div className="Data-Availability" style={{ display: !this.state.SystoSysViewdataFound ? 'block' : 'none' }}> No Data Available for the given Date Range</div>
                        <div style={{ display: this.state.SystoSysViewdataFound ? 'block' : 'none' }}>
                            <DataTable style={{ "width": "100%" }} data={this.state.reconResults} limit={25} totalCounts={3} rowHeight={30} headerHeight={40} width={935} height={300}
                                headerFields={[
                                    { id: 'reconRunDate', header: 'Recon Run Date and Time', width: 311, height: 30, link: false },
                                    { id: 'reconType', header: 'Recon Type', width: 312, height: 334, link: true },
                                    { id: 'totalErrors', header: 'Total Errors', width: 311, height: 332, link: false },
                                ]}
                                pageCount={1} />
                        </div>
                    </div>
                </div>
            </App >
        );
    }
}
SysToSysReconView.propTypes = {
};
function mapStateToProps(state) {
    //debugger;
    //console.log("results="+state.fetchReconData);
    if (state.fetchReconData && state.fetchReconData.reconRecords && state.fetchReconData.reconRecords.length > 0) {
        //debugger;
        return {
            data: state.fetchReconData.reconRecords
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
            reconType: 'ALL',
            fromDate: ViewFromDate,
            thruDate: ViewThruDate,
        }
    })
)(SysToSysReconView)

export default connect(mapStateToProps)(SysToSysReconView);