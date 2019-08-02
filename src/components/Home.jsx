import React, { useEffect } from "react";
import { ConnectToUser } from "./ConnectUser";
// import CurrentUser from "./CurrentUser"
import { Link } from "react-router-dom";

const Home = ({ currentUser, loading, ...props }) => {
  useEffect(() => {
    if (currentUser) {
      switch (currentUser.displayName) {
        case "t hashvapah":
          props.history.push("/agreementinput");
          break;
        case "Vahe Sukiasyan":
          props.history.push("/Agreements");
          break;
        case "Karlen Karslyan":
          props.history.push("/Agreements");
          break;
        case "Vahan Mkrtumyan":
          props.history.push("/Agreements");
          break;
        default:
        // code block
      }
    }
  });

  return <div />;
};

export default ConnectToUser(Home);
