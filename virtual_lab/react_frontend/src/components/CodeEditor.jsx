import { useState } from "react";
import "./CodeEditor.css";

function CodeEditor() {

  const defaultCode = `#include <stdio.h>

int main() {
    printf("Hello, Virtual Lab!");
    return 0;
}`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("c");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {

    if (!code.trim()) {
      setOutput("Please write some code first.");
      return;
    }

    setIsRunning(true);
    setOutput("Running code...");

    try {

      const formData = new URLSearchParams();

      formData.append("code", code);
      formData.append("language", language);

      const response = await fetch(
        "http://127.0.0.1:8000/run-code/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const data = await response.json();

      setOutput(data.output || "No output.");

    } catch (error) {

      setOutput(
        "Could not connect to Django backend.\n\n" +
        "Make sure Django server is running."
      );

    } finally {

      setIsRunning(false);

    }
  };


  const clearCode = () => {
    setCode("");
    setOutput("");
  };


  const handleLanguageChange = (e) => {

    const selectedLanguage = e.target.value;

    setLanguage(selectedLanguage);

    if (selectedLanguage === "c") {

      setCode(`#include <stdio.h>

int main() {
    printf("Hello, Virtual Lab!");
    return 0;
}`);

    }

    else if (selectedLanguage === "cpp") {

      setCode(`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Virtual Lab!";
    return 0;
}`);

    }

    else if (selectedLanguage === "java") {

      setCode(`public class Main {

    public static void main(String[] args) {
        System.out.println("Hello, Virtual Lab!");
    }

}`);

    }

    else if (selectedLanguage === "python") {

      setCode(`print("Hello, Virtual Lab!")`);

    }
  };


  return (
    <section className="code-editor-card">

      {/* HEADER */}

      <div className="code-editor-header">

        <div className="code-editor-title">

          <span className="code-editor-icon">
            💻
          </span>

          <div>
            <h2>Code Editor</h2>

            <p>
              Write and run your code in the Virtual Lab.
            </p>
          </div>

        </div>


        <select
          className="language-select"
          value={language}
          onChange={handleLanguageChange}
        >

          <option value="c">C</option>

          <option value="cpp">C++</option>

          <option value="java">Java</option>

          <option value="python">Python</option>

        </select>

      </div>


      {/* EDITOR */}

      <div className="editor-wrapper">

        <div className="line-numbers">

          {code.split("\n").map((_, index) => (
            <span key={index}>
              {index + 1}
            </span>
          ))}

        </div>


        <textarea
          className="code-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          placeholder="Write your code here..."
        />

      </div>


      {/* BUTTONS */}

      <div className="editor-actions">

        <button
          className="run-code-btn"
          onClick={runCode}
          disabled={isRunning}
        >
          {isRunning ? "⏳ Running..." : "▶ Run Code"}
        </button>


        <button
          className="clear-code-btn"
          onClick={clearCode}
        >
          Clear
        </button>

      </div>


      {/* OUTPUT */}

      <div className="output-section">

        <div className="output-header">

          <strong>
            Output
          </strong>

        </div>


        <pre className="output-box">
          {output || "Output will appear here..."}
        </pre>

      </div>

    </section>
  );
}

export default CodeEditor;