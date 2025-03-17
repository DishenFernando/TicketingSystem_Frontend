import React, { useState } from "react";
import axios from "axios";

interface InputFormProps {
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputForm: React.FC<InputFormProps> = ({ setLogs }) => {
  const [totalTickets, setTotalTickets] = useState<number>(0);
  const [maxTicketsInPool, setMaxTicketsInPool] = useState<number>(0);
  const [releaseRate, setReleaseRate] = useState<number>(0);
  const [retrievalRate, setRetrievalRate] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLogs((prevLogs) => [...prevLogs, "Starting the ticket system..."]);
      const response = await axios.post("http://localhost:8080/api/ticket-system/start", null, {
        params: { totalTickets, maxTicketsInPool, releaseRate, retrievalRate },
      });
      setLogs((prevLogs) => [...prevLogs, response.data]);
      setIsRunning(true);
    } catch (error) {
      setLogs((prevLogs) => [...prevLogs, "Error starting the ticket system."]);
    }
  };

  const handleStop = async () => {
    try {
      setLogs((prevLogs) => [...prevLogs, "Stopping the ticket system..."]);
      const response = await axios.post("http://localhost:8080/api/ticket-system/stop");
      setLogs((prevLogs) => [...prevLogs, response.data]); // Add "System Stopped" to logs
      setIsRunning(false);
    } catch (error) {
      setLogs((prevLogs) => [...prevLogs, "Error stopping the ticket system."]);
    }
  };

  return (
    <form className="form-container1">
      <h2>Configure Ticket System</h2>
      <div className="form-group1">
        <label>Total Tickets</label>
        <input
          type="number"
          value={totalTickets}
          onChange={(e) => setTotalTickets(Number(e.target.value))}
          min={1}
          required
        />
      </div>
      <div className="form-group1">
        <label>Maximum Tickets in Pool</label>
        <input
          type="number"
          value={maxTicketsInPool}
          onChange={(e) => setMaxTicketsInPool(Number(e.target.value))}
          min={1}
          required
        />
      </div>
      <div className="form-group1">
        <label>Ticket Release Rate (ms)</label>
        <input
          type="number"
          value={releaseRate}
          onChange={(e) => setReleaseRate(Number(e.target.value))}
          min={100}
          required
        />
      </div>
      <div className="form-group1">
        <label>Customer Retrieval Rate (ms)</label>
        <input
          type="number"
          value={retrievalRate}
          onChange={(e) => setRetrievalRate(Number(e.target.value))}
          min={100}
          required
        />
      </div>
      <button type="submit" onClick={handleStart} disabled={isRunning}>
        Start System
      </button>
      <button type="button" onClick={handleStop} disabled={!isRunning}>
        Stop System
      </button>
    </form>
  );
};

export default InputForm;
