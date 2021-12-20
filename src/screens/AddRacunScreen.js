import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Table, Button } from "react-bootstrap";
import { getAllKupci } from "../actions/kupacActions";
import { listaPorudzbenica } from "../actions/porudzbenicaActions";
import { listaZacina } from "../actions/zacinActions";
import { add, updateRacun, getAllRacuni } from "../actions/racunActions";
import FormContainer from "../components/FormContainer";

function AddRacunScreen({ racun, zatvoriModal }) {
  const dispatch = useDispatch();

  const kupacGetAll = useSelector(state => state.kupacGetAll);
  const { kupci } = kupacGetAll;

  const porudzbenicaLista = useSelector(state => state.porudzbenicaLista);
  const { porudzbenice } = porudzbenicaLista;

  const zacinLista = useSelector(state => state.zacinLista);
  const { zacini } = zacinLista;

  useEffect(() => {
    dispatch(getAllKupci());
    dispatch(listaZacina());
  }, [dispatch]);

  // Racun
  const [datumPrometa, setDatumPrometa] = useState(
    racun ? racun.datumPrometa : ""
  );
  const [kupac, setKupac] = useState(
    racun ? racun.porudzbenicaDTO.kupacDTO : null
  );
  const [porudzbenica, setPorudzbenica] = useState(
    racun ? racun.porudzbenicaDTO : null
  );
  const [uslovPlacanja, setUslovPlacanja] = useState(
    racun ? racun.uslovPlacanja : ""
  );
  const [PDVOsnova, setPDVOsnova] = useState(racun ? racun.pdvosnova : 0);
  const [iznosPDV, setIznosPDV] = useState(racun ? racun.iznosPDV : 0);
  const [racunIznos, setRacunIznos] = useState(racun ? racun.racunIznos : 0);

  // Sve stavke
  const [stavke, setStavke] = useState(racun ? racun.stavkeRac : []);

  // Jedna stavka
  const [zacinDTO, setZacinDTO] = useState(null);
  const [rokUpotrebe, setRokUpotrebe] = useState("");
  const [brojSarze, setBrojSarze] = useState("");
  const [pdv, setPdv] = useState("");
  const [ukupanIznos, setUkupanIznos] = useState("");
  const [idStavke, setIdStavke] = useState("");

  useEffect(() => {
    if (kupci && kupci.length && !kupac) {
      setKupac(racun ? racun.porudzbenicaDTO.kupacDTO : kupci[0]);
    }
  }, [kupci]);

  useEffect(() => {
    if (kupac) {
      dispatch(listaPorudzbenica(kupac.idkupca));
    }
  }, [kupac]);

  useEffect(() => {
    if (porudzbenice && porudzbenice.length) {
      let novaPorudzbenica;
      if (racun) {
        novaPorudzbenica = racun.porudzbenicaDTO;
      }
      if (!racun || kupac !== racun.kupacDTO) {
        novaPorudzbenica = porudzbenice[0];
      }
      setPorudzbenica(novaPorudzbenica);
    } else {
      setPorudzbenica(null);
    }
  }, [porudzbenice]);

  useEffect(() => {
    if (kupac) {
    }
  }, [kupac]);

  useEffect(() => {
    if (zacini && zacini.length && !zacinDTO) {
      setZacinDTO(zacini[0]);
    }
  }, [zacini]);

  const addStavka = e => {
    e.preventDefault();

    let newStavke = [];
    const racunId = racun ? racun.idracuna : 0;
    let id = racun ? { idracuna: racunId } : null;

    newStavke = stavke.concat(newStavke);
    newStavke.push({
      zacinDTO,
      rokUpotrebe,
      brojSarze,
      pdv,
      ukupanIznos,
      status: "I",
      id: id
    });
    setStavke(newStavke);

    izracunajIznosRacuna(newStavke);
    resetStavkaForm();
  };

  const resetStavkaForm = () => {
    setZacinDTO(zacini[0]);
    setRokUpotrebe("");
    setBrojSarze("");
    setPdv("");
    setUkupanIznos("");
  };

  const izracunajIznosRacuna = newStavke => {
    let newPDVOsnova = 0;
    let newIznosPDV = 0;

    newStavke.forEach(s => {
      if (s.status != "D") {
        newPDVOsnova = newPDVOsnova + +s.ukupanIznos;
        newIznosPDV = newIznosPDV + (+s.pdv / 100) * +s.ukupanIznos;
      }
    });

    setPDVOsnova(newPDVOsnova);
    setIznosPDV(newIznosPDV);
    setRacunIznos(newPDVOsnova + newIznosPDV);
  };

  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(
      !racun
        ? add(
            datumPrometa,
            kupac,
            porudzbenica,
            uslovPlacanja,
            PDVOsnova,
            iznosPDV,
            racunIznos,
            stavke
          )
        : updateRacun(
            racun.idracuna,
            datumPrometa,
            kupac,
            porudzbenica,
            uslovPlacanja,
            PDVOsnova,
            iznosPDV,
            racunIznos,
            stavke
          )
    );

    if (racun) {
      await dispatch(getAllRacuni());
      zatvoriModal();
    }

    dispatch(listaPorudzbenica(kupci[0].idkupca));

    setDatumPrometa("");
    setKupac(kupci[0]);
    setPorudzbenica(porudzbenice[0]);
    setUslovPlacanja("");
    setPDVOsnova("");
    setIznosPDV("");
    setRacunIznos("");
    setStavke([]);
    setZacinDTO(zacini[0]);
    setRokUpotrebe("");
    setBrojSarze("");
    setPdv("");
    setUkupanIznos("");
  };

  const obrisiStavku = e => {
    e.preventDefault();

    const idZaBrisanje = e.target.id;

    let noveStavke = stavke.map(stavka =>
      stavke.indexOf(stavka) == idZaBrisanje
        ? {
            ...stavka,
            status: "D"
          }
        : stavka
    );

    noveStavke = noveStavke.filter(
      stavka =>
        (stavka.status == "D" &&
          stavka.id != null &&
          stavka.id.rbrRac != null) ||
        stavka.status != "D"
    );

    setStavke(noveStavke);

    izracunajIznosRacuna(noveStavke);
  };

  const primeniIzmeneStavke = () => {
    const noveStavke = stavke.map(stavka =>
      stavke.indexOf(stavka) == idStavke
        ? {
            ...stavka,
            zacinDTO,
            rokUpotrebe,
            brojSarze,
            pdv,
            ukupanIznos,
            status:
              (stavka.id != null && stavka.id.rbrRac == null) ||
              stavka.id == null
                ? "I"
                : "U"
          }
        : stavka
    );

    setStavke(noveStavke);
    setIdStavke("");
    resetStavkaForm();

    izracunajIznosRacuna(noveStavke);
  };

  const izmeniStavku = e => {
    const { id } = e.target;
    const stavkaZaIzmenu = stavke[parseInt(id)];
    setIdStavke(id);
    setZacinDTO(stavkaZaIzmenu.zacinDTO);
    setRokUpotrebe(stavkaZaIzmenu.rokUpotrebe);
    setBrojSarze(stavkaZaIzmenu.brojSarze);
    setPdv(stavkaZaIzmenu.pdv);
    setUkupanIznos(stavkaZaIzmenu.ukupanIznos);
  };

  return (
    <FormContainer>
      {!racun ? (
        <h1>Dodaj novi racun</h1>
      ) : (
        <h1>Izmeni racun - ID: {racun.idracuna}</h1>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="kupac">
          <Form.Label>Kupac</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={e => {
              setKupac(JSON.parse(e.target.value));
            }}
            value={JSON.stringify(kupac)}
          >
            {kupci &&
              kupci.length &&
              kupci.map(kupac => (
                <option key={kupac.idkupca} value={JSON.stringify(kupac)}>
                  {kupac.naziv}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="porudzbenica">
          <Form.Label>Porudzbenica</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={e => setPorudzbenica(JSON.parse(e.target.value))}
            value={JSON.stringify(porudzbenica)}
          >
            {porudzbenice &&
              porudzbenice.map(porudzbenica => (
                <option
                  key={porudzbenica.idpor}
                  value={JSON.stringify(porudzbenica)}
                >
                  {`${porudzbenica.idpor} - ${porudzbenica.kupacDTO.naziv}`}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="datumPrometa">
          <Form.Label>Datum Prometa</Form.Label>
          <Form.Control
            type="date"
            placeholder="Unesite datum prometa"
            value={datumPrometa}
            onChange={e => setDatumPrometa(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="uslovPlacanja">
          <Form.Label>Uslov placanja</Form.Label>
          <Form.Control
            type="adresa"
            placeholder="Unesite uslov placanja"
            value={uslovPlacanja}
            onChange={e => setUslovPlacanja(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* -----------------------------------Stavke -------------------------------------------------*/}
        <h2>Unos stavki racuna</h2>

        <Form.Group controlId="zacinDTO">
          <Form.Label>Zacin</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={e => setZacinDTO(JSON.parse(e.target.value))}
            value={JSON.stringify(zacinDTO)}
          >
            {zacini.map(zacinDTO => (
              <option
                key={zacinDTO.sifraZacina}
                value={JSON.stringify(zacinDTO)}
              >
                {zacinDTO.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="rokUpotrebe">
          <Form.Label>Rok upotrebe</Form.Label>
          <Form.Control
            type="date"
            placeholder="Unesite rok upotrebe"
            value={rokUpotrebe}
            onChange={e => setRokUpotrebe(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="brojSarze">
          <Form.Label>Broj sarze</Form.Label>
          <Form.Control
            type="brojSarze"
            placeholder="Unesite broj sarze"
            value={brojSarze}
            onChange={e => setBrojSarze(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="pdv">
          <Form.Label>PDV (%)</Form.Label>
          <Form.Control
            type="pdv"
            placeholder="Unesite PDV"
            value={pdv}
            onChange={e => setPdv(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="ukupanIznos">
          <Form.Label>Ukupan iznos</Form.Label>
          <Form.Control
            type="ukupanIznos"
            placeholder="Unesite ukupan iznos"
            value={ukupanIznos}
            onChange={e => setUkupanIznos(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <br />

        <Button
          type="submit"
          variant="outline-primary"
          onClick={addStavka}
          disabled={idStavke}
          style={{ marginRight: "10px" }}
        >
          Add
        </Button>
        <Button
          type="submit"
          variant="outline-primary"
          onClick={primeniIzmeneStavke}
          disabled={!idStavke}
        >
          Edit
        </Button>

        <br />
        <br />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Zacin</th>
              <th>Broj sarze</th>
              <th>Rok upotrebe</th>
              <th>PDV</th>
              <th>Ukupan iznos</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {stavke &&
              stavke.map(
                (
                  {
                    brojSarze,
                    rokUpotrebe,
                    pdv,
                    ukupanIznos,
                    status,
                    zacinDTO
                  },
                  index
                ) =>
                  status != "D" ? (
                    <tr key={index}>
                      <td>{zacinDTO.sifraZacina}</td>
                      <td>{brojSarze}</td>
                      <td>{rokUpotrebe}</td>
                      <td>{pdv} %</td>
                      <td>{ukupanIznos}</td>
                      <td>
                        <i
                          id={index}
                          className="fas fa-trash"
                          onClick={obrisiStavku}
                          style={{ padding: "0 10px" }}
                        />
                        <i
                          id={index}
                          className="fas fa-edit"
                          onClick={izmeniStavku}
                        />
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}></tr>
                  )
              )}
          </tbody>
        </Table>

        {/* -----------------------------------Stavke -------------------------------------------------*/}

        <br></br>

        <Form.Group controlId="PDVOsnova">
          <Form.Label>PDV osnova</Form.Label>
          <Form.Control
            disabled
            type="PDVOsnova"
            value={PDVOsnova}
            onChange={e => setPDVOsnova(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="iznosPDV">
          <Form.Label>Iznos PDV-a</Form.Label>
          <Form.Control
            disabled
            type="iznosPDV"
            value={iznosPDV}
            onChange={e => setIznosPDV(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="racunIznos">
          <Form.Label>Racun iznos</Form.Label>
          <Form.Control
            disabled
            type="racunIznos"
            value={racunIznos}
            onChange={e => setRacunIznos(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <br></br>

        {!racun ? (
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

export default AddRacunScreen;
