import React, { useState, useEffect } from "react";
import { firestore, storage } from "../firebase";
import "./modal.css";
import useStyles from "../components/Classes";

const AgreementChange = props => {
  let [gumar, setGumar] = useState("");
  let [currency, setCurrency] = useState("");

  const classes = useStyles();

  useEffect(() => {
    setCurrency(props.agreement.currency);
    console.log(currency);
  }, [props.agreement]);

  function handleSubmit(e) {
    e.preventDefault();

    let agreement = props.agreement;
    let agr = Object.assign({}, agreement);

    if (gumar) {
      agr.amount = gumar;
    }

    if (currency) {
      agr.currency = currency;
    }
    // agr.amount = gumar;
    // agr.currency = currency;

    console.log(agr);
    firestore
      .collection(`agreements`)
      .doc(`${agreement.id}`)
      .update(agr);
  }

  function handleRemove(e) {
    e.preventDefault();
    let agreement = props.agreement;

    console.log(agreement);

    firestore
      .collection(`agreements`)
      .doc(`${agreement.id}`)
      .delete();

    let storageRef = storage.ref("statements/" + `${agreement.number}`);
    storageRef
      .delete()
      .then(function() {
        // File deleted successfully
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return props.show ? (
    <div className="Modal">
      {" "}
      <form className="form-style-6">
        <label htmlFor="gumar" style={{ display: "block" }}>
          Պայամանագրի գումար
        </label>
        <select
          name="gumar"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          <option
            defaultValue={props.agreement.currency}
            value={props.agreement.currency}
          >
            {props.agreement.currency}
          </option>
          <option value="AMD">AMD</option>
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
          <option value="Մուլտի">Մուլտի</option>
        </select>
        <label htmlFor="hashvapah" style={{ display: "block" }}>
          Գումար
        </label>
        <input
          type="number"
          placeholder="Գումար"
          name="gumar"
          value={gumar}
          onChange={e => setGumar(e.target.value)}
        />
      </form>
      <button
        onClick={function(event) {
          handleSubmit(event);
          props.close();
        }}
        style={{
          padding: "12px",
          borderRadius: "5px",
          backgroundColor: "#3f51b5",
          color: "white"
        }}
      >
        Հաստատել
      </button>{" "}
      <button
        onClick={function(event) {
          handleRemove(event);
          props.close();
        }}
        style={{
          padding: "12px",
          borderRadius: "5px",
          backgroundColor: "#cc0000",
          color: "white"
        }}
      >
        Հեռացնել
      </button>{" "}
    </div>
  ) : null;
};

export default AgreementChange;
