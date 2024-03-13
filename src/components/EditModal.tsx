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
      <Modal opened={opened} onClose={close} title='Edit Employee Data'>
        <div>
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

      <Button onClick={open}>Edit</Button>
    </>
  );
}

export default EditModal;
