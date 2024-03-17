import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';



const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface EmployeeInfo {
  id: string;
}

function EditModal(props: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const [editData, setEditData] = useState<EmployeeInfo>({
    id: props.id,
  });
  function handleEditEmployee(e: ChangeEvent<HTMLInputElement>) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  const updateData = async () => {
    try {
      const response = axios.patch(
        `${LOCALDB_URL + 'employees/' + parseInt(props.id)}`,
        editData
      );
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title='Edit Employee Data' className="">
        <div className=''>
          <form action='' className='flex flex-col '>
            <h3>Edit Me</h3>
            <h4>The Employee ID you are editing is {props.id}</h4>
            <h4>First Name</h4>
            <input
              className='border p-2 my-2'
              name='first_name'
              placeholder='First name'
              type='text'
              onChange={(e) => handleEditEmployee(e)}
            />
            <h4>Last Name</h4>
            <input
              className='border p-2 my-2'
              name='last_name'
              placeholder='Last name'
              type='text'
              onChange={(e) => handleEditEmployee(e)}
            />
            <h4>Email</h4>
            <input
              className='border p-2 my-2'
              name='email'
              placeholder='Email'
              type='text'
              onChange={(e) => handleEditEmployee(e)}
            />
            <h4>Phone Number</h4>
            <input
              className='border p-2 my-2'
              name='phone_number'
              placeholder='Phone number'
              type='text'
              onChange={(e) => handleEditEmployee(e)}
            />
            <button onClick={() => updateData()} className='border'>
              Send Me
            </button>
          </form>
        </div>
      </Modal>

      <Button className='inline-block rounded bg-yellow-400 dark:bg-yellow-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-700 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"' onClick={open}>Edit</Button>
    </>
  );
}

export default EditModal;
