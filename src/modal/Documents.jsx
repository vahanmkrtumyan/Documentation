import React, { useState, useEffect } from "react";
import { firestore, storage } from "../firebase";
import "./modal.css";
import useStyles from "../components/Classes";
import swal from "sweetalert";

const Documents = props => {
  let [agreementName, setAgreementName] = useState("Պայման");
  let [agreements, setAgreements] = useState([]);
  let [disabled, setDisabled] = useState(true);
  let [urls, setUrl] = useState({});

  const classes = useStyles();

  useEffect(() => {
    setAgreements(props.agreement.url);
    console.log(agreements);
  }, [props.agreement]);

  function handleSubmit(e) {
    e.preventDefault();

    let agr = Object.assign({}, agreements);

    console.log(urls);


    // firestore
    //   .collection(`agreements`)
    //   .doc(`${agreement.id}`)
    //   .update(agr);
  }

  let handleInput = e => {
    setAgreementName(e.target.value);
    console.log(agreementName);
    console.log(agreements);
    console.log(urls);
  };

  const handleSelect = e => {
    const file = e.target.files[0];

    console.log(agreementName);

    var metadata = {
      conetentType: "pdf"
    };
    var storageRef = storage.ref("statements/" + agreementName);
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
        console.log(error);
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
          setUrl(downloadURL);
          swal({ icon: "success", text: "Բեռնված է։" });
          setDisabled(false);
          console.log(downloadURL);
        });
      }
    );
  };

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
      {agreements
        ? agreements.map(agreement => (
            <a
              href={agreement.Պայմանագիր}
              key={agreement.Պայմանագիր}
              target="_blank"
              rel="noopener noreferrer"
            >
              Պայմ
            </a>
          ))
        : ""}
      <form className="form-style-6">
        <label htmlFor="gumar" style={{ display: "block" }}>
          Պայամանագրի համար
        </label>
        <input
          type="number"
          placeholder="Գումար"
          name="gumar"
          value={agreementName}
          onChange={e => handleInput(e)}
        />
        <div className="text-left" style={{ margin: "35px 0px" }}>
          <div className="image-upload">
            <label htmlFor="file-input">
              <img src="https://goo.gl/pB9rpQ" />
            </label>

            <input id="file-input" type="file" onChange={handleSelect} />
          </div>
        </div>
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
    </div>
  ) : null;
};

export default Documents;
