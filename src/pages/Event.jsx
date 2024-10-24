import AllEvents from "../components/AllEvents";
import axiosInstance from "../utils/axiosInstance";
import React, { useState } from "react";


const Event = () => {
  const [event, setEvent] = useState({
    EventName: "",
    date: "",
    location: "",
    price: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(event); // Check the event data

    const response = await axiosInstance.post("http://localhost:5000/events/create",event);
  }

  return (
    <>
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="EventName" className="block font-semibold">
            Event Name
          </label>
          <input
            type="text"
            id="EventName"
            name="EventName"
            value={event.EventName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block font-semibold">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-semibold">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={event.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-semibold">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full font-semibold bg-orange-400 text-white py-2 rounded hover:text-orange-600 hover:bg-white hover:border-2 hover:border-orange-400 transition ease-in-out delay-250 active:bg-orange-400 active:text-white"
        >
          Create Event
        </button>
      </form>

      
    </div>
    <AllEvents />
    </>
  );
};

export default Event;
