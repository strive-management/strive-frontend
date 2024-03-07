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
            <h1>ADMIN</h1>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  block w-full p-1.5"
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
        </main>
      </div>
    </>
  );
}
