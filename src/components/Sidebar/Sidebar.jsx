import { useEffect, useState } from "react";
import "./index.css";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import 'primeicons/primeicons.css';
const Sidebar = ({ guild, user, userGuilds, type }) => {
  useEffect(() => {
    document.body.classList.add('sidebar-body');
  }, [])
  const uiavatar = "https://ui-avatars.com/api/?name=";
  const dcavatar = "https://cdn.discordapp.com/icons/";
  const [mobile, setMobile] = useState(false);
  function Perms(permission) {
    const permissions = parseInt(permission) & 0x8;
    return permissions;
  }
  return (
    <>

      <a className="expand-button" onClick={() => {
        setMobile(!mobile);
        const button = document.querySelector('.expand-button');
        var icon = document.getElementById("move-icon");
        const content = document.querySelector('.content');
        if (mobile) {
          button.style.left = '0';
          icon.style.transform = 'rotate(0deg)';
          icon.style.transition = 'transform 0.5s ease-in-out';
          content.classList.toggle('blur');
          content.style.overflow = "auto";
        } else {
          button.style.left = 'calc(100% - 100px)';
          content.classList.toggle('blur');
          icon.style.transform = 'rotate(180deg)';
          icon.style.transition = 'transform 0.5s ease-in-out';
          content.style.overflow = "hidden";
        }


      }}>
        <i id="move-icon" className="pi pi-arrow-right" style={{ 'fontSize': '25px', 'color': '#ffffff' }}></i>
      </a>
      <div>
        <div className={mobile ? "guilds-sidebar-expanded" : "guilds-sidebar"}>
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
          <div className={mobile ? "sidebar-expanded" : "sidebar"}>
            <div className="server">
              {guild.icon ? <img src={dcavatar + guild.id + "/" + guild.icon} height="100px" width="100px" /> : <img src={uiavatar + guild.name} height="100px" width="100px" />}
              <Typography variant="body1" sx={{ fontSize: "20px", color: "#fff" }}>{guild.name}</Typography>

              <hr style={{ maxWidth: "25rem", marginTop: "5px", backgroundColor: "#0195FA", border: "1px solid #0195FA" }} />
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
          <div className={mobile ? "sidebar-expanded" : "sidebar"}>
            <div className="server">
              {user.avatar ? <img src={"https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar} height="100px" width="100px" /> : <img src={uiavatar + user.username} height="100px" width="100px" />}
              <Typography variant="body1" sx={{ fontSize: "20px", color: "#fff" }}>{user.username + "#" + user.discriminator}</Typography>

              <hr style={{ maxWidth: "25rem", marginTop: "5px", backgroundColor: "#0195FA", border: "1px solid #0195FA", marginLeft: "auto", marginRight: "auto" }} />
            </div>
            <a className="active" href="#home">
              Início
            </a>
            <a href="/dashboard/@me/daily">Daily</a>
            <a href="/dashboard/@me/shop">Loja diária</a>
            <a href="/dashboard/@me/premium">Gerenciar Premium</a>
            <a href="/dashboard/@me/transations">Transações Recentes</a>
            <a href="/dashboard/@me/backgrounds">Backgrounds do Perfil</a>
            <br />
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar;