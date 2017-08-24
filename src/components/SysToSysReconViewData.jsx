import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkButton from './LinkButton';
import { Link } from 'react-router-dom';
import { Row, Column, Grid } from 'react-foundation'
import { countsFetchData } from '../actions/dashboardActions';
import FromDatePicker from './FromDatePicker';
import * as constValues from '../utils/DashboardConstants';
import * as ReconConstants from '../utils/ReconConstants';
import { connect } from 'react-redux';
import SelectInput from './MultiSelect';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
 
 
require('es6-promise').polyfill();
require('isomorphic-fetch');


 
class SysToSysReconViewData extends Component {
 
 
  constructor(props) {
    super(props);
    this.state = {
      recontypeerrormsg: "",
      reconfromdataerrormsg: "",
      reconthroughdateerrormsg: "",
      reconapidata: "",
      parameters: []
 
    };
    this.handleMyFormSubmit = this.handleMyFormSubmit.bind(this);
    this.apiDataGet = this.apiDataGet.bind(this);
 
 
 
    this.reconDataForApi = {
      ReconType: "ALL",
      ReconFromDate: moment().subtract(12, 'days').format('MM/DD/YYYY'),
      ReconthroughData: moment().format('MM/DD/YYYY')
    }
    this.apiDataGet(this.reconDataForApi);
  }
 
 
 
  
    
  apiDataGet(ViewData) {
  
       var Url = '/nebert/ui/reconview/getreconcounts?fromDate=' + ViewData.ReconFromDate + '&thruDate=' + ViewData.ReconthroughData + '&reconType=' + ViewData.ReconType;
       //var Url = 'http://localhost:9080/nebert/ui/reconview/getreconcounts?fromDate=' + ViewData.ReconFromDate + '&thruDate=' + ViewData.ReconthroughData + '&reconType=' + ViewData.ReconType;
        //var Url = '/9080/nebert/ui/reconview/getreconcounts?fromDate=' + ViewData.ReconFromDate + '&thruDate=' + ViewData.ReconthroughData + '&reconType=' + ViewData.ReconType;
    fetch(Url,{ credentials: "same-origin"})
       .then(result => result.json())
      .then(params => {
  
      
        var apircondatalist = params.reconRecords;
        this.setState({ parameters: apircondatalist });
 
 
 
 
      })
 
  }
 
 
  handleMyFormSubmit({ recontype, reconfromdata, reconthroughdate }) {
  
 
    if (recontype == undefined) {
      this.setState({ recontypeerrormsg: "Please Select option" });
    }
    else {
      this.setState({ recontypeerrormsg: "" });
      if (reconfromdata == undefined) {
        this.setState({ econfromdataerrormsg: "please select From date" });
      }
      else {
        this.setState({ econfromdataerrormsg: "" });
        if (reconthroughdate == undefined) {
 
          this.setState({ reconthroughdateerrormsg: "please select Through date" });
        }
        else {
          this.setState({ reconthroughdateerrormsg: "" });
 
          var reconDataForApi = {
            ReconType: recontype,
            ReconFromDate: reconfromdata,
            ReconthroughData: reconthroughdate
 
 
          }
          this.apiDataGet(reconDataForApi);
 
        }
 
      }
    }
  }
 
  render() {
    const { handleSubmit, pristine, reset, submitting, receiveFilteredValues  } = this.props
    const initialValues=moment().format('MM/DD/YYYY');
 
    return (
 
      <div className="col-md-12" >
        <div className="form-area">
          <form onSubmit={handleSubmit(this.handleMyFormSubmit)}>
            <div className="row">
              <div className="form-horizontal">
                <div className="form-group">
                  <Row style={{ "paddingLeft": "423px", "paddingBottom": "25px" }}>
 
                  </Row>
                </div>
              </div>
            </div>
            <div className="modal-header" >
              <label className = "div-label-container1" style={{"padding":"5px", "paddingleft": "12px", "margintop": "-21px", "backgroundColor":"#8ab1db"}}><i><em> Search Reconciliation results</em></i></label>
            </div>
            <Row style={{ "paddingTop": "25px" , "margintop":"56px" }}>
              <Column medium={3}>
                <label className="formLabel"> Recon Type:
                                <Field name='recontype' options={ReconConstants.RECON_TYPE_OPTIONS}
                    component={SelectInput} className="formInput" />
                </label>
                <p style={{ "color": "red", "fontSize": "18px", "display": "inline" }} >{this.state.recontypeerrormsg}</p>
              </Column>
              <Column medium={3}>
                <label className="formLabel"> From Date :
                               <Field name="reconfromdata"  component={FromDatePicker} 
                    type='text' receiveModalValues={ this.reconDataForApi.ReconFromDate }  className="formInput" style={{ "borderRadius": "0.4rem" }} />
                </label>
                <p style={{ "color": "red", "fontSize": "18px", "display": "inline" }}>{this.state.econfromdataerrormsg}</p>
              </Column>
              <Column medium={3}>
                <label className="formLabel"> Through Date :
                                    <Field name="reconthroughdate" component={FromDatePicker}
                    type='text' className="formInput" />
                </label>
                <p style={{ "color": "red", "fontSize": "18px", "display": "inline" }}>{this.state.reconthroughdateerrormsg}</p>
              </Column>
 
            </Row>
            <Row className="paddingTop10">
 
              <div className="modal-footer">
                <div style={{ "display": "inline", "float": "right", "paddingRight": "5em", "paddingTop": "2em" }}>
                  <button className='button primary  btn-lg btn-color formButton' type="button" onClick={reset} > Clear Values</button>
                </div>
                <div style={{ "display": "inline", "float": "right", "paddingRight": "2em", "paddingTop": "2em" }}>
                  <button className='button primary  btn-lg btn-color formButton' type="submit" style={{ "backgroundColor": "green" }} > Update View </button>
                </div>
              </div>
            </Row>
            <div style={{ "margintop":"10px", "marginbottom" : "45px" }}>
              <label style={{ "fontSize": "0.80rem" }}>To view the reconciliatin results reports,you will require access to the folder,I:\Delivery Systems\neb.Please submit an access request via <a target="_blank" href="http://fasst/UserPortal.aspx"><code>"http://fasst/UserPortal.aspx"</code></a></label>
            </div>
 
 
 
 
          </form>
 
          {/*<table className="table table-striped" border="5">*/}
           <table className="fixedDataTableLayout_main public_fixedDataTable_main">
            <thead>
              <tr>
 
                <th>Recon Run Date and Time</th>
                <th>Recon Type</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.parameters.map((item, index) => (
                <tr key={index}>
 
 
                  <td>{item.reconRunDate} </td>
                  <td><a href="/">{item.recontype}</a></td>
                  {/*<td><Link to="/">{item.reconType}</Link></td>*/}
                  <td>{item.totalErrors}</td>
 
 
                </tr>
              ))}
 
            </tbody>
 
          </table>
 
        </div>
      </div>
 
    );
  }
}
 
 
SysToSysReconViewData.propTypes = {
 
};
 
 
// Decorate with redux-form
SysToSysReconViewData = reduxForm({
  form: 'myForm',
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true // a unique identifier for this form
})(SysToSysReconViewData)
 
export default SysToSysReconViewData;

