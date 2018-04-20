import {
    HOME_SET_INITIAL_DATA
} from '../actions/home';

const initalState = {
    data: null
};

export default (state = initalState, action) => {
    switch(action.type){
        case HOME_SET_INITIAL_DATA:
            return {
                ...state,
                data: action.payload.results
            }
        default:
            return state;
    }
}