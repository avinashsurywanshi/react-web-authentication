import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import httpService from "../services/httpService";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    setIsSubmitting(true);
    e.preventDefault();
    const user_mobile_no = { mobile_no: parseInt(mobile) };
    const res = await httpService.post(
      "http://10.0.0.180:3000/api/v1/user/getOtp",
      user_mobile_no
    );
    
    if ((res.status = 200)) {
        navigate("/enter-otp", {
            state: {
                mobile_no: mobile
            }
        });
    }
    setIsSubmitting(false);
  };

  

  return (
    <LoginContainer>
      <div className="login-wrapper">
        <h1>InstaHeal</h1>
        <h2> Login </h2>
        <form onSubmit={handleSubmit} className="login-from">
          <input
            placeholder="Mobile"
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button disabled={isSubmitting}>Get OTP</button>
        </form>
        <p className="text-content">Don't an have account?<Link> Sign up</Link></p>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  .login-wrapper {
    align-items: center;
    webkit-box-shadow: 1px 1px 4px rgb(0 0 0 / 80%);
    box-shadow: 1px 1px 8px rgb(0 0 0 / 30%);
    border-radius: 4px;
    display: flex;
    flex-basis: 100%;
    flex-flow: column;
    margin: auto;
    max-width: 300px;
    padding: 24px;

    h1 {
        border-bottom: 1px solid #229507;
        color: #229507;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 16px;
      }
    h2 {
      color: #444;
      font-size: 24px;
      font-weight: 400;
      margin-bottom: 16px;
    }
    .login-from {
      align-items: center;
      display: flex;
      flex-flow: column;
      input {
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 30px;
        margin: 8px 0;
        padding: 4px;
        width: 180px;
      }
      button {
        background-color: #229507;
        border: 0;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        margin-top: 8px;
        padding: 6px 16px;
        &:hover {
          background-color: #43b628;
        }
        &:disabled {
          background-color: #ccc;
          color: #666;
          cursor: default;
        }
      }
    }
    .text-content {
        color: #666;
        font-size: 14px;
        margin-top: 24px;
        a {
          color: #229507;
        }
    }
  }
`;

export default Login;
