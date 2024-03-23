import { useState, ChangeEvent, useRef } from "react";
import axios from "axios";
import useOutsideClick from "../hook/useOutsideClick";

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface EmployeeInfo {
  id: string | number;
}

interface EditScheduleModalProps {
  onClose: () => void;
  id: any; // Temporarily changed to any.
  isOpen: boolean;
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
  id,
  onClose,
}) => {
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
        `${LOCALDB_URL + "employees/" + parseInt(id)}`,
        editData
      );
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [click, setClick] = useState<boolean>(false);


  const handleAvailable = () => {
    setClick(!click);
    
    };
  };


  useOutsideClick(modalRef, () => {
    onClose();
  });

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

            <div id="avail-button" className="mt-10">
                {click ? (
                  <button
                    className="inline-block rounded bg-blue-50 dark:bg-blue-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-700 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    onClick={handleAvailable}
                  >
                    Not Available
                  </button>
                ) : (
                  <button
                    className=" text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    onClick={handleAvailable}
                  >
                    Available
                  </button>
                )}
              </div>

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

export default EditScheduleModal;
