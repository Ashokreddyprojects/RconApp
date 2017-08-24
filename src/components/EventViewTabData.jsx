
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContractDetails from './ContractDetails';
import EdifecsSource from './EdifecsSource';
import SalesConnectSource from './SalesConnectSource';
import PSPPaperSource from './PSPPaperSource';
import PSPSource from './PSPSource';
import NASCOSource from './NASCOSource';
import CIPSource from './CIPSource';
import DMDSource from './DMDSource';
import DISDavisSource from './DISDavisSource';
import DISPrimeSource from './DISPrimeSource';
import UCDSource from './UCDSource';
import ErrorDetails from './ErrorDetails';
class EventViewTabData extends Component {
    constructor(props) {
        super(props);
        this.segregateSourceInfo = this.segregateSourceInfo.bind(this);
    }
    segregateSourceInfo(name, data) {
        if (name == 'Contract Details') {
            return <ContractDetails sourceData={data} />
        } else if (name == 'Edifecs') {
            return <EdifecsSource sourceData={data} />
        } else if (name == 'SalesConnect') {
            return <SalesConnectSource sourceData={data} />
        } else if (name == 'PSP-Paper') {
            return <PSPPaperSource sourceData={data} />
        } else if (name == 'PSP') {
            return <PSPSource sourceData={data} />
        } else if (name == 'NASCO') {
            return <NASCOSource sourceData={data} />
        } else if (name == 'CIP') {
            return <CIPSource sourceData={data} />
        } else if (name == 'DMD') {
            return <DMDSource sourceData={data} />
        } else if (name == 'DIS Davis') {
            return <DISDavisSource sourceData={data} />
        } else if (name == 'DIS Prime') {
            return <DISPrimeSource sourceData={data} />
        } else if (name == 'UCD') {
            return <UCDSource sourceData={data} />
        } else if (name == 'Error Details') {
            return <ErrorDetails sourceData={data} />
        } else {
            return null;
        }

    }
    render() {
        return (<div>{this.segregateSourceInfo(this.props.name, this.props.details)}</div>);
    }
}
EventViewTabData.propTypes = {
    name: PropTypes.string,
    details: PropTypes.object
};
export default EventViewTabData;

