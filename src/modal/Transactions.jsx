import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import "./modal.css";
import useStyles from "../components/Classes";

const Transactions = props => {
  let [gumar, setGumar] = useState("");
  let [tvogh, setTvogh] = useState("");

  const classes = useStyles();

  function handleSubmit(e) {
    //e.preventDefault();

    let tvo = tvogh;

    let agreement = props.agreement;
    let agr = Object.assign({}, agreement);

    if (tvogh === agr.name1) {
      agr.given = agr.given + gumar;
    } else {
      agr.given = agr.given - gumar;
    }

    console.log(agreement);

    // firestore
    //   .collection(`asd`)
    //   .doc(`${props.agreement.id}`)
    //   .set({ gumar: gumar, tvogh: tvogh });

    // firestore
    //   .collection(`agreements`)
    //   .doc(`${this.state.agreement.id}`)
    //   .update(agreement);
    // this.setState({
    //   company: {
    //     id: "",
    //     tvogh: "",
    //     gumar: ""
    //   }
    // });
  }

  return props.show ? (
    <div className="Modal">
      {" "}
      <form className="form-style-6">
        <label htmlFor="tvogh" style={{ display: "block" }}>
          Տվող
        </label>
        <select
          name="tvogh"
          value={tvogh}
          onChange={e => setTvogh(e.target.value)}
        >
          <option
            defaultValue={props.agreement.name1}
            value={props.agreement.name1}
          >
            {props.agreement.name1}
          </option>
          <option value={props.agreement.name2}>{props.agreement.name2}</option>
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
          handleSubmit();
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
    </div>
  ) : null;
};

export default Transactions;
