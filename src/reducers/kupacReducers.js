import {
  KUPAC_ADD_REQUEST,
  KUPAC_ADD_SUCCESS,
  KUPAC_ADD_FAIL,
  KUPAC_GET_ALL_REQUEST,
  KUPAC_GET_ALL_SUCCESS,
  KUPAC_GET_ALL_FAIL,
  KUPAC_GET_SEARCH_REQUEST,
  KUPAC_GET_SEARCH_SUCCESS,
  KUPAC_GET_SEARCH_FAIL,
  KUPAC_DELETE_REQUEST,
  KUPAC_DELETE_SUCCESS,
  KUPAC_DELETE_FAIL,
  KUPAC_PUT_REQUEST,
  KUPAC_PUT_SUCCESS,
  KUPAC_PUT_FAIL
} from "../constants/kupacConstants";

export const kupacAddReducer = (state = {}, action) => {
  switch (action.type) {
    case KUPAC_ADD_REQUEST:
      return {
        loading: true
      };

    case KUPAC_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        kupac: action.payload
      };

    case KUPAC_ADD_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export const kupacGetAllReducer = (state = {}, action) => {
  switch (action.type) {
    case KUPAC_GET_ALL_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case KUPAC_GET_ALL_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        kupci: action.payload
      };
    }

    case KUPAC_GET_ALL_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    case KUPAC_GET_SEARCH_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case KUPAC_GET_SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        kupci: action.payload
      };
    }

    case KUPAC_GET_SEARCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export const kupacDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case KUPAC_DELETE_REQUEST:
      return {
        loading: true
      };

    case KUPAC_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      };

    case KUPAC_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export const kupacPutReducer = (state = {}, action) => {
  switch (action.type) {
    case KUPAC_PUT_REQUEST:
      return {
        loading: true
      };

    case KUPAC_PUT_SUCCESS:
      return {
        loading: false,
        success: true
      };

    case KUPAC_PUT_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
