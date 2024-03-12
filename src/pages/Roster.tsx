import Sidebar from './SideBar';
import BasicTable from '../components/BasicTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface EmployeeInfo {
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
      } catch (error) {}
    };
    fetchBasicEmployeeData();
  }, []);

  const containerStyle: React.CSSProperties = {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const h1Style: React.CSSProperties = {
    marginTop: '40px',
    marginBottom: '40px',
  };

  return (
    <>
      <Sidebar />
      <div style={containerStyle}>
        <h1 style={h1Style}>Recently Added Employees</h1>
        <BasicTable data={employeeInformation} />
      </div>
    </>
  );
}
