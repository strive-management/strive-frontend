import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

export default function LogoutBtn() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      await axios.post(`${LOCALDB_URL}logout`);
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };
  return (
    <>
      <div>
        <button className='text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800' onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
