import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyCLqQJoaK04HGludBEHFP8PTdvB3MbHWI0",
  authDomain: "crwn-db-c0507.firebaseapp.com",
  projectId: "crwn-db-c0507",
  storageBucket: "crwn-db-c0507.appspot.com",
  messagingSenderId: "790073468394",
  appId: "1:790073468394:web:1e7aaa7405ce247185be93",
  measurementId: "G-9W2NC75E2F"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
