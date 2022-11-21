import React from "react";
import "./index.css";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const Sidebar = ({ guild }) => {

const uiavatar = "https://ui-avatars.com/api/?name=";
const dcavatar = "https://cdn.discordapp.com/icons/";
  return (
    <>
        <div className="sidebar">
          <div className="server">
            {guild.icon ? <img src={dcavatar + guild.id + "/" + guild.icon} height="100px" width="100px" /> : <img src={uiavatar + guild.name} height="100px" width="100px" />}
            <Typography variant="body1" sx={{ fontSize: "20px", color: "#fff" }}>{guild.name}</Typography>

            <hr style={{ marginTop: "5px", backgroundColor: "#0195FA", border: "1px solid #0195FA" }} />
          </div>
          <Typography variant="body1" sx={{fontWeight: "bold", textAlign: "center", fontSize: "12px", color: "#0195FA", padding: "3px"}}>ENTRADAS/SAIDAS</Typography>  
          <a className="active" href="#home">
            Configurações gerais.
          </a>
          <a href="#teste">Mensagens de Entradas</a>
          <a href="#teste">Mensagens de Saídas</a>
          <a href="#teste">Contador de Membros</a>
             <Typography variant="body1" sx={{fontWeight: "bold", textAlign: "center", fontSize: "12px", color: "#0195FA", padding: "8px"}}>SEGURANÇA/DEFESA</Typography>  
          <a href="#teste">AntiFake</a>
          <a href="#teste">Mensagens de Saídas</a>
        </div>
     
    </>
  )
}

export default Sidebar;