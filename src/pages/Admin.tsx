import { ChangeEvent, useState, useEffect } from 'react';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import axios from 'axios';
import logoLight from '../assets/2-white.svg';
import logoDark from '../images/strive1.svg';
import Select from '../components/ui/Select';
import InputModal from '../components/ui/InputModal';

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface EmployeeInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  job_title: string;
  department_name: string;
  city: string;
  address_1: string;
  address_2: string;
  zipcode: string;
  country: string;
  location_name: string;
  manager_id: number | null;
}
interface Option {
  id: number;
  [key: string]: string | number; // Allow any string or number property
}
interface OptionsState {
  jobs: Option[];
  departments: Option[];
  locations: Option[];
  [key: string]: Option[];
}

export default function Admin() {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    job_title: '',
    department_name: '',
    city: '',
    address_1: '',
    address_2: '',
    zipcode: '',
    country: '',
    location_name: '',
    manager_id: null,
  });
  const [options, setOptions] = useState<OptionsState>({
    jobs: [],
    departments: [],
    locations: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updatedValue =
      name === 'manager_id' ? (value === '' ? '' : Number(value)) : value;

    setEmployeeInfo((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${LOCALDB_URL}employees`, { ...employeeInfo });
      console.log('Employee added successfully');
      // Optionally reset form or handle success further
    } catch (error) {
      console.error('Error adding employee: ', error);
      // Handle error
    }
  };
  const handleAddNew = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };
  const handleModalSubmit = async (newValue: string, type: string) => {
    let payload;

    switch (type) {
      case 'locations':
        payload = { location_name: newValue };
        break;
      case 'jobs':
        payload = { job_title: newValue };
        break;
      case 'departments':
        payload = { department_name: newValue };
        break;
      default:
        console.error(`Unhandled type: ${type}`);
        return;
    }
    try {
      const response = await axios.post(`${LOCALDB_URL}${type}`, payload);
      const newItem = response.data;

      setOptions((prev) => ({
        ...prev,
        [type]: [...prev[type], { id: newItem.id, name: newValue }],
      }));
      setShowModal(false);
    } catch (error) {
      console.error(`Error adding new ${type}: `, error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, departmentsResponse, locationsResponse] =
          await Promise.all([
            axios.get(`${LOCALDB_URL}jobs`),
            axios.get(`${LOCALDB_URL}departments`),
            axios.get(`${LOCALDB_URL}locations`),
          ]);
        setOptions({
          jobs: jobsResponse.data,
          departments: departmentsResponse.data,
          locations: locationsResponse.data,
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>


<div className='fixed flex flex-row items-center place-content-center text-3xl top-0 md:left-40 z-10 h-20 w-full bg-white border-b-2 border-gray-400 dark:bg-[#212020] dark:text-gray-300'>
          <div>Admin</div>
        </div>
        <div className='md:fixed flex flex-row border-b-2 border-gray-400 justify-center h-20 top-0 z-20 bg-white md:hidden dark:bg-[#212020]'>
          <img src={logoDark} alt="logo-dark" className='sm:w-10 sm:h-10 w-20 h-20 block dark:hidden'/>
          <img src={logoLight} alt="logo-light" className='sm:w-10 sm:h-10 w-20 h-20 hidden dark:block'/>
        </div>

        <div>
          <h1>Employee Basic Info</h1>
        </div>

        <form className='absolute flex flex-col items-center top-20 p-10 w-full gap-6 overflow-auto rounded-xl sm:left-20 md:left-40 md:grid md:grid-cols-2 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto bg-white dark:bg-[#212020]'>
        
        <div className='flex flex-col border-2 p-10 rounded-2xl'>
          <div>
            <label htmlFor="first-name" className="block text-xl font-medium text-gray700 dark:text-gray-300">First Name</label>
            <input type="text" id="first-name" name="first-name" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-xl font-medium text-gray700 dark:text-gray-300">Last Name</label>
            <input type="text" id="last-name" name="last-name" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-xl font-medium text-gray700 dark:text-gray-300">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="phone" className="block text-xl font-medium text-gray700 dark:text-gray-300">Phone Number</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>

      
        <div className='flex flex-col border-2 p-10 rounded-2xl'>
        <div>
          <label htmlFor="postal-code" className="block text-xl font-medium text-gray700 dark:text-gray-300">Postal Code</label>
          <input type="text" id="postal-code" name="postal-code" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
          <label htmlFor="address-line-one" className="block text-xl font-medium text-gray700 dark:text-gray-300">Address Line 1</label>
          <input type="text" id="address-line-one" name="address-line-one" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
          <label htmlFor="address-line-one" className="block text-xl font-medium text-gray700 dark:text-gray-300">Address Line 2</label>
          <input type="text" id="address-line-one" name="address-line-one" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
          <label htmlFor="city" className="block text-xl font-medium text-gray700 dark:text-gray-300">City</label>
          <input type="text" id="city" name="city" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
          <label htmlFor="Country" className="block text-xl font-medium text-gray700 dark:text-gray-300">Country</label>
          <input type="text" id="Country" name="Country" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        </div>

        <div className='flex flex-col border-2 p-10 rounded-2xl'>
          <Label text={'Work Location'} />
            {/* <Select
                    name="location_name"
                    value={employeeInfo.location_name}
                    onChange={handleChange}
                    options={options.locations.map((option) => ({
                      id: option.id,
                      name: option.location_name,
                    }))}
                    defaultOption="Select Location"
                    includeAddNew={true}
                    onAddNew={() => handleAddNew('locations')}
                  /> */}

          <Label text={'Job'} />
            {/* <Select
              name="job_title"
              value={employeeInfo.job_title}
              onChange={handleChange}
              options={options.jobs.map((option) => ({
                id: option.id,
                name: option.job_title, // Assuming your data source has 'department_name'
              }))}
              defaultOption="Select Job"
              includeAddNew={true}
              onAddNew={() => handleAddNew('jobs')}
            /> */}

          <Label text={'Department'} />
            {/* <Select
              name="department_name"
              value={employeeInfo.department_name}
              onChange={handleChange}
              options={options.departments.map((option) => ({
                id: option.id,
                name: option.department_name, // Assuming your data source has 'department_name'
              }))}
              defaultOption="Select Department"
              includeAddNew={true}
              onAddNew={() => handleAddNew('departments')}
            /> */}
        </div>

        <div className='flex flex-col border-2 p-10 rounded-2xl'>
          <div className="">
            <Label text={'Manager ID'} />
              <Input
              type={'number'}
              name="manager"
              value={employeeInfo.manager_id || ''}
              onChange={handleChange}
              placeholder=""
            />
          </div>
        </div>

        <div className='flex flex-row border-2 p-10 gap-4 rounded-2xl'>
          <button
            type="submit"
            className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Send
          </button>
          <button
            type="button"
            className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Cancel
          </button>
        </div>

        </form>






    </>
  );
}




{/* <div className="flex flex-row place-content-start pl-[300px] items-center bg-gray-300 dark:bg-[#212020] w-full h-20">
        <h1
          style={{ fontFamily: "'Lato', sans-serif" }}
          className="text-gray-700 text-xl place-content-center"
        >
          Admin
        </h1>
      </div>
      <div className="">
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
          <form onSubmit={handleSubmit}>
            <div className="flex justify-around mt-5">
              <div>
                <Label text={'Work Location'} />
                <Select
                  name="location_name"
                  value={employeeInfo.location_name}
                  onChange={handleChange}
                  options={options.locations.map((option) => ({
                    id: option.id,
                    name: option.location_name,
                  }))}
                  defaultOption="Select Location"
                  includeAddNew={true}
                  onAddNew={() => handleAddNew('locations')}
                />
              </div>
              <div className="">
                <Label text={'First Name'} />
                <Input
                  type={'text'}
                  name="first_name"
                  value={employeeInfo.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div>
                <Label text={'Last Name'} />
                <Input
                  type={'text'}
                  name="last_name"
                  value={employeeInfo.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex justify-around mt-5">
              <div className="">
                <Label text={'Email'} />
                <Input
                  type={'email'}
                  name="email"
                  value={employeeInfo.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div>
                <Label text={'Phone Number'} />
                <Input
                  type={'tel'}
                  name="phone_number"
                  value={employeeInfo.phone_number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <Label text={'Job'} />
                <Select
                  name="job_title"
                  value={employeeInfo.job_title}
                  onChange={handleChange}
                  options={options.jobs.map((option) => ({
                    id: option.id,
                    name: option.job_title, // Assuming your data source has 'department_name'
                  }))}
                  defaultOption="Select Job"
                  includeAddNew={true}
                  onAddNew={() => handleAddNew('jobs')}
                />
              </div>
              <div>
                <Label text={'Department'} />
                <Select
                  name="department_name"
                  value={employeeInfo.department_name}
                  onChange={handleChange}
                  options={options.departments.map((option) => ({
                    id: option.id,
                    name: option.department_name, // Assuming your data source has 'department_name'
                  }))}
                  defaultOption="Select Department"
                  includeAddNew={true}
                  onAddNew={() => handleAddNew('departments')}
                />
              </div>
            </div>
            <label className="font-medium text-lg">Address</label>
            <div className=" w-1/5 mt-5 ml-28">
              <Label text={'Zip Code'} />
              <Input
                type={'number'}
                name="zipcode"
                value={employeeInfo.zipcode}
                onChange={handleChange}
                placeholder="Zip Code"
              />
            </div>
            <div className="flex justify-around mt-5">
              <div className="">
                <Label text={'Country'} />
                <Input
                  type={'text'}
                  name="country"
                  value={employeeInfo.country}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              <div>
                <Label text={'City'} />
                <Input
                  type={'text'}
                  name="city"
                  value={employeeInfo.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 mt-10 ml-28">
              <div className="w-1/2">
                <Input
                  type={'text'}
                  name="address_1"
                  value={employeeInfo.address_1}
                  onChange={handleChange}
                  placeholder="Address line 1"
                />
              </div>
              <div className="w-1/2">
                <Input
                  type={'text'}
                  name="address_2"
                  value={employeeInfo.address_2}
                  onChange={handleChange}
                  placeholder="Address line 2"
                />
              </div>
            </div>
            {showModal && (
              <InputModal
                type={modalType}
                onSubmit={handleModalSubmit}
                onClose={() => setShowModal(false)}
              />
            )}
            {/* <label className='font-medium text-lg'>Role</label> */}
      //       <div className="flex justify-around mt-5">
      //         <div className="">
      //           <Label text={'Manager'} />
      //           <Input
      //             type={'number'}
      //             name="manager"
      //             value={employeeInfo.manager_id || ''}
      //             onChange={handleChange}
      //             placeholder="Input your manager's id number here"
      //           />
      //         </div>
      //       </div>
      //       <div className="flex justify-end mx-28 ">
      //         <button
      //           type="submit"
      //           className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      //         >
      //           Send
      //         </button>
      //       </div>
      //     </form>
      //   </main>
      // </div> */}