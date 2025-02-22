import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Insights from "./Containers/Insights/Insights";
import Drawer from "./Components/Drawer/Drawer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Drawer />
      <Insights />
    </>
  );
}

export default App;
