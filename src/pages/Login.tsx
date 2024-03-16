import { Link, useNavigate } from 'react-router-dom';
import logoLightMode from '../assets/strive2.svg';
import logoDarkMode from '../assets/2-white.svg';
import Input from '../components/ui/Input';
import { auth } from '../firebase/firebase';
import { useRef, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from '../services/authService';
import useOutsideClick from '../hook/useOutsideClick';

export default function Login() {
  const navigate = useNavigate();
  const signinRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleGoogleSignIn = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');
    try {
      await loginWithEmailAndPassword(credentials.email, credentials.password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  function handlePwdReset() {
    const email = prompt('Please enter your email ');

    if (email !== null) {
      sendPasswordResetEmail(auth, email);
      alert('Email sent! Check your inbox for reset instructions');
    } else {
      alert('Invalid email');
    }
  }
  useOutsideClick(signinRef, () => {
    navigate('/');
  });

  return (
    <>
      <div
        ref={signinRef}
        className="flex flex-col items-center justify-center px-6 py-8 mx-auto bg-white dark:bg-[#1a0429] md:h-screen lg:py-0"
      >
        <div>
          <img className="w-40 block dark:hidden" src={logoLightMode} alt="" />
          <img className="w-40 hidden dark:block" src={logoDarkMode} alt="" />
        </div>
        <form className="w-11/12 flex flex-col sm:w-2/5 p-6 order-solid border-2 border-[#c0f2fc] bg-white dark:bg-[#1a0429] dark:border-[#75c479] rounded-xl">
          <h3 className="text-center mb-5 text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-gray-300">
            Login
          </h3>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Input
              type={'email'}
              name="email"
              placeholder=""
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Input
              type={'password'}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder=""
            />
          </div>

          <div className="flex flex-row justify-evenly">
            <button
              type="submit"
              onClick={handleLogin}
              className="text-gray-700 bg-[#c0f2fc] hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#75c479] dark:hover:bg-[#58945b] dark:focus:ring-gray-800"
            >
              Login
            </button>
            <Link
              to="/"
              className="text-gray-700 bg-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Go Back
            </Link>
          </div>
          <a
            onClick={handlePwdReset}
            className="text-xs pt-6 text-center"
            href="#"
          >
            Forgot Password?
          </a>
          <div className="text-sm text-center">
            Not registered yet ?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign in
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
              onClick={handleGoogleSignIn}
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
