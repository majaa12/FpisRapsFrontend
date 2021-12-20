import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Button, Modal } from "react-bootstrap";

import {
  getAllRacuni,
  getById,
  deleteRacun,
  updateRacun
} from "../actions/racunActions";
import AddRacunScreen from "./AddRacunScreen";

const AllRacuniScreen = () => {
  const [idPretraga, setIdPretraga] = useState("");
  const [racuni, setRacuni] = useState([]);
  const [otvoriModal, setOtvoriModal] = useState(false);
  const [racunZaIzmenu, setRacunZaIzmenu] = useState(null);

  const dispatch = useDispatch();

  const { racuni: sviRacuni } = useSelector(state => state.racunGetAll);

  useEffect(() => {
    dispatch(getAllRacuni());
  }, []);

  useEffect(() => {
    if (racunZaIzmenu) {
      setOtvoriModal(true);
    }
  }, [racunZaIzmenu]);

  useEffect(() => {
    if (sviRacuni) {
      setRacuni(sviRacuni);
    }
  }, [sviRacuni]);

  const promeniId = e => {
    const { value } = e.target;
    setIdPretraga(value);
  };

  const pretraziRacune = e => {
    e.preventDefault();
    if (idPretraga) {
      dispatch(getById(idPretraga));
    } else {
      dispatch(getAllRacuni());
    }
  };

  const obrisiRacun = async e => {
    await dispatch(deleteRacun(e.target.id));
    dispatch(getAllRacuni());
  };

  const izmeniRacun = e => {
    const { id } = e.target;
    setRacunZaIzmenu(racuni.find(racun => racun.idracuna == id));
  };

  const zatvoriModal = () => {
    setOtvoriModal(false);
    setRacunZaIzmenu(null);
  };

  const renderModal = () => (
    <Modal show={otvoriModal} onHide={zatvoriModal} size="lg">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <AddRacunScreen racun={racunZaIzmenu} zatvoriModal={zatvoriModal} />
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
          <Form.Label>ID Racuna</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesi ID racuna"
            onChange={promeniId}
          />
          <br />
          <Button
            type="button"
            variant="outline-primary"
            onClick={pretraziRacune}
          >
            Pretrazi
          </Button>
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Racuna</th>
            <th>ID Porudzbenice</th>
            <th>Uslov placanja</th>
            <th>Datum prometa</th>
            <th>PDV osnova</th>
            <th>Iznos PDV</th>
            <th>Iznos racuna</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {racuni &&
            racuni.map(
              ({
                idracuna,
                uslovPlacanja,
                datumPrometa,
                pdvosnova,
                iznosPDV,
                racunIznos,
                porudzbenicaDTO
              }) => (
                <tr key={idracuna}>
                  <td>{idracuna}</td>
                  <td>{porudzbenicaDTO ? porudzbenicaDTO.idpor : ""}</td>
                  <td>{uslovPlacanja}</td>
                  <td>{datumPrometa}</td>
                  <td>{pdvosnova}</td>
                  <td>{iznosPDV}</td>
                  <td>{racunIznos}</td>
                  <td>
                    <i
                      id={idracuna}
                      className="fas fa-trash"
                      onClick={obrisiRacun}
                      style={{ padding: "0 20px" }}
                    />
                    <i
                      id={idracuna}
                      className="fas fa-edit"
                      onClick={idracuna => izmeniRacun(idracuna)}
                    />
                  </td>
                </tr>
              )
            )}
        </tbody>
      </Table>
    </div>
  );
};

export default AllRacuniScreen;
