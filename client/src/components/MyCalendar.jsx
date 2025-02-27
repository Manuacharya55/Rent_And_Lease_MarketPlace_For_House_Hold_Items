import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = ({ props,setSelectedDate }) => {
  const [value, setValue] = useState(new Date());

  const handleDateClick = (date) => {
    const selectedDate = new Date(date);
    const formattedDate = selectedDate.toISOString();
    setSelectedDate(formattedDate.split("T")[0])
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Calendar
        onChange={handleDateClick} // Click event handler
        value={value}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const formattedDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
            return props.includes(formattedDate) ? "marked-date" : "";
          }
        }}
      />
    </div>
  );
};

export default MyCalendar;
