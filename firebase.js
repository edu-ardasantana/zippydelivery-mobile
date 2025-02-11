import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 
import { getDatabase } from "firebase/database";

const firebaseConfigStorage = {
  apiKey: "AIzaSyD4z9evoXL37mLO-QIiFUIrT6miELZRjb0",
  authDomain: "aula-app-bfebd.firebaseapp.com",
  projectId: "aula-app-bfebd",
  storageBucket: "aula-app-bfebd.appspot.com",
  messagingSenderId: "1038660596676",
  appId: "1:1038660596676:web:f27a2e1386ed9fd27bea91",
  measurementId: "G-DR9947NGM1"
};

const firebaseConfigDatabase = {
  apiKey: "AIzaSyDnakVsQl6AByQWxUdhMmU1ijqQ0jcadLA",
  authDomain: "zippydelivery-fea08.firebaseapp.com",
  projectId: "zippydelivery-fea08",
  storageBucket: "zippydelivery-fea08.firebasestorage.app",
  messagingSenderId: "236695575339",
  appId: "1:236695575339:web:1642aae2dc4ff80444836e",
  measurementId: "G-CVPX6HZEVP"
};

const appStorage = initializeApp(firebaseConfigStorage, "storageApp");
const storage = getStorage(appStorage);

const appDatabase = initializeApp(firebaseConfigDatabase, "databaseApp");
const db = getDatabase(appDatabase); 

export { storage, db };
