import { ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import axios from 'axios';
import SideNavBar from '../components/SideNavBar';

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
      <div className="flex flex-row place-content-start pl-[300px] items-center bg-gray-300 dark:bg-[#503270] w-full h-20">
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
          <div className="flex justify-around mt-5">
            <div>
              <Label text={'Work Location'} />
              <select
                onChange={(e) => {
                  setEmployInfo({
                    ...employeeInfo,
                    location_name: e.target.value,
                  });
                }}
              >
                <option>Select Location</option>
                {locations
                  ? locations.map((location) => {
                      return (
                        <option
                          key={location.id as number}
                          value={location.location_name as string}
                        >
                          {location.location_name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="">
              <Label text={'First Name'} />
              <Input
                type={'text'}
                name="first_name"
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder="First Name"
              />
            </div>
            <div>
              <Label text={'Last Name'} />
              <Input
                type={'text'}
                name="last_name"
                onChange={(e) => handleEmployeeInfo(e)}
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
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder="Email"
              />
            </div>
            <div>
              <Label text={'Phone Number'} />
              <Input
                type={'phone'}
                name="phone_number"
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder="Phone Number"
              />
            </div>
            <div>
              <Label text={'Job'} />
              <select
                onChange={(e) => {
                  setEmployInfo({
                    ...employeeInfo,
                    job_title: e.target.value,
                  });
                }}
              >
                <option>Select Job</option>
                {jobData
                  ? jobData.map((job) => {
                      return (
                        <option
                          key={job.id as number}
                          value={job.job_title as string}
                        >
                          {job.job_title}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div>
              <Label text={'Department'} />
              <select
                onChange={(e) => {
                  setEmployInfo({
                    ...employeeInfo,
                    department_name: e.target.value,
                  });
                }}
              >
                <option>Select Department</option>
                {departments
                  ? departments.map((department) => {
                      return (
                        <option
                          key={department.id as number}
                          value={department.department_name as string}
                        >
                          {department.department_name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
          </div>
          <label className="font-medium text-lg">Address</label>
          <div className=" w-1/5 mt-5 ml-28">
            <Label text={'Zip Code'} />
            <Input
              type={'number'}
              name="zipcode"
              onChange={(e) => handleEmployeeInfo(e)}
              placeholder="Zip Code"
            />
          </div>
          <div className="flex justify-around mt-5">
            <div className="">
              <Label text={'Country'} />
              <Input
                type={'text'}
                name="country"
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder="City"
              />
            </div>
            <div>
              <Label text={'City'} />
              <Input
                type={'text'}
                name="city"
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder="City"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-10 ml-28">
            <div className="w-1/2">
              <Input
                type={'text'}
                name="address_1"
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder="Address line 1"
              />
            </div>
            <div className="w-1/2">
              <Input
                type={'text'}
                name="address_2"
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder="Address line 2"
              />
            </div>
          </div>
          {/* <label className='font-medium text-lg'>Role</label> */}
          <div className="flex justify-around mt-5">
            <div className="">
              <Label text={'Manager'} />
              <Input
                type={'text'}
                name="manager"
                onChange={(e) => handleEmployeeInfo(e)}
                placeholder="Input your manager's id number here"
              />
            </div>
            <label className="font-medium text-lg">
              Add Locations, Departments, & Job Titles to your DB
            </label>
            <div className="flex justify-around mt-5">
              <div>
                <Label text={'Location'} />
                <Input
                  type={'text'}
                  name="location_name"
                  onChange={(e) => handleLocationData(e)}
                  placeholder="Select Location"
                />
              </div>
              <button
                type="submit"
                onClick={(e) => postLocationData(e)}
                className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                add location
              </button>
              <div>
                <Label text={'Job'} />
                <Input
                  type={'job'}
                  name="job_title"
                  onChange={(e) => handleJobData(e)}
                  placeholder="job title"
                />
              </div>
              <button
                type="submit"
                onClick={(e) => postJobData(e)}
                className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                add job
              </button>
              <div>
                <Label text={'Department'} />
                <Input
                  type={'Department'}
                  name="department_name"
                  onChange={(e) => handleDepartmentData(e)}
                  placeholder="department"
                />
              </div>
              <button
                type="submit"
                onClick={(e) => postDepartmentData(e)}
                className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                add department
              </button>
            </div>
          </div>

          <div className="flex justify-end mx-28 ">
            <button
              type="submit"
              onClick={(e) => {
                handleAddEmployeeData(e);
              }}
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
