
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Column, Grid, Button } from 'react-foundation'
import { connect } from 'react-redux';
import '../nebert/css/rc-collapse.css';
import Collapse, { Panel } from 'rc-collapse';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-checkbox/assets/index.css';
import Checkbox from 'rc-checkbox'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import MultiSelect from '@khanacademy/react-multi-select';
import '../nebert/css/react-bootstrap-table.css';
import ReactDOM from 'react-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Spinner from 'react-spinner-material';
// const Colors = {
//   PRIMARY: 'primary',
//   SUCCESS: 'success'
// }
let initialState = undefined;
// this context
let cxt;
function dynamicHeaderSortFunc(a, b, order, sortField) { // order is desc or asc
  let a1 = a[sortField] === undefined ? '0' : a[sortField].split('%')[0];
  let b1 = b[sortField] === undefined ? '0' : b[sortField].split('%')[0];
  //console.log(a1 + ' ' + b1);
  if (order === 'desc') {
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
    return parseFloat(a1) - parseFloat(b1);
  } else {
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
    return parseFloat(b1) - parseFloat(a1);
  }
}
function flagSortFunc(a, b, order) { // order is desc or asc
  if (order === 'desc') {
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
    return a.flag > b.flag;
  } else {
    if (a.flag == '-')
      return 1;
    else if (b.flag == '-')
      return -1;
    return b.flag > a.flag;
  }
}
function flagFormatter(cell, row) {
  if (cell == "-") {
    return "";
  }
  return `${cell}`;
}
function emptyDataFormatter(cell, row) {
  if (cell == undefined || cell == "") {
    return "-";
  }
  return `${cell}`;
}
class FieldSummaryDetailPageData extends Component {
  constructor(props) {
    super(props);
    cxt = this;
    window.fsdp = this;
    this.state = this.getInitialState();
    [
      'getItems',
      'onChange',
      'handleDateChange',
      'handleTradPartChange',
      'handleCovYearChange',
      'handleFieldFlagChange',
      'handleRecordFlagChange',
      'handleFieldNameChange',
      'handleMultiSelectRenderer',
      'handleSubmitButton',
      'handleResetButton',
      'handleExport'
    ].map(fn => this[fn] = this[fn].bind(this));
  }
  getInitialState() {
    return {
      accordion: true,
      activeKey: ['1'],
      // startDate: moment(),
       startDate:moment().subtract(1, 'month'),
      covYear: this.props.defaultCovYear,
      tradSelected: this.props.defaultTradingPartners,
      fieldFlagSelected: this.props.defaultFieldFlags,
      recordFlagSelected: this.props.defaultRecordFlags,
      fieldNameSelected: this.props.defaultFieldNames,
      fieldNameOptions: this.props.fieldNameOptions,
      recordFlagOptions: this.props.recordFlagOptions,
      fieldFlagOptions: this.props.fieldFlagOptions,
      selectRowProp: {
        mode: 'checkbox',
        clickToSelect: true,
        selected: []
      },
      tableOptions: {
        onExportToCSV: this.onExportToCSV
      },
      summaryTableData: this.props.summaryTableData,
      tableHeaders: [],
      showTable: false,
      showSpinner: true,
      lastDataReceived: this.props.lastDataReceived,
      errStr: []
    };
  }
  onChange(activeKey) {
    this.setState({ activeKey });
  }
  handleDateChange(date) {
    this.setState({ startDate: date });
  }
  onExportToCSV() {
    const selectedRows = cxt.refs.table.state.selectedRowKeys;
    console.log(selectedRows);
    console.log(cxt.state.summaryTableData);
    return cxt
      .state
      .summaryTableData
      .filter(d => {
        if (selectedRows.indexOf(d.flag) > -1) {
          return d;
        }
      });
  }
  handleExport() {
    this
      .refs
      .table
      .handleExportCSV();
  }
  handleTradPartChange(selected) {
    this.setState({ tradSelected: selected });
  }
  handleCovYearChange(val) {
    console.log(val);
    this.setState({ covYear: val.label });
  }
  handleMultiSelectRenderer(selected, options) {
    if (selected.length === 0) {
      return "Select";
    }
    if (selected.length === options.length) {
      return "All";
    }
    return `Selected (${selected.length})`;
  }
  handleFieldFlagChange(selected) {
    this.setState({ fieldFlagSelected: selected });
  }
  handleRecordFlagChange(selected) {
    this.setState({ recordFlagSelected: selected });
  }
  handleFieldNameChange(selected) {
    this.setState({ fieldNameSelected: selected });
  }
  handleSubmitButton() {
    console.log('handleSubmitButton()');
    let state = JSON.parse(JSON.stringify(this.state));
    console.log(state);
    let pass = true;
    let errStr = [];
    // validate covYear
    if (!state.covYear || parseInt(state.covYear) !== state.covYear || String(state.covYear).indexOf('.') !== -1) {
      pass = false;
      errStr[4] = "Field Required";
    }
    // validate moment object
    const startDate = this.refs.fileRunDPicker.refs.input.defaultValue;
    if (!startDate || startDate.length !== 7) {
      pass = false;
      errStr[0] = "Field Required";
    }
    else {
       let range = moment(startDate,'MM/YYYY').add(6, 'month');
       if (!moment(range).isSameOrAfter(moment()))
       {
          pass = false;
          errStr[0] = "Error : Date more than 6 months old";
       }
    }

    // validate trad partners
    if (!state.tradSelected || state.tradSelected.length < 1) {
      pass = false;
      errStr[1] = "Field Required";
    }
    // validate record flags
    if (!state.recordFlagSelected || state.recordFlagSelected.length < 1) {
      pass = false;
      errStr[3] = "Field Required";
    }
    // validate field flags
    if (!state.fieldFlagSelected || state.fieldFlagSelected.length < 1) {
      pass = false;
      errStr[2] = "Field Required";
    }
    // validate record flags
    if (!state.fieldNameSelected || state.fieldNameSelected.length < 1) {
      pass = false;
      errStr[5] = "Field Required";
    }
    if (pass) {
      this
        .props
        .handleSubmit({ state })
      this.setState({ activeKey: ['1'], showSpinner: true, showTable: false });
    }
    this.setState({ errStr });
  }
  handleResetButton() {
    console.log(initialState);
    this.setState({
      // startDate: moment(),
      startDate: moment().subtract(1, 'month'),
      covYear: JSON.parse(JSON.stringify(initialState.covYear)),
      tradSelected: JSON.parse(JSON.stringify(initialState.tradSelected)),
      fieldFlagSelected: JSON.parse(JSON.stringify(initialState.fieldFlagSelected)),
      recordFlagSelected: JSON.parse(JSON.stringify(initialState.recordFlagSelected)),
      fieldNameSelected: JSON.parse(JSON.stringify(initialState.fieldNameSelected)),
      errStr : []
    }, () => {
      console.log("Resetting State");
      console.log(this.state);
    });
  }
  getItems() {
    const items = [];
    items.push(
      <Panel header={`Field Search`} key={'0'}>
        <br />
        <Row className='display'>
          <Column medium={3} style={{ "marginLeft": "5%" }}>
            <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
              File Run Month/Year:*
            <DatePicker
              ref='fileRunDPicker'
              selected={this.state.startDate}
              onChange={this.handleDateChange}
              dateFormat="MM/YYYY"
              placeholderText="MM/YYYY"
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown />
            <span className="error date-picker-error">{this.state.errStr[0]}</span>
            </label>
          </Column>
          <Column medium={3} className="multi-select" style={{ "marginLeft": "3%" }}>
            <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
              Trading Partner ID:*
            <MultiSelect
              options={this.props.tradingPartnerOptions}
              onSelectedChanged={this.handleTradPartChange}
              selected={this.state.tradSelected}
              valueRenderer={this.handleMultiSelectRenderer}
              selectAllLabel={"All"} />
            <span className="error">{this.state.errStr[1]}</span>
            </label>
          </Column>
          <Column medium={2} className="multi-select" style={{ "marginLeft": "3%" }}>
            <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
              Field Flag:
            <MultiSelect
              options={this.state.fieldFlagOptions}
              onSelectedChanged={this.handleFieldFlagChange}
              selected={this.state.fieldFlagSelected}
              valueRenderer={this.handleMultiSelectRenderer}
              selectAllLabel={"All"} />
            <span className="error">{this.state.errStr[2]}</span>
              </label>
          </Column>
          <Column medium={2} className="multi-select" style={{ "marginLeft": "3%" }}>
            <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
              Record Flag:*
            <MultiSelect
              options={this.state.recordFlagOptions}
              onSelectedChanged={this.handleRecordFlagChange}
              selected={this.state.recordFlagSelected}
              valueRenderer={this.handleMultiSelectRenderer}
              selectAllLabel={"All"} />
            <span className="error">{this.state.errStr[3]}</span>
            </label>
          </Column>
        </Row>
        <Row>
          <Column medium={3} className='coverage-year' style={{ "marginLeft": "5%" }}>
            <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
              Coverage Year:*
            <Select
              value={this.state.covYear}
              options={this.props.covYearOptions}
              onChange={this.handleCovYearChange} />
            <span className="error">{this.state.errStr[4]}</span>
            </label>
          </Column>
          <Column medium={4} className="multi-select" style={{ "marginLeft": "3%" }}>
            <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
              Field Name:*
            <MultiSelect
              options={this.state.fieldNameOptions}
              onSelectedChanged={this.handleFieldNameChange}
              selected={this.state.fieldNameSelected}
              valueRenderer={this.handleMultiSelectRenderer}
              selectAllLabel={"All"} />
            <span className="error">{this.state.errStr[5]}</span>
              </label>
          </Column>
        </Row>
        <Row>
          <div className="modal-footer">
            <div style={{ "display": "inline", "float": "right", "paddingRight": "0em", "paddingTop": "2em" }}>
              <button className='button primary  btn-lg btn-color formButton' type="button" onClick={this.handleResetButton}> Reset </button>
            </div>
            <div style={{ "display": "inline", "float": "right", "paddingRight": "1em", "paddingTop": "2em" }}>
              <button className='button primary  btn-lg btn-color formButton' type="button" style={{ "backgroundColor": "green" }} onClick={this.handleSubmitButton}> Submit </button>
            </div>
          </div>
        </Row>
        <Row>
          <br />
          <div className="vh150"></div>
        </Row>
        {/* <Row>
          <div className="vh200"></div>
          <Column medium={3} offsetOnMedium={9}>
            <Button color={Colors.PRIMARY} onClick={this.handleResetButton} isHollow>Reset</Button>
            &nbsp; &nbsp;
            <Button color={Colors.SUCCESS} onClick={this.handleSubmitButton}>Submit</Button>
          </Column>
          <br/>
          <div className="vh150"></div>
        </Row> */}
      </Panel>
    );
    items.push(
      <Panel header={`Search Result`} key={'1'}>
        <div className={'field-summary-result-rf-text display-' + (this.state.recordFlagSelected.length > 0)}> Selected Record Flags :
          { 
            this.state.recordFlagSelected.map((r, index) => {

              if (this.state.recordFlagOptions.length === this.state.recordFlagSelected.length)
              {
                return index == 0 ? "All" : '';
              }
              else if (this.state.recordFlagOptions[r] !== undefined) {
                return this.state.recordFlagOptions[r].label + (index != this.state.recordFlagSelected.length - 1 ? ", " : "");
              }
              else
              {
                return '-';
              }
            })
          }
        </div>
        <div className={'display-' + !this.state.showTable}
          style={{ "textAlign": "center", "color": "darkgoldenrod", "fontWeight": "bolder", "fontStyle": "italic", "fontFamily": "serif", "fontSize": "26px" }}>
          <p className={'display-' + !this.state.showSpinner}>No Data Available for selected Range</p>
          <Spinner
            className="record-summary-spinner"
            spinnerColor={"#5dade2"}
            spinnerWidth={2}
            visible={this.state.showSpinner && !this.state.showTable} />
        </div>
        <div className={'display-' + this.state.showTable}>
          <br /><br />
          <BootstrapTable
            data={this.state.summaryTableData}
            height='200'
            scrollTop={'Top'}
            ref='table'
            bordered={false}
            keyField='flag'
            >
            <TableHeaderColumn
              width={'150'}
              dataField='flag'
              className='rsdp-table-header'
              sortFunc={flagSortFunc}
              dataSort={true}>Flag  <i className="fa fa-sort" aria-hidden="true"></i></TableHeaderColumn>
            {this
              .state
              .tableHeaders
              .map((h,index) => {
                return (
                  <TableHeaderColumn
                   className='rsdp-table-header'
                    dataField={h}
                    dataFormat={emptyDataFormatter}
                    width={'150'}
                    sortFunc={dynamicHeaderSortFunc}
                    dataSort={true}>{h}  <i className="fa fa-sort" aria-hidden="true"></i></TableHeaderColumn>
                )
              })
            }
          </BootstrapTable>
          <br /><br />
          <Row style={{ "marginLeft": "75%" }}>
            <Column medium={1} offsetOnMedium={10}>
              <div style={{ 'float': 'right', 'paddingRight': '0em' }}>
                <button className="button primary  btn-lg btn-color formButton" style={{ "backgroundColor": "green", 'paddingTop': '0em', 'height': '2.5em' }} onClick={this.handleExport}>Export To Excel </button></div>
              {/*<Button color={Colors.SUCCESS}>Export</Button>*/}
            </Column>
          </Row>
        </div>
      </Panel>
    );
    return items;
  }
  render() {
    return (
      <div>
        <div>
          <Collapse
            accordion={this.state.accordion}
            onChange={this.onChange}
            activeKey={this.state.activeKey}>
            {this.getItems()}
          </Collapse>
        </div>
      </div>
    );
  }
   componentWillReceiveProps(nextProps)
  {
    if (this.state.fieldNameOptions.length == 0 && nextProps.fieldNameOptions.length > 0) {
      this.setState({ fieldNameOptions: nextProps.fieldNameOptions});
    }
    if (this.state.recordFlagOptions.length == 0 && nextProps.recordFlagOptions.length > 0) {
      this.setState({ recordFlagOptions: nextProps.recordFlagOptions});
    }
    if (this.state.fieldFlagOptions.length == 0 && nextProps.fieldFlagOptions.length > 0) {
      this.setState({ fieldFlagOptions: nextProps.fieldFlagOptions});
    }
    if (this.state.lastDataReceived < nextProps.lastDataReceived) {
      if (nextProps.summaryTable.responseMap == undefined || Object.keys(nextProps.summaryTable.responseMap).length === 0) {
        console.log("No Table Data");
        this.setState({showSpinner: false, showTable: false, lastDataReceived: nextProps.lastDataReceived})
      } else {
        let tableData = nextProps.summaryTable;
        let tableHeaders = tableData.headerSet;
        let summaryTableData = [];
        let rMap = tableData.responseMap;
        for (let key in rMap) {
          let row = {
            flag: key
          };
          let rowData = rMap[key];
          for (let i in rowData) {
            row[i] = rowData[i];
          }
          summaryTableData.push(row);
        }
        console.log(summaryTableData);
        this.setState({
          showSpinner: false,
          showTable: true,
          lastDataReceived: nextProps.lastDataReceived
        }, () => {
          this.setState({tableHeaders, summaryTableData})
        })
      }
    }
  }
  componentDidMount() {
    console.log("componentDidMount()");
    if (initialState === undefined) {
      initialState = {
        covYear: JSON.parse(JSON.stringify(this.state.covYear)),
        tradSelected: JSON.parse(JSON.stringify(this.state.tradSelected)),
        fieldFlagSelected: JSON.parse(JSON.stringify(this.state.fieldFlagSelected)),
        recordFlagSelected: JSON.parse(JSON.stringify(this.state.recordFlagSelected)),
        fieldNameSelected: JSON.parse(JSON.stringify(this.state.fieldNameSelected))
      };
      console.log(initialState);
    }
  }
}




FieldSummaryDetailPageData.propTypes = {};
export default FieldSummaryDetailPageData;


