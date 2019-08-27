import React, { useState, useEffect } from "react";
import { firestore, storage } from "../firebase";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "./modal.css";
import useStyles from "../components/Classes";

const AgreementChange = props => {
  let [gumar, setGumar] = useState("");
  let [currency, setCurrency] = useState("");
  let [number, setNumber] = useState("");
  let [selectedDate, setSelectedDate] = useState("");
  let [deadlineDate, setDeadlineDate] = useState("");

  const classes = useStyles();

  useEffect(() => {
    setNumber(props.number);
    setCurrency(props.agreement.currency);
    setGumar(props.agreement.gumar);

    console.log(currency);
  }, [props.agreement]);

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handleDateChange1(date) {
    setDeadlineDate(date);
    console.log(deadlineDate);
  }

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

    if (number) {
      agr.number = number;
    }

    if (selectedDate) {
      agr.selectedDate = selectedDate;
    }

    if (deadlineDate) {
      agr.deadlineDate = deadlineDate;
    }

    console.log(agr)

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
        <label htmlFor="number" style={{ display: "block" }}>
          Գումար
        </label>
        <input
          type="number"
          placeholder="Համար"
          name="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
        <label htmlFor="gumar" style={{ display: "block" }}>
          Արժույթ
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
        <label htmlFor="gumar" style={{ display: "block" }}>
          Գումար
        </label>
        <input
          type="number"
          placeholder="Գումար"
          name="gumar"
          value={gumar}
          onChange={e => setGumar(e.target.value)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="mui-pickers-date"
              label="Պայմանագրի կնքման օր"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="mui-pickers-date"
              label="Պայմանագրի վերջնաժամկետ"
              value={deadlineDate}
              onChange={handleDateChange1}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
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
