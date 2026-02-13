import { useRef } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import type { MakerPreviewDTO } from "../../../types/dtos";
import { getImageUrl } from "../../../utils/imageUtil";
import styles from "./MakerCard.module.css";

interface MakerCardProps {
  maker: MakerPreviewDTO;
  onClick?: () => void;
}

const getServiceLabel = (service: string) => {
  const serviceMap: Record<string, string> = {
    PRINT: "Impressão",
    MODEL: "Modelagem",
    PRINT_AND_MODEL: "Impressão e Modelagem",
    printing: "Impressão",
    "printing modeling": "Impressão e Modelagem",
    printing_modeling: "Impressão e Modelagem",
    "priting modeling": "Impressão e Modelagem",
  };

  const normalizedService = service?.toLowerCase().trim();

  return (
    serviceMap[service] ||
    serviceMap[normalizedService] ||
    service
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  );
};

export const MakerCard: React.FC<MakerCardProps> = ({ maker, onClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;

    const startX = e.pageX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Card className={styles.makerCard}>
      <div className={styles.shine} />
      <div className={styles.imageWrapper}>
        <div className={styles.avatarContainer}>
          <div className={styles.imageRing} />
          <img
            src={getImageUrl(maker.imageUrl)}
            alt={maker.name}
            width="80"
            height="80"
            className={styles.image}
            loading="lazy"
          />
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{maker.name}</h3>

        <div className={styles.serviceTag}>
          {getServiceLabel(maker.service)}
        </div>

        {maker.description && (
          <p className={styles.description}>{maker.description}</p>
        )}

        {maker.categories && maker.categories.length > 0 && (
          <div
            className={styles.categoriesWrapper}
            onMouseDown={handleMouseDown}
          >
            <div className={styles.categories} ref={scrollRef}>
              {maker.categories.map((category) => (
                <span key={category} className={styles.categoryTag}>
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="outline"
          fullWidth
          className={styles.button}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          Ver Perfil
        </Button>
      </div>
    </Card>
  );
};
