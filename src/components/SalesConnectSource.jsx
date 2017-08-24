
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
class SalesConnectSource extends Component {
    render() {
        if (this.props.sourceData !== undefined) {
            return (
                <div className='tab-border'>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='eventType' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Event Type:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.eventType} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='eventDateTimeStamp' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Event Date Time Stamp:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.eventDateTimeStamp}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='sourceTransactionID' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Tracking ID:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.sourceTransactionID}</label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='sourceSystemCd' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}>Source System:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.sourceSystemCd} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='transactionStatus' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Status:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.transactionStatus}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='reconTransactionId' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Reconciled Transaction ID:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.reconTransactionId} </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='applicationId' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Application ID:
                                <label className='formLabel' style={{ "display": "inline" }}>{this.props.sourceData.applicationId}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='transactionType' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Transaction Type:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.transactionType} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='marketSegment' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Market Segment:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.marketSegment} </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='originalTransactionDt' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}>Original  Receive Date:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.originalTransactionDt}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='productType' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Product Type:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.productType} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='contractId' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Contract ID:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.contractId}  </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='exchangePolicyId' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}>Exchange Policy ID:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.exchangePolicyId} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='contractEffDt' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Contract Effective Date:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.contractEffDt} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='contractExpDt' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Contract Term date:
                                <label className='formLabel' style={{ "display": "inline" }}>  {this.props.sourceData.contractExpDt}</label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='exchangeSubId' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Exchange Subscriber ID:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.exchangeSubId} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='individualConsumerID' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Consumer ID:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.individualConsumerID} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='vendorConsumerID' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Vendor Surrogate ID:
                                <label className='formLabel' style={{ "display": "inline" }}>{this.props.sourceData.vendorConsumerID}</label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='relationshipCode' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Relationship code:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.relationshipCode} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='personNb' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Person Number:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.personNb} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='socialSecNum' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}>SSN:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.socialSecNum} </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='firstName' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}>First Name:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.firstName}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='lastName' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Last Name:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.lastName} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='birthDate' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> DOB:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.birthDate}  </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='gender' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Gender:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.gender} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='pmtId' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Product Identifier:
                                <label className='formLabel' style={{ "display": "inline" }}>  {this.props.sourceData.pmtId}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='coverageEffDate' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Effective Date:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.coverageEffDate} </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='coverageExpDate' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Term Date:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.coverageExpDate} </label>
                            </label>
                        </Column>
                    </Row>
                </div>
            );
        }
        else {
            return null;
        }
    }
}
SalesConnectSource.propTypes = {
    sourceData: PropTypes.object
};
export default SalesConnectSource;

