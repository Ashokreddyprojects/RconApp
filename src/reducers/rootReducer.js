import {combineReducers} from 'redux';
import {fetchDataLoading, fetchFailed, fetchTransactionData} from './countReducer';
import {fetchListDataLoading, fetchListDataFailure, fetchListViewData} from './listDataReducer';
import {fetchEventDataLoading, fetchEventDataFailure, fetchEventViewData} from './eventDataReducer';
import {tabsReducer} from './tabReducer';
import {reducer as formReducer} from 'redux-form';
import {fetchReconDataLoading, fetchReconDataFailure, fetchReconData} from './reconDataReducer';

import {rsdStartDate, rsdCovYear, rsdTradSelected, rsdSelectAllCheckBox, rsdCheckBoxFlags} from './recordSummaryDetailsReducer';

const rootReducer = combineReducers({
  rsdStartDate,
  rsdCovYear,
  rsdTradSelected,
  rsdCheckBoxFlags,
  rsdSelectAllCheckBox,
  fetchDataLoading,
  fetchFailed,
  fetchTransactionData,
  fetchListDataLoading,
  fetchListDataFailure,
  fetchListViewData,
  fetchEventDataLoading,
  fetchEventDataFailure,
  fetchEventViewData,
  fetchReconDataLoading,
  fetchReconDataFailure,
  fetchReconData,
  form: formReducer
})
export default rootReducer;
