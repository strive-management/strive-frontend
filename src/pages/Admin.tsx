import { ChangeEvent, useState, MouseEvent } from 'react';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import Sidebar from './SideBar';
import axios from 'axios';

interface EmployeeInfo {
  first_name: String;
  last_name: String;
  email: String;
  phone_number: String;
  job_title: String;
  city: String;
  address_1: String;
  address_2: String;
  zipcode: String;
  country: String;
}

export default function Admin() {
  const [employeeInfo, setEmployInfo] = useState<EmployeeInfo>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    job_title: '',
    city: '',
    address_1: '',
    address_2: '',
    zipcode: '',
    country: '',
  });

  function handleEmployeeInfo(e: ChangeEvent<HTMLInputElement>) {
    setEmployInfo({ ...employeeInfo, [e.target.name]: e.target.value });
  }

  async function handleAddEmployeeData(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    axios
      .post('http://localhost:8080/employees', employeeInfo)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className=''>
        <Sidebar />
        <div className='flex items-center justify-around ml-64 h-min mt-5 pb-2 gap-20 border-b-2 '>
          <div className=''>
            <h1 className='font-medium'>ADMIN</h1>
          </div>
          <div className='flex items-center'>
            <input
              type='text'
              placeholder='Search'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  block w-full p-1.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white '
            />
          </div>
        </div>
        <main className='ml-64 mt-5 p-5'>
          <h1 className='font-medium text-xl'>Applicants Personal info</h1>
          <div className='flex justify-around mt-5'>
            <div className=''>
              <Label text={'First Name'} />
              <Input
                type={'text'}
                name='first_name'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='First Name'
              />
            </div>
            <div>
              <Label text={'Last Name'} />
              <Input
                type={'text'}
                name='last_name'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='Last Name'
              />
            </div>
          </div>
          <div className='flex justify-around mt-5'>
            <div className=''>
              <Label text={'Email'} />
              <Input
                type={'email'}
                name='email'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='Email'
              />
            </div>
            <div>
              <Label text={'Phone Number'} />
              <Input
                type={'phone'}
                name='phone_number'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='Phone Number'
              />
            </div>
            <div>
              <Label text={'Job'} />
              <Input
                type={'job'}
                name='job_title'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='job title'
              />
            </div>
          </div>
          <label className='font-medium text-lg'>Address</label>
          <div className=' w-1/5 mt-5 ml-28'>
            <Label text={'Zip Code'} />
            <Input
              type={'number'}
              name='zipcode'
              onChange={(e) => handleEmployeeInfo(e)}
              placeholder='Zip Code'
            />
          </div>
          <div className='flex justify-around mt-5'>
            <div className=''>
              <Label text={'Country'} />
              <Input
                type={'text'}
                name='country'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='City'
              />
            </div>
            <div>
              <Label text={'City'} />
              <Input
                type={'text'}
                name='city'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='City'
              />
            </div>
          </div>
          <div className='flex flex-col gap-5 mt-10 ml-28'>
            <div className='w-1/2'>
              <Input
                type={'text'}
                name='address_1'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='Address line 1'
              />
            </div>
            <div className='w-1/2'>
              <Input
                type={'text'}
                name='address_2'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='Address line 2'
              />
            </div>
          </div>
          <label className='font-medium text-lg'>Role</label>
          <div className='flex justify-around mt-5'>
            <div className=''>
              <Label text={'Manager'} />
              <Input
                type={'text'}
                name='manager'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='Select manager'
              />
            </div>
            <div>
              <Label text={'Location'} />
              <Input
                type={'text'}
                name='location'
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder='Select Location'
              />
            </div>
          </div>
          <div className='flex justify-end mx-28 '>
            <button
              type='submit'
              onClick={(e) => {
                handleAddEmployeeData(e);
              }}
              className='mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            >
              send
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
