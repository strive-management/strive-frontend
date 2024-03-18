import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};
