import { useEffect, useState } from "react";
import axios from "axios";

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

const Clock = () => {
  const [hour, setHour] = useState<String>("00");
  const [min, setMin] = useState<String>("00");
  const [sec, setSec] = useState<String>("00");
  const [id, setId] = useState<Number>();
  const [click, setClick] = useState<boolean>(true);

  const currentTime = async () => {
    try {
      const time: any = await axios.get(
        "https://worldtimeapi.org/api/timezone/Asia/Tokyo"
      );
      const date = time.data.datetime;

      const dateTime = new Date(date);

      setHour(String(dateTime.getHours()).padStart(2, "0"));
      setMin(String(dateTime.getMinutes()).padStart(2, "0"));
      setSec(String(dateTime.getSeconds()).padStart(2, "0"));
    } catch (err: any) {
      console.log(err.meesage);
    }
  };

  const handleCheckIn = async () => {
    const time: any = await axios.get(
      "https://worldtimeapi.org/api/timezone/Asia/Tokyo"
    );
    const date = time.data.datetime;

    try {
      const postTime = await axios.post(`${LOCALDB_URL}schedules/`, {
        employee_id: 11,
        clock_in: date,
      });
      setId(postTime.data.id);
      console.log(postTime);
      setClick(!click);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const handleCheckOut = async () => {
    const time: any = await axios.get(
      "https://worldtimeapi.org/api/timezone/Asia/Tokyo"
    );
    const date = time.data.datetime;

    try {
      const postTime = await axios.patch(`${LOCALDB_URL}schedules/${id}`, {
        employee_id: 11,
        clock_out: date,
      });
      console.log(postTime);
      setClick(!click);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    currentTime();
    const interval = setInterval(currentTime, 1100);
    return () => clearInterval(interval);
  }, [sec]);

  return (
    <>
      <div className="flex flex-col w-full place-items-center overflow-auto">
      <div className="flex flex-row items-center place-content-center text-3xl top-0 z-10 h-20 w-full text-gray-600 dark:text-gray-300">
          <div>Clock In / Out</div>
        </div>
        <div className="flex flex-col place-items-center top-20 p-5">
          
            <div className="flex flex-row place-content-center w-full h-20">
              <h1
                style={{ fontFamily: "'Lato', sans-serif" }}
                className="text-gray-300 text-xl place-content-center"
              >
                Clock In / Clock Out
              </h1>
            </div>
            <div className="flex flex-col place-items-center">
              <div className="flex flex-col items-center">
                <div>
                  {click ? (
                    <h1 className="text-md sm:text-3xl text-center font-bold py-3 border-5 border-black dark:text-gray-300">
                      Time-IN
                    </h1>
                  ) : (
                    <h1 className="text-md sm:text-3xl  text-center font-bold py-3 border-5 border-black dark:text-gray-300">
                      Time-OUT
                    </h1>
                  )}
                </div>
                <div className="flex flex-col border-1 w-[200px] h-[100px] sm:w-[400px] sm:h-[100px] justify-center items-center opacity-40 bg-slate-400 rounded-xl">
                  <p className=" font-extralight text-3xl sm:text-5xl relative dark:text-gray-50">
                    <span>{hour}</span>
                    <span>:</span>
                    <span>{min}</span>
                    <span>:</span>
                    <span>{sec}</span>
                  </p>
                </div>
                <div className="py-4">
                  {click ? (
                    <button
                      className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      onClick={handleCheckIn}
                    >
                      Check-IN
                    </button>
                  ) : (
                    <button
                      className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      onClick={handleCheckOut}
                    >
                      Check-OUT
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Clock;
