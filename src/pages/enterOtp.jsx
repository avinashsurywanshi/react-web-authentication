
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import httpService from "../services/httpService";
import jwtDecode from 'jwt-decode';
import AuthContext from '../auth/context';

const EnterOtp = () => {
    const authContext = useContext(AuthContext);
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmitting(true);
       // const mobile_no = location.state.mobile_no;
        const userDetails = {mobile_no: 9923013091, otp: 506573};

        const res = await httpService.post(
            "http://10.0.0.180:3000/api/v1/user/login",
            userDetails
        );
        if (res.status === 200) {
            console.log(res.data.accessToken);
            const accessToken = {authToken: res.data.accessToken};
            const user = jwtDecode(res.data.accessToken);   
            authContext.setUser({...user, ...accessToken});
            navigate("/dashboard");
        }

        setIsSubmitting(false);
    }

  return (
    <OtpContainer>
      <div className="login-wrapper">
        <h1>InstaHeal</h1>
        <h2> Enter OTP </h2>
        <form onSubmit={handleSubmit} className="login-from">
            <input
              placeholder="OTP"
              type="number"
              name="numebr"
              value={otp}
              onChange ={(e) => setOtp(e.target.value)}
            />
          <button disabled={isSubmitting}>Verify OTP</button>
        </form>
      </div>
    </OtpContainer>
  )
}

const OtpContainer = styled.div`
display:flex;
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
      font-size: 20px;
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
        font-size: 16px;
        height: 30px;
        letter-spacing: 3px;
        margin: 8px 0;
        padding: 4px;
        text-align: center;
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
  }
`

export default EnterOtp
