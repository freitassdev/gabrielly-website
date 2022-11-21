import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
export default function Callback() {
  const queryParams = new URLSearchParams(window.location.search)
  const id = queryParams.get("id");
  const key = queryParams.get("key");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (id && key) {
        await localStorage.setItem("id", id)
        await localStorage.setItem("key", key);
        navigate("/");
      }
    }

    load();
  }, [])
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
  return (
    <>

      <HashLoader
        color="#029BFD"
        cssOverride={style}
        loading={true}
        size={90}
        aria-label="Carregando..."
        data-testid="loader"
      />
    </>
  );
}
