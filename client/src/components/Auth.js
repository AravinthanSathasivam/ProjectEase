import { useState } from "react";
import { auth } from "../services/tasksApi";
import { useAuth } from "../hooks/useAuth.ts";
import loginImg from '../assets/login-img.png';
import signImg from '../assets/singnup-img.png';

function Auth() {
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const switchView = (status) => {
    setIsLogin(status);
    setError(null);
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password.");
      return;
    }
    
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const data = {
      email: email,
      password: password
    };

    await auth(data, endpoint).then((res) => {
      if(res.err) {
        setError(res.err)
      } else {
        setError(null)
        login({ userEmail: res.email, authToken: res.token });   
        console.log({ userEmail: res.email, authToken: res.token })     
      }
    })
  }

  return (
    <div className="auth d-flex">
      <div className="col-6 h-100">
      <img className={isLogin ? "auth-image d-flex" : "d-none"}  src={loginImg} alt="Login img" />
      <img className={isLogin ? "d-none" : "auth-image d-flex"}  src={signImg} alt="Sing Up img" />
      </div>
      <div className="auth-container col-6">
        <h1 className="fw-bold">{isLogin ? "Login" : "Sign Up"}</h1>
        <form>
          <label className="label">Email</label>
          <input  required id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <label className="label">Password</label>
          <input required id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
          {!isLogin && 
            (<>
            <label className="label">Confirm Password</label>
            <input required id="confirm-password" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            </>
          )}
          <button type="submit" className="submit my-3" onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}>{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className="switch" onClick={() => switchView(!isLogin)}>{ isLogin ? "Don't have an account?" : "Already have an account ?" }</p>
        {/* <p className="error">{error}</p> */}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Auth;
