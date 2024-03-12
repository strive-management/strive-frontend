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
      <div className="">
        <Input type="file" onChange={handleFileChange} />

        <button onClick={uploadFile}>Upload File </button>
      </div>
    </>
  );
};

export default FileUpload;
