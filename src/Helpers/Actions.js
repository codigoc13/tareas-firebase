import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCrERNgxw2BAi3RWz3Oad7b2neEJxh3t_M",
  authDomain: "tareas-c13.firebaseapp.com",
  projectId: "tareas-c13",
  storageBucket: "tareas-c13.appspot.com",
  messagingSenderId: "715326531956",
  appId: "1:715326531956:web:f6564712a79dbfa487e421",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getCollection = async (coll) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null,
  };
  try {
    const res = collection(db, coll);
    const data = await getDocs(res);
    const arrayData = data.docs.map((element) => ({
      id: element.id,
      ...element.data(),
    }));
    result.statusResponse = true;
    result.data = arrayData;
  } catch (error) {
    result.error = error;
  }
  return result;
};
