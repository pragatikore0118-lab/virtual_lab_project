import { useState } from "react";
import "./SJF.css";
import CodeEditor from "./CodeEditor";

function SJF() {
  const [processId, setProcessId] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [processes, setProcesses] = useState([]);

  const addProcess = () => {
    if (burstTime === "") {
      alert("Please enter Burst Time.");
      return;
    }

    const burst = Number(burstTime);

    if (burst <= 0) {
      alert("Burst Time must be greater than 0.");
      return;
    }

    const id =
      processId.trim() !== ""
        ? processId.trim()
        : `P${processes.length + 1}`;

    setProcesses((prev) => [
      ...prev,
      {
        id,
        burstTime: burst,
        order: prev.length,
      },
    ]);

    setProcessId("");
    setBurstTime("");
  };

  const removeProcess = (index) => {
    setProcesses((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const resetAll = () => {
    setProcesses([]);
    setProcessId("");
    setBurstTime("");
  };

  // Non-Preemptive SJF
  // Shortest Burst Time first
  // Same Burst Time -> earlier added process first
  const sortedProcesses = [...processes].sort(
    (a, b) => {
      if (a.burstTime !== b.burstTime) {
        return a.burstTime - b.burstTime;
      }

      return a.order - b.order;
    }
  );

  let currentTime = 0;

  const results = sortedProcesses.map((process) => {
    const startTime = currentTime;

    const completionTime =
      startTime + process.burstTime;

    const waitingTime = startTime;

    const turnaroundTime = completionTime;

    currentTime = completionTime;

    return {
      ...process,
      startTime,
      completionTime,
      waitingTime,
      turnaroundTime,
    };
  });

  const averageWaitingTime =
    results.length > 0
      ? results.reduce(
          (sum, process) =>
            sum + process.waitingTime,
          0
        ) / results.length
      : 0;

  const averageTurnaroundTime =
    results.length > 0
      ? results.reduce(
          (sum, process) =>
            sum + process.turnaroundTime,
          0
        ) / results.length
      : 0;

  const totalBurstTime = results.reduce(
    (sum, process) =>
      sum + process.burstTime,
    0
  );

  return (
    <main className="sjf-page">

      {/* ================= HEADER ================= */}

      <header className="sjf-header">

        <div className="sjf-header-top">

          <button
            className="sjf-back-button"
            onClick={() => window.history.back()}
          >
            ← Back
          </button>

          <span className="sjf-os-badge">
            OPERATING SYSTEM
          </span>

        </div>

        <h1>
          Shortest Job First Scheduling
        </h1>

        <p>
          SJF is a CPU scheduling algorithm that
          selects the process with the shortest
          burst time for execution.
        </p>

      </header>

      {/* ================= THEORY ================= */}

      <section className="sjf-card">

        <div className="section-title">

          <span>📚</span>

          <div>

            <h2>SJF Theory</h2>

            <p>
              Understand the Shortest Job First
              scheduling algorithm.
            </p>

          </div>

        </div>

        <p className="theory-text">

          <strong>
            Shortest Job First (SJF)
          </strong>{" "}
          is a CPU scheduling algorithm in which
          the process having the shortest burst time
          is selected for execution first.

        </p>

        <p className="theory-text">

          SJF is a{" "}
          <strong>Non-Preemptive</strong>{" "}
          scheduling algorithm. Once a process starts
          execution, it continues until its burst time
          is completely finished.

        </p>

        <p className="theory-text">

          In this practical, processes are arranged
          according to their burst time in ascending
          order before execution.

        </p>

        <div className="theory-grid">

          <div className="theory-box">

            <h3>⚡ Selection</h3>

            <p>
              The process with the shortest burst
              time is selected first.
            </p>

          </div>

          <div className="theory-box">

            <h3>🔒 Non-Preemptive</h3>

            <p>
              Once execution starts, the process
              continues until completion.
            </p>

          </div>

          <div className="theory-box">

            <h3>⏱️ Completion</h3>

            <p>
              Completion time is calculated using
              the current execution time.
            </p>

          </div>

          <div className="theory-box">

            <h3>📊 Objective</h3>

            <p>
              SJF attempts to minimize average
              waiting time.
            </p>

          </div>

        </div>

        <div className="formula-box">

          <strong>
            Important Formulas
          </strong>

          <div className="formula-list">

            <span>
              Completion Time = Start Time + Burst Time
            </span>

            <span>
              Waiting Time = Start Time
            </span>

            <span>
              Turnaround Time = Completion Time
            </span>

          </div>

        </div>

      </section>

      {/* ================= ADD PROCESSES ================= */}

      <section className="sjf-card">

        <div className="section-title">

          <span>⚙️</span>

          <div>

            <h2>Add Processes</h2>

            <p>
              Enter process ID and burst time.
            </p>

          </div>

        </div>

        <div className="input-area">

          <div className="input-group">

            <label>
              Process ID
            </label>

            <input
              type="text"
              value={processId}
              placeholder={`P${processes.length + 1}`}
              onChange={(e) =>
                setProcessId(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>
              Burst Time
            </label>

            <input
              type="number"
              min="1"
              value={burstTime}
              placeholder="e.g. 5"
              onChange={(e) =>
                setBurstTime(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addProcess();
                }
              }}
            />

          </div>

          <button
            className="add-btn"
            onClick={addProcess}
          >
            + Add Process
          </button>

          <button
            className="reset-btn"
            onClick={resetAll}
          >
            Reset
          </button>

        </div>

      </section>

      {/* ================= PROCESS QUEUE ================= */}

      {processes.length > 0 && (

        <section className="sjf-card">

          <div className="section-title">

            <span>📋</span>

            <div>

              <h2>Process Queue</h2>

              <p>
                Processes are selected according
                to the shortest burst time.
              </p>

            </div>

          </div>

          <div className="process-chips">

            {processes.map((process, index) => (

              <div
                className="process-chip"
                key={`${process.id}-${index}`}
              >

                <div className="chip-content">

                  <strong>
                    {process.id}
                  </strong>

                  <small>
                    BT: {process.burstTime}
                  </small>

                </div>

                <button
                  className="remove-process"
                  onClick={() =>
                    removeProcess(index)
                  }
                >
                  ×
                </button>

              </div>

            ))}

          </div>

        </section>

      )}

      {/* ================= GANTT CHART ================= */}

      {results.length > 0 && (

        <section className="sjf-card">

          <div className="section-title">

            <span>📈</span>

            <div>

              <h2>
                Gantt Chart
              </h2>

              <p>
                Visual representation of SJF execution.
              </p>

            </div>

          </div>

          <div className="gantt-container">

            {/* Top Process Labels */}

            <div className="gantt-top-labels">

              {results.map((process, index) => {

                const width =
                  (process.burstTime /
                    totalBurstTime) *
                  100;

                return (

                  <div
                    key={`label-${process.id}-${index}`}
                    className="gantt-top-label"
                    style={{
                      width: `${width}%`,
                    }}
                  >
                    {process.id}
                  </div>

                );

              })}

            </div>

            {/* Gantt Blocks */}

            <div className="gantt-chart">

              {results.map((process, index) => {

                const width =
                  (process.burstTime /
                    totalBurstTime) *
                  100;

                return (

                  <div
                    key={`block-${process.id}-${index}`}
                    className={`gantt-block gantt-color-${index % 5}`}
                    style={{
                      width: `${width}%`,
                      flexGrow: 0,
                      flexShrink: 0,
                    }}
                  >

                    <strong>
                      {process.id}
                    </strong>

                    <span>
                      {process.burstTime} units
                    </span>

                  </div>

                );

              })}

            </div>

            {/* Timeline */}

            <div className="gantt-times">

              <span className="gantt-time gantt-start-time">
                0
              </span>

              {results.map((process, index) => {

                if (
                  index ===
                  results.length - 1
                ) {
                  return null;
                }

                const position =
                  (process.completionTime /
                    totalBurstTime) *
                  100;

                return (

                  <span
                    key={`time-${process.id}-${index}`}
                    className="gantt-time gantt-boundary-time"
                    style={{
                      left: `${position}%`,
                    }}
                  >
                    {process.completionTime}
                  </span>

                );

              })}

              <span className="gantt-time gantt-final-time">

                {
                  results[
                    results.length - 1
                  ].completionTime
                }

              </span>

            </div>

          </div>

        </section>

      )}

      {/* ================= SJF CALCULATION / TABLE ================= */}

      {results.length > 0 && (

        <section className="sjf-card">

          <div className="section-title">

            <span>📊</span>

            <div>

              <h2>
                SJF Calculation
              </h2>

              <p>
                Processes are executed in ascending
                order of burst time.
              </p>

            </div>

          </div>

          <div className="table-wrapper">

            <table className="sjf-table">

              <thead>

                <tr>

                  <th>Process</th>
                  <th>Burst Time</th>
                  <th>Start Time</th>
                  <th>Completion Time</th>
                  <th>Waiting Time</th>
                  <th>Turnaround Time</th>

                </tr>

              </thead>

              <tbody>

                {results.map((process, index) => (

                  <tr
                    key={`${process.id}-${index}`}
                  >

                    <td className="process-cell">
                      {process.id}
                    </td>

                    <td>
                      {process.burstTime}
                    </td>

                    <td>
                      {process.startTime}
                    </td>

                    <td>
                      {process.completionTime}
                    </td>

                    <td>
                      {process.waitingTime}
                    </td>

                    <td>
                      {process.turnaroundTime}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Average Results */}

          <div className="average-container">

            <div className="average-box">

              <span>
                Average Waiting Time
              </span>

              <strong>
                {averageWaitingTime.toFixed(2)}
              </strong>

              <small>
                AWT
              </small>

            </div>

            <div className="average-box">

              <span>
                Average Turnaround Time
              </span>

              <strong>
                {averageTurnaroundTime.toFixed(2)}
              </strong>

              <small>
                ATAT
              </small>

            </div>

          </div>

        </section>

      )}

      {/* ================= EMPTY STATE ================= */}

      {results.length === 0 && (

        <section className="sjf-card">

          <div className="empty-state">

            <div className="empty-icon">
              🧮
            </div>

            <h3>
              No Processes Added
            </h3>

            <p>
              Add processes above to calculate
              SJF scheduling results.
            </p>

          </div>

        </section>

      )}
    <CodeEditor />
    </main>
  );
}
export default SJF;