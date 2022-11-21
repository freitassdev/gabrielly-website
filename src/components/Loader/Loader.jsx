import HashLoader from "react-spinners/HashLoader";

function Loader({loading}) {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
  return (
    <HashLoader
      color="#029BFD"
      cssOverride={style}
      loading={loading}
      size={90}
      aria-label="Carregando..."
      data-testid="loader"
    />
  )
}

export default Loader;