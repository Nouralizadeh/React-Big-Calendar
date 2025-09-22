import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import EventModal from './EventModal';
import EventDrawer from './EventDrawer';
import './AdvancedFullCalendar.css';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  extendedProps?: {
    desc?: string;
    location?: string;
    priority?: 'low' | 'medium' | 'high';
  };
}

const AdvancedFullCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(2024, 5, 17, 10, 0),
      end: new Date(2024, 5, 17, 11, 30),
      extendedProps: {
        desc: 'Weekly team sync meeting',
        priority: 'high'
      }
    },
    {
      id: '2',
      title: 'Project Workshop',
      start: new Date(2024, 5, 18, 14, 0),
      end: new Date(2024, 5, 18, 16, 0),
      extendedProps: {
        desc: 'Project planning session',
        priority: 'medium'
      }
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState('timeGridWeek');
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(mobile ? 'timeGridDay' : currentView);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [currentView]);

  const handleSelect = (selectInfo: any) => {
    setSelectedSlot({
      start: selectInfo.start,
      end: selectInfo.end
    });
    setSelectedEvent(null);
    
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAddEvent = (eventData: { title: string; start: Date; end: Date; desc?: string }) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventData.title,
      start: eventData.start,
      end: eventData.end,
      extendedProps: {
        desc: eventData.desc || ''
      }
    };
    
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setIsModalOpen(false);
    setIsDrawerOpen(false);
  };

  const handleUpdateEvent = (eventData: { title: string; start: Date; end: Date; desc?: string }) => {
    if (selectedEvent) {
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id
          ? { 
              ...event, 
              title: eventData.title, 
              start: eventData.start, 
              end: eventData.end,
              extendedProps: {
                ...event.extendedProps,
                desc: eventData.desc || ''
              }
            }
          : event
      );
      setEvents(updatedEvents);
    }
    setIsModalOpen(false);
    setIsDrawerOpen(false);
    setSelectedEvent(null);
  };

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      allDay: clickInfo.event.allDay,
      extendedProps: clickInfo.event.extendedProps
    });
    setSelectedSlot({
      start: clickInfo.event.start,
      end: clickInfo.event.end
    });
    
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleEventDrop = (dropInfo: any) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === dropInfo.event.id 
          ? { 
              ...event, 
              start: dropInfo.event.start, 
              end: dropInfo.event.end 
            } 
          : event
      )
    );
  };

  const handleEventResize = (resizeInfo: any) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === resizeInfo.event.id 
          ? { 
              ...event, 
              start: resizeInfo.event.start, 
              end: resizeInfo.event.end 
            } 
          : event
      )
    );
  };

  const handleViewChange = (newView: string) => {
    setCurrentView(newView);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(newView);
    }
  };

  const handleNavigate = (action: 'prev' | 'next' | 'today') => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      switch (action) {
        case 'prev':
          calendarApi.prev();
          break;
        case 'next':
          calendarApi.next();
          break;
        case 'today':
          calendarApi.today();
          break;
      }
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(prevEvents => prevEvents.filter(e => e.id !== selectedEvent.id));
      setIsModalOpen(false);
      setIsDrawerOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="timesheet-calendar">
      <div className="timesheet-header">
        <h2>Timesheet</h2>
        <div className="view-toggle">
          <button
            className={`view-btn ${currentView === 'dayGridMonth' ? 'active' : ''}`}
            onClick={() => handleViewChange('dayGridMonth')}
          >
            Month
          </button>
          <button
            className={`view-btn ${currentView === 'timeGridWeek' ? 'active' : ''}`}
            onClick={() => handleViewChange('timeGridWeek')}
          >
            Week
          </button>
          <button
            className={`view-btn ${currentView === 'timeGridDay' ? 'active' : ''}`}
            onClick={() => handleViewChange('timeGridDay')}
          >
            Day
          </button>
          <button
            className={`view-btn ${currentView === 'listWeek' ? 'active' : ''}`}
            onClick={() => handleViewChange('listWeek')}
          >
            List
          </button>
          <button
            className={`view-btn ${currentView === 'timeGrid' ? 'active' : ''}`}
            onClick={() => handleViewChange('timeGrid')}
          >
            Agenda
          </button>
        </div>
        <div className="navigation-buttons">
          <button onClick={() => handleNavigate('prev')}>‹</button>
          <button onClick={() => handleNavigate('today')}>Today</button>
          <button onClick={() => handleNavigate('next')}>›</button>
        </div>
      </div>

      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin, 
            timeGridPlugin, 
            interactionPlugin, 
            listPlugin
          ]}
          initialView="timeGridWeek"
          headerToolbar={false}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={3}
          weekends={true}
          nowIndicator={true}
          slotDuration="00:15:00"
          slotLabelInterval="01:00"
          allDaySlot={true}
          select={handleSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          height="auto"
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
          eventResizableFromStart={true}
          eventDisplay="block"
          views={{
            timeGrid: {
              type: 'timeGrid',
              duration: { days: 7 },
              buttonText: 'Agenda'
            }
          }}
        />
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        onAddEvent={selectedEvent ? handleUpdateEvent : handleAddEvent}
        onDeleteEvent={selectedEvent ? handleDeleteEvent : undefined}
        selectedSlot={selectedSlot}
        selectedEvent={selectedEvent}
      />

      <EventDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedEvent(null);
        }}
        onAddEvent={selectedEvent ? handleUpdateEvent : handleAddEvent}
        onDeleteEvent={selectedEvent ? handleDeleteEvent : undefined}
        selectedSlot={selectedSlot}
        selectedEvent={selectedEvent}
        isMobile={isMobile}
      />
    </div>
  );
};

export default AdvancedFullCalendar;