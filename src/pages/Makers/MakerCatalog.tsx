import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { MakerPreviewDTO } from "../../services/makerService";
import { makerService } from "../../services/makerService";
import { MakerCard } from "./components/MakerCard";
import styles from "./MakerCatalog.module.css";

const MakerCatalog: React.FC = () => {
  const [makers, setMakers] = useState<MakerPreviewDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMakers = async () => {
      try {
        const data = await makerService.getMakers();
        setMakers(data);
      } catch (error) {
        console.error("Failed to fetch makers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakers();
  }, []);

  return (
    <div className={styles.catalog}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Nossos Makers
        </motion.h1>
        <p>Conheça os especialistas por trás das criações.</p>
      </header>

      {loading ? (
        <div className={styles.loading}>Carregando makers...</div>
      ) : (
        <div className={styles.grid}>
          {makers.map((maker) => (
            <MakerCard
              key={maker.id}
              maker={maker}
              onClick={() => navigate(`/makers/${maker.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MakerCatalog;
