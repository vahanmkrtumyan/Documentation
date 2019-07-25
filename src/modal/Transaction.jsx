import React, { Component } from "react";
import { firestore } from "../firebase";
import "./modal.css";
import useStyles from "../components/Classes";

class Transaction extends Component {
  state = {
    agreement: {
      id: "",
      tvogh: "",
      gumar: ""
    },
    inputs: {
      gumar: "",
      tvogh: ""
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.agreement.id !== prevProps.agreement.id) {
      this.setState({ agreement: this.props.agreement });
    }
  }

  handleChange = event => {
    const nam = event.target.name;
    console.log(this.state);
    const inputs = { ...this.state.inputs };
    inputs[nam] = event.target.value;
    this.setState({ inputs }, () => console.log(this.state.inputs));
  };

  handleSubmit = e => {
    e.preventDefault();
    let agreement = { ...this.state.agreement };

    firestore
      .collection(`agreements`)
      .doc(`${this.state.agreement.id}`)
      .update(agreement);
    this.setState({
      company: {
        id: "",
        tvogh: "",
        gumar: ""
      }
    });
    this.props.show();
  };

  render() {

    console.log(this.state)


    const { agreement } = this.state;
    return this.props.show ? (
      <div className="Modal">
        {" "}
        <form className="form-group">
          <label htmlFor="tvogh" style={{ display: "block" }}>
            Տվող
          </label>
          <select
            name="tvogh"
            value={agreement.tvogh}
            onChange={e => this.handleChange(e)}
          >
            <option
              defaultValue={this.state.agreement.name1}
              value={this.state.tvogh}
            >
              {this.state.agreement.name1}
            </option>
            <option value={this.state.agreement.name2}>
              {this.state.agreement.name2}
            </option>
          </select>
          <label htmlFor="hashvapah" style={{ display: "block" }}>
            Գումար
          </label>
          <input
            type="text"
            placeholder="Գումար"
            name="gumar"
            value={this.state.gumar}
            onChange={() => console.log("")}
          />
        </form>
        <button
          onClick={this.handleSubmit}
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
  }
}

export default Transaction;
