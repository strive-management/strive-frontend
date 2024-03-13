import { useEffect, useState } from 'react'
import SideNavBar from '../components/NewNavBar'

import axios from 'axios'


const Clock = () => {
      const [hour, setHour] = useState<String>('00')
      const [min, setMin] = useState<String>('00')
      const [sec, setSec] = useState<String>('00')
      const [id, setId] = useState<Number>()
      const [click, setClick ]= useState<boolean>(true)


    const currentTime = async () => {
      try {
        const time:any =  await axios.get("http://worldtimeapi.org/api/timezone/Asia/Tokyo")
        const date = time.data.datetime

        const dateTime = new Date(date)
        

        setHour(String(dateTime.getHours()).padStart(2,'0'))
        setMin(String(dateTime.getMinutes()).padStart(2,'0'))
        setSec(String(dateTime.getSeconds()).padStart(2,'0'))

        
      } catch (err:any) {
        console.log(err.meesage)
      }
    }

    const handleCheckIn = async () => {
      const time:any =  await axios.get("http://worldtimeapi.org/api/timezone/Asia/Tokyo")
      const date = time.data.datetime

      try {
        const postTime = await axios.post('http://localhost:8080/clocks/', {
         employee_id: 11,
         clock_in: date
        })
        setId(postTime.data.id)
        console.log(postTime);
        setClick(!click)
      } catch (err:any) {
        console.log(err.message)
      }
    }
    const handleCheckOut = async () => {
      const time:any =  await axios.get("http://worldtimeapi.org/api/timezone/Asia/Tokyo")
      const date = time.data.datetime

      try {
        const postTime = await axios.patch(`http://localhost:8080/clocks/${id}`, {
         employee_id: 11,
         clock_out: date
        })
        console.log(postTime); 
        setClick(!click)
      } catch (err:any) {
        console.log(err.message)
      }
    }

    useEffect(() => {
      currentTime()
      const interval = setInterval(currentTime, 1100)
      return () => clearInterval(interval)
    },[sec])

  return (
    <>
    <div className='h-screen w-full dark:bg-[#503270]'>
    <SideNavBar />
    <div className="flex flex-row place-content-start pl-[300px] items-center bg-gray-300 dark:bg-[#1a0429]/80 w-full h-20">
            <h1
              style={{ fontFamily: "'Lato', sans-serif" }}
              className="text-gray-300 text-xl place-content-center"
            >
              Clock In / Clock Out
            </h1>
          </div>
    <div>
     <div className=' flex flex-col pl-[260px] items-center' >
      <div>
        {click ? <h1 className='text-3xl text-center font-bold py-3 border-5 border-black dark:text-gray-300'>Time-IN</h1> :
                 <h1 className='text-3xl  text-center font-bold py-3 border-5 border-black dark:text-gray-300'>Time-OUT</h1>  }
        </div>
        <div className=' flex border-1 w-[400px] h-[100px] justify-center items-center opacity-40 bg-slate-400 rounded-full'>
            <p className=' font-extralight text-5xl relative '>
              <span>{hour}</span>
              <span>:</span>
              <span>{min}</span>
              <span>:</span>
              <span>{sec}</span>
            </p>
        </div >
        <div className='py-4'>
         { click ? <button className='  p-4 border-collapse rounded-full hover:opacity-50 text-gray-300 bg-black active:bg-slate-400 ' onClick={handleCheckIn} >Check-IN</button> :
                   <button className='  p-4 border-collapse rounded-full hover:opacity-50 text-gray-300 bg-black active:bg-slate-400'  onClick={handleCheckOut}>Check-OUT</button> }
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Clock
