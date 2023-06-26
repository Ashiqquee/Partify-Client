import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyA3uiw_wNZuK51QwwwHKAVnCCBpfgw701E",
    authDomain: "partify-c6972.firebaseapp.com",
    projectId: "partify-c6972",
    storageBucket: "partify-c6972.appspot.com",
    messagingSenderId: "746913402135",
    appId: "1:746913402135:web:562a14b68fbe4cc8a8bb52",
    measurementId: "G-3V320ZNLHH"
};
let Firebase = initializeApp(firebaseConfig)
const auth = getAuth(Firebase)

export { Firebase, auth };