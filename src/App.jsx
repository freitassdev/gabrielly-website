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
      if (localStorage.getItem("key") && localStorage.getItem("id")) {
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
      {loading ? <Loader loading={loading} /> : (
        <div>
          <section>
            <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
              <div className="background">
                <div className="background-gaby">
                  <Navbar userData={user} withShadow={true} />
                  <section className="home-start-section-container">
                    <div className="home-start-section-text">
                      <h1 className="gradient-text leckerli-one" style={{ fontSize: "59px", fontWeight: "400", lineHeight: "68px" }}>Transforme seu servidor</h1>
                      <div style={{ maxWidth: "80%", marginLeft: "auto", marginRight: "auto" }}>
                        <p className="sans-font" style={{ fontSize: "18px" }}>Olá! Eu sou a <span className="gradient-text">Gabrielly</span>! Apenas uma simples bot que te ajuda a transformar seu servidor em um lugar incrível! Seja bem-vindo(a) ao meu website!</p>

                        <Button style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px', fontSize: "15px", marginRight: "5px", marginTop: "15px", textTransform: "none" }} variant="contained">Me Adicione</Button>
                        <Button style={{ maxWidth: '130px', maxHeight: '40px', minWidth: '130px', minHeight: '40px', fontSize: "15px", marginLeft: "5px", marginTop: "15px", textTransform: "none" }} color="secondary" variant="outlined">Suporte</Button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
          
          <section className='info-section'>
            <div>
              <h1 className='poppins'>Sou completamente grátis!</h1>
              <p>Todos os meus sistemas, comandos e funcionalidades são gratuitos, você usar o quanto quiser e quando quiser! Mas claro, uma doação sempre é bem vinda!</p>
            </div>
          </section>
          <section className='features-section features-grid'>
            <div>
              <h1 className='poppins'>O que eu posso fazer?aq n ta pronto</h1>
              <p>Veja um pouquinho do que eu posso fazer para melhorar seu servidor em 1000x! (spoiler: tudo!)</p>
            </div>
            <hr />
            <article className="features-group">
              <div className="features-image">
                <img src="https://media.discordapp.net/attachments/956329821598810193/959536219715420230/unknown.png" alt="Diversão e participação." />
              </div>
              <div className="features-text">
                <h2 className="poppins" style={{color: "#02E2FF"}}>Diversão e Participação</h2>
                <p className="sans-font">A maioria dos servidores possuem um grande problema, quase ninguém interage ou participa de eventos, e isso é realmente muito triste e desanimador... Mas eu estou aqui para te ajudar em qualquer ocasião! Tudo que você precisa é um pouco mais de diversão, com um ambiente mais alegre e divertido, com certeza seu servidor será mais ativo! </p>
              </div>
            </article>

            <article className="features-group">
              <div className="features-image adverse">
                <img src="https://media.discordapp.net/attachments/956329821598810193/959543151163478086/unknown.png" alt="Customização" />
              </div>
              <div className="features-text">
                <h2 className="poppins" style={{color: "#02E2FF"}}>Configuravel e Customizavel</h2>
                <p className="sans-font">Cada servidor tem seu próprio jeitinho, todos são únicos e especiais... E você pode melhorar isso! Personalize e configure minhas funções como prefirir pelo meu <a href="/dashboard" className="text-info">dashboard</a>, ele merece ser o mais ideal para sua comunidade e para melhor experiência!</p>
              </div>
            </article>

            <article className="features-group">
              <div className="features-image">
                <img src="https://media.discordapp.net/attachments/956329821598810193/959541679545802822/parado_polocia_luna.png" alt="Proteção" />
              </div>
              <div className="features-text">
                <h2 className="poppins" style={{color: "#02E2FF"}}>Proteção e Moderação</h2>
                <p className="sans-font">O Discord não é perfeito, mas podemos construir um lugar mais seguro e adequado aos membros, e também, facilitar a vida dos staffs e moderadores! Chega de pessoas que entram apenas com o intuito de divulgar ou membros que não seguem as regras! </p>
              </div>
            </article>

            <article className="features-group">
              <div className="features-image adverse">
                <img src="https://media.discordapp.net/attachments/956329821598810193/959544195004108890/sorteiooo_luna.png" alt="Sorteios" />
              </div>
              <div className="features-text">
                <h2 className="poppins" style={{color: "#02E2FF"}}>Sorteios</h2>
                <p className="sans-font">Que tal fazer um sorteio para os membros do seu servidor? Tenho certeza que eles ficariam felizes e animados se ganhassem algum presentinho! Comigo você pode criar, configurar, gerenciar, e editar sorteios do jeito que você quiser!</p>
              </div>
            </article>
          </section>
        </div>
      )}
      <ToastContainer />
    </>
  );
}