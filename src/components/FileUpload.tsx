import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import Input from './ui/Input';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  const uploadFile = async () => {
    if (!file) {
      console.log('no file selected');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64 = reader.result;
        const fileName = file.name;
        await addDoc(collection(db, 'file_storage'), {
          createAt: new Date(),
          file: base64,
          fileName: fileName,
        });
        console.log('File uploaded to Firestore');
        setFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  };

  return (
    <>
      <div className="flex gap-2">
        <Input type="file" onChange={handleFileChange} />

        <button
          className="text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          onClick={uploadFile}
        >
          Upload{' '}
        </button>
      </div>
    </>
  );
};

export default FileUpload;
