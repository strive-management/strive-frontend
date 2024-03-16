import { ChangeEvent, useState, useEffect } from 'react';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import axios from 'axios';
import SideNavBar from '../components/SideNavBar';
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
      <SideNavBar />
      <div className='flex flex-row place-content-start pl-[300px] items-center bg-gray-300 dark:bg-[#503270] w-full h-20'>
        <h1
          style={{ fontFamily: "'Lato', sans-serif" }}
          className='text-gray-700 text-xl place-content-center'
        >
          Admin
        </h1>
      </div>
      <div className=''>
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
          <form onSubmit={handleSubmit}>
            <div className='flex justify-around mt-5'>
              <div>
                <Label text={'Work Location'} />
                <Select
                  name='location_name'
                  value={employeeInfo.location_name}
                  onChange={handleChange}
                  options={options.locations.map((option) => ({
                    id: option.id,
                    name: option.location_name,
                  }))}
                  defaultOption='Select Location'
                  includeAddNew={true}
                  onAddNew={() => handleAddNew('locations')}
                />
              </div>
              <div className=''>
                <Label text={'First Name'} />
                <Input
                  type={'text'}
                  name='first_name'
                  value={employeeInfo.first_name}
                  onChange={handleChange}
                  placeholder='First Name'
                />
              </div>
              <div>
                <Label text={'Last Name'} />
                <Input
                  type={'text'}
                  name='last_name'
                  value={employeeInfo.last_name}
                  onChange={handleChange}
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
                  value={employeeInfo.email}
                  onChange={handleChange}
                  placeholder='Email'
                />
              </div>
              <div>
                <Label text={'Phone Number'} />
                <Input
                  type={'tel'}
                  name='phone_number'
                  value={employeeInfo.phone_number}
                  onChange={handleChange}
                  placeholder='Phone Number'
                />
              </div>
              <div>
                <Label text={'Job'} />
                <Select
                  name='job_title'
                  value={employeeInfo.job_title}
                  onChange={handleChange}
                  options={options.jobs.map((option) => ({
                    id: option.id,
                    name: option.job_title, // Assuming your data source has 'department_name'
                  }))}
                  defaultOption='Select Job'
                  includeAddNew={true}
                  onAddNew={() => handleAddNew('jobs')}
                />
              </div>
              <div>
                <Label text={'Department'} />
                <Select
                  name='department_name'
                  value={employeeInfo.department_name}
                  onChange={handleChange}
                  options={options.departments.map((option) => ({
                    id: option.id,
                    name: option.department_name, // Assuming your data source has 'department_name'
                  }))}
                  defaultOption='Select Department'
                  includeAddNew={true}
                  onAddNew={() => handleAddNew('departments')}
                />
              </div>
            </div>
            <label className='font-medium text-lg'>Address</label>
            <div className=' w-1/5 mt-5 ml-28'>
              <Label text={'Zip Code'} />
              <Input
                type={'number'}
                name='zipcode'
                value={employeeInfo.zipcode}
                onChange={handleChange}
                placeholder='Zip Code'
              />
            </div>
            <div className='flex justify-around mt-5'>
              <div className=''>
                <Label text={'Country'} />
                <Input
                  type={'text'}
                  name='country'
                  value={employeeInfo.country}
                  onChange={handleChange}
                  placeholder='City'
                />
              </div>
              <div>
                <Label text={'City'} />
                <Input
                  type={'text'}
                  name='city'
                  value={employeeInfo.city}
                  onChange={handleChange}
                  placeholder='City'
                />
              </div>
            </div>
            <div className='flex flex-col gap-5 mt-10 ml-28'>
              <div className='w-1/2'>
                <Input
                  type={'text'}
                  name='address_1'
                  value={employeeInfo.address_1}
                  onChange={handleChange}
                  placeholder='Address line 1'
                />
              </div>
              <div className='w-1/2'>
                <Input
                  type={'text'}
                  name='address_2'
                  value={employeeInfo.address_2}
                  onChange={handleChange}
                  placeholder='Address line 2'
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
            <div className='flex justify-around mt-5'>
              <div className=''>
                <Label text={'Manager'} />
                <Input
                  type={'number'}
                  name='manager'
                  value={employeeInfo.manager_id || ''}
                  onChange={handleChange}
                  placeholder="Input your manager's id number here"
                />
              </div>
            </div>
            <div className='flex justify-end mx-28 '>
              <button
                type='submit'
                className='mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
              >
                Send
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
