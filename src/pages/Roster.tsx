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
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setIsModalOpen(true);
    setDeletingItemId(id);
  };
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (id: number) => {
    setEditingItemId(id);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItemId(null);
  };

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

  const rows = employeeInformation.map((item) => Object.values(item));

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: number | null
  ) {
    e.preventDefault();
    if (id === null) return;
    closeModal();
    try {
      const response = await axios.delete(`${LOCALDB_URL}employees/${id}`);
      console.log(response);
      setEmpoyeeInformation((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
      setDeletingItemId(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col w-full pt-10 sm:pt-10 overflow-auto">
      <div className="flex flex-row items-center place-content-center text-3xl top-0 z-10 h-20 pt-20 w-full text-gray-600 dark:text-gray-300">
        <div className="mt-0">Roster</div>
      </div>

      <div className="top-20 p-5 mt-10 sm:p-10 sm:mt-10">
        <div className="flex flex-col border-2 p-2 sm:p-10 border-gray-500 dark:border-gray-300 rounded-xl">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm  font-light text-surface dark:text-white">
                  <thead className="border-b-2 border-neutral-600 text-center font-medium dark:border-gray-300">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        First Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Last Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Job Title
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email Address
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr
                        className="border-b border-gray-600 text-center transition duration-300 ease-in-out hover:bg-gray-300 dark:border-gray-200 dark:hover:bg-neutral-600"
                        key={row[0]}
                      >
                        {row.map((cell, index) => (
                          <td
                            key={index}
                            className="border-b border-gray-600 hover:border-collapse px-2 py-2"
                          >
                            {cell}
                          </td>
                        ))}
                        <td className="border-b border-gray-600 hover:border-collapse px-2 py-2">
                          <button
                            className="inline-block rounded bg-yellow-300 hover:bg-yellow-500 dark:bg-transparent dark:border-2 dark:border-yellow-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-yellow-300 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-yellow-200 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                            onClick={() => openEditModal(row[0])}
                          >
                            Edit
                          </button>
                          {isEditModalOpen && editingItemId !== null && (
                            <EditModal
                              id={editingItemId}
                              isOpen={isEditModalOpen}
                              onClose={closeEditModal}
                            />
                          )}
                        </td>
                        <td className="border-b border-gray-600 hover:border-collapse px-2 py-2">
                          <button
                            className="inline-block rounded bg-red-300 hover:bg-red-500 dark:bg-transparent dark:border-2 dark:border-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-red-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-red-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                            onClick={() => openModal(row[0])}
                          >
                            Delete
                          </button>
                          <DeleteUserModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onConfirm={(e) => handleDelete(e, deletingItemId)}
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
