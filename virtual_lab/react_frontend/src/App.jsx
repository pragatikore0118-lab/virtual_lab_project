import { useState } from "react";
import "./App.css";

import FCFS from "./components/FCFS";
import SJF from "./components/SJF";
import RR from "./components/RR";

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  // ================= SUBJECTS =================

  const subjects = [
    {
      id: "ds",
      icon: "🌳",
      title: "Data Structures",
      short: "DS",
      description:
        "Learn data structures with concepts, algorithms and interactive visualizations.",
      topics: [
        "Arrays",
        "Linked List",
        "Stack",
        "Queue",
        "Trees",
        "Searching",
        "Sorting",
      ],
    },

    {
      id: "os",
      icon: "⚙️",
      title: "Operating System",
      short: "OS",
      description:
        "Understand operating system concepts, processes, scheduling, memory and deadlock.",
      topics: [
        "UNIX Operating System",
        "System Calls",
        "FCFS Scheduling",
        "SJF Scheduling",
        "Round Robin Scheduling",
        "Banker's Algorithm",
        "Page Replacement",
        "I/O Subsystem",
        "Memory Allocation",
      ],
    },

    {
      id: "dbms",
      icon: "🗄️",
      title: "DBMS",
      short: "DBMS",
      description:
        "Learn database concepts, SQL, normalization, transactions and indexing.",
      topics: [
        "Database Basics",
        "ER Model",
        "SQL",
        "Normalization",
        "Transactions",
        "Indexing",
      ],
    },
  ];

  // ================= OS PRACTICALS =================

  const osPracticals = [
    {
      id: 1,
      title: "Study of UNIX Operating System",
      description:
        "Study UNIX operating system, commands, features and basic concepts.",
      type: "placeholder",
    },

    {
      id: 2,
      title: "Implementation of System Calls",
      description:
        "Implementation of system calls: fork(), exec(), suspend() and resume().",
      type: "placeholder",
    },

    {
      id: 3,
      title: "Implementation of FCFS Scheduling Algorithm",
      description:
        "Implement First Come First Serve CPU scheduling and calculate WT, TAT and averages.",
      type: "fcfs",
    },

    {
      id: 4,
      title: "Implementation of SJF (Non-Preemptive)",
      description:
        "Implement Shortest Job First non-preemptive scheduling and calculate WT and TAT.",
      type: "sjf",
    },

    {
      id: 5,
      title: "Implementation of Round Robin Scheduling Algorithm",
      description:
        "Implement Round Robin scheduling using a fixed time quantum.",
      type: "rr",
    },

    {
      id: 6,
      title: "Implementation of Banker's Algorithm",
      description:
        "Implement Banker's Algorithm for deadlock avoidance and check system safety.",
      type: "placeholder",
    },

    {
      id: 7,
      title: "Simulation of Page Replacement Strategies",
      description:
        "Simulate FIFO, Optimal and LRU page replacement algorithms.",
      type: "placeholder",
    },

    {
      id: 8,
      title: "Study of I/O Subsystem",
      description:
        "Study input/output subsystem concepts and I/O management.",
      type: "placeholder",
    },

    {
      id: 9,
      title: "Memory Allocation Strategies",
      description:
        "Implement First Fit, Best Fit and Worst Fit memory allocation strategies.",
      type: "placeholder",
    },
  ];

  // ================= FUNCTIONS =================

  const handleSubjectClick = (subject) => {
    // ==================================================
    // DATA STRUCTURES
    // Django madhye already तयार केलेला DSA project
    // React madhun open karaycha
    // ==================================================

    if (subject.id === "ds") {
      window.location.href =
        "http://127.0.0.1:8000/data-structures/";

      return;
    }

    // ==================================================
    // OTHER SUBJECTS
    // ==================================================

    setSelectedSubject(subject);
    setSelectedExperiment(null);
  };

  const goHome = () => {
    setSelectedSubject(null);
    setSelectedExperiment(null);
  };

  const goBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedExperiment(null);
  };

  const goBackToPracticals = () => {
    setSelectedExperiment(null);
  };

  const openExperiment = (experiment) => {
    setSelectedExperiment(experiment);
  };

  // ================= EXPERIMENT VIEW =================

  if (selectedExperiment) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo" onClick={goHome}>
              <span className="logo-icon">🧪</span>
              <span>Virtual Lab</span>
            </div>

            <div className="nav-links">
              <button onClick={goHome}>Home</button>

              <button onClick={goBackToPracticals}>
                Subjects
              </button>
            </div>
          </div>
        </nav>

        {/* ================= FCFS ================= */}

        {selectedExperiment.type === "fcfs" && <FCFS />}

        {/* ================= SJF ================= */}

        {selectedExperiment.type === "sjf" && <SJF />}

        {/* ================= ROUND ROBIN ================= */}

        {selectedExperiment.type === "rr" && <RR />}

        {/* ================= PLACEHOLDER ================= */}

        {selectedExperiment.type === "placeholder" && (
          <main className="subject-page">
            <section className="subject-header">
              <button
                className="back-button"
                onClick={goBackToPracticals}
              >
                ← Back to OS Practicals
              </button>

              <div className="large-subject-icon">🧪</div>

              <span className="section-label">
                VIRTUAL LAB / OS / EXPERIMENT{" "}
                {String(selectedExperiment.id).padStart(2, "0")}
              </span>

              <h1>{selectedExperiment.title}</h1>

              <p>{selectedExperiment.description}</p>

              <div
                style={{
                  marginTop: "35px",
                  padding: "35px",
                  borderRadius: "18px",
                  border: "1px solid #dbe3f0",
                  background: "#ffffff",
                  maxWidth: "800px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  boxShadow:
                    "0 10px 30px rgba(30, 64, 175, 0.08)",
                }}
              >
                <div style={{ fontSize: "50px" }}>🚧</div>

                <h2
                  style={{
                    marginTop: "15px",
                    color: "#172554",
                  }}
                >
                  Practical Coming Soon
                </h2>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  This practical module will be added here.
                  You will be able to read the theory, enter
                  input values and perform the practical
                  interactively.
                </p>

                <button
                  className="hero-button"
                  onClick={goBackToPracticals}
                  style={{ marginTop: "15px" }}
                >
                  ← Back to Practicals
                </button>
              </div>
            </section>
          </main>
        )}

        <footer>
          <div className="footer-content">
            <div className="footer-logo">
              🧪 Virtual Lab
            </div>

            <p>
              Interactive Computer Science Learning Platform
            </p>

            <span>© 2026 Virtual Lab</span>
          </div>
        </footer>
      </div>
    );
  }

  // ================= HOME =================

  return (
    <div className="app">
      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={goHome}>
            <span className="logo-icon">🧪</span>
            <span>Virtual Lab</span>
          </div>

          <div className="nav-links">
            <button onClick={goHome}>Home</button>

            <button
              onClick={() =>
                document
                  .getElementById("subjects")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Subjects
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HOME PAGE ================= */}

      {!selectedSubject && (
        <main>
          {/* HERO */}

          <section className="hero">
            <div className="hero-content">
              <div className="hero-badge">
                ✨ Interactive Learning Platform
              </div>

              <h1>
                Welcome to <span>Virtual Lab</span>
              </h1>

              <p>
                Learn computer science subjects through
                concepts, algorithms, visualizations and
                interactive experiments.
              </p>

              <button
                className="hero-button"
                onClick={() =>
                  document
                    .getElementById("subjects")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Explore Subjects →
              </button>
            </div>
          </section>

          {/* SUBJECTS */}

          <section
            className="subjects-section"
            id="subjects"
          >
            <div className="section-heading">
              <span className="section-label">
                LEARNING MODULES
              </span>

              <h2>Choose Your Subject</h2>

              <p>
                Select a subject to explore its concepts
                and practical learning modules.
              </p>
            </div>

            <div className="subject-grid">
              {subjects.map((subject) => (
                <div
                  className="subject-card"
                  key={subject.id}
                  onClick={() =>
                    handleSubjectClick(subject)
                  }
                >
                  <div className="subject-icon">
                    {subject.icon}
                  </div>

                  <div className="subject-code">
                    {subject.short}
                  </div>

                  <h3>{subject.title}</h3>

                  <p>{subject.description}</p>

                  <div className="topic-preview">
                    {subject.topics
                      .slice(0, 3)
                      .map((topic) => (
                        <span key={topic}>
                          {topic}
                        </span>
                      ))}
                  </div>

                  <div className="explore-link">
                    Explore {subject.short} →
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES */}

          <section className="features-section">
            <div className="section-heading">
              <span className="section-label">
                WHY VIRTUAL LAB?
              </span>

              <h2>Learn by Visualizing</h2>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📖</div>

                <h3>Concepts</h3>

                <p>
                  Understand important theoretical
                  concepts in a simple and structured way.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎯</div>

                <h3>Algorithms</h3>

                <p>
                  Learn algorithms step by step with
                  clear explanations and examples.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">👁️</div>

                <h3>Visualization</h3>

                <p>
                  Watch data structures and algorithms
                  work through interactive visualizations.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💻</div>

                <h3>Practice</h3>

                <p>
                  Experiment with inputs and understand
                  how each algorithm behaves.
                </p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ================= SUBJECT PAGE ================= */}

      {selectedSubject && (
        <main className="subject-page">
          {/* ================= OS PAGE ================= */}

          {selectedSubject.id === "os" ? (
            <>
              <section className="subject-header">
                <button
                  className="back-button"
                  onClick={goBackToSubjects}
                >
                  ← Back to Subjects
                </button>

                <div className="large-subject-icon">
                  ⚙️
                </div>

                <span className="section-label">
                  VIRTUAL LAB / OS
                </span>

                <h1>Operating System</h1>

                <p>
                  Learn operating system concepts through
                  practical experiments and interactive
                  simulations.
                </p>
              </section>

              {/* OS PRACTICALS */}

              <section className="topics-section">
                <div className="section-heading">
                  <span className="section-label">
                    PRACTICAL EXPERIMENTS
                  </span>

                  <h2>
                    Operating System Practicals
                  </h2>

                  <p>
                    Select an experiment to start the
                    practical.
                  </p>
                </div>

                <div className="topics-grid">
                  {osPracticals.map((experiment) => (
                    <div
                      className="topic-card"
                      key={experiment.id}
                      onClick={() =>
                        openExperiment(experiment)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <div className="topic-number">
                        {String(
                          experiment.id
                        ).padStart(2, "0")}
                      </div>

                      <div>
                        <h3>{experiment.title}</h3>

                        <p>
                          {experiment.description}
                        </p>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            openExperiment(
                              experiment
                            );
                          }}
                        >
                          Open Practical →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            /* ================= OTHER SUBJECTS ================= */

            <>
              <section className="subject-header">
                <button
                  className="back-button"
                  onClick={goBackToSubjects}
                >
                  ← Back to Subjects
                </button>

                <div className="large-subject-icon">
                  {selectedSubject.icon}
                </div>

                <span className="section-label">
                  VIRTUAL LAB /{" "}
                  {selectedSubject.short}
                </span>

                <h1>{selectedSubject.title}</h1>

                <p>
                  {selectedSubject.description}
                </p>
              </section>

              <section className="topics-section">
                <div className="section-heading">
                  <span className="section-label">
                    MODULES
                  </span>

                  <h2>
                    {selectedSubject.title} Topics
                  </h2>

                  <p>
                    Select a topic to continue learning.
                  </p>
                </div>

                <div className="topics-grid">
                  {selectedSubject.topics.map(
                    (topic, index) => (
                      <div
                        className="topic-card"
                        key={topic}
                      >
                        <div className="topic-number">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </div>

                        <div>
                          <h3>{topic}</h3>

                          <p>
                            Learn{" "}
                            {topic.toLowerCase()}{" "}
                            concepts, examples and
                            practical visualization.
                          </p>

                          <button>
                            Open Topic →
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            </>
          )}
        </main>
      )}

      {/* ================= FOOTER ================= */}

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            🧪 Virtual Lab
          </div>

          <p>
            Interactive Computer Science Learning
            Platform
          </p>

          <span>© 2026 Virtual Lab</span>
        </div>
      </footer>
    </div>
  );
}

export default App;