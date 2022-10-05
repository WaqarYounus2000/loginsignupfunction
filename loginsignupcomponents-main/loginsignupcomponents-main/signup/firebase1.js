import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { doc, setDoc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBd4jTG7RWe6guSsNMwCESg-SmgEygcR2c",
    authDomain: "loginsignup-eef41.firebaseapp.com",
    projectId: "loginsignup-eef41",
    storageBucket: "loginsignup-eef41.appspot.com",
    messagingSenderId: "810934973982",
    appId: "1:810934973982:web:c9a33d2e3f2e75557b200f",
    measurementId: "G-QYQH4Z2T8V"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const database = getDatabase();
const db = getFirestore();


function signupfunction(email, password, fullname, fathername, dateofbirth, phonenumber) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            // storing data to firestore database
            await setDoc(doc(db, "users", user.uid), {
                Email: email,
                Password: password,
                Fullname: fullname,
                FatherName: fathername,
                Dateofbirth: dateofbirth,
                Phonenumber: phonenumber,
            });
            swal("Congratulation!", "Your Account Has been Created Successfully!", "success");
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log("Email sent");
                })
                .catch((err) => console.log(err));
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Erro==> ", errorMessage)
            swal({
                icon: "error",
                title: errorCode
            });
            // ..
        });

}


function Loginfunction(email, password) {
    return new Promise(function (myResolve, myReject) {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {

                const user = userCredential.user;
                // swal("Log in successfull!", '', "success");
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("/////////////Document data:////////////////", docSnap.data());
                    let DATA = docSnap.data();
                    myResolve(DATA)

                } else {
                    console.log("No such document!");
                }


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                email = '';
                password = '';
                console.log(errorMessage)
                swal({
                    icon: "error",
                    title: errorCode
                });
                myReject(error)

            });
    })
}

function UserloggedOut() {
    auth.signOut().then(() => {
        alert('user logged out')
    })
}





export { signupfunction, Loginfunction, UserloggedOut };