import { useState, useEffect, useRef } from "react";
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
  { id: "evento1", src: "/events/Evento1.webp" },
  { id: "evento2", src: "/events/Evento2.webp" },
  { id: "evento3", src: "/events/Evento3.webp" },
  { id: "evento4", src: "/events/Evento4.webp" },
  { id: "evento5", src: "/events/Evento5.webp" },
  { id: "evento6", src: "/events/Evento6.webp" },
];

export const EventsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % events.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  const togglePlay = () => setIsPlaying((p) => !p);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const delta = pointerStartX.current - e.clientX;
    if (delta > 50) nextSlide();
    else if (delta < -50) prevSlide();
    pointerStartX.current = null;
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.revealHeader}>
          <h2>Quem faz acontecer</h2>
          <p>
            Conheça os fundadores e especialistas por trás da tecnologia
            Rethink3D.
          </p>
        </div>
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

        <div
          className={styles.slideStack}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          style={{ touchAction: "pan-y" }}
        >
          {events.map((ev, idx) => (
            <img
              key={ev.id}
              src={ev.src}
              alt="Evento Rethink3D"
              className={`${styles.slide} ${idx === currentIndex ? styles.slideActive : ""}`}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

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

      <div className={styles.partnersGrid} ref={gridRef}>
        {founders.map((founder, idx) => (
          <div
            key={idx}
            className={styles.partnerCard}
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>{founder.icon}</div>
              <div className={styles.headerInfo}>
                <h3>{founder.name}</h3>
                <span className={styles.role}>{founder.role}</span>
              </div>
            </div>
            <p className={styles.description}>{founder.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
