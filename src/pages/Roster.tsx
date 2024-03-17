import { useEffect, useState } from "react";
import axios from "axios";

import SideNavBar from "../components/SideNavBar";

import EditModal from "../components/EditModal";

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
        const response = await axios.get(`${LOCALDB_URL}someEmployees`);
        setEmpoyeeInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBasicEmployeeData();
  }, []);

  const h1Style: React.CSSProperties = {
    marginTop: "40px",
    marginBottom: "40px",
  };
  // const headers = Object.keys(employeeInformation[0] || {});
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

  // const thStyle: React.CSSProperties = {
  //   border: "1px solid #dddddd",
  //   padding: "8px 16px",
  //   textAlign: "left",
  //   backgroundColor: "#f2f2f2",
  // };

  // const tdStyle: React.CSSProperties = {
  //   border: '1px solid #dddddd',
  //   padding: '8px',
  //   textAlign: 'left',
  // };

  // const deleteButton: React.CSSProperties = {
  //   margin: "2px",
  //   padding: "7px 14px",
  //   textAlign: "left",
  //   backgroundColor: "red",
  //   borderRadius: "4px",
  //   fontSize: "14px",
  //   fontWeight: "500",
  //   color: "white",
  // };

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
    <div>
      <SideNavBar />
      <div className="flex flex-row place-content-start pl-[300px] items-center bg-gray-300 w-full h-20">
        <h1
          style={{ fontFamily: "'Lato', sans-serif" }}
          className="text-gray-700 text-xl place-content-center"
        >
          Roster
        </h1>
      </div>

      <div className="flex flex-col items-center absolute p-10 sm:left-[200px]">
        <h1 className="text-gray-700 dark:text-gray-300 text-xl place-content-center" style={h1Style}>All Employees</h1>

        <div className="flex flex-col p-10 border-2 border-gray-300 dark:border-gray-300 rounded-xl">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                      {/* {headers.map((header) => (
                        <th
                          className="px-6 py-4"
                          scope="col"
                          key={header}
                          style={thStyle}
                        >
                          {header}
                        </th>
                      ))} */}
                      <th scope="col" className="px-6 py-4">ID</th>
                      <th scope="col" className="px-6 py-4">First Name</th>
                      <th scope="col" className="px-6 py-4">Last Name</th>
                      <th scope="col" className="px-6 py-4">Job Title</th>
                      <th scope="col" className="px-6 py-4">Email Address</th>
                      <th scope="col" className="px-6 py-4">Phone Number</th>
                      <th scope="col" className="px-6 py-4">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600 key={row[0]}" key={row[0]}>
                        {row.map((cell, index) => (
                          <td
                            key={index}
                            className="border hover:border-collapse px-4 py-2"
                          >
                            {cell}
                          </td>
                        ))}
                        <td>
                          <EditModal id={row[0]} />
                        </td>
                        <td>
                          <button
                            className="inline-block rounded bg-blue-50 dark:bg-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-700 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
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
      </div>
    </div>
  );
}
