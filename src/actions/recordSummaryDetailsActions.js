import moment from 'moment';

let initialCheckBoxFlags = [false, true, false, false, false, true, false, false, false, false, false, false, false, true, false];

export function rsdStartDate(startDate) {
  console.log("RSD_START_DATE - " + startDate);
  return {type: 'RSD_START_DATE', startDate};
}

export function updateRSDStartDate(startDate) {
  console.log("updateRSDStartDate");
  return (dispatch) => {
    dispatch(rsdStartDate(startDate));
  }
}

export function rsdCovYear(covYear) {
  console.log("RSD_COV_YEAR");
  return {type: 'RSD_COV_YEAR', covYear};
}

export function updateRSDCovYear(covYear) {
  return (dispatch) => {
    dispatch(rsdCovYear(covYear));
  }
}
export function rsdTradSelected(tradSelected) {
  return {type: 'RSD_TRAD_SELECTED', tradSelected};
}

export function updateRSDTradSelected(tradSelected) {
  return (dispatch) => {
    dispatch(rsdTradSelected(tradSelected));
  }
}

export function rsdCheckBoxFlags(checkBoxFlags) {
  return {type: 'RSD_CHECKBOX_FLAGS', checkBoxFlags};
}

export function updateRSDCheckBoxFlags(checkBoxFlags) {
  return (dispatch) => {
    dispatch(rsdCheckBoxFlags(checkBoxFlags));
  }
}

export function rsdSelectAllCheckBox(selectAllCheckBox) {
  return {type: 'RSD_SELECT_ALL_CHECKBOX', selectAllCheckBox};
}

export function updateRSDSelectAllCheckBox(selectAllCheckBox) {
  return (dispatch) => {
    dispatch(rsdSelectAllCheckBox(selectAllCheckBox));
  }
}

export function resetRSDState(covYear) {
  return (dispatch) => {
    dispatch(rsdCovYear(parseInt(moment().format('YYYY'))));
    dispatch(rsdStartDate(moment().subtract(1, 'month')));
    dispatch(rsdTradSelected([0,1,2]));
    dispatch(rsdSelectAllCheckBox(false));
    dispatch(rsdCheckBoxFlags(initialCheckBoxFlags));
  }
}
