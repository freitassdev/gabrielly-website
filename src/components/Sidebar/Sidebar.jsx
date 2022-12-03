import { useEffect } from "react";
import "./index.css";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Sidebar = ({ guild, user, userGuilds, type }) => {
useEffect(() => {
  document.body.classList.add('sidebar-body');
}, [])
  const uiavatar = "https://ui-avatars.com/api/?name=";
  const dcavatar = "https://cdn.discordapp.com/icons/";
  function Perms(permission) {
    const permissions = parseInt(permission) & 0x8;
    return permissions;
  }
  return (
    <>
      <div className="guilds-sidebar">
        {user.avatar ? <img className="usericon" src={"https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar} /> : <img className="usericon active-guild" src="https://cdn.discordapp.com/embed/avatars/1.png" />}
        <hr />
        {userGuilds ? userGuilds.map((guild) => (
          <div key={guild.id}>
            {Perms(guild.permissions) == 8 ? (
              <div>
                {guild.icon ? <img className="guild-icon" src={dcavatar + guild.id + "/" + guild.icon} /> : <img className="guild-icon" src={uiavatar + guild.name} />}
              </div>
            ) : null}
          </div>
        )) : null}



      </div>
      {type == "guild" ? (
      <div className="sidebar">
        <div className="server">
          {guild.icon ? <img src={dcavatar + guild.id + "/" + guild.icon} height="100px" width="100px" /> : <img src={uiavatar + guild.name} height="100px" width="100px" />}
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#fff" }}>{guild.name}</Typography>

          <hr style={{ marginTop: "5px", backgroundColor: "#0195FA", border: "1px solid #0195FA" }} />
        </div>
        <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center", fontSize: "12px", color: "#0195FA", padding: "3px" }}>ENTRADAS/SAIDAS</Typography>
        <a className="active" href="#home">
          Configurações gerais.
        </a>
        <a href="#teste">Mensagens de Entradas</a>
        <a href="#teste">Mensagens de Saídas</a>
        <a href="#teste">Contador de Membros</a>
        <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center", fontSize: "12px", color: "#0195FA", padding: "8px" }}>SEGURANÇA/DEFESA</Typography>
        <a href="#teste">AntiFake</a>
        <a href="#teste">Mensagens de Saídas</a>
        <a href="#teste">AntiFake</a>
        <a href="#teste">Mensagens de Saídas</a>
        <a href="#teste">AntiFake</a>
        <a href="#teste">Mensagens de Saídas</a>
        <br />
      </div>
      ) : (
        <div className="sidebar">
        <div className="server">
          {user.avatar ? <img src={"https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar} height="100px" width="100px" /> : <img src={uiavatar + user.username} height="100px" width="100px" />}
          <Typography variant="body1" sx={{ fontSize: "20px", color: "#fff" }}>{user.username + "#" + user.discriminator}</Typography>

          <hr style={{ marginTop: "5px", backgroundColor: "#0195FA", border: "1px solid #0195FA" }} />
        </div>
        <a className="active" href="#home">
          Início
        </a>
        <a href="#teste">Daily</a>
        <a href="#teste">Loja diária</a>
        <a href="#teste">Gerenciar Premium</a>
        <a href="#teste">Transações Recentes</a>
        <a href="#teste">Backgrounds do Perfil</a>
        <br />
      </div>
      )}
    </>
  )
}

export default Sidebar;