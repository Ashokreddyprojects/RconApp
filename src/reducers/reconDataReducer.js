
const INITIAL_STATE = { searchReconRecords: [] };

export function fetchReconDataLoading(state = false, action) {
    switch (action.type) {
        case 'FETCH_RECON_IS_LOADING':
            return action.isReconLoading;
        default:
            return state;
    }
}
export function fetchReconDataFailure(state = false, action) {
    switch (action.type) {
        case 'FETCH_RECON_DATA_FAILURE':
            return action.hasReconErrored;
        default:
            return state;
    }
}
export function fetchReconData(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'FETCH_RECON_DATA_SUCCESS':
            {
                return action.reconData;
            }
        default:
            return state;
    }
}



