import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RcnoandRcniSideBar from './RcnoandRcniSideBar';
import App from '../components/App';
import FieldSummaryDetailsData from '../components/FieldSummaryDetailsData';
import Spinner from 'react-spinner-material';
import moment from 'moment';
import {Row, Column} from 'react-foundation'

const covYearOptions = [...Array(36).keys()].map(value => {
    return {
        value: value + 1990,
        label: value + 1990
    }
});;

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

class FieldSummaryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        ['handleSubmit', 'getInputFields', 'getResultSummary', 'buildUrl'].map(fn => this[fn] = this[fn].bind(this));
    }

    getInitialState() {
        const defaultTradingPartners = [0, 1, 2];
        const defaultRecordFlag = [0, 1, 2];
        const defaultFieldFlag = [0, 1, 2];

        return {
            fromDate: moment().format('MM/YYYY'),
            covYear: parseInt(moment().format('YYYY')),
            defaultTradingPartners,
            summaryTableData: [],
            summaryTable: undefined,
            fieldNameOptions: [],
            recordFlagOptions: [],
            fieldFlagOptions: [],
            lastDataReceived: Date.now()
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
                <Row className='record-summary-details'>
                    <Column medium={12}>
                        <div className="record-summary-breadcrumb">
                            <ol
                                className="gwos-breadcrumbs"
                                vocab="http://schema.org/"
                                typeof="BreadcrumbList">
                                <li property="itemListElement" typeof="ListItem">
                                    <a property="item" typeof="WebPage" href="#">
                                        <span property="name">Dashboard</span>
                                    </a>
                                    <meta property="position" content="1"/>
                                </li>
                                <li property="itemListElement" typeof="ListItem">
                                    <a property="item" typeof="WebPage" href="#">
                                        <span property="name">Contacts</span>
                                    </a>
                                    <meta property="position" content="2"/>
                                </li>
                                <li property="itemListElement" typeof="ListItem">
                                    <a property="item" typeof="WebPage" href="#">
                                        <span property="name">David Lugo</span>
                                    </a>
                                    <meta property="position" content="3"/>
                                </li>
                            </ol>
                        </div>
                    </Column>
                    <Column medium={3}>
                        <RcnoandRcniSideBar activeKey={'2'}/>

                    </Column>
                    <Column medium={9} className="record-summary-container">
                        <FieldSummaryDetailsData
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
            </App>
        );
    }

    componentDidMount() {
        this.getResultSummary({
            fromDate: this.state.fromDate,
            coverageYear: this.state.covYear,
            tradingPartnerId: 'all',
            recordFlag: 'all',
            fieldFlag: 'all',
            fieldName: 'all'
        })
        this.getInputFields();
    }

    getInputFields() {
        // Get Field Name
        fetch("http://wks51b2228:9080/nebert/ui/rcnofieldnamesmryview/getrcnofldlvlnamedtls", {method: 'GET'}).then((response) => {
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
            this.setState({fieldNameOptions: data});

        }).catch((error) => {
            console.log(error);
            // Dummy Code for Testing;
            let response = fieldNameOptions;
            let data = response.rcnoFieldNameList;
            data = data.map((d, index) => {
                return {value: index, label: d}

            });
            this.setState({fieldNameOptions: data});
        })
        // Get Record Flags
        fetch("http://wks51b2228:9080/nebert/ui/rcnofldsmryview/getrcnorcdlvlinddtls", {method: 'GET'}).then((response) => {
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
            // Dummy Code for Testing;
            let response = recordFlagOptions;
            let data = response.recordLvlList;
            data = data.map((d, index) => {
                return {value: index, label: d}

            });
            this.setState({recordFlagOptions: data});
        })
        // Get Field Flags
        fetch("http://wks51b2228:9080/nebert/ui/rcnofieldsmryview/getrcnofldlvlinddtls", {method: 'GET'}).then((response) => {
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
            // Dummy Code for Testing;
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
        let url = "http://wks51b2228:9080/nebert/ui/recordfieldsumrysearchview/getrecordsfieldsumry";
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

FieldSummaryDetails.propTypes = {};

export default FieldSummaryDetails;