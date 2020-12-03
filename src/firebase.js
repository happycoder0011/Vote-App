  
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAq26x_kdvSgWrveIX0xHI-dRIU7uOrNfg",
  authDomain: "vote-app-a0cc2.firebaseapp.com",
  databaseURL: "https://vote-app-a0cc2.firebaseio.com",
  projectId: "vote-app-a0cc2",
  storageBucket: "vote-app-a0cc2.appspot.com",
  messagingSenderId: "882913358848",
  appId: "1:882913358848:web:a68070e7f54617aa7654e5"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;