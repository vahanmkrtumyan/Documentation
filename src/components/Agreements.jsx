import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import Button from "@material-ui/core/Button";
import useStyles from "./Classes";
import Transactions from "./../modal/Transactions";
import Backdrop from "../modal/Backdrop";
import { ConnectToUser } from "./ConnectUser";
import CompanyChange from "../modal/CompanyChange";
import AgreementChange from "./../modal/AgreementChange";
import Document from "./../modal/Document";
import "../App.css";

const Agreements = ({ currentUser, loading, ...props }) => {
  let [agreements, setAgreements] = useState([]);
  let [first, setFirst] = useState("");
  let [second, setSecond] = useState("");
  let [currency, setCurrency] = useState("");
  let [agreement, setAgreement] = useState({ id: "" });
  let [show, setShow] = useState(false);
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    firestore.collection("agreements").onSnapshot(snapshot => {
      const agreement = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      setAgreements(agreement);
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setShow1(false);
    setShow2(false);
  };

  const data1 = [...agreements] || [];

  let data2 = [...data1].map(item => {
    let d = new Date(item.selectedDate.seconds * 1000),
      months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ];
    let newD =
      d.getDate() + "/" + months[d.getMonth()] + "/" + d.getFullYear() + " ";
    item.date = newD;

    let f = new Date(item.selectedDate.seconds * 1000);
    let newF =
      f.getDate() + "/" + months[f.getMonth()] + "/" + f.getFullYear() + " ";
    item.date = newF;

    let g = item.deadlineDate ? new Date(item.deadlineDate.seconds * 1000) : "";
    let newFs = g
      ? g.getDate() + "/" + months[g.getMonth()] + "/" + g.getFullYear() + " "
      : "";
    item.deadline = newFs;

    return item;
  });

  let filtered = agreements.filter(function(agreement) {
    if (
      agreement.name1.toLowerCase().includes(first.toLowerCase()) ||
      agreement.name2.toLowerCase().includes(first.toLowerCase())
    )
      return true;

    return false;
  });

  let filtered2 = filtered.filter(function(agreement) {
    if (
      agreement.name1.toLowerCase().includes(second.toLowerCase()) ||
      agreement.name2.toLowerCase().includes(second.toLowerCase())
    )
      return true;

    return false;
  });

  let filtered3 = filtered2.filter(function(agreement) {
    if (agreement.currency.toLowerCase().includes(currency.toLowerCase()))
      return true;

    return false;
  });

  const handleAdd = agreement => {
    setAgreement(agreement);
    setShow(true);
  };

  const handleEdit = agreement => {
    setAgreement(agreement);
    setShow1(true);
  };

  const handleDoc = agreement => {
    setAgreement(agreement);
    setShow2(true);
  };

  return (
    <div>
      <div className="form-style-6">
        <h2>Որոնում</h2>
        <label htmlFor="setFirst" style={{ display: "inline-block" }}>
          Առաջին կազմակերպություն
        </label>
        <input
          placeholder="Առաջին կազմակերպություն"
          type="text"
          name="setFirst"
          value={first}
          onChange={e => setFirst(e.target.value)}
        />
        <label htmlFor="setSecond" style={{ display: "inline-block" }}>
          Երկրորդ կազմակերպություն
        </label>
        <input
          placeholder="Երկրորդ կազմակերպություն"
          type="text"
          name="setSecond"
          value={second}
          onChange={e => setSecond(e.target.value)}
        />
        <label htmlFor="setSecond" style={{ display: "inline-block" }}>
          Արժույթ
        </label>
        <input
          placeholder="Արժույթ"
          type="text"
          name="setSecond"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        />
      </div>
      <h2>Պայմանագրեր</h2>
      <table className="table">
        <thead style={{ position: "sticky" }}>
          <tr style={{ position: "sticky" }}>
            <th>Համար</th>
            <th>Կնքված</th>
            <th>Առաջին</th>
            <th>Երկրորդ</th>
            <th>Արժույթ</th>
            <th>Գումար</th>
            <th>Տրված</th>
            <th>Մնացորդ 1-2</th>
            <th>Մնացորդ 2-1</th>
            <th>Տեսակ</th>
            <th>Մարում</th>
            <th>Պայմանագիր</th>
            {currentUser ? (
              currentUser.displayName === "t hashvapah" ? (
                <th>Փոփոխել</th>
              ) : null
            ) : null}
            {currentUser ? (
              currentUser.displayName !== "t hashvapah" ? (
                <th>Փոխանցել</th>
              ) : null
            ) : null}
          </tr>
        </thead>
        <tbody>
          {filtered3.map(agreement => (
            <tr key={agreement.id}>
              <td>{agreement.number}</td>
              <td>{agreement.date}</td>
              <td>{agreement.name1}</td>
              <td>{agreement.name2}</td>
              <td>{agreement.currency}</td>
              <td>{Number(agreement.amount).toLocaleString()}</td>
              <td>{Number(agreement.given).toLocaleString()}</td>
              <td>
                <h4>
                  {(
                    Number(agreement.amount) - Number(agreement.given)
                  ).toLocaleString()}
                </h4>
              </td>
              <td>
                <h4>
                  {(
                    Number(agreement.amount) + Number(agreement.given)
                  ).toLocaleString()}
                </h4>
              </td>
              <td>{agreement.type}</td>
              <td>{agreement.deadline}</td>
              <td>
                <a
                  href={agreement.url ? agreement.url.downloadURL : ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-link"
                >
                  Պայմանագիր
                </a>
              </td>
              {/* <td>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  <i className="material-icons">create</i>
                </Button>
              </td> */}
              {currentUser ? (
                currentUser.displayName === "t hashvapah" ||
                currentUser.displayName === "Vahan Mkrtumyan" ? (
                  <td>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => handleEdit(agreement)}
                    >
                      <i className="material-icons">create</i>
                    </Button>
                  </td>
                ) : null
              ) : null}
              {currentUser ? (
                currentUser.displayName !== "Vahan Mkrtumyan" ? (
                  <td>
                    <Button
                      onClick={() => handleAdd(agreement)}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      <i className="material-icons">add</i>
                    </Button>
                  </td>
                ) : null
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      <Transactions agreement={agreement} show={show} close={handleClose} />
      <AgreementChange agreement={agreement} show={show1} close={handleClose} />
      <Backdrop show={show || show1 || show2} close={handleClose} />
      <Document agreement={agreement} show={show2} close={handleClose} />
    </div>
  );
};

export default ConnectToUser(Agreements);
