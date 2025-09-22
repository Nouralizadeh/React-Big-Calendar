import React, { useState, useEffect } from 'react';
import './EventModal.css';

interface EventData {
  title: string;
  start: Date;
  end: Date;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: EventData) => void;
  onDeleteEvent?: () => void;
  selectedSlot: { start: Date; end: Date } | null;
  selectedEvent?: {
    id: string;
    title: string;
    start: Date;
    end: Date;
  } | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  onDeleteEvent,
  selectedSlot,
  selectedEvent
}) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('12:00');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setSelectedDate(selectedEvent.start);
      setStartTime(formatTime(selectedEvent.start));
      setEndTime(formatTime(selectedEvent.end));
    } else if (selectedSlot) {
      setSelectedDate(selectedSlot.start);
      setStartTime(formatTime(selectedSlot.start));
      setEndTime(formatTime(selectedSlot.end));
    }
  }, [selectedSlot, selectedEvent]);

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

    setTitle('');
    setStartTime('11:00');
    setEndTime('12:00');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{selectedEvent ? 'Edit Event' : 'Add New Event'}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label htmlFor="event-title">Event Title</label>
            <input
              type="text"
              id="event-title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <label htmlFor="event-date">Date</label>
            <input
              type="date"
              id="event-date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              required
            />
          </div>

          <div className="input-group">
            <label>Time</label>
            <div className="time-container">
              <div className="time-input">
                <label htmlFor="start-time">From</label>
                <input
                  type="time"
                  id="start-time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="time-input">
                <label htmlFor="end-time">To</label>
                <input
                  type="time"
                  id="end-time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="button-group">
            {selectedEvent && onDeleteEvent && (
              <button 
                type="button" 
                className="delete-btn"
                onClick={onDeleteEvent}
              >
                Delete
              </button>
            )}
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              {selectedEvent ? 'Update' : 'Add'} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;