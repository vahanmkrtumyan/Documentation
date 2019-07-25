import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import CompanyInput from "./components/CompanyInput";
import AgreementInput from "./components/AgreementInput";
import Agreements from "./components/Agreements";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Agreements} exact />
      <Route path="/agreementinput" component={AgreementInput} />
    </div>
  );
}

export default App;
