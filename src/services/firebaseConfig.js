import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBatzmk9gxYv3B_0txg21Bqw27W9OfrXDI",
  authDomain: "quero-um-pet-c48d8.firebaseapp.com",
  projectId: "quero-um-pet-c48d8",
  storageBucket: "quero-um-pet-c48d8.appspot.com",
  messagingSenderId: "773991145084",
  appId: "1:773991145084:web:d56a83ca7a4a6ed833f3f9",
  measurementId: "G-VDEVR7E8DX"
};

const app = initializeApp(firebaseConfig);

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

export { auth };