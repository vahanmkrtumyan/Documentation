import React, { useState, useEffect } from "react";
import { firestore, storage } from "../firebase";
import "./modal.css";

const Document = props => {
  let [agreementName, setAgreementName] = useState("Պայման");
  let [agreements, setAgreements] = useState([]);

  useEffect(() => {
    setAgreements(props.agreement);
    console.log(agreements);
  }, [props.agreement]);

  let handleSelect = e => {
    var file = e.target.files[0];

    // Create the file metadata
    var metadata = {
      contentType: "pdf"
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var storageRef = storage().ref();
    var uploadTask = storageRef
      .child("images/" + file.name)
      .put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  let handleSubmit = () => {};

  return props.show ? (
    <div className="Modal">
      {agreements.url
        ? agreements.url.map(agreement => (
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
          onChange={e => setAgreementName(e.target.value)}
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

export default Document;
