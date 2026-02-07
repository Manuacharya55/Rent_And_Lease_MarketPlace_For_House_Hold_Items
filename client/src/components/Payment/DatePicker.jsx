import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DatePicker = ({ setSelectedDate, selectedDate, bookedDates = [] }) => {

  const handleDateClick = (date) => {
    // Offset for timezone to ensure the correct date string is picked
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    const formattedDate = adjustedDate.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  };

  // Function to add custom classes to tiles (dates)
const tileClassName = ({ date, view }) => {
  if (view === 'month') {

    const dateString = date.toLocaleDateString('en-CA');

    if (selectedDate === dateString) {
      return 'highlighted-date';
    }

    const isBooked = bookedDates?.some(item => {
      const bookedDateString = item.rentDate.split('T')[0];
      return bookedDateString === dateString;
    });

    if (isBooked) {
      return 'booked-date';
    }
  }
  return null;
};

  return (
    <div className="my-calendar-container">
      <Calendar
        onChange={handleDateClick}
        value={selectedDate ? new Date(selectedDate) : new Date()}
        tileClassName={tileClassName}
        className="custom-calendar-styles"
      />
    </div>
  );
};

export default DatePicker;
