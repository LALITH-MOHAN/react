import React from "react";
import ClickButton from "./components/ClickButton";
import withCounter from "./components/WithCOunter";

const EnhancedClickButton = withCounter(ClickButton); //HOC which enchances Clickbutton component

function App() {
  return (
    <div>
      <h1>Higher Order Component</h1>
      <EnhancedClickButton />
    </div>
  );
}

export default App;
