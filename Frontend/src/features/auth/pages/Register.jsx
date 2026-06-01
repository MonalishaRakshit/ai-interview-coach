import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Register = () => {
  const navigate = useNavigate();

  /* two way binding */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="auth-layout">
        <div className="auth-info">
          <h2>AI Interview Coach</h2>

          <p>
            Prepare smarter, not harder. Get personalized interview insights,
            AI-generated questions, skill-gap analysis, and ATS-friendly
            resumes.
          </p>

          <div className="feature-list">
            <div className="feature-item">✓ Resume & JD Matching</div>
            <div className="feature-item">✓ Technical Questions</div>
            <div className="feature-item">✓ Behavioral Questions</div>
            <div className="feature-item">✓ Skill Gap Analysis</div>
            <div className="feature-item">✓ Personalized Preparation Plan</div>
            <div className="feature-item">✓ ATS-Friendly Resume Builder</div>
          </div>
        </div>

        <div className="form-container">
          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                placeholder="Enter valid password"
              />
            </div>

            <button className="button primary-button">Register</button>
          </form>

          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
