import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import "./App.css";
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from "./services/api";
import axios from "axios";
import Header from "./components/Helmet/Helmet";
import Loader from "./components/Loader/Loader";
export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const exFunctions = async () => {
      if(localStorage.getItem("key") && localStorage.getItem("id")) {
      await getUser().then((res) => {
        console.log(res)
        setUser(res.data);
      });
      }
      setLoading(false);
    }

    exFunctions();
  }, [])
  console.log(user);
  return (
    <>
      <div><Header title="Início - Gabrielly" /></div>
      {loading ? <Loader loading={loading} /> : (<div style={{ maxHeight: "100vh", overflow: "hidden" }}>
        <div className="background">
          <div className="background-gaby">
            <Navbar userData={user} withShadow={true} />
            <section className="home-start-section-container">
              <div className="home-start-section-text">
                <h1 className="gradient-text leckerli-one" style={{ fontSize: "59px", fontWeight: "400", lineHeight: "68px" }}>Transforme seu servidor</h1>
                <div style={{ maxWidth: "80%", marginLeft: "auto", marginRight: "auto" }}>
                  <p className="sniglet" style={{ fontSize: "18px" }}>Olá! Eu sou a <span className="gradient-text">Gabriellay</span>! Apenas uma simples bot que te ajuda a transformar seu servidor em um lugar incrível! Seja bem-vindo(a) ao meu website!</p>

                  <Button style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px', fontSize: "15px", marginRight: "5px", marginTop: "15px", textTransform: "none" }} variant="contained">Me Adicione</Button>
                  <Button style={{ maxWidth: '130px', maxHeight: '40px', minWidth: '130px', minHeight: '40px', fontSize: "15px", marginLeft: "5px", marginTop: "15px", textTransform: "none" }} color="secondary" variant="outlined">Suporte</Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      )}
      <ToastContainer />
    </>
  );
}