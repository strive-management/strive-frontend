import { useState, ChangeEvent, useRef } from "react";
import axios from "axios";
//import useOutsideClick from "../hook/useOutsideClick";

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface EmployeeInfo {
  id: string | number;
}

interface EditModalProps {
  onClose: () => void;
  id: number; // Temporarily changed to any.
  isOpen: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ id, onClose }) => {
  const [editData, setEditData] = useState<EmployeeInfo>({
    id: id,
  });
  function handleEditEmployee(e: ChangeEvent<HTMLInputElement>) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  const modalRef = useRef<HTMLDivElement | null>(null);

  const updateData = async () => {
    try {
      const response = axios.patch(
        `${LOCALDB_URL}employees/${id}}`,
        editData
      );
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // useOutsideClick(modalRef, () => {
  //   onClose();
  // });

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center">
        <div
          ref={modalRef}
          className="bg-gray-200 border-2 border-gray-500 p-10 dark:bg-gray-800 rounded-lg dark:border-gray-300 dark:border"
        >
          <form action="" className="flex flex-col gap-6">
            <h3 className="text-xl place-self-center">Edit Employee Data</h3>
            <h4>The Employee ID you are editing is {id}</h4>

            <input
              className="bg-gray-50 border border-[#c0f2fc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="first_name"
              placeholder="First name"
              type="text"
              onChange={(e) => handleEditEmployee(e)}
            />

            <input
              className="bg-gray-50 border border-[#c0f2fc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="last_name"
              placeholder="Last name"
              type="text"
              onChange={(e) => handleEditEmployee(e)}
            />

            <input
              className="bg-gray-50 border border-[#c0f2fc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="email"
              placeholder="Email"
              type="text"
              onChange={(e) => handleEditEmployee(e)}
            />

            <input
              className="bg-gray-50 border border-[#c0f2fc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="phone_number"
              placeholder="Phone number"
              type="text"
              onChange={(e) => handleEditEmployee(e)}
            />
            <button
              onClick={() => updateData()}
              className="text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Update
            </button>
            <button
              type="button"
              className="text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
