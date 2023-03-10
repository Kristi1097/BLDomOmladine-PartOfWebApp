import React from "react";
import "./Kalendar.css";
import { useState } from "react";
import useFetch from "./useFetch";
import Kalendar from "./Kalendar";

// Sample events calendar build, explained and detailed over at
// https://justacoding.blog/react-calendar-component-example-with-events/
const KalendarDogadjaja = () => {
  

  const [date, setDate] = useState(new Date());
  const {data: events,error,isPending} = useFetch(global.urls.links.kalendarURL);

  return (
    <div className="kalendar-content">
      <div className="Kalendar">
        {isPending && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {events && <Kalendar events={events} />}
      </div>
    </div>
  );
};
export default KalendarDogadjaja;