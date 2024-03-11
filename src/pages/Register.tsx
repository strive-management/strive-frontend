import { Link } from 'react-router-dom';
import logo from '../assets/strive2.svg';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import { ChangeEvent, MouseEvent, useState } from 'react';
import auth from '../firebase/firebase';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithPopup,
} from 'firebase/auth';

interface UserCredentials {
  email: string;
  password: string;
}
const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;
export default function Register() {
  const [error, setError] = useState('');
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email: '',
    password: '',
  });
  const [firstName, setFirstName] = useState<String>();
  const [lastName, setLastname] = useState<String>();

  function handleCredentials(e: ChangeEvent<HTMLInputElement>) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }
  const handleGoogle = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const userInfo = getAdditionalUserInfo(result);
        const email = userInfo?.profile.email; // it's not a problem if it's null
        const lastName = userInfo?.profile.family_name; // it's not a problem if it's null
        const firstName = userInfo?.profile.given_name; // it's not a problem if it's null
        const uid = user.uid;
        const data = {
          email: email,
          first_name: firstName,
          last_name: lastName,
          UUID: uid,
        };
        return fetch(`${LOCALDB_URL + 'users'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      })
      .catch((error: any) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.customData.email;
        console.log(email);
      });
  };

  async function handleSignup(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    setError('');

    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        const email = userCredentials.user.email;
        const data = {
          email: email,
          first_name: firstName,
          last_name: lastName,
          UUID: uid,
        };
        return fetch(`${LOCALDB_URL + 'users'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div>
          <img className='w-40' src={logo} alt='' />
        </div>
        <form className='w-11/12 flex flex-col lg:w-1/3'>
          <h3 className='text-center mb-5 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Register
          </h3>
          <div className='mb-5'>
            <Label text={'First Name'} />
            <Input
              type={'text'}
              placeholder='First Name'
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className='mb-5'>
            <Label text={'Last Name'} />
            <Input
              type={'text'}
              placeholder='Last Name'
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>
          <div className='mb-5'>
            <Label text={'Email'} />
            <Input
              type={'email'}
              name='email'
              onChange={(e) => {
                handleCredentials(e);
              }}
              placeholder='email'
            />
          </div>
          <div className='mb-5'>
            <Label text={'Password'} />
            <Input
              type={'password'}
              name='password'
              onChange={(e) => {
                handleCredentials(e);
              }}
              placeholder='password'
            />
          </div>
          <div className='mb-5'>
            <Label text={'Confirm password'} />
            <Input type={'password'} placeholder='Confirm password' />
          </div>
          <button
            onClick={(e) => {
              handleSignup(e);
            }}
            type='submit'
            className='text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
          >
            Login
          </button>
          <Link
            className='text-sm font-light text-gray-500 dark:text-gray-400'
            to='/login'
          >
            Already have an account ?
          </Link>

          {/* firebase error handling */}

          {error && <div className='text-red-500'>{error}</div>}

          <div className='my-12 border-b text-center'>
            <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
              Or
            </div>
          </div>
          <div className='flex gap-10 items-center justify-center'>
            <button
              onClick={(e) => {
                handleGoogle(e);
              }}
              className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
            >
              <div className='bg-white p-2 rounded-full'>
                <svg className='w-4' viewBox='0 0 533.5 544.3'>
                  <path
                    d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                    fill='#4285f4'
                  />
                  <path
                    d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                    fill='#34a853'
                  />
                  <path
                    d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                    fill='#fbbc04'
                  />
                  <path
                    d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                    fill='#ea4335'
                  />
                </svg>
              </div>
            </button>

            <button className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'>
              <div className='bg-white p-1 rounded-full'>
                <svg className='w-6' viewBox='0 0 32 32'>
                  <path
                    fill-rule='evenodd'
                    d='M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z'
                  />
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
