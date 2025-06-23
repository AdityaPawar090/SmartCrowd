
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    crowdCount: ''
  });

  const fetchEvents = async () => {
    const res = await axios.get('http://localhost:5000/events');
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/events', formData);
    setFormData({ name: '', location: '', date: '', crowdCount: '' });
    fetchEvents();
  };

  return (
    <div className="container">
      <h1>🎯 SmartCrowd Organizer Dashboard</h1>

      <form className="event-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input name="crowdCount" type="number" placeholder="Crowd Count" value={formData.crowdCount} onChange={handleChange} />
        <button type="submit">Add Event</button>
      </form>

      <h2>📅 Upcoming Events</h2>
      <div className="event-list">
        {events.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          events.map((e, i) => (
            <div className="event-card" key={i}>
              <h3>{e.name}</h3>
              <p>📍 {e.location}</p>
              <p>📆 {new Date(e.date).toLocaleDateString()}</p>
              <p>👥 Crowd: {e.crowdCount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

