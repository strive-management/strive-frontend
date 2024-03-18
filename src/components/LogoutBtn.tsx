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
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
