import React from "react";
import AllEvents from "../components/AllEvents";
import { useSelector } from "react-redux";
import AllTickets from "../components/AllTickets";

function Home() {
  const { user, token } = useSelector((state) => state.user.user);

  const name = user?.username || "Guest";

  console.log("name", name);

  return (
    <div>
      <div className="text-xl font-semibold">
        Welcome,
        <span className="text-orange-400 font-semibold text-3xl">{name}!</span>
      </div>
      <div>
        <AllEvents />
      </div>

      {token && (
        <div className="overflow-x-auto">
          <AllTickets />
        </div>
      )}
    </div>
  );
}

export default Home;
