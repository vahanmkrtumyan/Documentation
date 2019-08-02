import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import CompanyInput from "./components/CompanyInput";
import AgreementInput from "./components/AgreementInput";
import Agreements from "./components/Agreements";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route path="/" component={Home} exact />
      <Route path="/agreementinput" component={AgreementInput} />
      <Route path="/Agreements" component={Agreements} />
      <Route path="/CompanyInput" component={CompanyInput} />
    </div>
  );
}

export default App;
