import React, { useState } from "react";

function Area() {
  const [detail, setDetail] = useState({ rad: 0, area: 0 });
  const PI = 3.14;

  function Areacal() {
    const radius = parseFloat(detail.rad);
    const calculatedArea = PI * radius * radius;
    setDetail(prev => ({ ...prev, area: calculatedArea }));
  }

  return (
    <div>
      <input
        type="number"
        onChange={(e) =>
          setDetail((prev) => ({ ...prev, rad: e.target.value }))
        }
        placeholder="Enter radius"
      />
      <button onClick={Areacal}>Calculate Area</button>
      <h1>Area: {detail.area}</h1>
    </div>
  );
}

export default Area;
