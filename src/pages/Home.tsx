import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { InfiniteMarquee } from "../components/ui/InfiniteMarquee";
import { productService } from "../services/productService";
import { makerService } from "../services/makerService";
import { getImageUrl } from "../utils/imageUtil";
import { translateService } from "../utils/translationUtil";
import { PrinterViewer } from "../components/ui/PrinterViewer";
import { AppPromoSection } from "../components/sections/AppPromoSection";
import { HowItWorksSection } from "../components/sections/HowItWorksSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { FAQSection } from "../components/sections/FAQSection";
import { EventsSection } from "../components/sections/EventsSection";
import { AboutSection } from "../components/sections/AboutSection";
import { MakerCTASection } from "../components/sections/MakerCTASection";
import type { ProductPreviewDTO } from "../types/dtos";
import type { MakerPreviewDTO } from "../types/dtos";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductPreviewDTO[]>([]);
  const [makers, setMakers] = useState<MakerPreviewDTO[]>([]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, makerData] = await Promise.all([
          productService.getProducts(),
          makerService.getMakers(),
        ]);
        setProducts(shuffleArray(prodData).slice(0, 8));
        setMakers(shuffleArray(makerData).slice(0, 8));
      } catch (error) {
        console.error("Failed to load marquee data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                IMAGINE. <br /> CREATE.{" "}
                <span className={styles.highlight}>PRINT.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Conectamos você aos melhores Makers e produtos impressos em 3D.
              </motion.p>
              <motion.div
                className={styles.heroActions}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <div className={styles.ctaGroup}>
                  <Button size="lg" onClick={() => navigate("/products")}>
                    Explorar Catálogo{" "}
                    <ArrowRight size={20} style={{ marginLeft: "12px" }} />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/makers")}
                  >
                    Encontrar Makers{" "}
                    <Users size={20} style={{ marginLeft: "12px" }} />
                  </Button>
                </div>

                <div className={styles.storeButtons}>
                  <a href="#" className={styles.storeBtn}>
                    <svg
                      viewBox="0 0 384 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 79.9c5.2 14.7 13.7 34.3 27 50.8 28.5 35.5 53.7 41.6 74.3 41 21.6-.6 30.1-14.7 64-14.7 33.7 0 42.1 14.7 64.3 15.3 24.3.7 49-21.4 72-51.5 5.5-7.2 10.9-15.3 16-24.3-51.2-18.9-63-71-63.3-101.3zM232.8 77.5c20.1-25.1 35.5-56.3 30.1-91.1-23.8 2.3-52.1 15-68.9 40.5-13.8 20.9-23 57.5-17.6 86.8 24.1 3.5 45.4-15 56.4-36.2z" />
                    </svg>
                    <div className={styles.storeText}>
                      <span>Baixe na</span>
                      <span>App Store</span>
                    </div>
                  </a>

                  <a href="#" className={styles.storeBtn}>
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                    </svg>
                    <div className={styles.storeText}>
                      <span>Disponível na</span>
                      <span>Google Play</span>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div
              className={styles.heroVisual}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <PrinterViewer />
            </motion.div>
          </div>
        </div>

        <motion.div
          className={styles.marqueeSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <InfiniteMarquee speed={40} direction="left" className="mb-8">
            {products.map((p) => (
              <div
                key={p.id}
                className={styles.miniCard}
                onClick={() => navigate(`/products/${p.id}`)}
              >
                <img src={getImageUrl(p.imageUrl)} alt={p.name} />
                <div className={styles.miniCardInfo}>
                  <strong>{p.name}</strong>
                  <span>R$ {p.price}</span>
                </div>
              </div>
            ))}
          </InfiniteMarquee>
          <div style={{ height: "2rem" }} />
          <InfiniteMarquee speed={50} direction="right">
            {makers.map((m) => (
              <div
                key={m.id}
                className={styles.miniCard}
                onClick={() => navigate(`/makers/${m.id}`)}
              >
                <img src={getImageUrl(m.imageUrl)} alt={m.name} />
                <div className={styles.miniCardInfo}>
                  <strong>{m.name}</strong>
                  <span>
                    {translateService(
                      (m.service || m.categories?.[0] || ["Maker"])
                        .toString()
                        .split(",")[0],
                    )}
                  </span>
                </div>
              </div>
            ))}
          </InfiniteMarquee>
        </motion.div>
      </section>

      <HowItWorksSection />

      <AppPromoSection />

      <MakerCTASection />

      <TestimonialsSection />

      <FAQSection />

      <EventsSection />

      <AboutSection />

      <motion.section
        className={styles.cta}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(var(--color-surface-rgb), 0.7)",
        }}
      >
        <div className={styles.ctaContent}>
          <h2>Democratizando o acesso à impressão 3D</h2>
          <p>
            Seja você um maker ou um cliente procurando soluções, a Rethink3D é
            o seu lugar.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/contact")}
          >
            Entre em Contato
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
