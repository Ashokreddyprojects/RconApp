import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
class ContractDetails extends Component {
    render() {
        if (this.props.sourceData !== undefined) {
            return (
                <div className='tab-border'>
                    <Row style={{"paddingTop":"1em"}}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='contractId' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Contract Id:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.contractId} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='exchangePolicyId' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Exchange Policy ID:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.exchangePolicyId}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='exchangeSubscriberId' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Exchange Subscriber ID:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.exchangeSubId}</label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{"paddingTop":"1em"}}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='contractEffDate' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Contract Effective Date:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.contractEffDate} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='contractExpDt' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Contract Term Date:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.contractExpDt}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='individualConsumerID' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Consumer ID:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.individualConsumerID} </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{"paddingTop":"1em"}}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='vendorConsumerID' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Vendor Surrogate ID:
                                <label className='formLabel'  style={{"display":"inline"}}>{this.props.sourceData.vendorConsumerID}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='relationshipCode' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Relationship code:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.relationshipCode} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='personNb' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Person Number:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.personNb} </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{"paddingTop":"1em"}}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='firstName' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}>First Name:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.firstName}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='lastName' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Last Name:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.lastName} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='birthDate' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> DOB:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.birthDate}  </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{"paddingTop":"1em"}}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='socialSecNum' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}>SSN:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.socialSecNum} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='gender' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Gender:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.gender} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='pmtId' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Product Identifier:
                                <label className='formLabel'  style={{"display":"inline"}}>  {this.props.sourceData.pmtId}</label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{"paddingTop":"1em"}}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='coverageEffDate' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Effective Date:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.coverageEffDate} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='coverageExpDate' className='formLabel'  style={{"display":"inline","fontWeight":"bold"}}> Term Date:
                                <label className='formLabel'  style={{"display":"inline"}}> {this.props.sourceData.coverageExpDate} </label>
                            </label>
                        </Column>
                    </Row>


                </div>
            );
        }
        else {
            return <div className='tab-border'></div>;
        }
    }
}
ContractDetails.propTypes = {
    sourceData: PropTypes.object
};
export default ContractDetails;

