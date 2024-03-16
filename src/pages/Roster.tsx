import { useEffect, useState } from 'react';
import axios from 'axios';

import SideNavBar from '../components/SideNavBar';

import EditModal from '../components/EditModal';

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

  useEffect(() => {
    const fetchBasicEmployeeData = async () => {
      try {
        const response = await axios.get(`${LOCALDB_URL + 'someEmployees'}`);
        setEmpoyeeInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBasicEmployeeData();
  }, []);

  const h1Style: React.CSSProperties = {
    marginTop: '40px',
    marginBottom: '40px',
  };
  const headers = Object.keys(employeeInformation[0] || {});
  const rows = employeeInformation.map((item) => Object.values(item));
  // because the table creates the content using the object.values method you have to use zero to access the id number.Then you can delete the specific entry.

  // const containerStyle: React.CSSProperties = {
  //   margin: 0,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: 'auto',
  // };

  // const tableStyle: React.CSSProperties = {
  //   borderCollapse: 'collapse',
  //   width: 'auto',
  // };

  const thStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    padding: '8px 16px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  };

  // const tdStyle: React.CSSProperties = {
  //   border: '1px solid #dddddd',
  //   padding: '8px',
  //   textAlign: 'left',
  // };

  const deleteButton: React.CSSProperties = {
    margin: '2px',
    padding: '7px 14px',
    textAlign: 'left',
    backgroundColor: 'red',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'white',
  };

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: any
  ) {
    e.preventDefault();
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
    <>
      <SideNavBar />
      <div className="flex flex-row place-content-start pl-[300px] items-center bg-gray-300 w-full h-20">
        <h1
          style={{ fontFamily: "'Lato', sans-serif" }}
          className="text-gray-700 text-xl place-content-center"
        >
          Roster
        </h1>
      </div>
      <div className="flex flex-col">
        <h1 style={h1Style}>All Employees</h1>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
            <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
              <tr>
                {headers.map((header) => (
                  <th className='px-6 py-4' scope='col' key={header} style={thStyle}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={index} className='border-b border-neutral-200 dark:border-white/10'>
                      {cell}
                    </td>
                  ))}
                  <td>
                    <EditModal id={row[0]} />
                  </td>
                  <td>
                    <button
                      style={deleteButton}
                      onClick={(e) => handleDelete(e, row[0])}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
