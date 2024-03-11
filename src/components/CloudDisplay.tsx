import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

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
      <div>
        {documents.map((doc) => (
          <div key={doc.id}>
            <p>{doc.fileName || 'No file name available'}</p>
            <button onClick={() => downloadFile(doc.file, doc.fileName)}>
              Download
            </button>

            <button onClick={() => deleteFile(doc.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CloudDisplay;
