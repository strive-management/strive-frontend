import { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import DeleteUserModal from '../components/DeleteUserModal';
import EditModal from '../components/EditModal';
import { useAuth } from '../context/AuthContext';

interface EmployeeInfo {
  id: number;
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

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

export default function Roster() {
  const [employeeInformation, setEmpoyeeInformation] = useState<EmployeeInfo[]>(
    []
  );
  const { currentUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchBasicEmployeeData = async () => {
      try {
        const response = await axios.get(
          `${LOCALDB_URL}someEmployees?user_id=${currentUser?.uid}`
        );
        setEmpoyeeInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBasicEmployeeData();
  }, []);

  // const headers = Object.keys(employeeInformation[0] || {});
  const rows = employeeInformation.map((item) => Object.values(item));
  // because the table creates the content using the object.values method you have to use zero to access the id number.Then you can delete the specific entry.

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: any
  ) {
    e.preventDefault();
    closeModal();
    await axios
      .delete(`${LOCALDB_URL}employees/${id}}`)
      .then(function (response) {
        console.log(response);
        setEmpoyeeInformation((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (

    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center place-content-center text-3xl top-0 z-10 h-20 w-full text-gray-600 dark:text-gray-300">
          <div>Roster</div>
        </div>
      {/* <div className="flex flex-row place-content-start items-center bg-gray-300 w-full h-20">
        <h1
          style={{ fontFamily: "'Lato', sans-serif" }}
          className="text-gray-700 text-xl place-content-center"
        >
          Roster
        </h1>
      </div> */}

      <div className="top-20 p-5 mt-10 sm:p-10 sm:mt-10">
        {/* <h1 className="text-gray-700 dark:text-gray-300 text-xl place-content-center">All Employees</h1> */}

        <div className="flex flex-col border-2 p-2 sm:p-10 border-gray-600 dark:border-gray-300 rounded-xl">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm  font-light text-surface dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">

                    <tr>
                      <th scope='col' className='px-6 py-4'>
                        ID
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        First Name
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Last Name
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Job Title
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Email Address
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Phone Number
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr
                        className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600 key={row[0]}'
                        key={row[0]}
                      >
                        {row.map((cell, index) => (
                          <td
                            key={index}
                            className='border hover:border-collapse px-4 py-2'
                          >
                            {cell}
                          </td>
                        ))}
                        <td>
                          <EditModal id={row[0]} />
                        </td>
                        <td>
                          <button
                            className='inline-block rounded bg-blue-50 dark:bg-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-700 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
                            onClick={() => openModal()}
                          >
                            Delete
                          </button>
                          <DeleteUserModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onConfirm={(e) => handleDelete(e, row[0])}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// }
