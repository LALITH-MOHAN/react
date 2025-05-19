import React from "react";

function ClickButton({ count, increment }) {
  return <button onClick={increment}>Clicked {count} times</button>; 
}

export default ClickButton;
