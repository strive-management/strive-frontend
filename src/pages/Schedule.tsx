import React, { useEffect, useState } from "react";
import SideNavBar from "../components/NewNavBar";
import Label from "../components/ui/Label";
import axios from "axios";

interface ScheduleInfo {
  id: number;
  employee_id: number;
  date: string;
  available:boolean;
  schedule_start: string;
  schedule_end: string;
  clock_in: string;
  clock_out: string;
}

interface EmployeeInfo {
    id: number;
    first_name: string;
    last_name: string;
  }

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

export default function Schedule(){

  const [scheduleInformation, setScheduleInformation] = useState<ScheduleInfo[]>(
    []
  );
  const [employeeInfo, setEmployInfo] = useState<EmployeeInfo[] >();

  const headers = Object.keys(scheduleInformation[0] || {});
  const rows = scheduleInformation.map((item) => Object.values(item));
  // because the table creates the content using the object.values method you have to use zero to access the id number.Then you can delete the specific entry.

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(`${LOCALDB_URL + 'employees'}`);
        setEmployInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNames();
  }, []);



  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(`${LOCALDB_URL + 'schedules'}`);
        setScheduleInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(scheduleInformation)
    fetchScheduleData();
    

  }, []);

    return (
        <>
        <SideNavBar />
        
      <div className="flex flex-row place-content-start pl-[300px] items-center bg-gray-300 w-full h-20">
            <h1
              style={{ fontFamily: "'Lato', sans-serif" }}
              className="text-gray-700 text-xl place-content-center"
            >
              Schedule
            </h1>
          </div>
      <div style={containerStyle} className=" pl-[250px]">
        <h1 style={h1Style}>Schedule</h1>
        <div style={containerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} style={thStyle}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={index} style={tdStyle}>
                      {cell}
                    </td>
                  ))}
                 
                </tr>
              ))}
            </tbody>
          </table>
          <Label text={'Select Employee'} />
              <select
                // onChange={(e) => {
                //   setEmployeeInfo({
                //     ...employeeInfo,
                //     location_name: e.target.value,
                //   });
                // }}
              >
                <option className=" border-1"
                >Select Employee</option>
                {employeeInfo
                  ? employeeInfo.map((employee) => {
                      return (
                        <option
                          key={employee.id as number}
                          value={employee.first_name as string}
                        >
                          {employee.id}
                          {" "}
                          {employee.first_name}
                          {" "}
                          {employee.last_name}
                        </option>
                           );
                        })
                      : null}
                        </select>
          
        </div>
      </div>

        </>
    )
}

const h1Style: React.CSSProperties = {
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
  };

//   const deleteButton: React.CSSProperties = {
//     margin: '2px',
//     padding: '7px 14px',
//     textAlign: 'left',
//     backgroundColor: 'red',
//     borderRadius: '4px',
//     fontSize: '14px',
//     fontWeight: '500',
//     color: 'white',
//   };

