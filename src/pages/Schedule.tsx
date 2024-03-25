import { useEffect, useState } from "react";
import dayjs from "dayjs";
// import Label from '../components/ui/Label';
import axios from "axios";
//import moment from 'moment';
import EditScheduleModal from "../components/EditScheduleModal";
import DeleteScheduleModal from "../components/DeleteScheduleModal";

import { useAuth } from "../context/AuthContext";

interface ScheduleInfo {
  id: number;
  user_id: string;
  employee_id: number;
  fullname: string;
  date: string;
  available: boolean;
  scheduled_start: string;
  scheduled_end: string;
  clock_in: string;
  clock_out: string;
}

interface EmployeeInfo {
  id: number;
  first_name: string;
  last_name: string;
}

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

export default function Schedule() {
  const { currentUser } = useAuth();
  const [scheduleInformation, setScheduleInformation] = useState<
    ScheduleInfo[]
  >([]);
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo[]>();
  const [employeeScheduleInfo, setEmployeeScheduleInfo] = useState<
    ScheduleInfo[] | any
  >();
  // used for filtering and then resetting the drop down name list
  const [updatedEmployeeInfo, setUpdatedEmployeeInfo] =
    useState<EmployeeInfo[]>();
  const [click, setClick] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] =
    useState<boolean>(false);


    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  
  
    const openDeleteModal = (id: number) => {
      setIsDeleteModalOpen(true);
      setDeletingItemId(id);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    //const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const openEditScheduleModal = (id: number) => {
    //setEditingItemId(id);
    id; // <---  Delete this. It's just so TS stops complaining.
    setIsEditScheduleModalOpen(true);
  };
  const closeEditScheduleModal = () => {
    setIsEditScheduleModalOpen(false);
    //setEditingItemId(null);
  };

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  // const headers = Object.keys(scheduleInformation[0] || {});
  //const rows = scheduleInformation.map((item) => Object.values(item));
  // because the table creates the content using the object.values method you have to use zero to access the id number.Then you can delete the specific entry.

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: number
  ) {
    e.preventDefault();
    closeDeleteModal();
    await axios
      .delete(`${LOCALDB_URL}schedules/${id}}`)
      .then(function (response) {
        const newData = scheduleInformation.filter((item) => item.id !== id);
        setScheduleInformation(newData);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(
          `${LOCALDB_URL}employees?user_id=${currentUser?.uid}`
        );
        setEmployeeInfo(response.data);
        setUpdatedEmployeeInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNames();
  }, [scheduleInformation]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(
          `${LOCALDB_URL}schedules?user_id=${currentUser?.uid}`
        );
        setScheduleInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchScheduleData();
  }, []);

  // this useEffect is responsible for updating the drop down menu based on the date selected in the calendar input.
  useEffect(() => {
    setUpdatedEmployeeInfo(employeeInfo);
    const selectedDate = scheduleInformation.filter((schedule) => {
      return schedule.date === employeeScheduleInfo.date;
    });

    const unavailableEmployees = selectedDate.map((date) => date.employee_id);

    const availableEmployees = employeeInfo?.filter(
      (employee) => !unavailableEmployees.includes(employee.id)
    );
    setUpdatedEmployeeInfo(availableEmployees);
    console.log("selected Date:", selectedDate);
    console.log("unavailableEmployees", unavailableEmployees);
    console.log("available Employees", availableEmployees);
  }, [employeeScheduleInfo]);

  const handleAvailable = () => {
    setClick(!click);
    setEmployeeScheduleInfo({
      ...employeeScheduleInfo,
      available: click,
    });
  };

  const postSchedule = async () => {
    try {
      const response = await axios.post(`${LOCALDB_URL}schedules`, {
        ...employeeScheduleInfo,
        user_id: currentUser?.uid,
      });
      const createdSchedule = response.data;
      setScheduleInformation((prev) => [...prev, createdSchedule]);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  // console.log(employeeScheduleInfo);
  // console.log(date.slice(0, 11) + "   " + date.slice(16, date.length));
  return (
    <>
      <div className="flex flex-col w-full pt-5 sm:pt-0 overflow-auto">
        <div className="flex flex-row items-center place-content-center text-3xl top-0 z-10 h-20 w-full text-gray-600 dark:text-gray-300">
          <div className="fixed mt-0">Update Schedule</div>
        </div>
        <div className="top-20 p-5 sm:p-10 mt-20 sm:mt-10">
          <div className="flex flex-col border-2 p-10 border-gray-500 dark:border-gray-300 rounded-xl">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                    <thead className="border-b-2 border-gray-600 text-center font-medium dark:border-gray-300">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Employee ID
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Full Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Available
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Scheduled Start
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Scheduled End
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Clock In
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Clock Out
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleInformation.map((schedule) => (
                        <tr
                          key={schedule.id}
                          className="border-b border-gray-600 text-center font-medium hover:bg-gray-300 dark:border-gray-200 dark:hover:bg-neutral-600"
                        >
                          <td>{schedule.employee_id}</td>
                          <td>{schedule.fullname}</td>
                          <td>{dayjs(schedule.date).format("YYYY/MM/DD")}</td>
                          <td>{schedule.available}</td>
                          <td>
                            {dayjs(schedule.scheduled_start).format("HH:mm")}
                          </td>
                          <td>
                            {dayjs(schedule.scheduled_end).format("HH:mm")}
                          </td>
                          <td>{dayjs(schedule.clock_in).format("HH:mm")}</td>
                          <td>{dayjs(schedule.clock_out).format("HH:mm")}</td>
                          <td className="border-b border-gray-600 text-center font-medium dark:border-gray-200 px-2 py-2">
                            <button
                              className="inline-block rounded bg-yellow-300 hover:bg-yellow-500 dark:bg-transparent dark:border-2 dark:border-yellow-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-yellow-300 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-yellow-200 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                              onClick={() => openEditScheduleModal(schedule.id)}
                            >
                              Edit
                            </button>
                            {isEditScheduleModalOpen && (
                              <EditScheduleModal
                                id={schedule.employee_id}
                                isOpen={isEditScheduleModalOpen}
                                onClose={closeEditScheduleModal}
                                empName={schedule.fullname}
                              />
                            )}
                          </td>
                          <td className="border-b border-gray-600 hover:bg-gray-300 dark:hover:bg-neutral-100 text-center font-medium dark:border-gray-300 px-2 py-2">
                            <button
                              className="inline-block rounded bg-red-300 hover:bg-red-500 dark:bg-transparent dark:border-2 dark:border-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-red-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-red-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                              // onClick={() => openModal()}
                              // onClick={(e) => handleDelete(e, schedule.id)}
                              onClick={() => openDeleteModal(schedule.id)}
                            >
                              Delete
                            </button>
                            <DeleteScheduleModal
                            isOpen={isDeleteModalOpen}
                            onClose={closeDeleteModal}
                            onConfirm={(e) => deletingItemId !== null && handleDelete(e, deletingItemId)}
                          />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center top-20 p-10 w-full gap-6 overflow-auto rounded-xl sm:left-20 md:left-40 md:grid md:grid-cols-2 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
              <div className="text-gray-700 dark:text-gray-300">
                <h4>Date</h4>
                <input
                  type="date"
                  className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  name="date"
                  onChange={(e) => {
                    if (e.target.value == "")
                      return setUpdatedEmployeeInfo(employeeInfo);
                    setDate(new Date(e.target.value).toISOString());
                    setEmployeeScheduleInfo({
                      ...employeeScheduleInfo,
                      date: new Date(e.target.value).toISOString(),
                    });
                  }}
                />
              </div>
              <div className="w-[200px] text-gray-700 dark:text-gray-300">
                <h4>Select Employee</h4>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-300"
                  onChange={(e) => {
                    setEmployeeScheduleInfo({
                      ...employeeScheduleInfo,
                      employee_id: parseInt(e.target.value),
                    });
                  }}
                >
                  <option className=" p-2 border">Select Employee</option>
                  {updatedEmployeeInfo
                    ? updatedEmployeeInfo.map((employee) => {
                        return (
                          <option
                            key={employee.id as number}
                            value={employee.id as number}
                          >
                            {employee.id} {employee.first_name}{" "}
                            {employee.last_name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <h4>Shift Start Time</h4>
                <input
                  type="time"
                  onChange={(e) => {
                    setEmployeeScheduleInfo({
                      ...employeeScheduleInfo,
                      scheduled_start:
                        date.slice(0, 11) +
                        e.target.value +
                        date.slice(16, date.length),
                    });
                  }}
                  className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <h4>Shift End Time</h4>
                <input
                  type="time"
                  onChange={(e) => {
                    setEmployeeScheduleInfo({
                      ...employeeScheduleInfo,
                      scheduled_end:
                        date.slice(0, 11) +
                        e.target.value +
                        date.slice(16, date.length),
                    });
                  }}
                  className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                />
              </div>
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
                    className="inline-block rounded bg-blue-300 hover:bg-blue-500 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    onClick={handleAvailable}
                  >
                    Available
                  </button>
                )}
              </div>
              <div id="update-button" className="mt-10">
                <div className="text-gray-300">
                  <button
                    onClick={postSchedule}
                    className="inline-block rounded bg-blue-300 hover:bg-blue-500 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    Click here to update schedules
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
