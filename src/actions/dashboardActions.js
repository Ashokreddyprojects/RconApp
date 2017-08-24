import * as types from './actionTypes';
import * as constValues from '../utils/DashboardConstants';
import moment from 'moment';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export function fetchFailed(bool) {
  return {type: 'LOAD_TXN_DATA_FAILURE', hasErrored: bool};
}
export function fetchDataLoading(bool) {
  return {type: 'IS_LOADING', isLoading: bool};
}
export function fetchDataSuccess(items) {
  return {type: 'LOAD_TXN_DATA_SUCCESS', items};
}

export function countsFetchData(url, payload) {
  return (dispatch) => {
    if (payload == null) {
      payload = JSON.stringify({
        "enrollmentFromDate": moment()
          .subtract(1, 'days')
          .format('MM/DD/YYYY'),
        "enrollmentthroughDate": moment().format('MM/DD/YYYY')
      });
    }
    dispatch(fetchDataLoading(true));
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      body: payload,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(fetchDataLoading(false));
      return response;
    }).then((response) => response.json()).then((items) => dispatch(fetchDataSuccess(items))).catch(() => {
      dispatch(fetchFailed(true))
    });
  };
}
export function fetchListDataFailed(bool) {
  return {type: 'FETCH_LIST_DATA_FAILURE', hasListErrored: bool};
}
export function fetchListDataLoading(bool) {
  return {type: 'FETCH_LIST_IS_LOADING', isListLoading: bool};
}
export function fetchListDataSuccess(listData) {
  return {type: 'FETCH_LIST_DATA_SUCCESS', listData};
}

export function fetchListViewData(url, payload) {
  return (dispatch) => {

    if (payload == null) {
      payload = JSON.stringify({
        "enrollmentFromDate": moment()
          .subtract(1, 'days')
          .format('MM/DD/YYYY'),
        "enrollmentthroughDate": moment().format('MM/DD/YYYY'),
        'pageNo': '1',
        'sourceSystem': 'NASCO',
        'originSourceSystem': 'Edifecs'
      });
    }
    if (payload instanceof Object) {
      payload = JSON.stringify(payload);
    }
    dispatch(fetchListDataLoading(true));
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      body: payload,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(fetchListDataLoading(false));
      return response;
    }).then(response => {
      return response.json();
    }).then((response) => {
      dispatch(fetchListDataSuccess(response));
    }).catch(() => {
      dispatch(fetchListDataFailed(true))
    });
  };
}

export function fetchEventDataFailed(bool) {
  return {type: 'FETCH_EVENT_DATA_FAILURE', hasEventErrored: bool};
}
export function fetchEventDataLoading(bool) {
  return {type: 'FETCH_EVENT_IS_LOADING', isEventLoading: bool};
}
export function fetchEventDataSuccess(eventData) {
  return {type: 'FETCH_EVENT_DATA_SUCCESS', eventData};
}

export function fetchEventViewData(url, payload) {
  return (dispatch) => {
    console.log('payload', payload);
    dispatch(fetchEventDataLoading(true));
    fetch(url, {
      method: "POST",
      body: payload,
      credentials: "same-origin",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        console.log(response.statusText);
        throw Error(response.statusText);
      }
      dispatch(fetchEventDataLoading(false));
      return response;
    }).then(response => {
      return response.json();
    }).then((eventData) => {
      dispatch(fetchEventDataSuccess(eventData));
    }).catch(() => {
      dispatch(fetchEventDataFailed(true))
    });
  };
}
export function changeSelectedTab(selectedTab, tabNamespace) {
  return {type: types.CHANGE_SELECTED_TAB, tab: selectedTab, namespace: tabNamespace};
}
//  *****ReconViewActions*****
export function fetchReconDataLoading(bool) {
  return {type: 'FETCH_RECON_IS_LOADING', isReconLoading: bool};
}
export function fetchReconDataSuccess(listData) {
  return {type: 'FETCH_RECON_DATA_SUCCESS', listData};
}
export function fetchReconDataFailed(bool) {
  return {type: 'FETCH_LIST_DATA_FAILURE', hasListErrored: bool};
}

export function fetchReconData(url, payload) {
  // console.log("fetch recon action called");
  return (dispatch) => {
    //    console.log('Ready to load', payload);
    dispatch(fetchReconDataLoading(true));
    fetch(constValues.GET_RECON_VIEW_URL, {
      method: "GET",
      credentials: "same-origin"
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(fetchReconDataLoading(false));
      return response;
    }).then(response => {
      return response.json();
    }).then((response) => {
      dispatch(fetchReconDataSuccess(response));
    }).catch(() => {
      dispatch(fetchReconDataFailed(true))
    });
  };
}
