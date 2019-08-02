import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";

const CurrentUser = ({ user, ...props }) => {
  let styles = {
    width: "30px",
    height: "30px",
    margin: "5px",
    borderRadius: "15px"
  };

  const signOut = () => {
    auth.signOut();
    setTimeout(() => {
      props.history.push("/");
    }, 100);
    props.history.push("/");
  };

  return (
    <div className="flex">
      <div className="avatar">
        <img style={styles} src={user.photoURL} alt="" />
        <span>{user.displayName}</span>
      </div>

      <button className="btn btn-warning" onClick={signOut}>
        Ելք
      </button>
    </div>
  );
};

export default withRouter(CurrentUser);
