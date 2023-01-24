import { useEffect, useState, useRef } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import "../../../App.css";
import { getUserGuilds, getUser } from "../../../services/api";
import api from "../../../services/api";
import Header from "../../../components/Helmet/Helmet";
import Loader from "../../../components/Loader/Loader";
import { Button } from "primereact/button"
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ReCAPTCHA from "react-google-recaptcha";
export default function Backgrounds() {
    const [user, setUser] = useState();
    const [userGuilds, setUserGuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [captchaResponse, setCaptchaResponse] = useState(true);
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
    function verify(value) {
        const token = captchaRef.current.getValue();
        console.log(`${token} / ${value}`)
        api.post("/recaptcha", { token })
        .then((res) => {
            setCaptchaResponse(res.success)
        } )
        .catch((error) => {
        console.log(error);
        })
    }
    const Submit = () => {
        console.log("sougaysinho")
    }
    /* global BigInt */
    const uiavatar = "https://ui-avatars.com/api/?name=";
    const dcavatar = "https://cdn.discordapp.com/icons/";
    return (
        <>
            <div><Header title="Daily" /></div>
            {loading ? <Loader loading={loading} /> : (<div>
                <Navbar userData={user} />
                <Sidebar guild={user} user={user} userGuilds={userGuilds} type="user" />
                <div className="content">
                    <div className="content-container flex-column" style={{ padding: "1rem 0rem 2rem 0rem" }}>
                        
                        <h1 className='quicksand-400' style={{fontSize: "35px", color: "#0195FA"}}>Recompensa Diária!</h1>
                        <div className='daily-area'>
                        <img style={{ width: "150px", height: "auto"}} src="https://cdn.iconscout.com/icon/free/png-512/gift-box-2942054-2428113.png" />
                        <h2 style={{color: "#C1C3C5", fontSize: "15px", marginTop: "2rem"}}>Conclua o desafio abaixo para resgatar sua recompensa diária!</h2>
                        <ReCAPTCHA
                            sitekey="6LdOIFIjAAAAAKcJnBM0H7F2KHkA4iSVYtmHN20f"
                            onChange={verify}
                            ref={captchaRef}
                            style={{marginTop: "10px"}}
                        />

                        <Button style={{borderRadius: "6px", marginTop: "10px"}} label="Resgatar Prêmio" disabled={captchaResponse} onClick={Submit} />
                        </div>
                    </div>
                </div>
            </div>
            )}

        </>
    );
};
