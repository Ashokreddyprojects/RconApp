import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RcnoRcniSideBar from './RcnoRcniSideBar';
import App from '../components/App';
import FieldSummaryDetailPageData from '../components/FieldSummaryDetailPageData';
import Spinner from 'react-spinner-material';
import moment from 'moment';
import {Row, Column} from 'react-foundation';
import {NavLink} from 'react-router-dom';
import * as rcnorcni from '../utils/RcnoRcni';
import * as dashboardConstValues from '../utils/DashboardConstants';
const covYearOptions = [...Array(36).keys()].map(value => {
    return {
        value: value + 1990,
        label: value + 1990
    }
});;
const tradingPartnerOptions = [
    {
        label: '592015694B-PPO',
        id: '592015694',
        value: 0
    }, {
        label: '592403696B-HMO',
        id: '592403696',
        value: 1
    }, {
        label: '592876465-Dental',
        id: '592876465',
        value: 2
    }
];

const resultData = {
    "headerSet": [
        "Member-First-Name %",
        "Agent/Broker-NPN Count",
        "Total Count",
        "Mailing-Address-Street %",
        "Member-Middle-Name %",
        "Total Percentage",
        "Agent/Broker-NPN %",
        "Member-First-Name Count",
        "Mailing-Address-Street Count",
        "Field Level Flag",
        "Member-Middle-Name Count"
    ],
    "responseMap": {
        "D": {
            "Member-First-Name %": "35.25%",
            "Agent/Broker-NPN Count": "12635",
            "Mailing-Address-Street %": "95.00%",
            "Member-Middle-Name %": "35.25%",
            "Agent/Broker-NPN %": "92.65%",
            "Member-First-Name Count": "4808",
            "Mailing-Address-Street Count": "12956",
            "Member-Middle-Name Count": "4808"
        },
        "I": {
            "Agent/Broker-NPN Count": "1001",
            "Agent/Broker-NPN %": "7.34%"
        },
        "M": {
            "Member-First-Name %": "64.74%",
            "Agent/Broker-NPN Count": "1",
            "Mailing-Address-Street %": "4.99%",
            "Member-Middle-Name %": "64.74%",
            "Agent/Broker-NPN %": ".00%",
            "Member-First-Name Count": "8829",
            "Mailing-Address-Street Count": "681",
            "Member-Middle-Name Count": "8829"
        }
    },
    "total": {
        "Member-Middle-Name Total Count": "13637",
        "Member-Middle-Name Total %": "100.00%"
    }
};

//---------------------- Options without service
const fieldFlagOptions = {
    "fieldLvlList": [
        "C",
        "D",
        "F",
        "G",
        "I",
        "J",
        "K",
        "L",
        "M",
        "NA",
        "U"
    ]
};
const recordFlagOptions = {
    "recordLvlList": [
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "I",
        "L",
        "M",
        "N",
        "P",
        "R",
        "U",
        "W",
        "Z"
    ]
};

const fieldNameOptions = {
    "rcnoFieldNameList": [
        "Agent/Broker-NPN",
        "Agent/Broker-Name",
        "Applied-APTC-Amount",
        "Applied-APTC-Effective-Date",
        "Applied-APTC-End-Date",
        "Benefit-End-Date",
        "Benefit-Start-Date",
        "CSR-AMT",
        "CSR-Effective-Date",
        "CSR-End-Date",
        "Coverage-Year",
        "DOB",
        "End-of-Year-Termination-Indicator",
        "Enrollment-Group-Member-Count",
        "Exchange-Assigned-Member-ID",
        "Exchange-Assigned-Policy-ID",
        "Exchange-Assigned-Subscriber-ID",
        "Gender",
        "Initial-Premium-Paid-Status",
        "Issuer-Assigned Member-ID",
        "Issuer-Assigned-Policy-ID",
        "Issuer-Assigned-Subscriber-ID",
        "Mailing-Address-City",
        "Mailing-Address-State",
        "Mailing-Address-Street",
        "Mailing-Address-Street-Line-2",
        "Mailing-Address-Zip-Code",
        "Member-First-Name",
        "Member-Last-Name",
        "Member-Middle-Name",
        "Member-Premium-Amount",
        "Member-Premium-Effective-Date",
        "Member-Premium-End-Date",
        "Paid-Through-Date",
        "QHPID-Identifier",
        "Rating-Area",
        "Relationship-to-Subscriber-Indicator",
        "Residential-City",
        "Residential-County-Code",
        "Residential-State",
        "Residential-Street-Address",
        "Residential-Street-Address-Line-2",
        "Residential-Zip-Code",
        "SSN",
        "Subscriber-Indicator",
        "Telephone-Number",
        "Tobacco-Status",
        "Total-Premium-Amount",
        "Total-Premium-Effective-Date",
        "Total-Premium-End-Date"
    ]
};

class FieldSummaryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        ['handleSubmit', 'getInputFields', 'getResultSummary', 'buildUrl'].map(fn => this[fn] = this[fn].bind(this));
    }
    getInitialState() {
        const defaultTradingPartners = [0, 1, 2];
        const defaultRecordFlags = [3, 9, 10];
        const defaultFieldFlags = [4, 5, 6, 7];
        const defaultFieldNames = [0, 1, 2, 3, 4];

        return {
            // fromDate: moment().format('MM/YYYY'),
            fromDate: moment()
                .subtract(1, 'month')
                .format('MM/YYYY'),
            covYear: parseInt(moment().format('YYYY')),
            defaultTradingPartners,
            summaryTableData: [],
            fieldNameOptions: [],
            summaryTable: undefined,
            recordFlagOptions: [],
            fieldFlagOptions: [],
            lastDataReceived: Date.now(),
            defaultFieldNames,
            defaultFieldFlags,
            defaultRecordFlags
        };
    }
    handleSubmit(item) {
        console.dir(item);
        let tradSelected = item.state.tradSelected.length == tradingPartnerOptions.length
            ? 'all'
            : undefined;
        if (tradSelected === undefined) {
            tradSelected = '';
            item
                .state
                .tradSelected
                .forEach((t) => {
                    tradSelected += tradingPartnerOptions[t].id + ',';
                })
            tradSelected = tradSelected.slice(0, -1);
        }
        let fieldFlagSelected = item.state.fieldFlagSelected.length == this.state.fieldFlagOptions.length
            ? 'all'
            : undefined;
        if (fieldFlagSelected === undefined) {
            fieldFlagSelected = '';
            item
                .state
                .fieldFlagSelected
                .forEach((f) => {
                    fieldFlagSelected += this.state.fieldFlagOptions[f].label + ',';
                })
            fieldFlagSelected = fieldFlagSelected.slice(0, -1);
        }
        let recordFlagSelected = item.state.recordFlagSelected.length == this.state.recordFlagOptions.length
            ? 'all'
            : undefined;
        if (recordFlagSelected === undefined) {
            recordFlagSelected = '';
            item
                .state
                .recordFlagSelected
                .forEach((f) => {
                    recordFlagSelected += this.state.recordFlagOptions[f].label + ',';
                })
            recordFlagSelected = recordFlagSelected.slice(0, -1);
        }
        let fieldNameSelected = item.state.fieldNameSelected.length == this.state.fieldNameOptions.length
            ? 'all'
            : undefined;
        if (fieldNameSelected === undefined) {
            fieldNameSelected = '';
            item
                .state
                .fieldNameSelected
                .forEach((f) => {
                    fieldNameSelected += this.state.fieldNameOptions[f].label + ',';
                })
            fieldNameSelected = fieldNameSelected.slice(0, -1);
        }
        this.getResultSummary({
            fromDate: moment(item.state.startDate).format('MM/YYYY'),
            coverageYear: item.state.covYear,
            tradingPartnerId: tradSelected,
            recordFlag: recordFlagSelected,
            fieldFlag: fieldFlagSelected,
            fieldName: fieldNameSelected
        });
    }
    render() {
        return (
            <App>
                <Row style={{
                    "maxWidth": "78rem"
                }}>
                    <Row
                        className='record-summary-details'
                        style={{
                        "maxWidth": "80rem"
                    }}>
                        <Column medium={12}>
                            <div className="record-summary-breadcrumb">
                                <ol
                                    className="gwos-breadcrumbs"
                                    vocab="http://schema.org/"
                                    typeof="BreadcrumbList">
                                    <li property="itemListElement" typeof="ListItem">
                                        <NavLink to={dashboardConstValues.HOME_PAGE_URL}>
                                            <span property="name">Dashboard</span>
                                        </NavLink>
                                        <meta property="position" content="1"/>
                                    </li>
                                    <li property="itemListElement" typeof="ListItem">
                                        <NavLink to={rcnorcni.RCNO_RCNI_RECORD_SUMMARY_DETAILS_URL}>
                                            <span property="name">RCNO/RCNI</span>
                                        </NavLink>
                                        <meta property="position" content="2"/>
                                    </li>
                                    <li property="itemListElement" typeof="ListItem">
                                        <NavLink to={rcnorcni.RCNO_RCNI_FIELD_SUMMARY_DETAILS_URL}>
                                            <span property="name">Field Search</span>
                                        </NavLink>
                                        <meta property="position" content="3"/>
                                    </li>
                                </ol>
                            </div>
                        </Column>
                        <Column medium={3}>
                            <RcnoRcniSideBar activeKey={'2'}/>
                        </Column>
                        <Column medium={9} className="record-summary-container">
                            <div
                                className="modal-header"
                                style={{
                                "backgroundColor": "#3498db",
                                "borderBottom": "1px solid white",
                                "borderRadius": "10px 10px"
                            }}>
                                <h4 className="modal-title">
                                    <p className="modal-title-header">Field Summary Detail</p>
                                </h4>
                            </div>
                            <br/>
                            <FieldSummaryDetailPageData
                                defaultRecordFlags={this.state.defaultRecordFlags}
                                defaultFieldFlags={this.state.defaultFieldFlags}
                                defaultFieldNames={this.state.defaultFieldNames}
                                covYearOptions={covYearOptions}
                                lastDataReceived={this.state.lastDataReceived}
                                defaultCovYear={this.state.covYear}
                                defaultTradingPartners={this.state.defaultTradingPartners}
                                tradingPartnerOptions={tradingPartnerOptions}
                                fieldFlagOptions={this.state.fieldFlagOptions}
                                recordFlagOptions={this.state.recordFlagOptions}
                                fieldNameOptions={this.state.fieldNameOptions}
                                summaryTableData={this.state.summaryTableData}
                                summaryTable={this.state.summaryTable}
                                handleSubmit={this.handleSubmit}/>
                        </Column>
                    </Row>
                </Row>
            </App>
        );
    }
    componentDidMount() {
        this.getInputFields();
    }
    getInputFields() {
        // Get Field Name
        fetch(rcnorcni.GET_FIELD_NAME_INPUT_URL, {method: 'GET'}).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            console.log(response);
            let data = response.rcnoFieldNameList;
            data = data.map((d, index) => {
                return {value: index, label: d}
            });
            this.setState({ fieldNameOptions: data }, () => {
                let fN = response.rcnoFieldNameList;
                this.getResultSummary({
                    fromDate: this.state.fromDate,
                    coverageYear: this.state.covYear,
                    tradingPartnerId: 'all',
                    recordFlag: 'E,P,N',
                    fieldFlag: 'I,L,J,K',
                    fieldName: fN[0]+','+fN[1]+','+fN[2]+','+fN[3]+','+fN[4]
                })
            });
        }).catch((error) => {
            console.log(error);
            // Dummy Code without service;
            let response = fieldNameOptions;
            let data = response.rcnoFieldNameList;
            data = data.map((d, index) => {
                return {value: index, label: d}
            });
            this.setState({ fieldNameOptions: data }, () => {
                let fN = response.rcnoFieldNameList;
                this.getResultSummary({
                    fromDate: this.state.fromDate,
                    coverageYear: this.state.covYear,
                    tradingPartnerId: 'all',
                    recordFlag: 'E,P,N',
                    fieldFlag: 'I,L,J,K',
                    fieldName: fN[0]+','+fN[1]+','+fN[2]+','+fN[3]+','+fN[4]
                })
            });
        })
        // Get Record Flags
        fetch(rcnorcni.GET_RECORD_FLAG_INPUT_URL, {method: 'GET'}).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            console.log(response);
            let data = response.recordLvlList;
            data = data.map((d, index) => {
                return {value: index, label: d}
            });
            this.setState({recordFlagOptions: data});
        }).catch((error) => {
            console.log(error);
            // Dummy Code without service;
            let response = recordFlagOptions;
            let data = response.recordLvlList;
            data = data.map((d, index) => {
                return {value: index, label: d}
            });
            setTimeout(() => {
                this.setState({ recordFlagOptions: data });
            }, 2000);
        })
        // Get Field Flags
        fetch(rcnorcni.GET_FIELD_FLAG_INPUT_URL, {method: 'GET'}).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            console.log(response);
            let data = response.fieldLvlList;
            data = data.map((d, index) => {
                return {value: index, label: d}
            });
            this.setState({fieldFlagOptions: data});
        }).catch((error) => {
            console.log(error);
            // Dummy Code without service;
            let response = fieldFlagOptions;
            let data = response.fieldLvlList;
            data = data.map((d, index) => {
                return {value: index, label: d}
            });
            this.setState({fieldFlagOptions: data});
        })
    }
    getResultSummary(args) {
        let url = this.buildUrl(args);
        console.log(url);
        // Get Field Flags
        fetch(url, {method: 'GET'}).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            console.log(response);
            let data = response;
            this.setState({
                lastDataReceived: Date.now(),
                summaryTable: data
            });
        }).catch((error) => {
            console.log(error);
            // Dummy Code for Testing;
            let response = resultData;
            let data = response;
            setTimeout(() => {
                this.setState({
                    lastDataReceived: Date.now(),
                    summaryTable: data
                });
            }, 2000);
        })
    }
    buildUrl(parameters) {
        let url = rcnorcni.GET_FIELD_SUMMARY_DETAILS_URL;
        let qs = "";
        for (let key in parameters) {
            let value = parameters[key];
            qs += key + "=" + value + "&";
        }
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length - 1); //chop off last "&"
            url = url + "?" + qs;
        }
        return url;
    }
}
FieldSummaryDetail.propTypes = {};
export default FieldSummaryDetail;
