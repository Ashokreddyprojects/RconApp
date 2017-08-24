
const INITIAL_STATE = {};

export function fetchEventDataFailure(state = false, action) {
    switch (action.type) {
        case 'FETCH_EVENT_DATA_FAILURE':
            return action.hasEventErrored;
        default:           
            return state;
    }
}
export function fetchEventDataLoading(state = false, action) {
    switch (action.type) {
        case 'FETCH_EVENT_IS_LOADING':
            return action.isEventLoading;
        default:
            return state;
    }
}
export function fetchEventViewData(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'FETCH_EVENT_DATA_SUCCESS':
            {
                //console.log('state',state);
                return action.eventData;
            }
        default:           
            return state;
    }
}



