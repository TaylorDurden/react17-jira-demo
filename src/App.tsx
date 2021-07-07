import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { calculate } from "entry";
import { ProjectListScreen } from "page/project";

function App() {
  useEffect(() => {
    calculate();
  });

  return (
    <div className="App">
      <ProjectListScreen></ProjectListScreen>
    </div>
  );
}

export default App;
