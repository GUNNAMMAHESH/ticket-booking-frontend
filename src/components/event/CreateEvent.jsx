import axiosInstance from "../../utils/axiosInstance";
import React, { useState } from "react";

const CreateEvent = () => {
  const [event, setEvent] = useState({
    EventName: "",
    description: "",
    date: "",
    location: "",
    price: "",
    photo: null, 
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setEvent({ ...event, [name]: files[0] }); 
    } else {
      setEvent({ ...event, [name]: value }); 
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(event); 

    const formData = new FormData();
    for (const key in event) {
      formData.append(key, event[key]); 
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/events/create",
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data); 
    } catch (error) {
      console.log("Failed to create Event", error.message);
    }
  }
  return (
    <div>
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
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="mt-4 w-full p-2 border border-gray-300 rounded"
              rows="3"
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
          <div className="mb-4">
            <label htmlFor="photo" className="block font-semibold">
              Event Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*" 
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
    </div>
  )
}

export default CreateEvent