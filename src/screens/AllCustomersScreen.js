import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Button, Modal } from "react-bootstrap";

import {
  getAllKupci,
  getSearchKupci,
  deleteKupac,
  updateKupac
} from "../actions/kupacActions";
import AddCustomerScreen from "./AddCustomerScreen";

const AllCustomersScreen = () => {
  const [kupci, setKupci] = useState([]);
  const [nazivZaPretragu, setNazivZaPretragu] = useState("");
  const [otvoriModal, setOtvoriModal] = useState(false);
  const [kupacZaIzmenu, setKupacZaIzmenu] = useState(null);

  const dispatch = useDispatch();

  const { kupci: sviKupci } = useSelector(state => state.kupacGetAll);

  useEffect(() => {
    dispatch(getAllKupci());
  }, []);

  useEffect(() => {
    if (kupacZaIzmenu) {
      setOtvoriModal(true);
    }
  }, [kupacZaIzmenu]);

  useEffect(() => {
    if (sviKupci) {
      setKupci(sviKupci);
    }
  }, [sviKupci]);

  const pretraziKupce = e => {
    e.preventDefault();
    dispatch(getSearchKupci(nazivZaPretragu));
  };

  const promeniNaziv = e => {
    const { value } = e.target;
    setNazivZaPretragu(value);
  };

  const obrisiKupca = async e => {
    await dispatch(deleteKupac(e.target.id));
    dispatch(getSearchKupci(nazivZaPretragu));
  };

  const izmeniKupca = e => {
    const { id } = e.target;
    setKupacZaIzmenu(kupci.find(kupac => kupac.idkupca == id));
  };

  const zatvoriModal = () => {
    setOtvoriModal(false);
    setKupacZaIzmenu(null);
  };

  const renderModal = () => (
    <Modal show={otvoriModal} onHide={zatvoriModal}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <AddCustomerScreen kupac={kupacZaIzmenu} zatvoriModal={zatvoriModal} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={zatvoriModal}>
          Zatvori
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div>
      {renderModal()}
      <br />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Naziv kupca</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesi naziv"
            onChange={promeniNaziv}
          />
          <br />
          <Button
            type="button"
            variant="outline-primary"
            onClick={pretraziKupce}
          >
            Pretrazi
          </Button>
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>PIB</th>
            <th>Naziv</th>
            <th>Grad</th>
            <th>Adresa</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {kupci &&
            kupci.map(({ naziv, idkupca, adresa, pibkupca, grad }) => (
              <tr key={idkupca}>
                <td>{idkupca}</td>
                <td>{pibkupca}</td>
                <td>{naziv}</td>
                <td>{grad.naziv}</td>
                <td>{adresa}</td>
                <td>
                  <i
                    id={idkupca}
                    className="fas fa-trash"
                    onClick={obrisiKupca}
                    style={{ padding: "0 10px" }}
                  />

                  <i
                    id={idkupca}
                    className="fas fa-edit"
                    onClick={idkupca => izmeniKupca(idkupca)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllCustomersScreen;
