
const initialState = {
    tabs1: null,
    tabs2: null
};
function tabsReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_SELECTED_TAB:
            return {
                state,
                [action.namespace]: action.tab
            };
        default:
            return state;
    }
}

