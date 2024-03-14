import { ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import axios from 'axios';
import SideNavBar from '../components/NewNavBar';
import logoLight from '../assets/1-white.svg'
import logoDark from '../assets/strive1.svg'

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
}

interface LocationInfo {
  location_name: string;
}

interface JobInfo {
  job_title: string;
}

interface DepartmentInfo {
  department_name: string;
}

export default function Admin() {
  const [employeeInfo, setEmployInfo] = useState<EmployeeInfo>({
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
  });

  const [locationName, setLocationName] = useState<LocationInfo>({
    location_name: '',
  });

  function handleLocationData(e: ChangeEvent<HTMLInputElement>) {
    setLocationName({ ['location_name']: e.target.value });
  }

  async function postLocationData(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    axios
      .post(`${LOCALDB_URL + 'locations'}`, locationName)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [jobName, setJobName] = useState<JobInfo>({
    job_title: '',
  });

  function handleJobData(e: ChangeEvent<HTMLInputElement>) {
    setJobName({ ['job_title']: e.target.value });
  }

  async function postJobData(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    axios
      .post(`${LOCALDB_URL + 'jobs'}`, jobName)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [departmentName, setDepartmentName] = useState<DepartmentInfo>({
    department_name: '',
  });

  function handleDepartmentData(e: ChangeEvent<HTMLInputElement>) {
    setDepartmentName({ ['department_name']: e.target.value });
  }

  async function postDepartmentData(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    axios
      .post(`${LOCALDB_URL + 'departments'}`, departmentName)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleEmployeeInfo(e: ChangeEvent<HTMLInputElement>) {
    setEmployInfo({ ...employeeInfo, [e.target.name]: e.target.value });
  }

  async function handleAddEmployeeData(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    axios
      .post(`${LOCALDB_URL + 'employees'}`, employeeInfo)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  interface Jobs {
    id: number;
    job_title: string;
  }
  const [jobData, setJobData] = useState<Jobs[] | null>();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${LOCALDB_URL + 'jobs'}`);
        setJobData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  interface Departments {
    id: number;
    department_name: string;
  }

  const [departments, setDepartments] = useState<Departments[] | null>();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${LOCALDB_URL + 'departments'}`);
        setDepartments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }, []);

  interface Locations {
    id: number;
    location_name: string;
    number_of_staff: number;
  }

  const [locations, setLocations] = useState<Locations[] | null>();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${LOCALDB_URL + 'locations'}`);
        setLocations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <>
      <SideNavBar />

      <div className='fixed flex flex-row items-center place-content-center text-3xl top-0 md:left-40 z-10 h-20 w-full bg-white border-b-2 border-gray-400 dark:bg-[#212020] dark:text-gray-300'>
          <div>Admin</div>
        </div>
        
        <div className='fixed flex flex-row border-b-2 border-gray-400 justify-center h-20 top-0 z-20 bg-white sm:hidden dark:bg-[#212020]'>
          <img src={logoDark} alt="logo-dark" className='sm:w-10 sm:h-10 w-20 h-20 block dark:hidden'/>
          <img src={logoLight} alt="logo-light" className='sm:w-10 sm:h-10 w-20 h-20 hidden dark:block'/>
        </div>

        <form className='absolute flex flex-col items-center top-20 p-10 w-full h-screen gap-6 overflow-auto sm:left-20 md:left-40 md:grid md:grid-cols-2 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto bg-white dark:bg-[#212020]'>
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
        </form>
      



       


    </>
  );
}



{/* <form className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-sm">
  <div>
    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
    <input type="text" id="first-name" name="first-name" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
  </div>
  
  <div>
    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
    <input type="text" id="last-name" name="last-name" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
  </div>
  
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input type="email" id="email" name="email" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com"/>
  </div>
  
  <button type="submit" className="mt-3 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
    Submit
  </button>
</form> */}