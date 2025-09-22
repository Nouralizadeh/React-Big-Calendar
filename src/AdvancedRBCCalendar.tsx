import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './EventModal';
import EventDrawer from './EventDrawer';
import './AdvancedRBCCalendar.css';
import Events from "./events"

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  allDay?: boolean;
  title: string;
  start: Date;
  end: Date;
  desc?: string;
}

const AdvancedRBCCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(Events);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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

  return (
    <div className="advanced-calendar-fullscreen">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: '100%' }}
        defaultView="month"
        views={['month', 'week', 'day', 'agenda']}
        messages={{
          next: "Next",
          previous: "Previous",
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          agenda: "Agenda",
          date: "Date",
          time: "Time",
          event: "Event",
        }}
      />

      {/* Modal for desktop */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddEvent={handleAddEvent}
        selectedSlot={selectedSlot}
      />

      {/* Drawer for mobile */}
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

export default AdvancedRBCCalendar;