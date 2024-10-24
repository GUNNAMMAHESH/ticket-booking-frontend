import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function AllEvents() {
  const [allMovies, getAllMovies] = useState({
    EventName: "",
    date: "",
    location: "",
    price: "",
  });

  const getMovies = async (req, res) => {
    try {
      const response = await axiosInstance.get("/allevents");
      console.log("wishky", response.data);

      getAllMovies(response.data);
    } catch (error) {
      console.error(error.message);
    }
    getMovies();
  };
  return (
    <div>
      <div>AllEvents</div>
      <div>
        {EventName}
        {date}
        {location}
        {price}
      </div>
    </div>
  );
}

export default AllEvents;
