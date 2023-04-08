import { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "../../App.css";
import "../../components/Sidebar/index.css";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { getUser_Guilds_GuildRoles, getAutoroleRoles, api } from "../../services/api";
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
export default function Autorole() {
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
  const navigate = useNavigate();
  function switchFunction(value) {
    setAutoroleStatus(value);
    setBlock(value ? false : true);
  }
  useEffect(() => {
    const exFunctions = async () => {
      if (localStorage.getItem("key") && localStorage.getItem("id")) {
       

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
        await getUser_Guilds_GuildRoles(guildId).then((res) => {
          setUser(res.data.userInfo);
          setUserGuilds(res.data.guilds);
          Promise.all(res.data.guildRoles.map((role) => {
            // && !role.tags
            if (role.name != "@everyone") {
              rolesoptions.push({ label: "@" + role.name, value: role.id });
            }
          })).then(() => {
            setOptions(rolesoptions)
          });
          setRoles(res.data.guildRoles);
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
              <div>
                <div><Header title={"Configurações " + guild.name} /></div>
                <Sidebar guild={guild} user={user} type="guild" userGuilds={userGuilds} />
                <div className="content">

                  <div style={{ marginLeft: "50px" }}>
                    <div style={{ padding: "2rem" }}>
                      <h2 style={{ paddingBottom: "1rem", color: "#D9D9D9" }}>Ativar o autorole?</h2>
                      <InputSwitch checked={autoroleStatus} onChange={(e) => switchFunction(e.value)} />
                    </div>
                    <BlockUI blocked={block} style={{ borderRadius: "8px" }}>
                      <div style={{ padding: "2rem" }}>
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
                    <div style={{ marginTop: "15%", padding: "2rem" }}>
                      <Button style={{ marginLeft: "auto" }} label="Salvar" loading={sendLoading} onClick={() => sendInfos()} />
                    </div>
                  </div>
                  {/*roles.map((role) => (
                          <div key={role.id}>
                            <h1>{role.id}</h1>
                          </div>
                        ))*/}
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