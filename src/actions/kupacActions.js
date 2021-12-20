import axios from "axios";
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

const config = {
  headers: {
    "Content-type": "application/json"
  }
};

export const add = (pib, naziv, adresa, grad) => async dispatch => {
  try {
    dispatch({
      type: KUPAC_ADD_REQUEST
    });

    const { data } = await axios.post(
      "http://localhost:9001/kupac/add",
      {
        naziv: naziv,
        grad: {
          sifraGrada: grad.sifraGrada,
          naziv: grad.naziv
        },
        adresa: adresa,
        pibkupca: pib
      },
      config
    );

    dispatch({
      type: KUPAC_ADD_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: KUPAC_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const getAllKupci = () => async dispatch => {
  try {
    dispatch({
      type: KUPAC_GET_ALL_REQUEST
    });
    const { data } = await axios.get("http://localhost:9001/kupac/getAll");

    dispatch({
      type: KUPAC_GET_ALL_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: KUPAC_GET_ALL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const getSearchKupci = naziv => async dispatch => {
  try {
    dispatch({
      type: KUPAC_GET_SEARCH_REQUEST
    });
    const { data } = await axios.get(
      `http://localhost:9001/kupac/getByNaziv?naziv=${naziv}`
    );

    dispatch({
      type: KUPAC_GET_SEARCH_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: KUPAC_GET_SEARCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const deleteKupac = id => async dispatch => {
  try {
    dispatch({
      type: KUPAC_DELETE_REQUEST
    });

    const { data } = await axios.delete(
      `http://localhost:9001/kupac/delete/${id}`,
      config
    );

    dispatch({
      type: KUPAC_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: KUPAC_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const updateKupac = (
  idkupca,
  pibkupca,
  naziv,
  adresa,
  grad
) => async dispatch => {
  try {
    dispatch({
      type: KUPAC_PUT_REQUEST
    });

    const { data } = await axios.put(
      `http://localhost:9001/kupac/update/${idkupca}`,
      {
        idkupca,
        naziv: naziv,
        grad: {
          sifraGrada: grad.sifraGrada,
          naziv: grad.naziv
        },
        adresa: adresa,
        pibkupca
      },
      config
    );

    dispatch({
      type: KUPAC_PUT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: KUPAC_PUT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};
