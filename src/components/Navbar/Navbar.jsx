import React, { useState, useEffect } from "react";
import "./styles.css";
import botimg from "./botimg.png";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Button from '@mui/material/Button';
import axios from "axios";
import api from "../../services/api"
import { Link } from "react-router-dom"
const Navbar = ({ userData, withShadow }) => {
  const [mobile, setMobile] = useState(false);


  let button;
  if (userData) {
    const srcavatar = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`
    button = <table><tbody><tr><td><img src={srcavatar} style={{ borderRadius: "50px", width: "51px", marginTop: "1px" }}/></td><td><h2 style={{padding: "10px", fontSize: "22px"}} className="sniglet">{userData.username + "#" + userData.discriminator}</h2></td></tr></tbody></table>
  } else {
    button = <Button size="small" style={{ fontSize: "15px" }} variant="contained" onClick={() => window.location.href = 'https://discord.com/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Fapi.gabrielly.website%2Fcallback&scope=identify%20guilds&client_id=868364606186328084'}>Login</Button>;
  }
  return (
    <>
      <nav className="main-nav" style={withShadow ? { boxShadow: "0 3px 4px rgba(0,0,0,.2)"} : {}}>
        <div className="botname">
          <div className="botnamebg">
            <h2 className="gradient-text">
              {button}
            </h2>
          </div>
        </div>
        <div className={mobile ? "menu-page-link mob-pages-link" : "menu-page-link"}>
          <ul>
            <li>
              <Link style={{color: "#FFFFF"}} to="/" ><span style={{color: "white"}}>Início</span></Link>
            </li>
            <li>
              <Link style={{color: "#FFFFF"}} to="/commands" ><span style={{color: "white"}}>Comandos</span></Link>
            </li>
            <li>
              <Link style={{color: "#FFFFF"}} to="/dashboard" ><span style={{color: "white"}}>Dashboard</span></Link>
            </li>
            <li>
              <Link style={{color: "#FFFFF"}} to="/docs" ><span style={{color: "white"}}>Documentação</span></Link>
            </li>
          </ul>
        </div>
        <div className="botarea">
          <ul className="botarea-desktop">
            <li className="gradient-text">
              <span className="leckerli-one" style={{ fontSize: "100%" }}>Gabrielly</span>
            </li>
          </ul>
          <div className="switch-icon">
            <a href="#" onClick={() => setMobile(!mobile)}>
              <MenuRoundedIcon className="hswitch-icon-meta" sx={{ fontSize: 40 }} />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 