//import { useState, ChangeEvent, useRef } from "react";
// import axios from "axios";
// import useOutsideClick from "../hook/useOutsideClick";

// const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface EditScheduleModalProps {
  onClose: () => void;
  id: any; // Temporarily changed to any.
  isOpen: boolean;
  empName: string;
}

// interface EmployeeSceduleInfo {
//   id: string | number;
// }

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
  id,
  onClose,
  empName,
}) => {
  //const modalRef = useRef<HTMLDivElement | null>(null);

  // const [editScheduleData, setEditScheduleData] = useState<EmployeeSceduleInfo>({
  //   id: id,
  // });
  // function handleEditEmployee(e: ChangeEvent<HTMLInputElement>) {
  //   setEditScheduleData({ ...editScheduleData, [e.target.name]: e.target.value });
  // }





  // useOutsideClick(modalRef, () => {
  //   onClose();
  // });

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center">
        <div
          
          className="bg-gray-200 border-2 border-gray-500 p-10 dark:bg-gray-800 rounded-lg dark:border-gray-300 dark:border"
        >
          <form action="" className="flex flex-col gap-6">
            <div>
              <h1>Edit Schedule</h1>
              <h3>Target ID: {id}</h3>
              <h3>Employee Name: {empName}</h3>
            </div>
            <h4>Shift Start Time</h4>
            <input
              type="time"
              className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
            />
            <h4>Shift End Time</h4>
            <input
              type="time"
              className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
            />
            <button
              // onClick={() => updateData()}
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
