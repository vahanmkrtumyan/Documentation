import firebase from "firebase";
import "firebase/firestore";
import 'firebase/auth'

export const config = {
  apiKey: "AIzaSyBSiYSxUboJLgCFxwe-Gmb_wxSljqJpLSI",
  authDomain: "documentation-8b379.firebaseapp.com",
  databaseURL: "https://documentation-8b379.firebaseio.com",
  projectId: "documentation-8b379",
  storageBucket: "documentation-8b379.appspot.com",
  messagingSenderId: "503510097763",
  appId: "1:503510097763:web:60cfdd385b36ea22"
};
export const fire = firebase.initializeApp(config);

export default firebase;

//export const messaging = firebase.messaging();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const database = firebase.database();

// export const provider = new firebase.auth.GithubAuthProvider()
// export const signInWithGoogle = auth.signInWithPopup(provider)