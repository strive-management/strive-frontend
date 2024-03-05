import { Outlet } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <div>
        <h1>Welcome to Strive</h1>
        <Outlet />
      </div>
    </>
  );
}
