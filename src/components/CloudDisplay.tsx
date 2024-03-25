import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import FileUpload from "./FileUpload";
import trash from "../assets/trash-solid.svg";
import download from "../assets/download-solid.svg";

const CloudDisplay: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "file_storage"));
    const docsArray: any[] = [];
    querySnapshot.forEach((doc) => {
      docsArray.push({ id: doc.id, ...doc.data() });
    });
    setDocuments(docsArray);
  };

  const downloadFile = (base64String: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = base64String;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteFile = async (docId: string) => {
    await deleteDoc(doc(db, "file_storage", docId));
    fetchData();
  };

  return (
    <>
      <div className='flex flex-col w-full pt-10 sm:pt-10 overflow-auto'>
      <div className="flex flex-row items-center place-content-center text-3xl top-0 z-10 h-20 pt-20 w-full text-gray-600 dark:text-gray-300">
          <div className="mt-0">File Storage</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 justify-evenly top-20 p-4 mt-10 border-2 border-gray-500 dark:border-gray-300 rounded-xl sm:p-10 sm:mt-10">
          <FileUpload />
          <div className="overflow-x-auto">
            {documents.map((doc) => (
              <div className="flex justify-end gap-5 m-2 text-gray-700 dark:text-gray-300" key={doc.id}>
                <p className="p-2">
                  {doc.fileName || "No file name available"}
                </p>
                <button
                  className="inline-block rounded bg-blue-300 hover:bg-blue-500 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  onClick={() => downloadFile(doc.file, doc.fileName)}
                >
                  <div className="flex flex-row justify-center">
                    <div className="hidden sm:block">Download</div>
                    <div className="block sm:hidden">
                      <img src={download} className="w-4 h-4"></img>
                    </div>
                  </div>
                </button>

                <button
                  className="inline-block rounded bg-red-300 hover:bg-red-500 dark:bg-transparent dark:border-2 dark:border-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-red-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-red-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  onClick={() => deleteFile(doc.id)}
                >
                  <div className="flex flex-row justify-center">
                    <div className="hidden sm:block">Delete</div>
                    <div className="block sm:hidden">
                      <img src={trash} className="w-4 h-4"></img>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CloudDisplay;
