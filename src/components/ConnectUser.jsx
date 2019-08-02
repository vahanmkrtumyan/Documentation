import React, { Component, createContext } from "react";
import { auth, firestore } from "../firebase";

const { Provider, Consumer } = createContext({});

class UserProvider extends Component {
  state = { currentUser: null, loading: true, data: [] };

  componentDidMount = async () => {
    this.authListener();
  };

  authListener = async () => {
    const snapshot = await firestore.collection("tokenss").get();
    const data = await snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    this.setState({ data });

    await auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser, loading: false });

      let datas = this.state.data;
    

     
    });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
function ConnectToUser(Component) {
  return props => (
    <Consumer>{value => <Component {...props} {...value} />}</Consumer>
  );
}

export { UserProvider, ConnectToUser };
