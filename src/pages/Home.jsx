import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AllEvents from "../components/AllEvents";
import AllTickets from "../components/AllTickets";

function Home() {
  const { user, token } = useSelector((state) => state.user);
  const name = user?.username || "Guest";

  const [activeSection, setActiveSection] = useState("headerRef");
const headerRef = useRef(null)
  const eventsRef = useRef(null);
  const ticketsRef = useRef(null);

  const scrollToSection = (sectionRef, sectionName) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionName);
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  };

  useEffect(() => {
    if (eventsRef.current) {
      scrollToSection(eventsRef, "events");
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    [eventsRef, ticketsRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      [eventsRef, ticketsRef].forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const renderSectionLink = (sectionName, sectionRef) => (
    <span
      className={`text-3xl font-semibold ${
        activeSection === sectionName
          ? "underline text-orange-400"
          : "text-white"
      }`}
      onClick={() => scrollToSection(sectionRef, sectionName)}
    >
      {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
    </span>
  );

  return (
    <div ref={headerRef} className="flex h-full">
      <div className="flex flex-col justify-start items-start mb-4 w-32 fixed">
        <div className=" flex flex-row text-2xl font-semibold mb-5">
          <div className="text-white">Welcome,</div>
          <span className="text-orange-400 font-semibold text-3xl">{name}!</span>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer">
          {token && renderSectionLink("events", eventsRef)}
          {token && renderSectionLink("tickets", ticketsRef)}
        </div>
      </div>

      <div className="ml-[15%] w-4/5  p-4">
        {/* Scrollable section with max height */}
        <div className="flex flex-col  w-full ">
          <div
            ref={eventsRef}
            id="events"
            className="p-4 flex-grow"
          >
            <AllEvents />
            
          </div>

          {token && (
            <div
              ref={ticketsRef}
              id="tickets"
              className="p-4 flex-grow w-full bg-black"
            >
              <AllTickets />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
