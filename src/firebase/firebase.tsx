import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBbdxXF20Yu33dKfrrBQ0xUiDdPG_tU8PI',
  authDomain: 'strive-dac54.firebaseapp.com',
  projectId: 'strive-dac54',
  storageBucket: 'strive-dac54.appspot.com',
  messagingSenderId: '46093948887',
  appId: '1:46093948887:web:84f7fc6b4902f517de5d92',
  measurementId: 'G-941NTFJXLE',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
