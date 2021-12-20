import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { listaGradova } from "../actions/gradActions";
import { add, updateKupac, getAllKupci } from "../actions/kupacActions";

function AddCustomerScreen({ kupac, zatvoriModal }) {
  const dispatch = useDispatch();

  const gradLista = useSelector(state => state.gradLista);
  const { error, loading, gradovi } = gradLista;

  useEffect(() => {
    dispatch(listaGradova());
  }, [dispatch]);

  const [pib, setPib] = useState(kupac ? kupac.pibkupca : "");
  const [naziv, setNaziv] = useState(kupac ? kupac.naziv : "");
  const [adresa, setAdresa] = useState(kupac ? kupac.adresa : "");
  const [grad, setGrad] = useState(kupac ? kupac.grad : null);

  useEffect(() => {
    if (gradovi && gradovi.length && !grad) {
      setGrad(kupac ? kupac.grad : gradovi[0]);
    }
  }, [gradovi]);

  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(
      !kupac
        ? add(pib, naziv, adresa, grad)
        : updateKupac(kupac.idkupca, pib, naziv, adresa, grad)
    );
    if (kupac) {
      dispatch(getAllKupci());
      zatvoriModal();
    }
    setPib("");
    setNaziv("");
    setAdresa("");
    setGrad(gradovi[0]);
  };

  return (
    <FormContainer>
      {!kupac ? (
        <h1>Dodaj novog kupca</h1>
      ) : (
        <h1>Izmeni kupca - ID: {kupac.idkupca}</h1>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="pib">
          <Form.Label>PIB kupca</Form.Label>
          <Form.Control
            type="pib"
            placeholder="Unesite pib"
            value={pib}
            onChange={e => setPib(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="naziv">
          <Form.Label>Naziv kupca</Form.Label>
          <Form.Control
            type="naziv"
            placeholder="Unesite naziv"
            value={naziv}
            onChange={e => setNaziv(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="grad">
          <Form.Label>Grad kupca</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={e => setGrad(JSON.parse(e.target.value))}
            value={JSON.stringify(grad)}
          >
            {gradovi.map(el => (
              <option key={el.sifraGrada} value={JSON.stringify(el)}>
                {el.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="adresa">
          <Form.Label>Adresa kupca</Form.Label>
          <Form.Control
            type="adresa"
            placeholder="Unesite adresu"
            value={adresa}
            onChange={e => setAdresa(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <br></br>

        {!kupac ? (
          <Button type="submit" variant="outline-primary">
            Add
          </Button>
        ) : (
          <Button type="submit" variant="primary">
            Edit
          </Button>
        )}
      </Form>
    </FormContainer>
  );
}

export default AddCustomerScreen;
