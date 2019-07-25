import React, { useState, useEffect } from "react";
import { storage, firestore } from "../firebase";
import Button from "@material-ui/core/Button";
import useStyles from "./Classes";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Upload from "../photos/upload.svg";
import swal from "sweetalert";
import IntegrationAutosuggest from "./Autosuggest";
import IntegrationAutosuggest2 from "./Autosuggest2";
import "../App.css";

const AgreementInput = () => {
  let [number, setNumber] = useState("");
  let [name1, setName1] = useState("");
  let [name2, setName2] = useState("");
  let [amount, setAmount] = useState("");
  let [currency, setCurrency] = useState("AMD");
  let [type, setType] = useState("Անհատույց");
  let [given, setGiven] = useState([]);
  let [companies, setCompanies] = useState([]);
  let [comp1, setComp1] = useState("");
  let [disabled, setDisabled] = useState(false);
  let [url, setUrl] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const classes = useStyles();

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  console.log(companies);

  const handleSubmit = e => {
    e.preventDefault();
    let agreement = {
      number,
      name1,
      name2,
      amount,
      currency,
      type,
      given,
      selectedDate,
      url
    };
    firestore
      .collection("agreements")
      .doc()
      .set(agreement);
    setNumber("");
    setName1("");
    setName2("");
    setAmount("");
    setCurrency("AMD");
    setType("");
    setGiven("");
    setSelectedDate(new Date());
  };

  const handleSelect = e => {
    const file = e.target.files[0];

    var metadata = {
      conetentType: "pdf"
    };
    var storageRef = storage.ref("statements/" + number);
    var uploadTask = storageRef.put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed", // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // var prg = progress.toString();
        if (0 < progress < 1) {
          setDisabled(true);
          console.log(disabled);
        }
      },

      error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          setUrl({ downloadURL });
          swal({ icon: "success", text: "Բեռնված է։" });
          setDisabled(false);
        });
      }
    );
  };

  return (
    <div className="form-style-6">
      <form>
        <label htmlFor="setNumber" style={{ display: "block" }}>
          Պայմանագրի համար
        </label>
        <input
          placeholder=" Պայմանագրի համար"
          type="text"
          name="setNumber"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
        <label htmlFor="setName1" style={{ display: "block" }}>
          Առաջին կազմակերպության անվանում
        </label>
        <IntegrationAutosuggest asd={newValue => setName1(newValue)} />
        {/* <input
          placeholder="Առաջին կազմակերպության անվանում"
          type="text"
          name="setName1"
          value={name1}
          onChange={e => setName1(e.target.value)}
        /> */}
        <label htmlFor="setName2" style={{ display: "block" }}>
          Երկրորդ կազմակերպության անվանում
        </label>
        <IntegrationAutosuggest2 asd={newValue => setName2(newValue)} />
        {/* <input
          placeholder="Երկրորդ կազմակերպության անվանում"
          type="text"
          name="setName2"
          value={name2}
          onChange={e => setName2(e.target.value)}
        /> */}
        <label htmlFor="setHashvapah" style={{ display: "block" }}>
          Արժույթ
        </label>
        <select
          name="setHashvapah"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          <option defaultValue value="AMD">
            AMD
          </option>
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="Մուլտի">Մուլտի</option>
        </select>
        <label htmlFor="setAmount" style={{ display: "block" }}>
          Պայմանագրի գումար
        </label>
        <input
          placeholder="Պայմանագրի գումար"
          type="number"
          name="setAmount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <label htmlFor="setRemaining" style={{ display: "block" }}>
          Տրված գումար
        </label>
        <input
          placeholder="Տրված գումար"
          type="number"
          name="setRemaining"
          value={given}
          onChange={e => setGiven(e.target.value)}
        />
        <label htmlFor="setAmount" style={{ display: "block" }}>
          Պայմանագրի տեսակ
        </label>
        <select
          name="setHashvapah"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option defaultValue value="Անհատույց">
            Անհատույց
          </option>
          <option value="Տոկոսով">Տոկոսով</option>
        </select>

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

        <div className="text-left" style={{ margin: "35px 0px" }}>
          <div class="image-upload">
            <label for="file-input">
              <img src="https://goo.gl/pB9rpQ" />
            </label>

            <input id="file-input" type="file" onChange={handleSelect} />
          </div>
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Հաստատել
        </Button>
      </form>
    </div>
  );
};

export default AgreementInput;
