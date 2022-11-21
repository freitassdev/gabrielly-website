import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import "../App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserGuilds, getUser } from "../services/api";
import Header from "../components/Helmet/Helmet";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
export default function App() {
  const [user, setUser] = useState();
  const [userGuilds, setUserGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const exFunctions = async () => {
      if (localStorage.getItem("key") && localStorage.getItem("id")) {
        await getUser().then((res) => {
          setUser(res.data);
        })

        await getUserGuilds().then((res) => {
          setUserGuilds(res.data);
        });
      }
      setLoading(false);
    }

    exFunctions();
  }, [])

  user;
  userGuilds;
  function Perms(permission) {
    const permissions = parseInt(permission) & 0x8;
    return permissions;
  }
  /* global BigInt */
  const uiavatar = "https://ui-avatars.com/api/?name=";
  const dcavatar = "https://cdn.discordapp.com/icons/";
  return (
    <>
      <div><Header title="Selecione um Servidor" /></div>
      {loading ? <Loader loading={loading} /> : (<div>
        <Navbar userData={user} />
        <div className="area" style={{ width: "90%", borderRadius: "8px", margin: "auto", marginTop: "5%" }}>
          <header className="area-header" style={{ color: "#C7D5D4", padding: "10px", fontSize: "16px" }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}> <InfoIcon sx={{ fontSize: 20 }} /><span className="sniglet" style={{ marginLeft: "10px" }}>Selecione um servidor.</span></div>
          </header>
          <div className="area-body" style={{ backgroundColor: "#0C1E31", borderRadius: "0px 0px 8px 8px" }}>

            <div style={{ padding: "3rem 0rem 2rem 0rem" }}>
              {userGuilds ? userGuilds.map((guild) => (
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                  {Perms(guild.permissions) == 8 ? (
                    <div key={guild.id} className="guilds-area">
                      <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {guild.icon ?
                          <img src={dcavatar + guild.id + "/" + guild.icon} style={{ height: "60px", borderRadius: "50%", border: "2px solid #0292F9" }} />
                          :
                          <img src={uiavatar + guild.name} style={{ height: "60px", borderRadius: "50%", border: "2px solid #0292F9" }} />}

                        <p className="sniglet" style={{ color: "#DDDDDD", fontSize: '20px', marginLeft: '10px' }}>{guild.name}</p>
                      </div>
                      {guild.has ? <Link to={"/dashboard/" + guild.id + "/test"}><Button style={{ maxWidth: '120px', maxHeight: '40px', minWidth: '120px', minHeight: '40px', fontSize: "15px", marginRight: "12px", textTransform: "none" }} variant="contained">Configurar</Button></Link> : <Button style={{ maxWidth: '120px', maxHeight: '40px', minWidth: '120px', minHeight: '40px', fontSize: "15px", marginRight: "12px", textTransform: "none" }} variant="contained">Adicionar</Button>}
                    </div>
                  ) : null}

                </div>

              )) : null}
            </div>
          </div>
        </div>
        <br /><br /><br /><br />
      </div>
      )}

    </>
  );
};
