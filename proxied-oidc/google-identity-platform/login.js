import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth';
console.log("Setup...");
const firebaseConfig = {
    apiKey: "YOUR_CLOUD_IDENTITY_PLATFORM_APIKEY",
    authDomain: "YOUR_CLOUD_IDENTITY_PLATFORM_DOMAIN",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {/* extra options */ });

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          document.getElementById("message").innerHTML = "Welcome, " + user.email;
      }
      else {
          document.getElementById("message").innerHTML = "No user signed in.";
      }
  });
  //signIn();
});

function signIn(username, pw) {
    let email = username.value;
    let password = pw.value;
    //const email = "EMAIL_ID";
    //const password = "PASSWORD";
    console.log("signing in the user...");
    signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.log("Error occurred: " + error.message);
            document.getElementById("message").innerHTML = error.message;
        });
}

window.signIn = signIn;