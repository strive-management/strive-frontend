import Input from '../components/ui/Input';
import Label from '../components/ui/Label';

import Sidebar from './SideBar';

export default function Admin() {
  return (
    <>
      <div className="">
        <Sidebar />
        <div className="flex items-center justify-around ml-64 h-min mt-5 pb-2 gap-20 border-b-2 ">
          <div className="">
            <h1 className="font-medium">ADMIN</h1>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  block w-full p-1.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white "
            />
          </div>
        </div>
        <main className="ml-64 mt-5 p-5">
          <h1 className="font-medium text-xl">Applicants Personal info</h1>
          <div className="flex justify-around mt-5">
            <div className="">
              <Label text={'First Name'} />
              <Input type={'text'} placeholder="First Name" />
            </div>
            <div>
              <Label text={'Last Name'} />
              <Input type={'text'} placeholder="Last Name" />
            </div>
          </div>
          <div className="flex justify-around mt-5">
            <div className="">
              <Label text={'Email'} />
              <Input type={'email'} placeholder="Email" />
            </div>
            <div>
              <Label text={'Phone Number'} />
              <Input type={'phone'} placeholder="Phone Number" />
            </div>
          </div>
          <label className="font-medium text-lg">Address</label>
          <div className=" w-1/5 mt-5 ml-28">
            <Label text={'Zip Code'} />
            <Input type={'number'} placeholder="Zip Code" />
          </div>
          <div className="flex justify-around mt-5">
            <div className="">
              <Label text={'Country'} />
              <Input type={'text'} placeholder="City" />
            </div>
            <div>
              <Label text={'City'} />
              <Input type={'text'} placeholder="City" />
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-10 ml-28">
            <div className="w-1/2">
              <Input type={'text'} placeholder="Address line 1" />
            </div>
            <div className="w-1/2">
              <Input type={'text'} placeholder="Address line 2" />
            </div>
          </div>
          <label className="font-medium text-lg">Role</label>
          <div className="flex justify-around mt-5">
            <div className="">
              <Label text={'Manager'} />
              <Input type={'text'} placeholder="Select manager" />
            </div>
            <div>
              <Label text={'Location'} />
              <Input type={'text'} placeholder="Select Location" />
            </div>
          </div>
          <div className="flex justify-end mx-28 ">
            <button
              type="submit"
              className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              send
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
