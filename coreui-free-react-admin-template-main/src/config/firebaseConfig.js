// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB5SqaDYyCN-bEZISpBuNatfq843btuB_M',
  authDomain: 'ma-training-consulting.firebaseapp.com',
  projectId: 'ma-training-consulting',
  storageBucket: 'ma-training-consulting.appspot.com',
  messagingSenderId: '361985170867',
  appId: '1:361985170867:web:feb8aa0f1388921c85ffc6',
  measurementId: 'G-PM8EVWS9DQ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
