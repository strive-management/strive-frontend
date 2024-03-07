import logo from '../assets/strive1.svg';
import SideAdmin from '../components/SideAdmin';

export default function Admin() {
  return (
    <>
      <div className="flex">
        <SideAdmin />
        <div>
          <header className="flex gap-60 w-full h-min">
            <div className="flex items-center gap-20">
              <img src={logo} alt="" className=" w-24" />
              <h1>ADMIN</h1>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  block w-full p-1.5"
              />
            </div>
          </header>
          <main></main>
        </div>
      </div>
    </>
  );
}
