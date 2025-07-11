import {  hours, startWeek, useAppContext, weekdays } from "@/pages";
import React from "react";
import { format, addDays } from 'date-fns';

const Calendar=()=>{
    const { availability, role, setSelectedSlot } = useAppContext();
  
    return (
      <div className="grid grid-cols-6 gap-2">
        <div></div>
        {weekdays.map(day => (
          <div key={day} className="font-bold text-center">{day}</div>
        ))}
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <div className="font-bold">{hour}:00</div>
            {weekdays.map((_, d) => {
              const date = format(addDays(startWeek, d), 'yyyy-MM-dd');
              const slot = availability[date][hour];
  
              if (role === 'student') {
                return (
                  <div
                    key={d + '-' + hour}
                    className={`border p-2 text-center ${slot ? 'bg-gray-300' : 'cursor-pointer bg-green-100'}`}
                    onClick={() => !slot && setSelectedSlot({ date, hour })}
                  >
                    {slot ? 'Booked' : 'Available'}
                  </div>
                );
              } else {
                return (
                  <div
                    key={d + '-' + hour}
                    className={`border p-2 text-center ${slot ? 'bg-red-200' : 'bg-blue-100'}`}
                  >
                    {slot ? `${slot.student} - ${slot.subject}` : 'Available'}
                  </div>
                );
              }
            })}
          </React.Fragment>
        ))}
      </div>
    );
  }

export default Calendar