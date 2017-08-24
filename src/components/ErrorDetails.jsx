
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'react-foundation';
class ErrorDetails extends Component {
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
                            <label id='sourceTransactionId' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Tracking ID:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.sourceTransactionId}</label>
                            </label>
                        </Column>
                    </Row>
                     <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='sourceSystem' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}>Source System:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.sourceSystem} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='exchangeSubscriberId' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Exchange Subscriber ID:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.exchangeSubscriberId} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='consumerId' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Consumer ID:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.consumerId} </label>
                            </label>
                        </Column>
                    </Row>

                     <Row style={{ "paddingTop": "1em" }}>
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
                          <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='coverageExpDate' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Term Date:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.coverageExpDate} </label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='errorCode' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Error Code:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.errorCode} </label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='errorDesc' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Error Description:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.errorDesc}</label>
                            </label>
                        </Column>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='errorSev' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}> Error Severity:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.errorSev}</label>
                            </label>
                        </Column>
                    </Row>
                    <Row style={{ "paddingTop": "1em" }}>
                        <Column medium={4} style={{ "paddingTop": "1em" }}>
                            <label id='errorType' className='formLabel' style={{ "display": "inline", "fontWeight": "bold" }}>Error Type:
                                <label className='formLabel' style={{ "display": "inline" }}> {this.props.sourceData.errorType} </label>
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
ErrorDetails.propTypes = {
    sourceData: PropTypes.object
};
export default ErrorDetails;

