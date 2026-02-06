import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./EventsSection.module.css";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Code,
  Cpu,
  Zap,
  Award,
} from "lucide-react";

interface Founder {
  name: string;
  role: string;
  description: string;
  icon: React.ReactNode;
}

const founders: Founder[] = [
  {
    name: "Victor José",
    role: "Sócio Fundador e Dev Full-Stack",
    description:
      "Lidera o desenvolvimento da plataforma web e arquitetura de sistemas.",
    icon: <Code size={32} />,
  },
  {
    name: "João Pedro",
    role: "Sócio Fundador e Dev IA / ML",
    description:
      "Especialista em Inteligência Artificial e algoritmos de Machine Learning.",
    icon: <Cpu size={32} />,
  },
  {
    name: "Pedro Oliveira",
    role: "Sócio Fundador e Dev Backend",
    description: "Responsável pela infraestrutura, APIs e segurança de dados.",
    icon: <Zap size={32} />,
  },
  {
    name: "Rafael Ferreira",
    role: "Sócio Fundador e Eng. Mecânico",
    description:
      "Doutor em Impressão 3D, focado em hardware e inovação de materiais.",
    icon: <Award size={32} />,
  },
];

interface EventImage {
  id: string;
  src: string;
}

const events: EventImage[] = [
  {
    id: "evento1",
    src: "/events/Evento1.jpg",
  },
  {
    id: "evento2",
    src: "/events/Evento2.jpg",
  },
  {
    id: "evento3",
    src: "/events/Evento3.jpg",
  },
  {
    id: "evento4",
    src: "/events/Evento4.jpg",
  },
  {
    id: "evento5",
    src: "/events/Evento5.jpg",
  },
  {
    id: "evento6",
    src: "/events/Evento6.jpg",
  },
];

export const EventsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentEvent = events[currentIndex];

  if (currentIndex !== prevIndex) {
    setPrevIndex(currentIndex);
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      const slideDuration = 6000;
      timer = setInterval(nextSlide, slideDuration);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Quem faz acontecer</h2>
          <p>
            Conheça os fundadores e especialistas por trás da tecnologia
            Rethink3D.
          </p>
        </motion.div>
      </div>

      <div className={styles.carouselContainer}>
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={prevSlide}
          aria-label="Imagem Anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={nextSlide}
          aria-label="Próxima Imagem"
        >
          <ChevronRight size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            className={styles.imageSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 50) {
                prevSlide();
              } else if (info.offset.x < -50) {
                nextSlide();
              }
            }}
          >
            <img src={currentEvent.src} alt="Evento Rethink3D" />
          </motion.div>
        </AnimatePresence>

        <div className={styles.controlsWrapper}>
          <button
            className={styles.playPauseBtn}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <div className={styles.controls}>
            {events.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.controlBtn} ${idx === currentIndex ? styles.active : ""}`}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                }}
                aria-label={`Ver foto ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.partnersGrid}>
        {founders.map((founder, idx) => (
          <motion.div
            key={idx}
            className={styles.partnerCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>{founder.icon}</div>
              <div className={styles.headerInfo}>
                <h3>{founder.name}</h3>
                <span className={styles.role}>{founder.role}</span>
              </div>
            </div>
            <p className={styles.description}>{founder.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
