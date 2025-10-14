
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword,
        signOut} from "firebase/auth/cordova";
import { addDoc, 
        collection, 
        getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBmCjZMCrfTjI6dJaZ1ViegQyGLsaNWemk",
  authDomain: "netflix-clone-b4796.firebaseapp.com",
  projectId: "netflix-clone-b4796",
  storageBucket: "netflix-clone-b4796.firebasestorage.app",
  messagingSenderId: "607000095777",
  appId: "1:607000095777:web:6d7a9878b5b8a399b64760",
  measurementId: "G-26TH0J2J4H"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name , email , password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth , email , password);
        const user = res.user;
        await addDoc(collection(db , "user"),{
            uid : user.uid,
            name,
            authProvider : "local",
            email,
        });

    }catch (error){
        console.log(error);
        alert(error);
    }
}

const login = async (email,password)=>{
    try{
        signInWithEmailAndPassword(auth,email,password);
    }
    catch(error){
        console.log(error);
        alert(error);
    }
}

const logOut = ()=>{
    signOut(auth);
}

export {auth,db,login,logOut,signUp};