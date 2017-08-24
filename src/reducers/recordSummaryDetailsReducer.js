import moment from 'moment';
let initialCheckBoxFlags = [false, true, false, false, false, true, false, false, false, false, false, false, false, true, false];

export function rsdStartDate(state = moment().subtract(1, 'month'), action) {
  console.log('rsdStartDate - ' + action.type);
  switch (action.type) {
    case 'RSD_START_DATE':
      {
        return action.startDate;
      }
    default:
      return state;
  }
}

export function rsdCovYear(state = parseInt(moment().format('YYYY')), action) {
  console.log('rsdCovYear - ' + action.type);
  switch (action.type) {
    case 'RSD_COV_YEAR':
      {
        if (action.covYear == undefined)
        {
          return null;
        }
        return action.covYear;
      }
    default:
      return state;
  }
}

export function rsdTradSelected(state = [0,1,2], action) {
  switch (action.type) {
    case 'RSD_TRAD_SELECTED':
      {
        return action.tradSelected;
      }
    default:
      return state;
  }
}

export function rsdSelectAllCheckBox(state = false, action) {
  switch (action.type) {
    case 'RSD_SELECT_ALL_CHECKBOX':
      {
        return action.selectAllCheckBox;
      }
    default:
      return state;
  }
}

export function rsdCheckBoxFlags(state = initialCheckBoxFlags, action) {
  switch (action.type) {
    case 'RSD_CHECKBOX_FLAGS':
      {
        return action.checkBoxFlags;
      }
    default:
      return state;
  }
}
