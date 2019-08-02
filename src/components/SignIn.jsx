import React, { Component } from "react";

import { auth, googleAuthProvider } from "../firebase";

class SignIn extends Component {
  render() {
    return (
      <div className="text-center">
        <button
          className="btn primary"
          onClick={() => auth.signInWithPopup(googleAuthProvider)}
        >
          Մուտք
        </button>
      </div>
    );
  }
}

export default SignIn;
