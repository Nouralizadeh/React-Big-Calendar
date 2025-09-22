import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './AgendaDemo.css';

const AgendaDemo: React.FC = () => {
  const [events] = useState([
    {
      id: '1',
      title: 'جلسه صبحگاهی',
      start: new Date(2024, 5, 18, 9, 0), // 18 ژوئن 2024, 9:00
      end: new Date(2024, 5, 18, 10, 0),
    },
    {
      id: '2', 
      title: 'پروژه برنامه‌نویسی',
      start: new Date(2024, 5, 18, 10, 30),
      end: new Date(2024, 5, 18, 12, 0),
    },
    {
      id: '3',
      title: 'ناهار',
      start: new Date(2024, 5, 18, 12, 0),
      end: new Date(2024, 5, 18, 13, 0),
    },
    {
      id: '4',
      title: 'ملاقات با مشتری',
      start: new Date(2024, 5, 18, 14, 0),
      end: new Date(2024, 5, 18, 15, 30),
    },
    {
      id: '5',
      title: 'بررسی عملکرد',
      start: new Date(2024, 5, 19, 11, 0), // روز بعد
      end: new Date(2024, 5, 19, 12, 0),
    }
  ]);

  return (
    <div className="agenda-demo">
      <h2>Agenda View Demo - نمای Agenda</h2>
      <div className="demo-instructions">
        <p>✨ اینجا می‌تونید ببینید رویدادها چطور در یک timeline عمودی نمایش داده می‌شن</p>
        <p>📅 Agenda View برای برنامه‌ریزی دقیق زمانی عالیه</p>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGrid"
          initialDate="2024-06-18"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,timeGrid'
          }}
          events={events}
          editable={true}
          selectable={true}
          allDaySlot={false}
          slotDuration="00:30:00"
          slotLabelInterval="01:00"
          height="600px"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
          }}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
          }}
          views={{
            timeGrid: {
              type: 'timeGrid',
              duration: { days: 3 }, // نمایش 3 روز در Agenda
              buttonText: 'Agenda (3 روز)'
            },
            timeGridWeek: {
              buttonText: 'هفته'
            },
            timeGridDay: {
              buttonText: 'روز'
            }
          }}
        />
      </div>

      <div className="agenda-explanation">
        <h3>💡 کاربرد Agenda View:</h3>
        <ul>
          <li>✅ <strong>نمایش چند روز همزمان</strong> - می‌توانید 2، 3 یا چند روز را با هم ببینید</li>
          <li>✅ <strong>برنامه‌ریزی دقیق زمانی</strong> - دیدگاه timeline برای مدیریت زمان</li>
          <li>✅ <strong>مقایسه روزها</strong> - می‌توانید برنامه روزهای مختلف را مقایسه کنید</li>
          <li>✅ <strong>مدیریت ظرفیت زمانی</strong> - به راحتی می‌بینید کدام بازه‌های زمانی خالی هستند</li>
        </ul>

        <div className="view-comparison">
          <h4>📊 مقایسه viewهای مختلف:</h4>
          <table>
            <thead>
              <tr>
                <th>View</th>
                <th>مناسب برای</th>
                <th>نمایش</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Day</td>
                <td>برنامه‌ریزی دقیق یک روز</td>
                <td>۱ روز - timeline عمودی</td>
              </tr>
              <tr>
                <td>Week</td>
                <td>بررسی کلی هفته</td>
                <td>۷ روز - افقی</td>
              </tr>
              <tr>
                <td>Agenda</td>
                <td>برنامه‌ریزی چند روز با جزئیات زمانی</td>
                <td>۲-۴ روز - timeline عمودی</td>
              </tr>
              <tr>
                <td>List</td>
                <td>مشاهده لیستی همه رویدادها</td>
                <td>لیست زمانی - بدون شبکه</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgendaDemo;