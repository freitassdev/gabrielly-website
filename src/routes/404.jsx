
import "../App.css";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
export default function Page404() {
 let navigate = useNavigate();

  return (
    <>
    <div className="container-404">
    <div className="container-404page">
      <h1 className="quicksand-400" style={{fontSize: "50px", color: "#FF3838"}}>404 Error</h1>
      <h2 className="quicksand-300" style={{fontSize: "20px", color: "#D3D3D3"}}>Oops... A página requisitada não foi encontrada.</h2>
      <div style={{display: "flex", flexDirection: "row"}}>
      <Button style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px', fontSize: "15px", marginTop: "15px", textTransform: "none", marginRight: "3px" }} variant="contained" onClick={() => navigate("/")}>Página Inicial</Button>
                        <Button style={{ maxWidth: '130px', maxHeight: '40px', minWidth: '130px', minHeight: '40px', fontSize: "15px", marginTop: "15px", textTransform: "none", marginLeft: "3px" }} color="secondary" variant="outlined">Suporte</Button>
        </div>
        </div>
      </div>
    </>
  );
};
