import React from "react";
import { User, MapPin } from "lucide-react";
import styles from "../OrderDetails.module.css";

interface ClientCardProps {
  user: {
    name: string;
    imageUrl: string;
    address: {
      city: string;
      state: string;
    };
  };
}

export const ClientCard: React.FC<ClientCardProps> = ({ user }) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <User size={20} />
        <h2>Cliente</h2>
      </div>
      <div className={styles.userCard}>
        <img src={user.imageUrl} alt={user.name} />
        <div className={styles.userInfo}>
          <h3>{user.name}</h3>
          <div className={styles.userLocation}>
            <MapPin size={14} />
            <span>
              {user.address.city}, {user.address.state}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
