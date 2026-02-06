import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./FAQSection.module.css";

const faqs = [
  {
    question: "A Rethink3D garante meu dinheiro se o Maker não entregar?",
    answer:
      "Sim! Nós utilizamos um sistema de Compra Garantida. O valor que você paga fica 'congelado' na nossa plataforma e só é repassado ao Maker após você confirmar que recebeu o produto conforme o combinado. Se algo der errado, nosso suporte intervém para realizar o reembolso.",
  },
  {
    question: "Como funciona a entrega? Vocês enviam?",
    answer:
      "Nós damos a liberdade para você e o Maker combinarem a melhor forma! Você pode optar por retirada em mãos (ótimo para Makers da sua cidade), Correios, Uber Flash ou transportadoras. Tudo é combinado diretamente no chat da negociação.",
  },
  {
    question: "Não entendo nada de arquivos 3D (STL/OBJ). Posso usar o app?",
    answer:
      "Com certeza. Você tem duas opções: escolher produtos já prontos no nosso catálogo de Makers ou usar a opção 'Tenho apenas uma ideia'. Nesse caso, você descreve o que precisa e Makers que também fazem modelagem 3D entrarão em contato para criar o arquivo para você.",
  },
  {
    question: "Como sei se o Maker é confiável?",
    answer:
      "Transparência é nossa prioridade. Antes de fechar negócio, você pode visitar o perfil do Maker, ver o portfólio de peças já impressas por ele, ler as categorias com que ele trabalha e até enviar uma mensagem no chat para tirar suas dúvidas ao vivo!",
  },
  {
    question: "Sou Maker. Pago para usar a plataforma?",
    answer:
      "Criar sua vitrine e receber propostas é gratuito. Nós cobramos apenas uma pequena taxa de serviço sobre as vendas concretizadas para manter a segurança e o desenvolvimento da plataforma. Se não vendeu, não pagou.",
  },
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button
        className={styles.question}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          size={20}
          className={`${styles.icon} ${isOpen ? styles.open : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.answer}
          >
            <div className={styles.answerContent}>{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Dúvidas Frequentes</h2>
          <p>Tudo o que você precisa saber para começar a usar.</p>
        </motion.div>
      </div>

      <div className={styles.list}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <FAQItem question={faq.question} answer={faq.answer} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
