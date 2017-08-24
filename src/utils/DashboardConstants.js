export const HOME_PAGE_URL = '/';
//export const GET_TXN_COUNTS_URL = '/nebert/ui/endtoendview/gettransactioncounts';
export const GET_TXN_COUNTS_URL = 'http://localhost:9080/nebert/ui/endtoendview/gettransactioncounts';
export const DUMMY_USER_NAME = 'Anandhan,Arunagiri';
export const SUBMENU_DASHBOARD_VIEW = ['Dashboard View', 'End To End View', 'List View','EVENT'];
export const DASHBOARD_VIEW_LABEL_TEXT = 'Track enrollment received from all applicable source systems';
export const SYS_TO_SYS_RECON_LABEL_TEXT = 'View reconciliation reports for discrepancies between source systems';
export const EXTERNAL_LINKS_LABEL_TEXT = 'Access portals and reports external to the EM&B Dashboard';
export const ERROR_EXCEPTIONS_LABEL_TEXT = 'View errors from applicable source systems and Siebel Work Queue Excptions';
export const USER_ADMIN_LABEL_TEXT = 'Perform Admin User actions';
export const DASHBOARD_VIEW_BUTTON_NAME = 'Dashboard View';
export const SYS_TO_SYS_RECON_BUTTON_NAME = 'System Reconciliation';
export const EXTERNAL_LINKS_BUTTON_NAME = 'External Links';
export const ERROR_EXCEPTIONS_BUTTON_NAME = 'Error & Exceptions';
export const USER_ADMIN_BUTTON_NAME = 'User Administration';
export const END_TO_END_PAGE_URL = '/nebert/dashboard';
export const SYSTEM_TO_SYSTEM_RECON_PAGE_URL = '/nebert/systemReconciliation';
export const EXTERNAL_LINKS_PAGE_URL = '/nebert/externalLinks';
export const ERROR_EXCEPTIONS_PAGE_URL = '/nebert/exceptions';
export const USER_ADMIN_PAGE_URL = '/nebert/userAdministration';
export const EVENT_DETAIL_VIEW_URL = '/nebert/eventView/:transactionId';

export const TRANSACTION_STATUS_OPTIONS = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Error', value: 'Error' },
    { label: 'Reconciled', value: 'Reconciled' },
    { label: 'Successful', value: 'Successful' }];

export const TRANSACTION_TYPE_OPTIONS = [
    { label: 'ALL', value: 'ALL' },
    { label: 'New Enrollment', value: 'NewEnrollment' }
];
export const MARKET_SEGMENT_OPTIONS = [
    { label: 'ALL', value: 'ALL' },
    { label: 'On Exchange', value: 'OnExchange' },
    { label: 'Off Exchange', value: 'OffExchange' },
    { label: 'Pre-ACA', value: 'PreACA' }
];
export const PRODUCT_TYPE_OPTIONS = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Health', value: 'Health' },
    { label: 'Dental', value: 'Dental' }
];
export const SOURCE_SYSTEM_OPTIONS = [{ label: 'ALL', value: 'ALL' },
{ label: 'Edifecs', value: 'Edifecs' },
{ label: 'PSP-Paper', value: 'PSP-Paper' }, { label: 'Sales Connect', value: 'SalesConnect' }];
export const TARGET_SOURCE_SYSTEM_OPTIONS = [
    { label: 'Edifecs', value: 'Edifecs' },
    { label: 'PSP-Paper', value: 'PSP-Paper' },
    { label: 'PSP', value: 'PSP' },
    { label: 'Sales Connect', value: 'SalesConnect' },
    { label: 'NASCO', value: 'NASCO' },
    { label: 'CIP', value: 'CIP' },
    { label: 'Diamond', value: 'DMD' },
    { label: 'DIS UCD', value: 'DIS UCD' },
    { label: 'DIS Davis', value: 'DIS Davis' },
    { label: 'DIS Prime', value: 'DIS Prime' },
    { label: 'UCD', value: 'UCD' }
];


//export const GET_LIST_VIEW_URL = '/nebert/ui/ListViewTest/getsearchtransactions';
//export const GET_EVENT_VIEW_URL = '/nebert/ui/DetailView/gettransactions';
export const GET_LIST_VIEW_URL = 'http://localhost:9080/nebert/ui/ListViewTest/getsearchtransactions';
export const GET_EVENT_VIEW_URL = 'http://localhost:9080/nebert/ui/DetailView/gettransactions';
export const LIST_VIEW_URL = '/nebert/listView';

