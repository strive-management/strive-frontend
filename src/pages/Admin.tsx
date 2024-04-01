import { ChangeEvent, useState, useEffect } from 'react';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import axios from 'axios';
import Select from '../components/ui/Select';
import InputModal from '../components/ui/InputModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAuth } from '../context/AuthContext';

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface EmployeeInfo {
  first_name: string;
  last_name: string;
  email: string;
  user_id: string;
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
  [key: string]: string | number;
  user_id: string;
}
interface OptionsState {
  jobs: Option[];
  departments: Option[];
  locations: Option[];
  [key: string]: Option[];
}

export default function Admin() {
  const { currentUser } = useAuth();

  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo>({
    first_name: '',
    last_name: '',
    email: '',
    user_id: `${currentUser?.uid}`,
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

  const resetForm = () => {
    setEmployeeInfo((prevState) => ({
      ...prevState,
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
      user_id: `${currentUser?.uid}`,
    }));
  };

  const [options, setOptions] = useState<OptionsState>({
    jobs: [],
    departments: [],
    locations: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const [isConfModalOpen, setIsConfModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updatedValue =
      name === 'manager_id' ? (value === '' ? null : Number(value)) : value;

    setEmployeeInfo((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await axios.post(`${LOCALDB_URL}employees`, {
        ...employeeInfo,
        user_id: currentUser?.uid,
      });
      console.log(newUser, 'Employee added successfully');
      setConfirmationMessage('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee: ', error);
      setConfirmationMessage('Error. Please try again.');

      setIsConfModalOpen(true);
    }
    setIsConfModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsConfModalOpen(false);
  };

  const handleAddNew = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };
  const handleModalSubmit = async (newValue: string, type: string) => {
    let payload;

    switch (type) {
      case 'locations':
        payload = { location_name: newValue, user_id: currentUser?.uid };
        break;
      case 'jobs':
        payload = { job_title: newValue, user_id: currentUser?.uid };
        break;
      case 'departments':
        payload = { department_name: newValue, user_id: currentUser?.uid };
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
        [type]: [
          ...prev[type],
          { id: newItem.id, name: newValue, user_id: `${currentUser?.uid}` },
        ],
      }));
      setShowModal(false);
    } catch (error) {
      console.error(`Error adding new ${type}: `, error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentUser?.uid) return [];
        const user = currentUser?.uid;
        const [jobsResponse, departmentsResponse, locationsResponse] =
          await Promise.all([
            axios.get(`${LOCALDB_URL}jobs?user_id=${user}`),
            axios.get(`${LOCALDB_URL}departments?user_id=${user}`),
            axios.get(`${LOCALDB_URL}locations?user_id=${user}`),
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
  }, [handleModalSubmit]);

  return (
    <>
      <div className="flex flex-col w-full pt-10 sm:pt-10 overflow-auto">
        <div className="flex flex-row items-center place-content-center text-3xl top-0 z-10 h-20 pt-20 w-full text-gray-600 dark:text-gray-300">
          <div className="mt-0">Add New Employee</div>
        </div>

        <div className="mt-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-5 sm:p-10 w-full gap-6 overflow-auto rounded-xl md:grid md:grid-cols-2 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto"
          >
            <div className="flex flex-col border-2 border-gray-500 dark:border-gray-300 p-10 gap-2 rounded-2xl">
              <label className="font-medium text-lg dark:text-gray-300">
                Basic Information
              </label>
              <div>
                <Label text={''} />

                <Input
                  type={'text'}
                  name="first_name"
                  value={employeeInfo.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div>
                <Label text={''} />
                <Input
                  type={'text'}
                  name="last_name"
                  value={employeeInfo.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
              </div>
              <div>
                <Label text={''} />
                <Input
                  type={'email'}
                  name="email"
                  value={employeeInfo.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required={true}
                />
              </div>
              <div>
                <Label text={''} />
                <Input
                  type={'tel'}
                  name="phone_number"
                  value={employeeInfo.phone_number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required={true}
                />
              </div>
            </div>
            <div className="flex flex-col border-2 border-gray-500 dark:border-gray-300 p-10 gap-2 rounded-2xl">
              <label className="font-medium text-lg dark:text-gray-300">
                Address Information
              </label>

              <Label text={''} />

              <Input
                type={'number'}
                name="zipcode"
                value={employeeInfo.zipcode}
                onChange={handleChange}
                placeholder="Zip Code"
              />
              <div>
                <Input
                  type={'text'}
                  name="address_1"
                  value={employeeInfo.address_1}
                  onChange={handleChange}
                  placeholder="Address line 1"
                />
              </div>
              <div>
                <Input
                  type={'text'}
                  name="address_2"
                  value={employeeInfo.address_2}
                  onChange={handleChange}
                  placeholder="Address line 2"
                />
              </div>
              <div>
                <Label text={''} />
                <Input
                  type={'text'}
                  name="city"
                  value={employeeInfo.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              <div>
                <Label text={''} />
                <Input
                  type={'text'}
                  name="country"
                  value={employeeInfo.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="flex flex-col border-2 border-gray-500 dark:border-gray-300 p-10 rounded-2xl">
              <Label text={'Work Location*'} />

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
                required={true}
              />

              <Label text={'Job*'} />
              <Select
                name="job_title"
                value={employeeInfo.job_title}
                onChange={handleChange}
                options={options.jobs.map((option) => ({
                  id: option.id,
                  name: option.job_title,
                }))}
                defaultOption="Select Job"
                includeAddNew={true}
                onAddNew={() => handleAddNew('jobs')}
                required={true}
              />

              <Label text={'Department*'} />
              <Select
                name="department_name"
                value={employeeInfo.department_name}
                onChange={handleChange}
                options={options.departments.map((option) => ({
                  id: option.id,
                  name: option.department_name,
                }))}
                defaultOption="Select Department"
                includeAddNew={true}
                onAddNew={() => handleAddNew('departments')}
                required={true}
              />
            </div>
            {showModal && (
              <InputModal
                type={modalType}
                onSubmit={handleModalSubmit}
                onClose={() => setShowModal(false)}
              />
            )}
            <div className="flex flex-col border-2 border-gray-500 dark:border-gray-300 p-10 rounded-2xl">
              <div className="">
                <Label text={'Manager'} />

                <Input
                  type="text"
                  name="manager_id"
                  value={
                    employeeInfo.manager_id !== null
                      ? employeeInfo.manager_id.toString()
                      : ''
                  }
                  onChange={handleChange}
                  placeholder="Manager ID"
                />
              </div>
            </div>
            <ConfirmationModal
              isOpen={isConfModalOpen}
              onClose={handleCloseModal}
              message={confirmationMessage}
            />
            <div className="flex flex-row border-2 justify-center border-gray-500 dark:border-gray-300 p-6 gap-4 rounded-2xl">
              <button
                type="submit"
                className="inline-block rounded bg-blue-300 hover:bg-blue-500 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="inline-block rounded bg-blue-300 hover:bg-blue-500 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
