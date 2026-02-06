import { Mail, Instagram, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Fale Conosco</h1>
        <p>
          Estamos prontos para ouvir você. Entre em contato para parcerias,
          dúvidas ou suporte.
        </p>
      </header>

      <div className={styles.grid}>
        <Card className={styles.contactCard} hoverEffect={false}>
          <Mail size={48} className={styles.icon} />
          <h3>Email</h3>
          <p>contato@rethink3d.com.br</p>
          <Button
            variant="outline"
            onClick={() =>
              (window.location.href = "mailto:contato@rethink3d.com.br")
            }
          >
            Enviar Email
          </Button>
        </Card>

        <Card className={styles.contactCard} hoverEffect={false}>
          <Instagram size={48} className={styles.icon} />
          <h3>Instagram</h3>
          <p>@_rethink3d</p>
          <Button
            variant="outline"
            onClick={() =>
              window.open("https://instagram.com/_rethink3d", "_blank")
            }
          >
            Seguir
          </Button>
        </Card>

        <Card className={styles.contactCard} hoverEffect={false}>
          <MessageCircle size={48} className={styles.icon} />
          <h3>Suporte</h3>
          <p>Precisa de ajuda com um pedido?</p>
          <Button variant="outline">Abrir Chamado</Button>
        </Card>
      </div>

      <div className={styles.mapSection}>
        {}
        <p>Atendemos em toda Grande São Luís - MA, até o momento.</p>
      </div>
    </div>
  );
};

export default Contact;
