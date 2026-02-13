import { useEffect } from "react";
import { Mail, Instagram, MessageCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import {
  trackContactView,
  trackContactEmailClick,
  trackContactInstagramClick,
  trackContactSupportClick,
} from "../../utils/analytics";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  useEffect(() => {
    trackContactView();
  }, []);

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
          <div className={styles.iconWrapper}>
            <Mail size={32} />
          </div>
          <h3>Email</h3>
          <p>contato@rethink3d.com.br</p>
          <Button
            variant="outline"
            className={styles.contactButton}
            href="mailto:contato@rethink3d.com.br"
            onClick={() => trackContactEmailClick()}
          >
            Enviar Mensagem
          </Button>
        </Card>

        <Card className={styles.contactCard} hoverEffect={false}>
          <div className={styles.iconWrapper}>
            <Instagram size={32} />
          </div>
          <h3>Instagram</h3>
          <p>@_rethink3d</p>
          <Button
            variant="outline"
            className={styles.contactButton}
            href="https://instagram.com/_rethink3d"
            target="_blank"
            onClick={() => trackContactInstagramClick()}
          >
            Seguir Perfil
          </Button>
        </Card>

        <Card className={styles.contactCard} hoverEffect={false}>
          <div className={styles.iconWrapper}>
            <MessageCircle size={32} />
          </div>
          <h3>Suporte</h3>
          <p>Nossa equipe está pronta para te ajudar</p>
          <Button
            variant="outline"
            className={styles.contactButton}
            href="https://tally.so/r/Bzkae7"
            target="_blank"
            onClick={() => trackContactSupportClick()}
          >
            Abrir Chamado
          </Button>
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
