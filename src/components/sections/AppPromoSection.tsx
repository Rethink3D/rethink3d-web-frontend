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
import {
  trackAppStoreClick,
  trackGooglePlayClick,
} from "../../utils/analytics";
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

            <div className={styles.storeButtons}>
              <a
                href="https://apps.apple.com/app/rethink3d/id6755210305"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.storeBtn}
                onClick={() => trackAppStoreClick("app_promo_section")}
              >
                <svg
                  viewBox="0 0 384 512"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "4px" }}
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 79.9c5.2 14.7 13.7 34.3 27 50.8 28.5 35.5 53.7 41.6 74.3 41 21.6-.6 30.1-14.7 64-14.7 33.7 0 42.1 14.7 64.3 15.3 24.3.7 49-21.4 72-51.5 5.5-7.2 10.9-15.3 16-24.3-51.2-18.9-63-71-63.3-101.3zM232.8 77.5c20.1-25.1 35.5-56.3 30.1-91.1-23.8 2.3-52.1 15-68.9 40.5-13.8 20.9-23 57.5-17.6 86.8 24.1 3.5 45.4-15 56.4-36.2z" />
                </svg>
                <div className={styles.storeText}>
                  <span>Baixe na</span>
                  <span>App Store</span>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.rethink3d.rethink3dfrontend"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.storeBtn}
                onClick={() => trackGooglePlayClick("app_promo_section")}
              >
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div className={styles.storeText}>
                  <span>Disponível na</span>
                  <span>Google Play</span>
                </div>
              </a>
            </div>
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
