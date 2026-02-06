import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import type { MakerPreviewDTO } from "../../../services/makerService";
import { getImageUrl } from "../../../utils/imageUtil";
import { translateService } from "../../../utils/translationUtil";
import styles from "./MakerCard.module.css";

interface MakerCardProps {
  maker: MakerPreviewDTO;
  onClick?: () => void;
}

export const MakerCard: React.FC<MakerCardProps> = ({ maker, onClick }) => {
  return (
    <Card className={styles.makerCard} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(maker.imageUrl)}
          alt={maker.name}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3>{maker.name}</h3>
        <div className={styles.rating}>
          {}
          <span>
            {(maker.service || maker.services || ["Maker"])
              .toString()
              .split(",")
              .map((s) => translateService(s))
              .join(", ")}
          </span>
        </div>
        <Button variant="outline" fullWidth className="mt-4">
          Ver Perfil
        </Button>
      </div>
    </Card>
  );
};
