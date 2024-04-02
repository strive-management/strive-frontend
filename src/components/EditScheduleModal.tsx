import { useState, ChangeEvent, useRef } from "react";
import axios from "axios";
import useOutsideClick from "../hook/useOutsideClick";

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface EditScheduleModalProps {
  onClose: () => void;
  id: any; // Temporarily changed to any.
  isOpen: boolean;
  empName: string;
  date: string;
}

interface EmployeeScheduleInfo {
  id: string | number;
  scheduled_start: string;
  scheduled_end: string;
  date: string;
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
  id,
  onClose,
  empName,
  date,
 
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [editScheduleData, setEditScheduleData] = useState<EmployeeScheduleInfo>({
    id: id,
    scheduled_start: "", 
    scheduled_end: "",
    date: date
  });
  function handleScheduleEdit(e: ChangeEvent<HTMLInputElement>) {
    // const targetTime = e.target.value
    const targetDate = editScheduleData.date
    setEditScheduleData({ ...editScheduleData, [e.target.name]:targetDate.slice(0, 11) +
      e.target.value +
      targetDate.slice(16, targetDate.length)});
  }
  const patchScheduleInfo = async() => {
    try {
      const response = await axios.patch(`${LOCALDB_URL}schedules/${id}`,editScheduleData)
      console.log(editScheduleData)
      console.log(response)
    } catch (err:any) {
      console.error(err.message);
      
    }
  }

  useOutsideClick(modalRef, () => {
    onClose();
  });
  console.log(editScheduleData)
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center">
        <div
          ref={modalRef}
          className="bg-gray-200 border-2 border-gray-500 p-10 dark:bg-gray-800 rounded-lg dark:border-gray-300 dark:border"
        >
          <form action="" className="flex flex-col gap-6">
            <div>
              <h1>Edit Schedule</h1>
              <h3>Target Schedule ID: {id}</h3>
              <h3>Employee Name: {empName}</h3>
            </div>
            <h4>Shift Start Time</h4>
            <input
              type="time"
              name="scheduled_start"
              className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
              onChange= {(e)=> handleScheduleEdit(e) }
            />
            <h4>Shift End Time</h4>
            <input
              type="time"
              name="scheduled_end"
              className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
              onChange ={(e)=> handleScheduleEdit(e) }
            />
            <button
              onClick={() => patchScheduleInfo()}
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
