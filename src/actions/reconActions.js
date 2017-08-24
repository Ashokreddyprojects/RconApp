import * as types from './actionTypes';
import * as constValues from '../utils/DashboardConstants';
import * as reconConstValues from '../utils/ReconConstants';
import moment from 'moment';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export function fetchFailed(bool) {
    return {
        type: 'LOAD_TXN_DATA_FAILURE',
        hasErrored: bool
    };
}
export function fetchDataLoading(bool) {
    return {
        type: 'IS_LOADING',
        isLoading: bool
    };
}
export function fetchDataSuccess(items) {
    return {
        type: 'LOAD_TXN_DATA_SUCCESS',
        items
    };
}

export function countsFetchData(url, payload) {
    return (dispatch) => {
        if (payload == null) {
            payload = JSON.stringify(
                {
                    "enrollmentFromDate": moment().subtract(1, 'days').format('MM/DD/YYYY'),
                    "enrollmentthroughDate": moment().format('MM/DD/YYYY')
                });
        }
        dispatch(fetchDataLoading(true));
        fetch(url, {
            method: "POST", credentials: "same-origin",
            body: payload,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(fetchDataLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(fetchDataSuccess(items)))
            .catch(() => {
                dispatch(fetchFailed(true))
            }
            );
    };
}

//  *****ReconViewActions*****
export function fetchReconDataLoading(bool){
            return{
                    type:'FETCH_RECON_IS_LOADING',isReconLoading:bool
            };
}
export function fetchReconDataSuccess(reconData){
            return{
                    type:'FETCH_RECON_DATA_SUCCESS',reconData
            };
}
export function fetchReconDataFailed(bool){
            return{
                    type:'FETCH_RECON_DATA_FAILURE',hasReconErrored:bool
            };
}
export function fetchReconData(url, params) 
            {
                // console.log("fetch recon action called");
                  return (dispatch) => { 
                // console.log('Ready to load', payload);
                    dispatch(fetchReconDataLoading(true));
                       //  fetch(url + '?' + params,   ***  
                        fetch(url,
                            {method:"GET",  credentials: "same-origin",
                        })
                        .then((response) => { 
                            if(!response.ok) {
                                 throw Error(response.statusText);
                                } dispatch(fetchReconDataLoading(false));
                                    return response; 
                                        })
                                        .then(response=> { 
                                            return response.json();
                                                        
                                            })
                                            .then((response) => {
                                                console.log("response 123= " ,response);
                                                
                                                dispatch(fetchReconDataSuccess(response));
                                                     }).catch(() => { 
                                                            dispatch(fetchReconDataFailed(true))
                                                                     } 
                                                              );
                                };
             } 






