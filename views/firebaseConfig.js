import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDu3Fp0s6tb_g-JEQ_iG7AeCw6mmXZb2Mw",
    authDomain: "zippydlvr.firebaseapp.com",
    projectId: "zippydlvr",
    storageBucket: "zippydlvr.appspot.com",
    messagingSenderId: "386251947854",
    appId: "1:386251947854:web:5fc93ed6bee1da4e4a281f"
};

const app = initializeApp(firebaseConfig);

export default app;
