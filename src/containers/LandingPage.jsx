import React, {Component} from 'react';
import PropTypes from 'prop-types';
import App from '../components/App';
import SectionalView from '../components/SectionalView';
import {Grid, Row, Column, Button} from 'react-foundation';
import * as constValues from '../utils/DashboardConstants';
import DashboardLogo from '../Images/dashboard-overview.png'
import SysReconLogo from '../Images/system-reconciliation.png'
import ExternalLinksLogo from '../Images/external-links.png'
import ErrorLogo from '../Images/exceptions-icon.png'
import UserAdminLogo from '../Images/user-administration.png'
import * as rcnorcni from '../utils/RcnoRcni';

const styles = {
    tile1: {
        backgroundColor: '#60AAE5'
    },
    tile2: {
        backgroundColor: '#48B39B'
    },
    tile3: {
        backgroundColor: '#55BC7F'
    },
    tile4: {
        backgroundColor: '#FF6A6B'
    },
    tile5: {
        backgroundColor: '#F8885C'
    },
    tile6: {
        backgroundColor: '#E1BC45'
    }
}
const iconClass = {
    tile1: 'tachometer',
    tile2: 'list-ul',
    tile3: 'sign-out',
    tile4: 'exclamation-triangle',
    tile5: 'id-card-o',
    tile6: 'question-circle'
}

class LandingPage extends Component {

    render() {
        return (
            <div>
                <App>
                    <div className="div-container">
                        <div className="landing-title">
                               { 'SELECT AN EMB&B TOOL' }
                            </div>
                        <h2 className="landing-sub-title">
                             { 'These are your Tools' }
                            </h2>
                        <Row className="row-container">
                            <Column medium={4}>
                                <SectionalView
                                    tileColor={styles.tile1}
                                    iconClass={iconClass.tile1}
                                    labelText={constValues.DASHBOARD_VIEW_LABEL_TEXT}
                                    title={constValues.DASHBOARD_VIEW_BUTTON_NAME}
                                    urlRedirect={constValues.END_TO_END_PAGE_URL}/>
                            </Column>
                            <Column medium={4}>
                                <SectionalView
                                    tileColor={styles.tile2}
                                    iconClass={iconClass.tile2}
                                    labelText={constValues.SYS_TO_SYS_RECON_LABEL_TEXT}
                                    title={constValues.SYS_TO_SYS_RECON_BUTTON_NAME}
                                    urlRedirect={constValues.SYSTEM_TO_SYSTEM_RECON_PAGE_URL}/>
                            </Column>
                            <Column medium={4}>
                                <SectionalView
                                    tileColor={styles.tile3}
                                    iconClass={iconClass.tile3}
                                    labelText={constValues.EXTERNAL_LINKS_LABEL_TEXT}
                                    title={constValues.EXTERNAL_LINKS_BUTTON_NAME}
                                    urlRedirect={constValues.EXTERNAL_LINKS_PAGE_URL}/>
                            </Column>
                        </Row>
                        <Row className="row-container">
                            <Column medium={4}>
                                <SectionalView
                                    tileColor={styles.tile4}
                                    iconClass={iconClass.tile4}
                                    labelText={constValues.ERROR_EXCEPTIONS_LABEL_TEXT}
                                    title={constValues.ERROR_EXCEPTIONS_BUTTON_NAME}
                                    urlRedirect={constValues.ERROR_EXCEPTIONS_PAGE_URL}/>
                            </Column>
                            <Column medium={4}>
                                <SectionalView
                                    tileColor={styles.tile5}
                                    iconClass={iconClass.tile1}
                                    labelText={constValues.USER_ADMIN_LABEL_TEXT}
                                    title={constValues.USER_ADMIN_BUTTON_NAME}
                                    urlRedirect={constValues.USER_ADMIN_PAGE_URL}/>
                            </Column>
                            <Column medium={4} className="landing-rcno-tile">
                                <SectionalView
                                    tileColor={styles.tile6}
                                    iconClass={iconClass.tile6}
                                    labelText={rcnorcni.RCNO_RCNI_LABEL_TEXT}
                                    title={rcnorcni.RCNO_RCNI_USER_ADMIN_BUTTON_NAME}
                                    urlRedirect={rcnorcni.RCNO_RCNI_RECORD_SUMMARY_DETAILS_URL}/>
                            </Column>
                        </Row>
                    </div>
                </App>
            </div>
        );
    }
}
LandingPage.propTypes = {};
export default LandingPage;
