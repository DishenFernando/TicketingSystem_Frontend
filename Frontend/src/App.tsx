import React, { useState } from "react";
import InputForm from "./components/InputForm";
import LogDisplay from "./components/LogDisplay";
import './App.css';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  return (
    <div className="app-container1">
      <h1>Ticket Management System</h1>
      <InputForm setLogs={setLogs} />
      <LogDisplay logs={logs} setLogs={setLogs} /> {/* Pass setLogs to LogDisplay */}
    </div>
  );
};

export default App;
