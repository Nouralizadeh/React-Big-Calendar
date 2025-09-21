import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import EventModal from './EventModal';
import EventDrawer from './EventDrawer';
import './TimesheetCalendar.css';
import Events from "./events";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

interface Event {
  id: number;
  allDay?: boolean;
  title: string;
  start: Date;
  end: Date;
  desc?: string;
}

const TimesheetCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(Events);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState<'week' | 'day'>('week');

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setView(mobile ? 'day' : 'week');
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end
    });
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      setIsModalOpen(true);
    }
  }, [isMobile]);

  const handleAddEvent = useCallback((eventData: { title: string; start: Date; end: Date }) => {
    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      start: eventData.start,
      end: eventData.end
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setIsModalOpen(false);
    setIsDrawerOpen(false);
  }, []);

  const handleSelectEvent = useCallback((event: Event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}" event?`)) {
      setEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const handleViewChange = useCallback((newView: 'week' | 'day') => {
    setView(newView);
  }, []);

  const handleEventDrop = useCallback(({ event, start, end }) => {
    setEvents(prevEvents =>
      prevEvents.map(e =>
        e.id === event.id ? { ...e, start, end } : e
      )
    );
  }, []);

  const handleEventResize = useCallback(({ event, start, end }) => {
    setEvents(prevEvents =>
      prevEvents.map(e =>
        e.id === event.id ? { ...e, start, end } : e
      )
    );
  }, []);

  return (
    <div className="timesheet-calendar">
      <div className="timesheet-header">
        <h2>Timesheet</h2>
        <div className="view-toggle">
          <button
            className={`view-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => handleViewChange('week')}
          >
            Week
          </button>
          <button
            className={`view-btn ${view === 'day' ? 'active' : ''}`}
            onClick={() => handleViewChange('day')}
          >
            Day
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <DnDCalendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  selectable
  resizable
  step={15}
  timeslots={4}
  onSelectSlot={handleSelectSlot}
  onSelectEvent={handleSelectEvent}
  onEventDrop={handleEventDrop}
  onEventResize={handleEventResize}
  view={view}
  onView={() => {}}
  style={{ height: '100%' }}
  views={{ week: true, day: true }}
  messages={{
    next: "Next",
    previous: "Previous",
    today: "Today",
    week: "Week",
    day: "Day",
    date: "Date",
    time: "Time",
    event: "Event",
  }}
  eventPropGetter={() => ({
    style: {
      backgroundColor: '#4285f4',
      borderRadius: '4px',
      border: 'none',
      fontSize: '14px',
      padding: '2px 5px',
    },
  })}
/>

      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddEvent={handleAddEvent}
        selectedSlot={selectedSlot}
      />

      <EventDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onAddEvent={handleAddEvent}
        selectedSlot={selectedSlot}
        isMobile={isMobile}
      />
    </div>
  );
};

export default TimesheetCalendar;
