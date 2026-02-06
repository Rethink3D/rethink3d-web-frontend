import { motion } from "framer-motion";
import { InfiniteMarquee } from "../ui/InfiniteMarquee";
import styles from "./TestimonialsSection.module.css";
import { User, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  type: "client" | "maker";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Finalmente consegui a peça de reposição pro meu drone antigo! Publiquei meu pedido e em 10 minutos já estava conversando com o Lucas. Retirei a peça no dia seguinte.",
    name: "Mariana Costa",
    role: "Designer de Interiores (Cliente)",
    type: "client",
  },
  {
    id: 2,
    quote:
      "Minha impressora ficava parada 80% do tempo. Agora se paga sozinha. O legal é que defino meus preços e combino a entrega sem burocracia.",
    name: "Ricardo Silva",
    role: "Maker há 3 anos",
    type: "maker",
  },
  {
    id: 3,
    quote:
      "Encontrei um Maker especialista que modelou e imprimiu meu protótipo de TCC. A Rethink3D me garantiu segurança no pagamento.",
    name: "Pedro Alencar",
    role: "Estudante de Engenharia (Cliente)",
    type: "client",
  },
  {
    id: 4,
    quote:
      "A vitrine digital perfeita. O cliente já chega sabendo o que quer, e as ferramentas de gestão me ajudam a não perder nenhum prazo.",
    name: "Fernanda Oliveira",
    role: "Artista 3D (Maker)",
    type: "maker",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Histórias de quem confia</h2>
          <p>Makers e Clientes conectados pela paixão de criar e realizar.</p>
        </motion.div>
      </div>

      <InfiniteMarquee speed={40} className="py-4">
        {testimonials.map((t) => (
          <div key={t.id} className={styles.card}>
            <Quote size={24} className="text-gray-500 mb-2 opacity-50" />
            <p className={styles.quote}>"{t.quote}"</p>
            <div className={styles.author}>
              <div className={styles.avatar}>
                <User size={24} />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.role}>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </InfiniteMarquee>
    </section>
  );
};
