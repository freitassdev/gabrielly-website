import { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "../../App.css";
import "../../components/Sidebar/index.css";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { getUserGuilds, getGuildRoles, getUser, getAutoroleRoles, api } from "../../services/api";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Helmet/Helmet";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingsIcon from '@mui/icons-material/Settings';
import { MultiSelect } from 'primereact/multiselect';
import Loader from "../../components/Loader/Loader";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { BlockUI } from 'primereact/blockui';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
export default function Test() {
  const [user, setUser] = useState();
  const [userGuilds, setUserGuilds] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [selected, setSelect] = useState();
  const [autoroleStatus, setAutoroleStatus] = useState();
  const [block, setBlock] = useState(true);
  const [sendLoading, setSendLoading] = useState(false);
  let { guildId } = useParams();
  const sendInfos = async () => {
    setSendLoading(true);
    api.post(`/postrolesdb?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}&guild=${guildId}`, { roles: selected, status: autoroleStatus });
    
    setTimeout(function(){
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
  const navigate = useNavigate();
  function switchFunction(value) {
    setAutoroleStatus(value);
    setBlock(value ? false : true);
  }
  useEffect(() => {
    const exFunctions = async () => {
      if (localStorage.getItem("key") && localStorage.getItem("id")) {
        await getUser().then((res) => {
          setUser(res.data);
        })

        await getUserGuilds().then((res) => {
          setUserGuilds(res.data);
        });

        await getAutoroleRoles(guildId).then((res) => {
          setSelect(res.data.roles);
          if (res.data.status === false) {
            setAutoroleStatus(false);
            setBlock(true);
          } else {
            setAutoroleStatus(true);
            setBlock(false);
          }
        })

        const rolesoptions = [];
        await getGuildRoles(guildId).then((res) => {

          Promise.all(res.data.map((role) => {
            // && !role.tags
            if (role.name != "@everyone") {
              rolesoptions.push({ label: "@" + role.name, value: role.id });
            }
          })).then(() => {
            setOptions(rolesoptions)
          });
          setRoles(res.data);
        })
      }

      setLoading(false);
    }

    exFunctions();

  }, [])
  block;
  autoroleStatus;
  user;
  userGuilds;
  roles;
  options;

  function Perms(permission) {
    const permissions = parseInt(permission) & 0x8;
    return permissions;
  }

  /* global BigInt */



  return (
    <><ToastContainer />
      {loading ? <Loader loading={loading} /> : (<div>
        <Navbar userData={user} />
        {userGuilds.map((guild) => (
          <div key={guild.id}>
            {guild.has && guild.id == guildId && Perms(guild.permissions) == 8 ? (
              <div style={{ padding: "20px" }}>
                <div><Header title={"Configurações " + guild.name} /></div>
                <Sidebar guild={guild} user={user} />
                <div className="content">
                  <div className="area" style={{ width: "100%", borderRadius: "8px", margin: "auto" }}>
                    <header className="area-header" style={{ color: "#C7D5D4", padding: "10px", fontSize: "16px" }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}> <SettingsIcon sx={{ fontSize: 20 }} /><span className="sniglet" style={{ marginLeft: "10px" }}>Configurações Gerais</span></div>
                    </header>
                    <div className="area-body" style={{ backgroundColor: "#0C1E31", borderRadius: "0px 0px 8px 8px" }}>
                      <div style={{ padding: "3rem" }}>
                        <h2 style={{ paddingBottom: "1rem", color: "#D9D9D9" }}>Ativar o autorole?</h2>
                        <InputSwitch checked={autoroleStatus} onChange={(e) => switchFunction(e.value)} />
                      </div>
                      <BlockUI blocked={block} style={{ borderRadius: "8px" }}><div style={{ padding: "3rem" }}>

                        <h2 style={{ paddingBottom: "1rem", color: "#D9D9D9" }}>Selecione até 5 cargos para o autorole.</h2>
                        <MultiSelect
                          value={selected}
                          options={options}
                          placeholder="Selecione um cargo."
                          display="chip"
                          filter={true}
                          filterPlaceholder="Pesquisar"
                          showSelectAll={false}
                          onChange={(e) => setSelect(e.value)}
                          selectionLimit="5"
                          style={{
                            backgroundColor: "#0E2237",
                            border: "2px solid #10273F"
                          }}

                        />
                      </div>
                      </BlockUI>
                      <div style={{ padding: "2rem" }}> <Button style={{marginLeft: "auto"}} label="Salvar" loading={sendLoading} onClick={() => sendInfos()} /></div>
                      {/*roles.map((role) => (
                          <div key={role.id}>
                            <h1>{role.id}</h1>
                          </div>
                        ))*/}
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