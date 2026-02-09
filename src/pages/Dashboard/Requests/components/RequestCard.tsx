import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Tag, Layers, Calendar } from "lucide-react";
import type { CustomRequestDTO } from "../../../../types/dtos";
import { getImageUrl } from "../../../../utils/imageUtil";
import { parseBackendDate } from "../../../../utils/dateUtil";
import styles from "./RequestCard.module.css";

interface RequestCardProps {
  request: CustomRequestDTO;
}

export const RequestCard: React.FC<RequestCardProps> = React.memo(
  ({ request }) => {
    const navigate = useNavigate();
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

    const getFormattedDate = (dateString: string | undefined | null) => {
      const date = parseBackendDate(dateString);

      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    };

    const formattedDate = getFormattedDate(request.creationTime);

    const handleDetails = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate(`/dashboard/requests/${request.id}`);
    };

    return (
      <div
        className={styles.requestCard}
        onClick={() => navigate(`/dashboard/requests/${request.id}`)}
      >
        <div className={styles.imageWrapper}>
          <img
            src={getImageUrl(request.imageUrl)}
            alt={request.title}
            className={styles.requestImage}
            loading="lazy"
          />
        </div>

        <div className={styles.requestContent}>
          <div className={styles.cardHeader}>
            <div className={styles.idGroup}>
              <span className={styles.requestId}>
                # {request.id.split("-")[0]}
              </span>
            </div>
            <div className={styles.dateGroup}>
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className={styles.mainInfo}>
            <div className={styles.titleRow}>
              <h3>
                {request.title.length > 45
                  ? `${request.title.substring(0, 42)}...`
                  : request.title}
              </h3>
              <div className={styles.serviceBadge}>
                {request.service === "printing"
                  ? "Impressão"
                  : "Modelagem & Impressão"}
              </div>
            </div>
            <p className={styles.description}>{request.description}</p>
            <div
              className={styles.categoriesWrapper}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(e);
              }}
            >
              <div className={styles.categories} ref={scrollRef}>
                {request.categories?.map((cat) => (
                  <span key={cat.id} className={styles.categoryBadge}>
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <Layers size={14} />
                <span>{request.quantity} un.</span>
              </div>
              {request.material && (
                <div className={styles.detailItem}>
                  <Tag size={14} />
                  <span>{request.material}</span>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <button className={styles.detailsBtn} onClick={handleDetails}>
                Ver Detalhes
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
