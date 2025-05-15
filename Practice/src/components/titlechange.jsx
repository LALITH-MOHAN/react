import React, { useState, useEffect } from 'react';

function Title() {
  const [count, setCount] = useState(0); 

  useEffect(() => {
    console.log("STATE CHANGES");
    document.title = `COUNT IS ${count}`; // title of the       website changes everytime when count changes(side-effect)
  }, [count]);

  return (
    <div>
      <p>CLICKED {count} times</p>
      <button onClick={() => setCount(count + 1)}>CLICK</button>
    </div>
  );
}

export default Title;
