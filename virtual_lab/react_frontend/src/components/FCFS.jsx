import { useState } from "react";
import "./FCFS.css";

function FCFS() {
  const [processId, setProcessId] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [processes, setProcesses] = useState([]);

  // Add Process
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
      },
    ]);

    setProcessId("");
    setBurstTime("");
  };

  // Remove Process
  const removeProcess = (index) => {
    setProcesses((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Reset
  const resetAll = () => {
    setProcesses([]);
    setProcessId("");
    setBurstTime("");
  };

  // FCFS Calculation
  let currentTime = 0;

  const results = processes.map((process) => {
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

  // Average Waiting Time
  const averageWaitingTime =
    results.length > 0
      ? results.reduce(
          (sum, process) =>
            sum + process.waitingTime,
          0
        ) / results.length
      : 0;

  // Average Turnaround Time
  const averageTurnaroundTime =
    results.length > 0
      ? results.reduce(
          (sum, process) =>
            sum + process.turnaroundTime,
          0
        ) / results.length
      : 0;

  // Total Burst Time
  const totalBurstTime = results.reduce(
    (sum, process) =>
      sum + process.burstTime,
    0
  );

  return (
    <main className="fcfs-page">

      {/* ================= HEADER ================= */}

      <header className="fcfs-header">

        <div className="fcfs-header-top">

          <button
            className="fcfs-back-button"
            onClick={() => window.history.back()}
          >
            ← Back
          </button>

          <span className="fcfs-os-badge">
            OPERATING SYSTEM
          </span>

        </div>

        <h1>
          First Come First Serve Scheduling
        </h1>

        <p>
          FCFS is a CPU scheduling algorithm that
          executes processes in the order they are
          added to the ready queue.
        </p>

      </header>


      {/* ================= THEORY ================= */}

      <section className="fcfs-card">

        <div className="section-title">

          <span>📚</span>

          <div>
            <h2>FCFS Theory</h2>

            <p>
              Understand the First Come First Serve
              scheduling algorithm.
            </p>
          </div>

        </div>


        <p className="theory-text">

          <strong>
            First Come First Serve (FCFS)
          </strong>{" "}
          is a CPU scheduling algorithm in which
          the process that comes first is executed
          first.

        </p>


        <p className="theory-text">

          FCFS is a{" "}
          <strong>Non-Preemptive</strong>{" "}
          scheduling algorithm. Once a process
          starts execution, it continues until
          its burst time is completely finished.

        </p>


        <p className="theory-text">

          In this practical, processes are executed
          in exactly the same order in which they
          are added to the process queue.

        </p>


        <div className="theory-grid">

          <div className="theory-box">

            <h3>⚡ Selection</h3>

            <p>
              The process added first is selected
              for execution first.
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
              Completion time is calculated by
              adding burst time to start time.
            </p>

          </div>


          <div className="theory-box">

            <h3>📊 Objective</h3>

            <p>
              Processes are handled fairly according
              to their queue order.
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


      {/* ================= ADD PROCESS ================= */}

      <section className="fcfs-card">

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

        <section className="fcfs-card">

          <div className="section-title">

            <span>📋</span>

            <div>

              <h2>Process Queue</h2>

              <p>
                Processes execute in this exact order.
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

        <section className="fcfs-card">

          <div className="section-title">

            <span>📈</span>

            <div>

              <h2>
                Gantt Chart
              </h2>

              <p>
                Visual representation of CPU execution.
              </p>

            </div>

          </div>


          <div className="gantt-container">

            {/* Process names above blocks */}

            <div className="gantt-top-labels">

              {results.map((process) => {

                const width =
                  (process.burstTime /
                    totalBurstTime) *
                  100;

                return (

                  <div
                    key={`label-${process.id}`}
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


            {/* Main Gantt blocks */}

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

              {/* Starting time */}

              <span className="gantt-time gantt-start-time">
                0
              </span>


              {/* Middle completion times */}

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


              {/* Final completion time */}

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


      {/* ================= RESULTS ================= */}

      {results.length > 0 && (

        <section className="fcfs-card">

          <div className="section-title">

            <span>📊</span>

            <div>

              <h2>
                Scheduling Results
              </h2>

              <p>
                Calculated FCFS scheduling results.
              </p>

            </div>

          </div>


          <div className="table-wrapper">

            <table className="fcfs-table">

              <thead>

                <tr>

                  <th>
                    Process
                  </th>

                  <th>
                    Burst Time
                  </th>

                  <th>
                    Start Time
                  </th>

                  <th>
                    Completion Time
                  </th>

                  <th>
                    Waiting Time
                  </th>

                  <th>
                    Turnaround Time
                  </th>

                </tr>

              </thead>


              <tbody>

                {results.map((process, index) => (

                  <tr key={`${process.id}-${index}`}>

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

        <section className="fcfs-card">

          <div className="empty-state">

            <div className="empty-icon">
              🧮
            </div>

            <h3>
              No Processes Added
            </h3>

            <p>
              Add processes above to calculate
              FCFS scheduling results.
            </p>

          </div>

        </section>

      )}

    </main>
  );
}

export default FCFS;