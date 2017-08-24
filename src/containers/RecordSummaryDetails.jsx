import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RcnoRcniSideBar from './RcnoRcniSideBar';
import App from '../components/App';
import RecordSummaryDetailsData from '../components/RecordSummaryDetailsData';
import moment from 'moment';
import {Row, Column} from 'react-foundation'
import {NavLink} from 'react-router-dom';
import * as rcnorcni from '../utils/RcnoRcni';
import * as dashboardConstValues from '../utils/DashboardConstants';

const test = {
    "rcnoSearchRecords": [
        {
            "flagDescription": "Non-Match with Issuer Action, No FFM Action Due to Uneven Record Match",
            "flag": "E",
            "count": "91",
            "percentage": "8.86%"
        }, {
            "flagDescription": "Non-Match with Issuer Action Required",
            "flag": "N",
            "count": "333",
            "percentage": "32.42%"
        }, {
            "flagDescription": "Non-Match with No Issuer Action, No FFM Action Due to Uneven Record Match",
            "flag": "P",
            "count": "603",
            "percentage": "58.71%"
        }
    ],
    "flagTotalDesc": "Grand Total(Selected Records/Total Records in Files)",
    "totalCount": "1025",
    "totalPercentage": "100.00%"
};
const covYearOptions = [...Array(36).keys()].map(value => {
    return {
        value: value + 1990,
        label: value + 1990
    }
});;
const summaryTableData = [
    {
        "flagDistribution": "Non-Match with Issuer Action",
        "flag": "A",
        "count": "10007",
        "percentage": "0.67"
    }, {
        "flagDistribution": "Non-Match with Issuer Action Required",
        "flag": "B",
        "count": "62020",
        "percentage": "0.418"
    }, {
        "flagDistribution": "Non-Match with Issuer Action Required | No FFM",
        "flag": "D",
        "count": "47778",
        "percentage": "0.317"
    }, {
        "flagDistribution": "Grand Total",
        "flag": "E",
        "count": "29112",
        "percentage": "0.195"
    }
];
const noTableData = [
    {
        "flagDistribution": "Loading data",
        "flag": "",
        "count": "loading",
        "percentage": ""
    }
];
const recordFlags = [
    {
        value: 'B',
        selected: false
    }, {
        value: 'E',
        selected: true
    }, {
        value: 'G',
        selected: false
    }, {
        value: 'R',
        selected: false
    }, {
        value: 'D',
        selected: false
    }, {
        value: 'N',
        selected: true
    }, {
        value: 'L',
        selected: false
    }, {
        value: 'W',
        selected: false
    }, {
        value: 'C',
        selected: false
    }, {
        value: 'M',
        selected: false
    }, {
        value: 'I',
        selected: false
    }, {
        value: 'U',
        selected: false
    }, {
        value: 'F',
        selected: false
    }, {
        value: 'P',
        selected: true
    }, {
        value: 'Z',
        selected: false
    }
]
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

class RecordSummaryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        ['handleSubmit', 'getSummaryResult', 'buildUrl'].map(fn => this[fn] = this[fn].bind(this));
        console.log(this.state);
    }
    getInitialState() {
        return {
            recordFlags,
            summaryTableData: [],
            lastDataReceived: Date.now()
        };
    }
    handleSubmit(item) {
        item
            .state
            .checkBoxFlags
            .forEach((f, index) => {
                recordFlags[index].selected = f;
            });

        this.setState({
            recordFlags
        }, () => {
            this.getSummaryResult({
                fromDate: moment(item.state.startDate).format('MM/YYYY'),
                covYear: item.state.covYear,
                tradSelected: item.state.tradSelected
            });
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
                                        <NavLink to={rcnorcni.RCNO_RCNI_RECORD_SUMMARY_DETAILS_URL}>
                                            <span property="name">Record Search</span>
                                        </NavLink>
                                        <meta property="position" content="3"/>
                                    </li>
                                </ol>
                            </div>
                        </Column>
                        <Column medium={3}>
                            <RcnoRcniSideBar activeKey={'1'}/>
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
                                    <p className="modal-title-header">Record Summary Detail</p>
                                </h4>
                            </div>
                            <br/>
                            <RecordSummaryDetailsData
                                lastDataReceived={this.state.lastDataReceived}
                                covYearOptions={covYearOptions}
                                tradingPartnerOptions={tradingPartnerOptions}
                                summaryTableData={this.state.summaryTableData}
                                recordFlags={this.state.recordFlags}
                                handleSubmit={this.handleSubmit}/>
                        </Column>
                    </Row>
                </Row>
            </App>
        );
    }
    componentDidMount() {
        this.getSummaryResult({
            tradSelected: [
                0, 1, 2
            ],
            covYear: parseInt(moment().format('YYYY')),
            fromDate: moment().format('MM/YYYY')
        });
    }

    getSummaryResult(data) {
        let reconFlag = '';
        this
            .state
            .recordFlags
            .forEach((r) => {
                if (r.selected === true) {
                    reconFlag += r.value + ',';
                }
            })
        reconFlag = reconFlag.slice(0, -1);
        let tradingPartnerId = 'All';
        if (data && data.tradSelected && data.tradSelected.length != tradingPartnerOptions.length) {
            let local = '';
            data
                .tradSelected
                .forEach((a) => {
                    tradingPartnerOptions[a];
                    local += tradingPartnerOptions[a].id + ',';
                });
            tradingPartnerId = local.slice(0, -1);
        }
        let input = {
            fromDate: data.fromDate,
            tradingPartnerId,
            coverageYear: data.covYear,
            reconFlag
        }

        let url = this.buildUrl(input);
        fetch(url, {
            method: 'GET',
            credentials: "same-origin"
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((response) => {
            console.log(response);
            let data = JSON.parse(JSON.stringify(response.rcnoSearchRecords));
            data.push({"flagDescription": response.flagTotalDesc, "flag": "-", "count": response.totalCount, "percentage": response.totalPercentage});
            console.log("Table Final Data");
            console.log(data);
            this.setState({
                lastDataReceived: Date.now(),
                summaryTableData: data
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                lastDataReceived: Date.now(),
                summaryTableData: []
            });
        })
    }
    buildUrl(parameters) {
        let url = rcnorcni.GET_RECORD_SUMMARY_DETAILS_URL;
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
RecordSummaryDetails.propTypes = {};
export default RecordSummaryDetails;
