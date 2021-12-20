import {
    GRAD_LIST_REQUEST,
    GRAD_LIST_SUCCESS,
    GRAD_LIST_FAIL,
} from '../constants/gradConstants'

export const gradListReducer = (state = {gradovi: [] }, action) => {
    switch(action.type){

        case GRAD_LIST_REQUEST:
            return {loading:true, gradovi: []}

        case GRAD_LIST_SUCCESS:
            return {loading:false, gradovi: action.payload}

        case GRAD_LIST_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }


}