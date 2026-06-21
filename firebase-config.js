import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Kullanıcının Firebase Kimlik Bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyCbaZKxKCVDHPgf1ePDDu2mfwAx3Y04UpI",
  authDomain: "kitoox-blog.firebaseapp.com",
  projectId: "kitoox-blog",
  storageBucket: "kitoox-blog.firebasestorage.app",
  messagingSenderId: "359071486731",
  appId: "1:359071486731:web:02008a73021892a0e1880e",
  measurementId: "G-GET7G4C2LH"
};

// Firebase'i Başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Diğer dosyalarda kullanabilmek için dışarı aktar
export { db, storage, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where, serverTimestamp, ref, uploadBytesResumable, getDownloadURL };
