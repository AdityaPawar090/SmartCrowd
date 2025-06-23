import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    fetchEvents(); // reload events
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>SmartCrowd: Event Manager Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input name="crowdCount" type="number" placeholder="Crowd Count" value={formData.crowdCount} onChange={handleChange} />
        <button type="submit">Add Event</button>
      </form>

      <h2>Live Events:</h2>
      {events.length === 0 ? (
        <p>No events added yet.</p>
      ) : (
        <ul>
          {events.map((e, index) => (
            <li key={index}>
              <strong>{e.name}</strong> – {e.location} – {new Date(e.date).toLocaleDateString()} – Crowd: {e.crowdCount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
