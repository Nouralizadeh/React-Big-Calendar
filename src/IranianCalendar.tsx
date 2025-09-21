import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fa';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './IranianCalendar.css';

moment.locale('fa', {
  week: {
    dow: 6, 
    doy: 12 
  }
});

const localizer = momentLocalizer(moment);


const getIranianDayOfWeek = (date: Date) => {
  const day = moment(date).day(); 
  
  return (day + 1) % 7;
};

const IranianCalendar = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'جلسه تیم',
      start: new Date(2024, 5, 15, 10, 0),
      end: new Date(2024, 5, 15, 11, 30),
    },
    {
      id: 2,
      title: 'تحلیل پروژه',
      start: new Date(2024, 5, 16, 14, 0),
      end: new Date(2024, 5, 16, 16, 0),
    }
  ]);


  const workingDaysEvents = events.filter(event => {
    const dayOfWeek = getIranianDayOfWeek(event.start);
    return dayOfWeek < 5; 
  });

  const CustomHeader = useCallback(({ label, date }: { label: string, date: Date }) => {
    const iranianDayOfWeek = getIranianDayOfWeek(date);
    const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    
    return (
      <div className="custom-header">
        <div className="day-name">{dayNames[iranianDayOfWeek]}</div>
        <div className="day-number">{moment(date).format('jD')}</div>
      </div>
    );
  }, []);


  const CustomMonthView = useCallback(({ date }: { date: Date }) => {
    const iranianDayOfWeek = getIranianDayOfWeek(date);
    
    if (iranianDayOfWeek >= 5) {
      return null;
    }

    return (
      <div className="custom-month-day">
        {moment(date).format('jD')}
      </div>
    );
  }, []);

  return (
    <div className="iranian-calendar-container">
      <h2>تقویم ایرانی (شنبه تا چهارشنبه)</h2>
      <Calendar
        localizer={localizer}
        events={workingDaysEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500px' }}
        culture="fa"
        views={['month', 'week']}
        components={{
          month: {
            dateHeader: CustomMonthView
          },
          week: {
            header: CustomHeader
          }
        }}
        formats={{
          dayFormat: (date: Date) => {
            const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'];
            const iranianDayOfWeek = getIranianDayOfWeek(date);
            return dayNames[iranianDayOfWeek] || '';
          },
          weekdayFormat: (date: Date) => {
            const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'];
            const iranianDayOfWeek = getIranianDayOfWeek(date);
            return dayNames[iranianDayOfWeek] || '';
          }
        }}
        messages={{
          next: "بعدی",
          previous: "قبلی",
          today: "امروز",
          month: "ماه",
          week: "هفته",
          date: "تاریخ",
          time: "زمان",
          event: "رویداد",
        }}
      />
    </div>
  );
};

export default IranianCalendar;