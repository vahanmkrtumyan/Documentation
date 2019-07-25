import { firestore } from "../firebase";
import React, { useState, useEffect } from "react";

let arr = [];

export default firestore
  .collection("companies")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
    });
  });