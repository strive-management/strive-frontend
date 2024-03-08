import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DateTimeDisplay: React.FC = () => {

    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    useEffect(() => {

        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    const dateTimeString: string = moment(currentDate).format('MMMM Do YYYY, h:mm a');

    return (
        <div>
            <p>Current Date and Time: {dateTimeString}</p>
        </div>
    );
};

export default DateTimeDisplay;
