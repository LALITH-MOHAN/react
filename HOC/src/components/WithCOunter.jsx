import React, { useState } from "react";

function withCounter(WrappedComponent) {
  return function EnhancedComponent(props) {
    const [count, setCount] = useState(0);

    const increment = () => setCount(prev => prev + 1); //increase count

    return <WrappedComponent count={count} increment={increment} {...props} />; //adds two new props with previous props
  };
}

export default withCounter;
