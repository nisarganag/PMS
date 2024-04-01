import { useState } from "react";
import axios from "axios"; // Import Axios library
import "./LoginData.css";
import { useNavigate } from "react-router-dom";

const Login = ({ onToggle }: { onToggle: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      const emailId = response.data.email;
      localStorage.setItem("emailId", emailId);

      // Store the token in local storage
      localStorage.setItem("token", token);
      if (token) {
        navigate("/");
      } else {
        // console.log('Login Successful'); // Optional: You can handle login success here
      }
    } catch (error) {
      console.error("Login failed:", error);
      // console.log('Error details:', error.response.data); // Handle login failure
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-container">
          <input type="text"
            id="login-username"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
            />
          <label htmlFor="login-username" className="label" >Username</label>
          <div className="underline"></div>
        </div>
        <div className="form-container">
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // placeholder="Enter your password"
            required
          />
          <label htmlFor="login-username" className="label" >Password</label>
          <div className="underline"></div>
        </div>
        <button className="bn5" type="submit">
          Login
        </button>
        <p className="toggle-text">
          {" "}
          Don't have an account?{" "}
          <button className="toggle-button" onClick={onToggle}>
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

const SignupPage = ({ onToggle }: { onToggle: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // Modify to async function
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      const token = response.data.token;
      const emailId = response.data.email;
      localStorage.setItem("token", token);
      localStorage.setItem("emailId", emailId);
      if (token) {
        navigate("/");
      } else {
        // console.log('Login Successful'); // Optional: You can handle login success here
      }
    } catch (error) {
      console.error("Signup failed:", error); // Handle signup failure
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="auth-form-name">
          <div className="form-container">
          <input
              type="text"
              id="signup-firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="login-username" className="label" >First Name</label>
            <div className="underline"></div>
          </div>

          <div className="form-container">
          <input
              type="text"
              id="signup-lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label htmlFor="login-username" className="label" >Last Name</label>
            <div className="underline"></div>
          </div>

          <div className="form-container">
          <input
            type="text"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
            <label htmlFor="login-username" className="label" >Email</label>
            <div className="underline"></div>
          </div>

          <div className="form-container">
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            <label htmlFor="login-username" className="label" >Password</label>
            <div className="underline"></div>
          </div>
        </div>
        
        <button className="bn5" type="submit">
          Sign Up
        </button>
        <p className="toggle-text">
          Already have an account?{" "}
          <button className="toggle-button" onClick={onToggle}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleToggle = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div>
      {isLoginPage ? (
        <Login onToggle={handleToggle} />
      ) : (
        <SignupPage onToggle={handleToggle} />
      )}
    </div>
  );
};

export default AuthPage;
