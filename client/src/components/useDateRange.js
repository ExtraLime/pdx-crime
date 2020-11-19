import "./constants/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";


const useDateRange = () => {
  const tdate = new Date()
  const [startDate, setStartDate] = useState(new Date(tdate.setDate(tdate.getDate()-60)));
  const [endDate, setEndDate] = useState(new Date(tdate.setDate(tdate.getDate()+59)));

  const DateRange = () => (    
    <div className={'dateSelect'}>
      <label id='startDate'>Start Date   
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date('2020-02-29')}
        className="datepicker"
      />
      </label>
      <label id='EndDate'>End Date    
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        maxDate={tdate.setDate(tdate.getDate()-1)}
        className="datepicker"
      />
      </label>
    </div>
  );

  return [ startDate, endDate, DateRange, setStartDate, setEndDate]
}
export default useDateRange;