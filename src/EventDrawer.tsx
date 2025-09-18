import React, { useState, useEffect } from 'react';
import './EventDrawer.css';

interface EventData {
  title: string;
  start: Date;
  end: Date;
}

interface EventDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: EventData) => void;
  selectedSlot: { start: Date; end: Date } | null;
  isMobile: boolean;
}

const EventDrawer: React.FC<EventDrawerProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  selectedSlot,
  isMobile
}) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('12:00');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (selectedSlot) {
      setSelectedDate(selectedSlot.start);
      setStartTime(formatTime(selectedSlot.start));
      setEndTime(formatTime(selectedSlot.end));
    }
  }, [selectedSlot]);

  const formatTime = (date: Date): string => {
    return date.toTimeString().substring(0, 5);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) return;

    const start = new Date(selectedDate);
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    start.setHours(startHours, startMinutes);

    const end = new Date(selectedDate);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    end.setHours(endHours, endMinutes);

    onAddEvent({
      title,
      start,
      end
    });

    // Reset form
    setTitle('');
    setStartTime('11:00');
    setEndTime('12:00');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className={`event-drawer ${isMobile ? 'mobile' : ''}`}>
        <div className="drawer-header">
          <button className="drawer-close-btn" onClick={onClose}>
            <i className="fas fa-arrow-down"></i>
          </button>
          <h2>Add New Event</h2>
          <button className="drawer-save-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>

        <form onSubmit={handleSubmit} className="drawer-form">
          <div className="input-group">
            <label htmlFor="drawer-event-title">Event Title</label>
            <input
              type="text"
              id="drawer-event-title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <label htmlFor="drawer-event-date">Date</label>
            <input
              type="date"
              id="drawer-event-date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              required
            />
          </div>

          <div className="input-group">
            <label>Time</label>
            <div className="time-container">
              <div className="time-input">
                <label htmlFor="drawer-start-time">From</label>
                <input
                  type="time"
                  id="drawer-start-time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="time-input">
                <label htmlFor="drawer-end-time">To</label>
                <input
                  type="time"
                  id="drawer-end-time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EventDrawer;