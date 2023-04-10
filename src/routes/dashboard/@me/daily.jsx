import { useEffect, useState, useRef } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import "../../../App.css";
import { getUser_UserGuilds, getUserDb } from "../../../services/api";
import api from "../../../services/api";
import Header from "../../../components/Helmet/Helmet";
import Loader from "../../../components/Loader/Loader";
import { Button } from "primereact/button"
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ReCAPTCHA from "react-google-recaptcha";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
export default function Daily() {
    const [user, setUser] = useState();
    const [userDaily, setUserDaily] = useState();
    const [userDailyGive, setUserDailyGive] = useState();
    const [userGuilds, setUserGuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [captchaResponse, setCaptchaResponse] = useState(true);
    const navigate = useNavigate();
    const captchaRef = useRef(null)
    let dailygive = Math.floor(Math.random() * (5000-3000) + 3000);


    useEffect(() => {
        const exFunctions = async () => {
            if (localStorage.getItem("key") && localStorage.getItem("id")) {
                await getUser().then((res) => {
                    setUser(res.data);
                })

                await getUser_UserGuilds().then((res) => {
                    setUser(res.data.userInfo);
                    setUserGuilds(res.data.guilds);
                  });

                await getUserDb(localStorage.getItem("id")).then((res) => {
                    setUserDaily(res.data.daily.date);
                    setUserDailyGive(res.data.daily.obtained);
                })
            } else {
                navigate('/?err=true&errcode=01')
            }
            setLoading(false);
        }

        exFunctions();
    }, [])

    user;
    userGuilds;
    userDaily;
    userDailyGive;
    function verify(value) {
        const token = captchaRef.current.getValue();
        api.post("/recaptcha", { token })
            .then((res) => {
                setCaptchaResponse(res.success)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const Submit = () => {
        api.get(`/postdailydb?key=${localStorage.getItem("key")}&value=${dailygive}&id=${localStorage.getItem("id")}`)
            .then(async (res) => { 
                setUserDailyGive(dailygive);
                await getUserDb(localStorage.getItem("id")).then((res) => {
                    setUserDaily(res.data.daily.date);
                   
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    let time = 8.64e7 - (Date.now() - userDaily);
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          window.location.reload(false);
        } else {
          // Render a countdown
          return (<div><h1 className='quicksand-400' style={{ fontSize: "35px", color: "#0195FA", marginTop: "2rem", textAlign: "center" }}>Recompensa Diária!</h1><div className='daily-area'>
          <img style={{ width: "150px", height: "auto" }} src="https://cdn.iconscout.com/icon/free/png-512/gift-box-2942054-2428113.png" />
          <h2 style={{ color: "#C1C3C5", fontSize: "17px", marginTop: "1rem" }}>Você recebeu...</h2>
          <h1 style={{ fontSize: "35px", color: "#0195FA" }}><span className="sniglet"><strong>{userDailyGive}</strong></span> <span style={{ color: "#C1C3C5", fontSize: "17px" }}>donuts hoje!</span></h1>
          <span className="contdown-daily" style={{marginTop: "15px"}}>Tente novamente em: {hours}h {minutes}m {seconds}s</span>
      </div></div>);
        }
      };
    /* global BigInt */
    return (
        <>
            <div><Header title="Daily" /></div>
            {loading ? <Loader loading={loading} /> : (<div>
                <Navbar userData={user} />
                <Sidebar guild={user} user={user} userGuilds={userGuilds} type="user" />
                <div className="content">
                    <div className="content-container flex-column" style={{ padding: "1rem 0rem 2rem 0rem" }}>
                        {userDaily > 0 ? (<div>
                            <Countdown date={Date.now() + time} renderer={renderer} />
                        </div>
                        ) : (<div>
                            <h1 className='quicksand-400' style={{ fontSize: "35px", color: "#0195FA", textAlign: "center" }}>Recompensa Diária!</h1>
                            <div className='daily-area'>
                                <img style={{ width: "150px", height: "auto" }} src="https://cdn.iconscout.com/icon/free/png-512/gift-box-2942054-2428113.png" />
                                <h2 style={{ color: "#C1C3C5", fontSize: "15px", marginTop: "2rem" }}>Conclua o desafio abaixo para resgatar sua recompensa diária!</h2>
                                <ReCAPTCHA
                                    sitekey="6LdOIFIjAAAAAKcJnBM0H7F2KHkA4iSVYtmHN20f"
                                    onChange={verify}
                                    ref={captchaRef}
                                    style={{ marginTop: "10px" }}
                                />

                                <Button style={{ borderRadius: "6px", marginTop: "10px" }} label="Resgatar Prêmio" disabled={captchaResponse} onClick={Submit} />
                            </div>
                        </div>
                        )}

                    </div>
                </div>
            </div>
            )}

        </>
    );
};
