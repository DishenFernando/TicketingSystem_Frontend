import React, { useEffect } from "react";

interface LogDisplayProps {
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>; // Ensure this function is comming from parent
}

const LogDisplay: React.FC<LogDisplayProps> = ({ logs, setLogs }) => {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/api/ticket-system/logs");

    eventSource.onmessage = (event) => {
      // Add new logs from the backend streaming to the logs array using setLogs
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    eventSource.onerror = () => {
      console.error("Error with log stream.");
      eventSource.close();
    };

    return () => {
      eventSource.close(); // Clean up the event source on component unmount
    };
  }, [setLogs]); // Ensure setLogs is aleready put as a dependency

  return (
    <div className="log-container1">
      <h2>Logs</h2>
      <div className="log-display">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default LogDisplay;
