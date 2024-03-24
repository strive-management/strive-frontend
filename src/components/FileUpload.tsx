import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useState } from 'react';
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
      
      <div className="flex flex-col gap-2">
        <Input type="file" onChange={handleFileChange} />

        <button
          className="inline-block rounded bg-green-300 hover:bg-green-500 dark:bg-transparent dark:border-2 dark:border-green-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-green-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-green-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          onClick={uploadFile}
        >
          Upload{' '}
        </button>
      </div>
    </>
  );
};

export default FileUpload;
