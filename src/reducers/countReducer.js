
const INITIAL_STATE = { source:[],error:[],recon:[],success:[]}

export function fetchFailed(state = false, action) {
    switch (action.type) {
        case 'LOAD_TXN_DATA_FAILURE':
            return action.hasErrored;
        default:
            return state;
    }
}
export function fetchDataLoading(state = false, action) {
    switch (action.type) {
        case 'IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function fetchTransactionData(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOAD_TXN_DATA_SUCCESS':
            {
                
                return action.items;}
        default:
            return state;
    }
}



