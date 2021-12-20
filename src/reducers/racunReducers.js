import {
  RACUN_LIST_REQUEST,
  RACUN_LIST_SUCCESS,
  RACUN_LIST_FAIL,
  RACUN_GET_REQUEST,
  RACUN_GET_SUCCESS,
  RACUN_GET_FAIL,
  RACUN_ADD_REQUEST,
  RACUN_ADD_SUCCESS,
  RACUN_ADD_FAIL,
  RACUN_DELETE_REQUEST,
  RACUN_DELETE_SUCCESS,
  RACUN_DELETE_FAIL,
  RACUN_UPDATE_REQUEST,
  RACUN_UPDATE_SUCCESS,
  RACUN_UPDATE_FAIL
} from "../constants/racunConstants";

export const racunGetAllReducer = (state = {}, action) => {
  switch (action.type) {
    case RACUN_LIST_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case RACUN_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        racuni: action.payload
      };
    }

    case RACUN_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    case RACUN_GET_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case RACUN_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        racuni: action.payload ? new Array(action.payload) : []
      };
    }

    case RACUN_GET_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export const racunAddReducer = (state = {}, action) => {
  switch (action.type) {
    case RACUN_ADD_REQUEST:
      return {
        loading: true
      };

    case RACUN_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        racun: action.payload
      };

    case RACUN_ADD_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export const racunDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RACUN_DELETE_REQUEST:
      return {
        loading: true
      };

    case RACUN_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      };

    case RACUN_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export const racunUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case RACUN_UPDATE_REQUEST:
      return {
        loading: true
      };

    case RACUN_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true
      };

    case RACUN_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
