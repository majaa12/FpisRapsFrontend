import { PORUDZBENICA_LIST_FAIL, PORUDZBENICA_LIST_REQUEST, PORUDZBENICA_LIST_SUCCESS } from '../constants/porudzbenicaConstants'

export const porudzbenicaListReducer = (state = { porudzbenice: [] }, action) => {
    switch (action.type) {

        case PORUDZBENICA_LIST_REQUEST:
            return { loading: true, porudzbenice: [] }

        case PORUDZBENICA_LIST_SUCCESS:
            return { loading: false, porudzbenice: action.payload }

        case PORUDZBENICA_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }


}