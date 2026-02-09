import React from "react";
import { useMakerData } from "../../../hooks/useMakerData";
import { getImageUrl } from "../../../utils/imageUtil";
import { translateService } from "../../../utils/translationUtil";
import { Store, Hammer, Tag, Info, Calendar, AlertCircle } from "lucide-react";
import styles from "./Store.module.css";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";

const DashboardStore: React.FC = () => {
  const { maker, loading, error } = useMakerData();

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <PrinterLoader />
        <p>Carregando dados da sua loja...</p>
      </div>
    );
  }

  if (error || !maker) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle size={48} color="#ff4d4d" />
        <h2>Ops!</h2>
        <p>{error || "Informações não encontradas."}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Store size={32} />
          <div>
            <h1>Minha Loja</h1>
            <p>Gerencie a identidade e informações do seu perfil maker.</p>
          </div>
        </div>
        <div
          className={`${styles.statusBadge} ${styles.desktopOnly} ${styles[maker.status.toLowerCase()]}`}
        >
          {maker.status === "ACTIVE" ? "Loja Aberta" : "Loja Pausada"}
        </div>
      </header>

      <div className={styles.noticeBanner}>
        <AlertCircle size={20} />
        <p>
          <strong>Edição em breve:</strong> Por enquanto, ajustes no perfil
          estão disponíveis apenas no <strong>App Rethink3D</strong>. Em breve
          você poderá editar tudo diretamente por aqui!
        </p>
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderTitle}>
              <Info size={20} />
              <h2>Perfil da Loja</h2>
            </div>
            <div
              className={`${styles.statusBadge} ${styles.mobileOnly} ${styles[maker.status.toLowerCase()]}`}
            >
              {maker.status === "ACTIVE" ? "Aberta" : "Pausada"}
            </div>
          </div>
          <div className={styles.profileSection}>
            <div className={styles.avatarWrapper}>
              <img
                src={getImageUrl(maker.imageUrl || "")}
                alt={maker.name}
                className={styles.avatar}
              />
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <label>Nome da Loja</label>
                <p>{maker.name}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Membro desde</label>
                <div className={styles.withIcon}>
                  <Calendar size={14} />
                  <p>{maker.creationTime}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.descriptionSection}>
            <label>Biografia / Descrição</label>
            <p className={styles.bioText}>{maker.description}</p>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderTitle}>
              <Hammer size={20} />
              <h2>Serviços e Especialidades</h2>
            </div>
          </div>
          <div className={styles.serviceSection}>
            <div className={styles.infoItem}>
              <label>Tipo de Serviço Principal</label>
              <div className={styles.serviceTag}>
                <Hammer size={16} />
                <span>{translateService(maker.service || "")}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <label>Especialidades</label>
              <div className={styles.tagCloud}>
                {maker.categories?.map((cat) => (
                  <span key={cat} className={styles.tag}>
                    <Tag size={12} />
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardStore;
