import { useEffect, useState, useRef } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import "../../../App.css";
import { getUserGuilds, getUser } from "../../../services/api";
import api from "../../../services/api";
import Header from "../../../components/Helmet/Helmet";
import Loader from "../../../components/Loader/Loader";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ReCAPTCHA from "react-google-recaptcha";
export default function Daily() {
    const [user, setUser] = useState();
    const [userGuilds, setUserGuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const captchaRef = useRef(null)

    

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
    const Submit = () => {
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        api.post("/recaptcha", {token})
        .then(res =>  console.log(res))
        .catch((error) => {
        console.log(error);
        })
    }
    /* global BigInt */
    const uiavatar = "https://ui-avatars.com/api/?name=";
    const dcavatar = "https://cdn.discordapp.com/icons/";
    return (
        <>
            <div><Header title="Selecione um Servidor" /></div>
            {loading ? <Loader loading={loading} /> : (<div>
                <Navbar userData={user} />
                <Sidebar guild={user} user={user} userGuilds={userGuilds} type="user" />
                <div className="content">

                    <div style={{ padding: "1rem 0rem 2rem 0rem" }}>
                        <ReCAPTCHA
                            sitekey="6LdOIFIjAAAAAKcJnBM0H7F2KHkA4iSVYtmHN20f"
                            ref={captchaRef}
                        />

                        <button onClick={Submit}>Maqueiiicoooo</button>
                    </div>
                </div>
            </div>
            )}

        </>
    );
};
