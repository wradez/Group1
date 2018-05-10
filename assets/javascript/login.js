var config = {
    apiKey: "AIzaSyAEdWYT728WAyg2Nbuacq_wX9f81M7jI4I",
    authDomain: "what-s-for-dinner-76bbd.firebaseapp.com",
    databaseURL: "https://what-s-for-dinner-76bbd.firebaseio.com",
    projectId: "what-s-for-dinner-76bbd",
    storageBucket: "what-s-for-dinner-76bbd.appspot.com",
    messagingSenderId: "562329637910"
    };

  firebase.initializeApp(config);

  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignup = document.getElementById("btnSignup");
  const btnLogout = document.getElementById("btnLogout");

  btnLogin.addEventListener('click', e=> {
    const txtEmail = txtEmail.val;
    const txtPassword = txtPassword.val;
    const auth = firebase.auth();
    const promise = signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message))
    });

 

