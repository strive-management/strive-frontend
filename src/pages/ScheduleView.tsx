import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import EditModal from '../components/EditModal';
// import DeleteUserModal from '../components/DeleteUserModal';

interface ScheduleInfo {
  id: number;
  employee_id: number;
  fullname: string;
  date: string;
  available: boolean;
  scheduled_start: string;
  scheduled_end: string;
  clock_in: string;
  clock_out: string;
}

interface range {
  from: string;
  until: string;
}
const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

const ScheduleView = () => {
  const [scheduleInformation, setScheduleInformation] = useState<
    ScheduleInfo[]
  >([]);

  const [range, setRange] = useState<range>({
    from: '',
    until: '',
  });

  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  // const headers = Object.keys(scheduleInformation[0] || {});

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(`${LOCALDB_URL}schedules`);
        setScheduleInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchScheduleData();
  }, []);

  function handleRange(e: ChangeEvent<HTMLInputElement>) {
    setRange({ ...range, [e.target.name]: `${e.target.value}T00:00:00.000Z` });
  }

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: number
  ) {
    e.preventDefault();
    // closeModal();
    await axios
      .delete(`${LOCALDB_URL}schedules/${id}}`)
      .then(function (response) {
        console.log(response);
        const newData = scheduleInformation.filter((item) => item.id !== id);
        setScheduleInformation(newData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className='flex flex-col w-full overflow-auto'>
        <div className='top-20 p-5 sm:p-10 mt-20 sm:mt-10'>
          <div className='flex flex-col p-5 sm:p-10 mt-10 border-2 border-gray-300 dark:border-gray-300 rounded-xl'>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='overflow-hidden mb-20'>
                  <table className='min-w-full text-left text-sm font-light text-surface dark:text-white'>
                    <thead className='border-b border-neutral-200 font-medium dark:border-white/10'>
                      <tr>
                        <th scope='col' className='px-6 py-4'>
                          Employee ID
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Date
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Available
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Scheduled Start
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Scheduled End
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Clock In
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Clock Out
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleInformation
                        .filter(
                          (schedule) =>
                            schedule.date >= range.from &&
                            schedule.date <= range.until
                        ) // Filter rows based on condition
                        .map((schedule) => (
                          <tr key={schedule.id}>
                            <td>{schedule.employee_id}</td>
                            <td>{schedule.fullname}</td>
                            <td>{dayjs(schedule.date).format('YYYY/MM/DD')}</td>
                            <td>{schedule.available}</td>
                            <td>{schedule.scheduled_start}</td>
                            <td>{schedule.scheduled_end}</td>
                            <td>{schedule.clock_in}</td>
                            <td>{schedule.clock_out}</td>
                            <td>
                              <EditModal id={schedule.id} />
                            </td>
                            <td>
                              <button
                                className='inline-block rounded bg-blue-50 dark:bg-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-700 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
                                // onClick={() => openModal()}
                                onClick={(e) => handleDelete(e, schedule.id)}
                              >
                                Delete
                              </button>
                              {/* <DeleteUserModal
                                // isOpen={isModalOpen}
                                // onClose={closeModal}
                                onConfirm={(e) => handleDelete(e, row[0])}
                              /> */}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className='flex flex-row gap-6 text-gray-700 dark:text-gray-300'>
                  <h4>From</h4>
                  <input
                    type='date'
                    className='px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700'
                    name='from'
                    onChange={handleRange}
                  />
                  <h4>To</h4>
                  <input
                    type='date'
                    className='px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700'
                    name='until'
                    onChange={handleRange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleView;

{
  /* const h1Style: React.CSSProperties = {
  marginTop: '40px',
  marginBottom: '40px',
};

const containerStyle: React.CSSProperties = {
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
};

const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: 'auto',
};

const thStyle: React.CSSProperties = {
  border: '1px solid #dddddd',
  padding: '8px 16px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #dddddd',
  padding: '8px',
  textAlign: 'left',
}; */
}
