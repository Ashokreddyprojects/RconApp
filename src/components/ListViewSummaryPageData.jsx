import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import ReactDOM from 'react-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Spinner from 'react-spinner-material';
import ReactHover from 'react-hover'
// import FieldFlagsHelp from './FieldFlagsHelp'
// import RecordFlagsFeildSummaryHelp from './RecordFlagsFeildSummaryHelp'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
const styles = {
    tabs: {
        width: '100%',
        display: 'inline-block',
        marginRight: '30px',
        verticalAlign: 'top'
    },
    links: {
        margin: '0 auto',
        padding: '0 10em'
    },
    tabLink: {
        height: '30px',
        lineHeight: '30px',
        padding: '0 15px',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        display: 'inline-block'
    },
    tabContent: {
        width:'100%'
    },
    activeLinkStyle: {
        borderBottom: '2px solid #333'
    },
    visibleTabStyle: {
        display: 'inline-block'
    },
    content: {
        width:'100%',
        padding: '1em'
    }
};


let initialState = undefined;
const recordFlagHelpHoverOptions = {
  followCursor: false
}
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
class ListViewSummaryPageData extends Component {
  constructor(props) {
    super(props);
    cxt = this;
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
      startDate: moment().subtract(1, 'month'),
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
    console.log(cxt.state.summaryTable);
    return cxt
      .state
      .summaryTable
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
      let range = moment(startDate, 'MM/YYYY').add(6, 'month');
      if (!moment(range).isSameOrAfter(moment())) {
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
      fieldNameSelected: JSON.parse(JSON.stringify(initialState.fieldNameSelected))
    }, () => {
      console.log("Resetting State");
      console.log(this.state);
    });
  }
  getItems() {
    const items = [];
    items.push(
        <Panel header={`List View Search`} key={'0'}>
            <Row>
            <div>
            <Tabs activeLinkStyle={styles.activeLinkStyle} visibleTabStyle={styles.visibleTabStyle} style={styles.tabs}>
                <div style={styles.links}>
                    <TabLink to="tab1" default style={styles.tabLink}>RCNO</TabLink>
                    <TabLink to="tab2"  style={styles.tabLink}>RCNI</TabLink>
                </div>

                <div style={styles.content}>
                    <TabContent style={styles.tabContent} for="tab1">
                    <Row className='display'>
                        <div style={{ "marginLeft": "3%" }} >
                            <Column medium={3}>
                                <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                                    File Run Month/Year:*
                                <DatePicker
                                        ref='fileRunDPicker'
                                        selected={this.state.startDate}
                                        onChange={this.handleDateChange}
                                        dateFormat="MM/YYYY"
                                        showMonthDropdown
                                        showYearDropdown
                                        scrollableYearDropdown />
                                    <span className="error date-picker-error">{this.state.errStr[0]}</span>
                                </label>
                            </Column>
                        </div>
                        <Column medium={3} className="multi-select">
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
                        <div style={{ "marginLeft": "2%" }} >
                            <Column medium={1} className="record-summary-help-icon">
                                <ReactHover options={recordFlagHelpHoverOptions}>
                                    <ReactHover.Trigger>
                                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                                    </ReactHover.Trigger>
                                    <ReactHover.Hover>
                                        <h1> hello </h1>
                                    </ReactHover.Hover>
                                </ReactHover>
                            </Column>
                        </div>
                        <Column medium={2} className="multi-select">
                            <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                                Field Flag:*
                             <MultiSelect
                                    options={this.props.fieldFlagOptions}
                                    onSelectedChanged={this.handleFieldFlagChange}
                                    selected={this.state.fieldFlagSelected}
                                    valueRenderer={this.handleMultiSelectRenderer}
                                    selectAllLabel={"All"} />
                                <span className="error">{this.state.errStr[2]}</span>
                            </label>
                        </Column>
                        <div style={{ "marginLeft": "2%" }} >
                            <Column medium={1} className="record-summary-help-icon">
                                <ReactHover options={recordFlagHelpHoverOptions}>
                                    <ReactHover.Trigger>
                                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                                    </ReactHover.Trigger>
                                    <ReactHover.Hover>
                                        <div>hello2</div>
                                    </ReactHover.Hover>
                                </ReactHover>
                            </Column>
                        </div>
                        <Column medium={2} className="multi-select">
                            <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                                Record Flag:*
                             <MultiSelect
                                    options={this.props.recordFlagOptions}
                                    onSelectedChanged={this.handleRecordFlagChange}
                                    selected={this.state.recordFlagSelected}
                                    valueRenderer={this.handleMultiSelectRenderer}
                                    selectAllLabel={"All"} />
                                <span className="error">{this.state.errStr[3]}</span>
                            </label>
                        </Column>
                    </Row>
                    <Row>
                        <div style={{ "marginLeft": "3%" }} >
                            <Column medium={3} className='coverage-year'>
                                <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                                    Coverage Year:*
                           <Select
                                        value={this.state.covYear}
                                        options={this.props.covYearOptions}
                                        onChange={this.handleCovYearChange} />
                                    <span className="error">{this.state.errStr[4]}</span>
                                </label>
                            </Column>
                        </div>
                        <Column medium={4} className="multi-select">
                            <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db" }}>
                                Field Name:*
                          <MultiSelect
                                    options={this.props.fieldNameOptions}
                                    onSelectedChanged={this.handleFieldNameChange}
                                    selected={this.state.fieldNameSelected}
                                    valueRenderer={this.handleMultiSelectRenderer}
                                    selectAllLabel={"All"} />
                                <span className="error">{this.state.errStr[5]}</span>
                            </label>
                        </Column>
                    </Row>
                    <Row>
                        <br />
                        <br />
                        <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db", "fontSize": "1.0rem", "paddingLeft": "20px" }}>
                            Advanced Search
              </label>
                        <br />
                    </Row>
                    <Row>
                        <div style={{ "marginLeft": "3%" }} >
                            <Column medium={4}>
                                <label className="formLabel" style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                                    Issuer First Name:
                  <input type="text" name="issuerFirstName" />
                                </label>
                            </Column>
                        </div>
                        <Column medium={4}>
                            <label className="formLabel" style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                                Issuer Last Name:
                  <input type="text" name="issuerLastName" />
                            </label>
                        </Column>
                        <Column medium={3}>
                            <label className='formLabel' style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                                Issuer DOB:
                         <DatePicker
                                    ref='fileRunDPicker'
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange}
                                    placeholderText="MM/DD/YYYY"
                                    dateFormat="MM/DD/YYYY"
                                    showYearDropdown
                                    showMonthDropdown
                                    scrollableYearDropdown />
                            </label>
                        </Column>
                    </Row>
                    <Row>
                        <div style={{ "marginLeft": "3%" }} >
                            <Column medium={4}>
                                <label className="formLabel"
                                    style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                                    Issuer Ex Sub ID:
                  <input type="text" name="issuerExSubId" />
                                </label>
                            </Column>
                        </div>
                        <Column medium={4}>
                            <label className="formLabel"
                                style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                                Issuer FFM Policy ID:
                  <input type="text" name="issuerFfmPolicyId" />
                            </label>
                        </Column>
                        <Column medium={3}>
                            <label className="formLabel"
                                style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                                Issuer Record Trace Number:
                  <input type="text" name="issuerRecordTraceNumber" />
                            </label>
                        </Column>
                    </Row>
                    <Row>
                        <label className='formLabel' style={{ "display": "inline", "fontWeight": "bold", "color": "#3498db", "fontSize": "1.0rem", "paddingLeft": "20px" }}>
                            Advanced Custom Filter
              </label>
                        <br />
                    </Row>
                    <Row>
                        <div style={{ "marginLeft": "3%" }} >
                            <Column medium={4} className="multi-select">
                               <label className='formLabel' style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                                Field Name:
                          <MultiSelect
                                    options={this.props.fieldNameOptions}
                                    onSelectedChanged={this.handleFieldNameChange}
                                    selected={this.state.fieldNameSelected}
                                    valueRenderer={this.handleMultiSelectRenderer}
                                     selectAllLabel={"All"}
                                     />
                                <span className="error">{this.state.errStr[5]}</span>
                            </label>
                            </Column>
                        </div>
                        <Column medium={3}>
                            <label className="formLabel" style={{ "display": "inline", "fontWeight": "500", "color": "#3498db" }}>
                                Field Value:
                  <input type="text" name="issuerLastName" />
                            </label>
                        </Column>
                    </Row>
                    <Row>
                        <div className="modal-footer">
                            <div style={{ "display": "inline", "float": "right", "paddingRight": "0em", "paddingTop": "2em", "marginRight": "20px" }}>
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
                    </TabContent>
                    <TabContent for="tab2">
                        <h2>Tab2 content</h2>
                        <div>¯\_(ツ)_/¯</div>
                    </TabContent>
                </div>
            </Tabs>
        </div>
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
            height='300'
            scrollTop={'Top'}
            ref='table'
            bordered={true}
            selectRow={this.state.selectRowProp}
            options={this.state.tableOptions}
            headerStyle={{ background: '#d3ded3' }}>
            <TableHeaderColumn
              width={'150'}
              dataField='flag'
              isKey={true}
              sortFunc={flagSortFunc}
              dataSort={true}>Flag  <i className="fa fa-sort" aria-hidden="true"></i></TableHeaderColumn>
            {this
              .state
              .tableHeaders
              .map((h) => {
                return (
                  <TableHeaderColumn
                    dataField={h}
                    dataFormat={emptyDataFormatter}
                    width={'150'}
                    sortFunc={dynamicHeaderSortFunc}
                    dataSort={true}>{h}  <i className="fa fa-sort" aria-hidden="true"></i></TableHeaderColumn>
                )
              })
            }
          </BootstrapTable>
          <br />
          <Row>
            {/* <Column medium={1} offsetOnMedium={10}> */}
            <div className="modal-footer">
              <div
                style={{
                  "display": "inline",
                  'float': 'right',
                  'paddingRight': '0em',
                  "paddingTop": "2em",
                  "paddingLeft": "1em"
                }}>
                <button
                  className="button primary  btn-lg btn-color formButton"
                  style={{
                    "backgroundColor": "green",
                    'paddingTop': '0em',
                    'height': '2.5em',
                    'marginRight': '20px'
                  }}
                  onClick={this.handleExport}>Export To Excel
                </button>
              </div>
              <div
                style={{
                  "display": "inline",
                  "float": "right",
                  "paddingRight": "0em",
                  "paddingTop": "2em"
                }}>
                <button className='button primary  btn-lg btn-color formButton' type="button">
                  Compare
                </button>
              </div>
            </div>
            {/*<Button color={Colors.SUCCESS}>Export</Button>*/}
            {/* </Column> */}
          </Row>
        </div>
      </Panel>
    );
    return items;
  }
  render() {
    return (
      <div className="list-view-summary-page-data">
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
  componentWillReceiveProps(nextProps) {
    if (this.state.fieldNameOptions.length == 0 && nextProps.fieldNameOptions.length > 0) {
      this.setState({ fieldNameOptions: nextProps.fieldNameOptions });
    }
    if (this.state.recordFlagOptions.length == 0 && nextProps.recordFlagOptions.length > 0) {
      this.setState({ recordFlagOptions: nextProps.recordFlagOptions });
    }
    if (this.state.fieldFlagOptions.length == 0 && nextProps.fieldFlagOptions.length > 0) {
      this.setState({ fieldFlagOptions: nextProps.fieldFlagOptions });
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






ListViewSummaryPageData.propTypes = {};
export default ListViewSummaryPageData;



