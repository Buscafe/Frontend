import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAd44NGKm2g5WgJA50eYIoqj4Fb3MH7xnM",
  authDomain: "buscafe-ddae6.firebaseapp.com",
  projectId: "buscafe-ddae6",
  storageBucket: "buscafe-ddae6.appspot.com",
  messagingSenderId: "356962829845",
  appId: "1:356962829845:web:e3d4a89c9b88e62581301c",
  measurementId: "G-FXMKT8MT0X"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
const analytics = getAnalytics(app);