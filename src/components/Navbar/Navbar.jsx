import React, { useState, useEffect } from "react";
import "./styles.css";
import botimg from "./botimg.png";
import 'primeicons/primeicons.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = ({ userData, withShadow }) => {
  const [mobile, setMobile] = useState(false);

  let button;
  if (userData) {
    var srcavatar = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`
    button = <table><tbody><tr><td><img src={srcavatar} style={{ borderRadius: "50px", width: "51px", marginTop: "1px" }} /></td><td><h2 style={{ padding: "10px", fontSize: "22px" }} className="sniglet">{userData.username + "#" + userData.discriminator}</h2></td></tr></tbody></table>
  } else {
    button = <Button size="small" style={{ fontSize: "15px" }} variant="contained" onClick={() => window.location.href = 'https://discord.com/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Fapi.gabrielly.website%2Fcallback&scope=identify%20guilds&client_id=868364606186328084'}>Login</Button>;
  }
  return (
    <>
      <nav style={withShadow ? { boxShadow: "0 3px 4px rgba(0,0,0,.2)", width: "100%" } : { width: "100%" }}>
        <div className="navbar">
          <div className="bot-area">
            <img src="https://media.discordapp.net/attachments/956329821598810193/1049858560697303130/MT_5w2m04po0ioog1t7744z5n4z5.jpg" />
            <h1 className="gradient-text leckerli-one">Gabrielly</h1>
            <div className="divider" />
          </div>
          <a className="bars-icon" onClick={() => setMobile(!mobile)}><i className="pi pi-bars" style={{'fontSize': '25px'}}></i></a>
          <div className={mobile ? "navbar-mobile" : ""} style={{minWidth: "auto"}}>
            <ul className="navbar-itens">
              <li className="nav-item">
                <Link style={{ color: "#FFFFF" }} to="/" >Início</Link>
              </li>
              <li className="nav-item">
                <Link style={{ color: "#FFFFF" }} to="/dashboard/@me" >Dashboard</Link>
              </li>

              <li className="nav-item">
                <Link style={{ color: "#FFFFF" }} to="/commands" >Comandos</Link>
              </li>
              <li className="nav-item">
                <Link style={{ color: "#FFFFF" }} to="/docs" >Documentação</Link>
              </li>
              <div className="user-area" style={{width: "auto", justifyContent: "end"}}>
              {userData?.username ? (
                <>
                
                <h1 className="sans-font">{userData?.username + "#" + userData?.discriminator}</h1></>
              ) : (<>
                <h1 className="sans-font">Login</h1></>
              )}
              </div>
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 