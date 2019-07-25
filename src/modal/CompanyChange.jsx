import React, { Component } from "react";
import { firestore } from "../firebase";
import "./modal.css";
import useStyles from "../components/Classes";



class CompanyChange extends Component {
    
  state = {
    company: {
      id: "",
      name: "",
      hashvapah: ""
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.company.id !== prevProps.company.id ||
      this.props.company.name !== prevProps.company.name ||
      this.props.company.hashvapah !== prevProps.company.hashvapah
    ) {
      this.setState({ company: this.props.company });
    }
  }

  handleChange = event => {
    const nam = event.target.name;

    const company = { ...this.state.company };
    company[nam] = event.target.value;
    this.setState({ company });
  };

  handleSubmit = e => {
    e.preventDefault();
    let company = { ...this.state.company };

    firestore
      .collection(`companies`)
      .doc(`${this.state.company.id}`)
      .update(company);
    this.setState({
      company: {
        id: "",
        name: "",
        hashvapah: ""
      }
    });
    this.props.close();
  };

  

  render() {
    const { company } = this.state;
    return this.props.show ? (
      <div className="Modal">
        {" "}
        <form className="form-group">
          <label htmlFor="name">Կազմակերպություն</label>
          <input
            placeholder="Կազմակերպություն"
            type="text"
            name="name"
            value={company.name}
            onChange={this.handleChange}
          />
          <label htmlFor="hashvapah">Հաշվապահ</label>
          <input
            type="text"
            placeholder="Հաշվապահ"
            name="hashvapah"
            value={company.hashvapah}
            onChange={this.handleChange}
          />
        </form>
        <button onClick={this.handleSubmit} style={{padding: '12px', borderRadius: '5px', backgroundColor: '#3f51b5', color: 'white' }}>
          Հաստատել
        </button>{" "}
      </div>
    ) : null;
  }
}

export default CompanyChange;
