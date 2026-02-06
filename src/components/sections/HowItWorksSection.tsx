import { motion } from "framer-motion";
import { UploadCloud, Zap, Truck, MessageCircle } from "lucide-react";
import styles from "./HowItWorksSection.module.css";

const steps = [
  {
    id: 1,
    title: "Sua Visão",
    description:
      "Envie seu modelo 3D, descreva sua ideia ou escolha um projeto existente no catálogo dos Makers.",
    icon: <UploadCloud size={32} />,
  },
  {
    id: 2,
    title: "Liberdade de Escolha",
    description:
      "Escolha um Maker de sua confiança ou publique seu pedido para receber propostas de toda a comunidade.",
    icon: <Zap size={32} />,
  },
  {
    id: 3,
    title: "Negociação Direta",
    description:
      "Combine valores, detalhes da produção e prazos diretamente com o Maker através da plataforma.",
    icon: <MessageCircle size={32} />,
  },
  {
    id: 4,
    title: "Entrega Combinada",
    description:
      "Defina a melhor forma de retirada ou envio do produto diretamente com quem produziu a peça.",
    icon: <Truck size={32} />,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.intermediaryBadge}>
            Plataforma Intermediadora
          </span>
          <h2>Como a mágica acontece</h2>
          <p>
            Na Rethink3D, nós não imprimimos – nós conectamos. Somos a ponte
            entre sua imaginação e os melhores Makers do mercado.
          </p>
        </motion.div>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className={styles.stepCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={styles.iconContainer}>
              {step.icon}
              <div className={styles.stepNumber}>{step.id}</div>
            </div>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
