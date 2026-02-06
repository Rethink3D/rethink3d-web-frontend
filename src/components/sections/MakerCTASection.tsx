import { User, Smartphone } from "lucide-react";
import { Button } from "../ui/Button";
import styles from "./MakerCTASection.module.css";

export const MakerCTASection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {}
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <User size={32} />
          </div>
          <h3>Já é um Maker?</h3>
          <p>
            Acesse seu painel para gerenciar pedidos, atualizar seu portfólio e
            acompanhar seus ganhos.
          </p>
          <Button
            onClick={() =>
              window.open("https://dashboard.rethink3d.com.br", "_blank")
            }
            className="w-full"
          >
            Acessar Painel
          </Button>
        </div>

        {}
        <div className={`${styles.card} ${styles.appCard}`}>
          <div className={styles.iconWrapper}>
            <Smartphone size={32} />
          </div>
          <h3>Quer Imprimir Renda Extra?</h3>
          <p>
            Baixe o aplicativo Rethink3D, cadastre-se e comece a receber pedidos
            da sua região.
          </p>
          <Button
            variant="outline"
            onClick={() =>
              window.open("https://rethink3d.com.br/download", "_blank")
            }
            className="w-full"
          >
            Baixar App
          </Button>
        </div>
      </div>
    </section>
  );
};
