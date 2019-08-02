import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignIn";

class Navbar extends Component {
    state = { currentUser: null, loading: true };

    componentDidMount() {
        auth.onAuthStateChanged(currentUser => {
            this.setState({ currentUser, loading: false });
        });
    }

    render() {
        const { currentUser } = this.state;
        
        return (
            <nav className="navbar">
                {/*<button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>*/}
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav row flex">
                        <div className="col-sm-4">
                        </div>

                        <div className="col-sm-8 flex justify-end">
                            <NavLink className="nav-link" to="/orders">
                                
                            </NavLink>
                            {currentUser && <CurrentUser user={currentUser} />}
                            {!this.state.loading && !currentUser && <SignIn />}
                        </div>


                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;

