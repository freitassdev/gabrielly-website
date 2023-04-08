import { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "../../App.css";
import "../../components/Sidebar/index.css";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { getUser_UserGuilds, api, getAllDatabase } from "../../services/api";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Helmet/Helmet";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loader from "../../components/Loader/Loader";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
export default function Basic() {
  const [user, setUser] = useState();
  const [userGuilds, setUserGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState();
  const [sendLoading, setSendLoading] = useState(false);
  const [database, setDatabase] = useState();
  let { guildId } = useParams();
  const sendInfos = async () => {
    setSendLoading(true);
    api.post(`/postdb?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}&guild=${guildId}`, { language: select });

    setTimeout(function () {
      setSendLoading(false);
      toast.info('Informações salvas com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "toast-message",
      });
    }, 3000);
  }
  useEffect(() => {
    const exFunctions = async () => {
      if (localStorage.getItem("key") && localStorage.getItem("id")) {

        await getUser_UserGuilds().then((res) => {
          setUser(res.data.userInfo);
          setUserGuilds(res.data.guilds);
        });
        
        await getAllDatabase().then((res) => {
          setDatabase(res.data)
          setSelect(res.data.language)
        })
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
  const langs = [
    { name: 'Português Brasileiro', value: 'pt-BR' },
    { name: 'Inglês', value: 'en-US' }
];


  return (
    <><ToastContainer />
      {loading ? <Loader loading={loading} /> : (<div>
        <Navbar userData={user} />
        {userGuilds.map((guild) => (
          <div key={guild.id}>
            {guild.has && guild.id == guildId && Perms(guild.permissions) == 8 ? (
              <div>
                <div><Header title={"Configurações " + guild.name} /></div>
                <Sidebar guild={guild} user={user} type="guild" userGuilds={userGuilds} />
                <div className="content">

                  <div style={{ marginLeft: "0px" }}>
                    <div style={{ padding: "2rem" }}>
                      <h2 style={{ paddingBottom: "1rem", color: "#D9D9D9" }}>Linguagem</h2>
                      <Dropdown value={select} options={langs} onChange={(e) => setSelect(e.value)} optionLabel="name" placeholder="Selecione uma linguagem" />
                    </div>
                    
                    <div style={{ marginTop: "15%", padding: "2rem" }}>
                      <Button style={{ marginLeft: "auto" }} label="Salvar" loading={sendLoading} onClick={() => sendInfos()} />
                    </div>
                  </div>
                </div>

              </div>
            ) : null}
          </div>
        ))}</div>)}




      {/*userGuilds.map((guild) => (
        <div style={{marginLeft: "100px"}} key={guild.id}>
          <h1>{guild.name}{guild.has ? "maqueicos" : "macacos"}</h1>
          <h2 style={{color: "#fff"}}>{Perms(guild.permissions)}</h2>
        </div>
      
      ))*/}
    </>
  );
};