import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import FileUpload from './FileUpload';

const CloudDisplay: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'file_storage'));
    const docsArray: any[] = [];
    querySnapshot.forEach((doc) => {
      docsArray.push({ id: doc.id, ...doc.data() });
    });
    setDocuments(docsArray);
  };

  const downloadFile = (base64String: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = base64String;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteFile = async (docId: string) => {
    await deleteDoc(doc(db, 'file_storage', docId));
    fetchData();
  };

  return (
    <>
      <div className="flex flex-col gap-12 m-24">
        <FileUpload />
        <div>
          {documents.map((doc) => (
            <div className="flex justify-end gap-5 m-2" key={doc.id}>
              <p className="p-2 border-b-2">
                {doc.fileName || 'No file name available'}
              </p>
              <button
                className="text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={() => downloadFile(doc.file, doc.fileName)}
              >
                Download
              </button>

              <button
                className="text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={() => deleteFile(doc.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CloudDisplay;
