// Filename: Home.js

import React, { useState, useEffect } from "react";
import getData from "../../api/getData"; // Importing getData function

function Home() {
  const [data, setData] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, []);

  return (
    <section>
      <div>
        <h1>React and Flask</h1>
        {/* Displaying data */}
        <p>{data.name}</p>
        <p>{data.age}</p>
        <p>{data.date}</p>
        <p>{data.programming}</p>
      </div>
    </section>
  );
}

export default Home;
