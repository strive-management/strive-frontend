import { Link } from 'react-router-dom';

export default function SideAdmin() {
  return (
    <>
      <div className="flex flex-col items-center justify-around w-1/5 h-screen">
        <div className="">
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="">Products</Link>
            </li>
            <li>
              <Link to="">Schedule</Link>
            </li>
            <li>
              <Link to="">Admin</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <Link to="">Settings</Link>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
