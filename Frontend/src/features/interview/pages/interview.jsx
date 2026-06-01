import React, { useState, useEffect } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate, useParams } from "react-router";
import { Sparkles } from "lucide-react";

/*
const report = {
  matchScore: 88,

  technicalQuestions: [
    {
      question:
        "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
      intention:
        "To assess the candidate's deep understanding of Node.js internals.",
      answer:
        "The event loop consists of timers, pending callbacks, poll, check and close phases. It enables non-blocking I/O.",
    },
    {
      question:
        "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
      intention: "Assess database optimization knowledge.",
      answer:
        "Use indexes, project only required fields, match early and avoid expensive operations.",
    },
    {
      question: "Can you describe the Cache-Aside pattern and Redis usage?",
      intention: "Evaluate caching concepts.",
      answer:
        "Application first checks cache, then database, and updates cache after retrieval.",
    },
  ],

  behavioralQuestions: [
    {
      question: "Tell me about yourself",
      intention: "Assess communication",
      answer: "I am a MERN stack developer...",
    },
  ],

  skillGaps: [
    {
      skill: "Message Queues",
      severity: "high",
    },
    {
      skill: "Advanced Docker & CI/CD",
      severity: "medium",
    },
    {
      skill: "Redis",
      severity: "low",
    },
  ],

  preparationPlan: [
    {
      day: 1,
      focus: "Node.js Internals & Streams",
      tasks: ["Deep dive into Event Loop", "Practice Node Streams"],
    },
    {
      day: 2,
      focus: "Advanced MongoDB",
      tasks: ["Study Indexes", "Practice Aggregation Pipelines"],
    },
  ],
};
*/

/* Main Component */
const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [openTechnical, setOpenTechnical] = useState(0);
  const [openBehavioral, setOpenBehavioral] = useState(0);

  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  const interviewData = report;

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan....</h1>
      </main>
    );
  }

  console.log(report);
  return (
    <div className="interview-page">
      <div className="interview-layout">
        {/* LEFT */}

        <aside className="left-sidebar">
          <h4>SECTIONS</h4>
          <button
            className={`nav-item ${activeTab === "technical" ? "active" : ""}`}
            onClick={() => setActiveTab("technical")}
          >
            Technical Questions
          </button>
          <button
            className={`nav-item ${activeTab === "behavioral" ? "active" : ""}`}
            onClick={() => setActiveTab("behavioral")}
          >
            Behavioral Questions
          </button>
          <button
            className={`nav-item ${activeTab === "roadmap" ? "active" : ""}`}
            onClick={() => setActiveTab("roadmap")}
          >
            Road Map
          </button>

          <button
            onClick={() => {
              getResumePdf(interviewId);
            }}
            className="resume-btn"
          >
            <Sparkles size={18} />
            Download AI Resume
          </button>
        </aside>

        {/* CENTER */}

        <main className="main-content">
          {activeTab === "technical" && (
            <>
              <div className="section-header">
                <h2>Technical Questions</h2>

                <span className="count-badge">
                  {interviewData.technicalQuestions.length} Questions
                </span>
              </div>

              {interviewData.technicalQuestions.map((item, index) => (
                <div className="accordion-card" key={index}>
                  <div
                    className="accordion-header"
                    onClick={() =>
                      setOpenTechnical(openTechnical === index ? null : index)
                    }
                  >
                    <span className="question-number">Q{index + 1}</span>

                    <>
                      <h3>{item.question}</h3>

                      <span className="accordion-arrow">
                        {openTechnical === index ? "⌃" : "⌄"}
                      </span>
                    </>
                  </div>

                  {openTechnical === index && (
                    <div className="accordion-body">
                      <div className="tag intention">INTENTION</div>

                      <p>{item.intention}</p>

                      <div className="tag answer">MODEL ANSWER</div>

                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {activeTab === "behavioral" && (
            <>
              <div className="section-header">
                <h2>Behavioral Questions</h2>

                <span className="count-badge">
                  {interviewData.behavioralQuestions.length} Questions
                </span>
              </div>

              {interviewData.behavioralQuestions.map((item, index) => (
                <div className="accordion-card" key={index}>
                  <div
                    className="accordion-header"
                    onClick={() =>
                      setOpenBehavioral(openBehavioral === index ? null : index)
                    }
                  >
                    <span className="question-number">Q{index + 1}</span>

                    <>
                      <h3>{item.question}</h3>

                      <span className="accordion-arrow">
                        {openBehavioral === index ? "⌃" : "⌄"}
                      </span>
                    </>
                  </div>

                  {openBehavioral === index && (
                    <div className="accordion-body">
                      <div className="tag intention">INTENTION</div>

                      <p>{item.intention}</p>

                      <div className="tag answer">MODEL ANSWER</div>

                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {activeTab === "roadmap" && (
            <div className="timeline">
              {interviewData.preparationPlan.map((day) => (
                <div className="timeline-item" key={day.day}>
                  <div className="timeline-dot"></div>

                  <div className="timeline-content">
                    <span className="day-pill">Day {day.day}</span>

                    <h3>{day.focus}</h3>

                    <ul>
                      {day.tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* RIGHT */}

        <aside className="right-sidebar">
          <div className="score-card">
            <h4>MATCH SCORE</h4>

            <div className="score-circle">{interviewData.matchScore}</div>
          </div>

          <div className="skill-gap-card">
            <h4>SKILL GAPS</h4>

            <div className="skills">
              {interviewData.skillGaps.map((skill, index) => (
                <span key={index} className={`skill-tag ${skill.severity}`}>
                  {skill.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
