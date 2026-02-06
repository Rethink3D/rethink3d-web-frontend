import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { GridBackground } from "../components/ui/GridBackground";
import styles from "./NotFound.module.css";
import { MouseTrace } from "../components/ui/MouseTrace";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <MouseTrace />
      <div className={styles.container}>
        <GridBackground />
        <h1 className={styles.glitchText}>404</h1>
        <h2 className={styles.title}>Objeto não encontrado</h2>
        <p className={styles.description}>
          Parece que o modelo que você está procurando não foi fatiado
          corretamente ou não existe neste universo.
        </p>
        <Button size="lg" onClick={() => navigate("/")}>
          Voltar para o Início
        </Button>
      </div>
    </>
  );
};

export default NotFound;
