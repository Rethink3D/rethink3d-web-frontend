import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Rocket, Award } from "lucide-react";
import styles from "./AboutSection.module.css";

export const AboutSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>
            Nossa Proposta, <br />
            <span className={styles.highlight}>Nossa História.</span>
          </h2>

          <div className={styles.textBlock}>
            <div className={styles.blockTitle}>
              <MapPin size={24} className="text-blue-400" />
              Origem e Fundação
            </div>
            <p className={styles.blockText}>
              A Rethink3D nasceu no Maranhão, idealizada por Rafael Ferreira,
              engenheiro e professor do IFMA. Nascemos com a missão de
              democratizar a manufatura aditiva no Brasil.
            </p>
          </div>

          <div className={styles.textBlock}>
            <div className={styles.blockTitle}>
              <Users size={24} className="text-green-400" />
              Modelo de Negócio
            </div>
            <p className={styles.blockText}>
              Operamos como um marketplace que une pessoas que precisam de peças
              impressas a "Makers" que possuem as impressoras. Facilitamos o
              acesso à tecnologia sem a necessidade de comprar equipamentos
              caros.
            </p>
          </div>

          <div className={styles.textBlock}>
            <div className={styles.blockTitle}>
              <Rocket size={24} className="text-purple-400" />
              Crescimento e Apoio
            </div>
            <p className={styles.blockText}>
              Impulsionados pelo apoio do Sebrae e Fapema, nos consolidamos como
              um destaque na 22ª Semana Nacional de Ciência e Tecnologia (SNCT)
              em outubro de 2025. Somos um case de inovação local com expansão
              nacional.
            </p>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.decoration} />

          <div className={styles.imageGrid}>
            <div className={styles.gridItem}>
              <div className="text-center">
                <div className={styles.statNumber}>2025</div>
                <div className={styles.statLabel}>Destaque SNCT</div>
                <Award size={32} className="mx-auto mt-2 text-yellow-500" />
              </div>
            </div>

            <div
              className={styles.gridItem}
              style={{
                background:
                  "linear-gradient(to br, var(--color-surface), rgba(var(--color-primary-rgb), 0.2))",
              }}
            >
              <div className="text-center">
                <div
                  className={styles.statNumber}
                  style={{ fontSize: "2.5rem" }}
                >
                  São Luís
                </div>
                <div className={styles.statLabel}>Maranhão</div>
              </div>
            </div>

            <div
              className={styles.gridItem}
              style={{
                background:
                  "linear-gradient(to br, var(--color-surface), rgba(var(--color-secondary-rgb), 0.2))",
              }}
            >
              <div className="text-center">
                <div className={styles.statNumber}>BR</div>
                <div className={styles.statLabel}>Alcance Nacional</div>
              </div>
            </div>

            <div className={styles.gridItem}>
              <div className="text-center p-4">
                <span className={styles.statLabel}>Apoiado por</span>
                <div className="flex gap-2 justify-center mt-2 font-bold text-xl opacity-80">
                  SEBRAE / FAPEMA
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
