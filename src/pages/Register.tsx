import { Link, useNavigate } from 'react-router-dom';
import logoLightMode from '../assets/strive2.svg';
import logoDarkMode from '../assets/2-white.svg';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import { ChangeEvent, useState } from 'react';
import { auth } from '../firebase/firebase';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithPopup,
} from 'firebase/auth';
import axios from 'axios';

interface RegistrationData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        registrationData.email,
        registrationData.password
      );

      const postData = {
        email: user.email,
        first_name: registrationData.firstName,
        last_name: registrationData.lastName,
        UUID: user.uid,
      };

      await axios.post(`${LOCALDB_URL}users`, postData);

      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  const handleGoogleSignup = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const { user } = result;
      const userInfo = getAdditionalUserInfo(result);
      const data = {
        email: userInfo?.profile?.email ?? '',
        first_name: userInfo?.profile?.given_name ?? '',
        last_name: userInfo?.profile?.family_name ?? '',
        UUID: user.uid,
      };

      await axios.post(`${LOCALDB_URL}users`, data);
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error data:', error.response?.data);
        setError('Google sign-up failed. Please try again.');
      } else {
        console.error('Error during Google sign-up:', error);
        setError('Unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto bg-white dark:bg-[#1a0429] md:h-screen lg:py-0">
        <div>
          <img className="w-40 block dark:hidden" src={logoLightMode} alt="" />
          <img className="w-40 hidden dark:block" src={logoDarkMode} alt="" />
        </div>
        <form className="w-11/12 flex flex-col sm:w-2/5 p-6 order-solid border-2 border-[#c0f2fc] bg-white dark:bg-[#1a0429] dark:border-[#75c479] rounded-xl">
          <h3 className="text-center mb-5 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-300">
            Register
          </h3>
          <div className="mb-5">
            <Label text={'First Name'} />
            <Input
              type={'text'}
              placeholder=""
              name="firstName"
              value={registrationData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <Label text={'Last Name'} />
            <Input
              type={'text'}
              placeholder=""
              name="lastName"
              value={registrationData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <Label text={'Email'} />
            <Input
              type={'email'}
              name="email"
              placeholder=""
              value={registrationData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <Label text={'Password'} />
            <Input
              type={'password'}
              name="password"
              placeholder=""
              value={registrationData.password}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="mb-5">
            <Label text={'Confirm password'} />
            <Input type={'password'} placeholder="" />
          </div> */}
          <br />
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-gray-700 bg-[#d3ebf9] hover:bg-[#92c9f9] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-gray-700 dark:bg-[#c982f9] dark:hover:bg-[#905593] dark:focus:ring-gray-800"
          >
            Register
          </button>
          <div className="text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </div>

          {/* firebase error handling */}

          {error && <div className="text-red-500">{error}</div>}

          <div className="my-12 border-t text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium transform translate-y-1/2">
              Or
            </div>
          </div>
          <div className="flex gap-10 items-center justify-center">
            <button
              onClick={handleGoogleSignup}
              className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[#d3ebf9] hover:bg-[#92c9f9] dark:bg-[#c982f9] dark:hover:bg-[#905593] text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
            >
              <div className="bg-white p-2 rounded-full">
                <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                    fill="#34a853"
                  />
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="#ea4335"
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
