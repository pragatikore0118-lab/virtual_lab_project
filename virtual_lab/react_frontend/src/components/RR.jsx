import { useState } from "react";
import "./RR.css";

function RR() {
  // =====================================================
  // STATE
  // =====================================================

  const [processes, setProcesses] = useState([]);
  const [processName, setProcessName] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [quantum, setQuantum] = useState("");


  // =====================================================
  // BACK
  // =====================================================

  const goBack = () => {
    window.history.back();
  };


  // =====================================================
  // ADD PROCESS
  // =====================================================

  const addProcess = () => {
    if (!burstTime || Number(burstTime) <= 0) {
      alert("Please enter a valid Burst Time.");
      return;
    }

    const newProcess = {
      id:
        processName.trim() ||
        `P${processes.length + 1}`,

      bt: Number(burstTime),
    };

    setProcesses([
      ...processes,
      newProcess,
    ]);

    setProcessName("");
    setBurstTime("");
  };


  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addProcess();
    }
  };


  // =====================================================
  // REMOVE PROCESS
  // =====================================================

  const removeProcess = (index) => {
    setProcesses(
      processes.filter(
        (_, i) => i !== index
      )
    );
  };


  // =====================================================
  // RESET
  // =====================================================

  const resetAll = () => {
    setProcesses([]);
    setProcessName("");
    setBurstTime("");
    setQuantum("");
  };


  // =====================================================
  // ROUND ROBIN CALCULATION
  // =====================================================

  const calculateRR = () => {

    if (
      processes.length === 0 ||
      !quantum ||
      Number(quantum) <= 0
    ) {
      return {
        results: [],
        gantt: [],
      };
    }


    const q = Number(quantum);


    // Create working copy

    const remaining = processes.map(
      (p) => ({
        id: p.id,
        bt: p.bt,
        remaining: p.bt,
        ct: 0,
      })
    );


    const gantt = [];


    let currentTime = 0;

    let completed = 0;


    // =================================================
    // RR LOOP
    // =================================================

    while (
      completed <
      remaining.length
    ) {

      let processExecuted = false;


      for (
        let i = 0;
        i < remaining.length;
        i++
      ) {

        const process =
          remaining[i];


        if (
          process.remaining > 0
        ) {

          processExecuted = true;


          const start =
            currentTime;


          const executionTime =
            Math.min(
              q,
              process.remaining
            );


          currentTime +=
            executionTime;


          process.remaining -=
            executionTime;


          // Gantt block

          gantt.push({
            id: process.id,
            start: start,
            end: currentTime,
            duration:
              executionTime,
          });


          // Process completed

          if (
            process.remaining === 0
          ) {

            process.ct =
              currentTime;

            completed++;

          }

        }

      }


      if (!processExecuted) {
        break;
      }

    }


    // =================================================
    // RESULT TABLE
    // =================================================

    const results =
      processes.map(
        (process) => {

          const matching =
            remaining.find(
              (p) =>
                p.id === process.id
            );


          const at = 0;

          const ct =
            matching.ct;


          const tat =
            ct - at;


          const wt =
            tat - process.bt;


          return {
            ...process,
            at,
            ct,
            tat,
            wt,
          };

        }
      );


    return {
      results,
      gantt,
    };

  };


  // =====================================================
  // GET RR RESULT
  // =====================================================

  const {
    results,
    gantt,
  } = calculateRR();


  // =====================================================
  // TOTAL WAITING TIME
  // =====================================================

  const totalWT =
    results.reduce(
      (sum, process) =>
        sum + process.wt,
      0
    );


  // =====================================================
  // TOTAL TURNAROUND TIME
  // =====================================================

  const totalTAT =
    results.reduce(
      (sum, process) =>
        sum + process.tat,
      0
    );


  // =====================================================
  // AVERAGE WAITING TIME
  // =====================================================

  const averageWT =
    results.length > 0
      ? totalWT / results.length
      : 0;


  // =====================================================
  // AVERAGE TURNAROUND TIME
  // =====================================================

  const averageTAT =
    results.length > 0
      ? totalTAT / results.length
      : 0;


  // =====================================================
  // TOTAL GANTT TIME
  // =====================================================

  const totalTime =
    gantt.length > 0
      ? gantt[gantt.length - 1].end
      : 0;


  // =====================================================
  // JSX
  // =====================================================

  return (

    <div className="rr-page">


      {/* =================================================
          HEADER
          ================================================= */}

      <div className="rr-header">


        <button
          className="back-btn"
          onClick={goBack}
        >
          ← Back
        </button>


        <div className="rr-badge">
          OS PRACTICAL • EXPERIMENT 05
        </div>


        <h1>
          Round Robin Scheduling Algorithm
        </h1>


        <p>
          Round Robin is a preemptive CPU
          scheduling algorithm designed for
          time-sharing systems. Each process
          gets CPU time for a fixed time quantum
          in a circular order.
        </p>

      </div>


      {/* =================================================
          THEORY
          ================================================= */}

      <section className="rr-card theory-card">


        <div className="section-title">

          <span>📖</span>

          <div>

            <h2>
              Theory
            </h2>

            <p>
              Round Robin (RR) Scheduling
            </p>

          </div>

        </div>


        <p className="theory-text">

          Round Robin is a CPU scheduling
          algorithm used mainly in time-sharing
          systems. It is similar to First Come
          First Serve, but preemption is added
          to allow the CPU to switch between
          processes.

        </p>


        <p className="theory-text">

          A small unit of time called a
          <strong>
            {" "}time quantum
          </strong>
          {" "}or time slice is assigned to each
          process. When the quantum expires,
          the running process is moved to the
          end of the ready queue if it is not
          completed.

        </p>


        <div className="theory-grid">


          <div className="theory-box">

            <h3>
              🔄 Preemptive
            </h3>

            <p>
              A process can be interrupted
              when its time quantum expires.
            </p>

          </div>


          <div className="theory-box">

            <h3>
              ⏱️ Time Quantum
            </h3>

            <p>
              Each process receives a fixed
              amount of CPU time during each
              turn.
            </p>

          </div>


          <div className="theory-box">

            <h3>
              ⚖️ Fairness
            </h3>

            <p>
              Every process gets a fair
              opportunity to use the CPU.
            </p>

          </div>


          <div className="theory-box">

            <h3>
              🚫 Starvation Free
            </h3>

            <p>
              Processes repeatedly get CPU
              time, reducing the possibility
              of starvation.
            </p>

          </div>

        </div>


        {/* FORMULAS */}

        <div className="formula-box">

          <strong>
            Important Formulas
          </strong>


          <div className="formula-list">

            <span>
              TAT = CT − AT
            </span>

            <span>
              WT = TAT − BT
            </span>

            <span>
              Average WT =
              Total WT / Number of Processes
            </span>

            <span>
              Average TAT =
              Total TAT / Number of Processes
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          INPUT
          ================================================= */}

      <section className="rr-card">


        <div className="section-title">

          <span>➕</span>

          <div>

            <h2>
              Add Processes
            </h2>

            <p>
              Enter process name and burst time.
            </p>

          </div>

        </div>


        <div className="input-area">


          {/* PROCESS NAME */}

          <div className="input-group">

            <label>
              Process Name
            </label>

            <input
              type="text"
              placeholder={
                `P${processes.length + 1}`
              }
              value={processName}
              onChange={(e) =>
                setProcessName(
                  e.target.value
                )
              }
              onKeyDown={handleKeyDown}
            />

          </div>


          {/* BURST TIME */}

          <div className="input-group">

            <label>
              Burst Time
            </label>

            <input
              type="number"
              min="1"
              placeholder="Example: 10"
              value={burstTime}
              onChange={(e) =>
                setBurstTime(
                  e.target.value
                )
              }
              onKeyDown={handleKeyDown}
            />

          </div>


          {/* ADD */}

          <button
            className="add-btn"
            onClick={addProcess}
          >
            + Insert Process
          </button>

        </div>


        {/* QUANTUM */}

        <div className="quantum-area">


          <div className="input-group">

            <label>
              Time Quantum
            </label>

            <input
              type="number"
              min="1"
              placeholder="Example: 3"
              value={quantum}
              onChange={(e) =>
                setQuantum(
                  e.target.value
                )
              }
            />

          </div>


          <div className="quantum-info">

            <strong>
              ⏱️ Time Quantum
            </strong>

            <p>
              Enter the fixed time slice
              used by the Round Robin
              algorithm.
            </p>

          </div>


          <button
            className="reset-btn"
            onClick={resetAll}
          >
            Reset
          </button>

        </div>

      </section>


      {/* =================================================
          PROCESS QUEUE
          ================================================= */}

      {processes.length > 0 && (

        <section className="rr-card">


          <div className="section-title">

            <span>📋</span>

            <div>

              <h2>
                Process Queue
              </h2>

              <p>
                Processes are executed in
                circular order.
              </p>

            </div>

          </div>


          <div className="process-chips">

            {processes.map(
              (process, index) => (

                <div
                  className="process-chip"
                  key={`${process.id}-${index}`}
                >

                  <span>
                    {process.id}
                  </span>

                  <small>
                    BT: {process.bt}
                  </small>

                  <button
                    onClick={() =>
                      removeProcess(index)
                    }
                    title="Remove process"
                  >
                    ×
                  </button>

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* =================================================
          CALCULATION TABLE
          ================================================= */}

      {results.length > 0 && (

        <section className="rr-card">


          <div className="section-title">

            <span>📊</span>

            <div>

              <h2>
                Round Robin Scheduling Table
              </h2>

              <p>
                Final completion time,
                turnaround time and waiting
                time are calculated automatically.
              </p>

            </div>

          </div>


          <div className="table-wrapper">

            <table className="rr-table">


              <thead>

                <tr>

                  <th>
                    Process
                  </th>

                  <th>
                    AT
                  </th>

                  <th>
                    BT
                  </th>

                  <th>
                    CT
                  </th>

                  <th>
                    TAT
                  </th>

                  <th>
                    WT
                  </th>

                </tr>

              </thead>


              <tbody>

                {results.map(
                  (process, index) => (

                    <tr
                      key={`${process.id}-${index}`}
                    >

                      <td className="process-cell">
                        {process.id}
                      </td>

                      <td>
                        {process.at}
                      </td>

                      <td>
                        {process.bt}
                      </td>

                      <td>
                        {process.ct}
                      </td>

                      <td>
                        {process.tat}
                      </td>

                      <td>
                        {process.wt}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>


          {/* AVERAGES */}

          <div className="average-container">


            <div className="average-box">

              <span>
                Average Waiting Time
              </span>

              <strong>
                {averageWT.toFixed(2)}
              </strong>

              <small>
                time units
              </small>

            </div>


            <div className="average-box">

              <span>
                Average Turnaround Time
              </span>

              <strong>
                {averageTAT.toFixed(2)}
              </strong>

              <small>
                time units
              </small>

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          GANTT CHART
          ================================================= */}

      {gantt.length > 0 && (

        <section className="rr-card gantt-card">


          <div className="section-title">

            <span>📈</span>

            <div>

              <h2>
                Gantt Chart
              </h2>

              <p>
                Visual representation of
                Round Robin CPU execution.
              </p>

            </div>

          </div>


          <div className="gantt-scroll">

            <div className="rr-gantt-wrapper">


              {/* ==========================================
                  PROCESS LABELS
                  ========================================== */}

              <div
                className="rr-gantt-label-row"
                style={{
                  gridTemplateColumns:
                    `repeat(${gantt.length}, minmax(0, 1fr))`,
                }}
              >

                {gantt.map(
                  (block, index) => (

                    <div
                      className="rr-gantt-top-label"
                      key={index}
                    >
                      {block.id}
                    </div>

                  )
                )}

              </div>


              {/* ==========================================
                  GANTT BLOCKS

                  SAME WIDTH
                  SAME HEIGHT
                  ========================================== */}

              <div
                className="rr-gantt-chart"
                style={{
                  gridTemplateColumns:
                    `repeat(${gantt.length}, minmax(0, 1fr))`,
                }}
              >

                {gantt.map(
                  (block, index) => (

                    <div
                      className={
                        `rr-gantt-block ${
                          index % 3 === 0
                            ? "rr-gantt-blue"
                            : index % 3 === 1
                            ? "rr-gantt-dark-blue"
                            : "rr-gantt-light-blue"
                        }`
                      }
                      key={index}
                    >

                      <strong>
                        {block.id}
                      </strong>

                      <span>
                        {block.duration} units
                      </span>

                    </div>

                  )
                )}

              </div>


              {/* ==========================================
                  TIME VALUES
                  ========================================== */}

              <div className="rr-gantt-times">


                {/* START */}

                <span className="rr-start-time">
                  0
                </span>


                {/* MIDDLE TIMES */}

                {gantt.map(
                  (block, index) => {

                    if (
                      index ===
                      gantt.length - 1
                    ) {
                      return null;
                    }


                    const position =
                      ((index + 1) /
                        gantt.length) *
                      100;


                    return (

                      <span
                        className="rr-boundary-time"
                        style={{
                          left:
                            `${position}%`,
                        }}
                        key={
                          `time-${index}`
                        }
                      >
                        {block.end}
                      </span>

                    );

                  }
                )}


                {/* FINAL TIME */}

                <span className="rr-final-time">
                  {totalTime}
                </span>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          EMPTY STATE
          ================================================= */}

      {processes.length === 0 && (

        <div className="empty-state">

          <div className="empty-icon">
            🖥️
          </div>

          <h3>
            No Processes Added
          </h3>

          <p>
            Enter process name, burst time
            and time quantum to start the
            Round Robin visualization.
          </p>

        </div>

      )}

    </div>
  );
}


export default RR;