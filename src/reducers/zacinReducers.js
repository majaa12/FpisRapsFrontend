import {
    ZACIN_LIST_REQUEST,
    ZACIN_LIST_SUCCESS,
    ZACIN_LIST_FAIL,
} from '../constants/zacinConstants'

export const zacinListReducer = (state = {zacini: [] }, action) => {
    switch(action.type){

        case ZACIN_LIST_REQUEST:
            return {loading:true, zacini: []}

        case ZACIN_LIST_SUCCESS:
            return {loading:false, zacini: action.payload}

        case ZACIN_LIST_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }


}