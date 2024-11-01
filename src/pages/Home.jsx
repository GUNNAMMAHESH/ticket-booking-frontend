import React from "react";
import AllEvents from "../components/AllEvents";
import { useSelector } from "react-redux";
import AllTickets from "../components/AllTickets";

function Home() {
  // Access the name property from the user object in the Redux state with error handling
  const user = useSelector((state) => state.user.user);
  
  const name = user?.username || "Guest"; // Use optional chaining to avoid errors

  console.log("name", name);

  return (
    <div>
      <div className="text-xl font-semibold">
        Welcome,{""}
        <span className="text-orange-400 font-semibold text-3xl">{name}!</span>
      </div>
      <div className="overflow-x-auto">
        <AllEvents />
      </div>

      <div className="overflow-x-auto">
        <AllTickets />
      </div>
    </div>
  );
}

export default Home;
