
const INITIAL_STATE = { searchTransactionRecords: [] };

export function fetchListDataFailure(state = false, action) {
    switch (action.type) {
        case 'FETCH_LIST_DATA_FAILURE':
            return action.hasListErrored;
        default:
            return state;
    }
}
export function fetchListDataLoading(state = false, action) {
    switch (action.type) {
        case 'FETCH_LIST_IS_LOADING':
            return action.isListLoading;
        default:
            return state;
    }
}
export function fetchListViewData(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'FETCH_LIST_DATA_SUCCESS':
            {
                return action.listData;
            }
        default:
            return state;
    }
}



