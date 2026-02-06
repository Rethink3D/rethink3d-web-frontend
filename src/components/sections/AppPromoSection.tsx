import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Store,
  Send,
  BarChart3,
  PenTool,
} from "lucide-react";
import styles from "./AppPromoSection.module.css";

type Tab = "client" | "maker";

const ScreenshotCarousel: React.FC<{ activeTab: Tab }> = ({ activeTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const screenshots = {
    client: [
      "/images/AppClient1.webp",
      "/images/AppClient2.webp",
      "/images/AppClient3.webp",
    ],
    maker: [
      "/images/AppMaker1.webp",
      "/images/AppMaker2.webp",
      "/images/AppMaker3.webp",
    ],
  };

  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef);

  const currentImages = screenshots[activeTab];

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImages.length, isInView]);

  return (
    <>
      <div ref={carouselRef} className={styles.screenshotContainer}>
        <AnimatePresence mode="wait">
          <motion.img
            key={`${activeTab}-${currentIndex}`}
            src={currentImages[currentIndex]}
            alt={`${activeTab} screenshot ${currentIndex + 1}`}
            className={styles.screenshot}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      <div className={styles.dotsContainer}>
        {currentImages.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to screenshot ${index + 1}`}
          />
        ))}
      </div>

      <div style={{ display: "none" }}>
        {[...screenshots.client, ...screenshots.maker].map((src) => (
          <img key={src} src={src} alt="preload" />
        ))}
      </div>
    </>
  );
};

export const AppPromoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("client");

  const benefits = {
    client: [
      {
        id: "security",
        icon: <ShieldCheck size={36} />,
        title: "Segurança Garantida",
        desc: "Plataforma segura para negociar e comprar produtos sob medida sem preocupações.",
      },
      {
        id: "custom",
        icon: <PenTool size={36} />,
        title: "Personalização Total",
        desc: "Solicite impressões do zero, envie seus arquivos ou peça orçamentos específicos.",
      },
      {
        id: "tracking",
        icon: <Truck size={36} />,
        title: "Acompanhamento em Tempo Real",
        desc: "Do pagamento até a entrega, saiba exatamente onde está seu pedido.",
      },
    ],
    maker: [
      {
        id: "showcase",
        icon: <Store size={36} />,
        title: "Sua Vitrine Digital",
        desc: "Exiba seu portfólio, ofereça serviços de modelagem e impressão para milhares de clientes.",
      },
      {
        id: "proposals",
        icon: <Send size={36} />,
        title: "Propostas e Visibilidade",
        desc: "Responda a solicitações de clientes e ganhe destaque pela qualidade do seu trabalho.",
      },
      {
        id: "management",
        icon: <BarChart3 size={36} />,
        title: "Gestão Completa",
        desc: "Ferramentas integradas para gerenciar pedidos, vendas e pagamentos em um só lugar.",
      },
    ],
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>A Revolução 3D no seu Bolso</h2>
          <p>
            Baixe o App Rethink3D e tenha o poder da manufatura aditiva na palma
            da sua mão.
          </p>
        </div>

        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggleBtn} ${
              activeTab === "client" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("client")}
          >
            Para Clientes
          </button>
          <button
            className={`${styles.toggleBtn} ${
              activeTab === "maker" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("maker")}
          >
            Para Makers
          </button>

          <motion.div
            className={styles.activePill}
            layout
            initial={false}
            animate={{
              left: activeTab === "client" ? "0.35rem" : "50%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              width: "calc(50% - 0.35rem)",
              top: "0.35rem",
              bottom: "0.35rem",
              position: "absolute",
            }}
          />
        </div>

        <div className={styles.contentRow}>
          <div className={styles.infoSide}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={styles.benefitsList}
              >
                {benefits[activeTab].map((item) => (
                  <div key={item.id} className={styles.benefitItem}>
                    <div className={styles.iconBox}>{item.icon}</div>
                    <div className={styles.text}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.visualSide}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={styles.mockPhone}
              >
                <ScreenshotCarousel activeTab={activeTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
