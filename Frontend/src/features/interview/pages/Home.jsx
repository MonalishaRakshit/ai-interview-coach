import React, { useState, useRef } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  // const handleGenerateReport = async () => {
  //   const resumeFile = resumeInputRef.current.files[0];
  //   await generateReport({ jobDescription, selfDescription, resumeFile });
  //   navigate(`/interview/${data._id}`);
  // };

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    if (data?._id) {
      navigate(`/interview/${data._id}`);
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan....</h1>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="hero">
        <h1>
          Create Your Custom <span>Interview Plan</span>
        </h1>

        <p>
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </div>

      <div className="interview-card">
        <div className="interview-input-group">
          {/* LEFT SECTION */}
          <div className="left">
            <div className="section-header">
              <h3>📋 Target Job Description</h3>
              <span className="badge">Required</span>
            </div>

            <textarea
              onChange={(e) => {
                setJobDescription(e.target.value);
              }}
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the full job description here...

e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript and large-scale system design...'"
            ></textarea>
          </div>

          {/* RIGHT SECTION */}
          <div className="right">
            <div className="section-header">
              <h3>👤 Your Profile</h3>
            </div>

            <div className="input-group">
              <p>
                Upload Resume
                <span className="highlight"> BEST RESULTS</span>
              </p>

              <label htmlFor="resume" className="upload-box">
                <div>
                  <h4>⬆ Upload Resume</h4>
                  <small>Click to upload PDF Resume (Max 5MB)</small>
                </div>
              </label>

              <input
                ref={resumeInputRef}
                //hidden
                type="file"
                id="resume"
                name="resume"
                accept=".pdf"
              />
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="input-group">
              <label htmlFor="selfDescription">Quick Self Description</label>

              <textarea
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                }}
                id="selfDescription"
                name="selfDescription"
                placeholder="Briefly describe your experience, key skills, projects and career goals..."
              ></textarea>
            </div>

            <div className="info-box">
              Either a <strong>Resume</strong> or a{" "}
              <strong>Self Description</strong> is required to generate a
              personalized interview strategy. (💡 Best Choice: Provide both )
              {/* <br />
              <strong>💡 Best Choice:</strong> Provide both for a more accurate
              and personalized interview report. */}
            </div>
          </div>
        </div>

        <div className="bottom-section">
          <p>AI-Powered Strategy Generation • Approx 30s</p>

          <button onClick={handleGenerateReport} className="generate-btn">
            ⭐ Generate Interview Report
          </button>
        </div>
      </div>

      {/* Recent Reports List */}
      {reports?.length > 0 && (
        <section className="recent-reports">
          <h2>My Recent Interview Plans</h2>

          <ul className="reports-list">
            {reports.map((report) => (
              <li
                key={report._id}
                className="report-item"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <h3>{report.title || "Untitled Position"}</h3>

                <p className="report-meta">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </p>

                <p
                  className={`match-score ${
                    report.matchScore >= 80
                      ? "score--high"
                      : report.matchScore >= 60
                        ? "score--mid"
                        : "score--low"
                  }`}
                >
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default Home;
