import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import Button from "@material-ui/core/Button";
import useStyles from "./Classes";
import CompanyChange from "./../modal/CompanyChange";
import Backdrop from "../modal/Backdrop";

const CompanyInput = () => {
  let [name, setName] = useState("");
  let [hashvapah, setHashvapah] = useState("");
  let [companies, setCompanies] = useState([]);
  let [show, setShow] = useState(false);
  let [company, setCompany] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    firestore.collection("companies").onSnapshot(snapshot => {
      const company = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      setCompanies(company);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    let company = {
      name: name,
      hashvapah: hashvapah
    };
    setName("");
    setHashvapah("");
    firestore
      .collection("companies")
      .doc(`${name}`)
      .set(company);
  };

  const handleDelete = e => {
    console.log(e);
    firestore
      .collection("companies")
      .doc(`${e}`)
      .delete();
  };

  const showModal = company => {
    setShow(!show);
    if (show) {
      return;
    } else {
      setCompany(company);
    }
  };

  return (
    <React.Fragment>
      <div>
        <h2>Կազմակերպություններ</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Անվանում</th>
              <th>Հաշվապահ</th>
              <th>Փոփոխել</th>
              <th>Հեռացնել</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.hashvapah}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => showModal(company)}
                  >
                    <i className="material-icons">create</i>
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleDelete(company.id)}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    <i className="material-icons">delete</i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-style-6">
        <h1>Կազմակերպության գրանցում</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="setName" style={{ display: "block" }}>
            Կազմակերպության անվանում
          </label>
          <input
            placeholder="Կազմակերպության անվանում"
            type="text"
            name="setName"
            value={name}
            onChange={e => setName(e.target.value)}
            className="projectName"
          />
          <label htmlFor="setHashvapah" style={{ display: "block" }}>
            Հաշվապահ
          </label>
          <input
            placeholder="Հաշվապահ"
            type="text"
            name="setHashvapah"
            value={hashvapah}
            onChange={e => setHashvapah(e.target.value)}
            className="projectName"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Հաստատել
          </Button>
        </form>
        <CompanyChange show={show} close={showModal} company={company} />
        <Backdrop show={show} close={showModal} />
      </div>
    </React.Fragment>
  );
};

export default CompanyInput;
