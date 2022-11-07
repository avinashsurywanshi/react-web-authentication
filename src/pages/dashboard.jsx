
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../auth/context";
import httpService from "../services/httpService";


const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [doctor, setDoctor] = useState();
    const headers = {'x-auth-token': user.authToken};
    const navigate = useNavigate();

    const getDoctorDeteails = async () => {
        const res = await httpService.get(
            `http://10.0.0.180:3000/api/v1/doctor/getDoctorInfo/${user.doctor_id}`, {headers});
        
        setDoctor(res.data[0]);
        console.log(JSON.stringify(res.data[0]));
    }
    
    useEffect (()=> {
        if (!user) {
            navigate("/dashboard");
        }
        getDoctorDeteails();
    },[user]);

  return (
    <DashboardContainer>
      <div className="topNav">
        <div className="logo">InstaHeal</div>
        {doctor && <div className="right-nav">
           <Link>Dr. {doctor.full_name}</Link>
            <Link>Logout</Link>
        </div>}
      </div>
      <div className="left-nav">

        </div>
    </DashboardContainer>
  )
}

const DashboardContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-wrap: wrap;
    align-items: start;
    .topNav {
        background-color: #fff;
        webkit-box-shadow: 1px 1px 4px rgb(0 0 0 / 80%);
        box-shadow: 1px 1px 8px rgb(0 0 0 / 30%);
        display: flex;
        height: 64px;
        width: 100%;

        .logo {
            color: #43b628;
            font-family: 'Montserrat', sans-serif;
            font-size: 30px;
            font-weight: 400;
            line-height: 4rem;
            padding: 0 16px;
        }
        .right-nav {
            margin-left: auto;
            line-height: 4rem;
            padding: 0 16px;
            a {
                background-color: #eee;
                border-radius: 24px;
                color: #666;
                font-size: 13px;
                font-weight: 500;
                margin: 0 16px;
                padding: 8px 16px;
                text-decoration: none;
                &:hover {
                    background-color: #ddd;
                    color: #333
                }
            }
        }
        .left-nav {
            background-color: #f8f8f8;
            border-right: 1px solid #e8e8e8;
            height: 100vh;
            width: 200px;
            z-index: -1
        }
  }
`;


export default Dashboard
