
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LandingPage from './containers/LandingPage';
import EndToEndView from './containers/EndToEndView';
import ListView from './containers/ListView';
import SysToSysReconView from './containers/SysToSysReconView';
import ErrorExceptionsView from './containers/ErrorExceptionsView';
import ExternalLinksView from './containers/ExternalLinksView';
import UserAdminView from './containers/UserAdminView';
import EventDetailView from './containers/EventDetailView';
import SysToSysReconViewCipDiamond from './containers/SysToSysReconViewCipDiamond';
import SysToSysReconViewMeDiamond from './containers/SysToSysReconViewMeDiamond';
import * as constValues from './utils/DashboardConstants';
import * as ReconConstants from './utils/ReconConstants';
import * as rcnorcni from './utils/RcnoRcni'
import RecordSummaryDetails from './containers/RecordSummaryDetails';
import RecordSummaryCompare from './containers/RecordSummaryCompare';
import FieldSummaryDetail from './containers/FieldSummaryDetail';
import ListViewSummaryPage from './containers/ListViewSummaryPage';
//import FieldSummaryCompare from './containers/FieldSummaryCompare';
//import RcnoRcniViewPage from './containers/RcnoRcniViewPage';
//import RcnoRcniDetailPage from './containers/RcnoRcniDetailPage';
//import SearchViewErrorPage from './containers/SearchViewErrorPage';
export const history = createHistory();


const Routes = () => (
    <Router history={history}>
        <div>
            <Route exact path={constValues.HOME_PAGE_URL} component={LandingPage} />
            <Route path={constValues.END_TO_END_PAGE_URL} component={EndToEndView} />
            <Route path={constValues.LIST_VIEW_URL} component={ListView} />
            <Route path={constValues.EVENT_DETAIL_VIEW_URL} component={EventDetailView} />
            <Route path={constValues.SYSTEM_TO_SYSTEM_RECON_PAGE_URL} component={SysToSysReconView} />
            <Route path={constValues.EXTERNAL_LINKS_PAGE_URL} component={ExternalLinksView} />
            <Route path={constValues.ERROR_EXCEPTIONS_PAGE_URL} component={ErrorExceptionsView} />
            <Route path={constValues.USER_ADMIN_PAGE_URL} component={UserAdminView} />
            <Route path={ReconConstants.CIP_DIAMOND_RECON_URL} component={SysToSysReconViewCipDiamond} />
            <Route path={ReconConstants.ME_CIP_RECON_URL} component={SysToSysReconViewMeDiamond} />
            <Route path={rcnorcni.RCNO_RCNI_RECORD_SUMMARY_DETAILS_URL} component={RecordSummaryDetails} />
            <Route path={rcnorcni.RCNO_RCNI_RECORD_SUMMARY_COMPARE_URL} component={RecordSummaryCompare} />
            <Route path={rcnorcni.RCNO_RCNI_FIELD_SUMMARY_DETAILS_URL} component={FieldSummaryDetail} />
            <Route path={rcnorcni.RCNO_RCNI_LIST_VIEW_PAGE_URL} component={ListViewSummaryPage} />
            {/*<Route path={rcnorcni.RCNO_RCNI_FIELD_SUMMARY_COMPARE_URL} component={FieldSummaryCompare} />
            <Route path={rcnorcni.RCNO_RCNI_LIST_VIEW_PAGE_URL} component={RcnoRcniViewPage} />
            <Route path={rcnorcni.RCNO_RCNI_DETAILS_PAGE_URL} component={RcnoRcniDetailPage} />
            <Route path={rcnorcni.RCNO_RCNI_SEACRH_AND_VIEW_ERROR_URL} component={SearchViewErrorPage} />*/}
        </div>
    </Router>
);
export default Routes;



