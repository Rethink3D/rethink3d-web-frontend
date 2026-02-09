import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Package,
  FileText,
  AlertTriangle,
  Smartphone,
  Download,
  Link as LinkIcon,
  Box,
  Layers,
  Settings,
  User,
} from "lucide-react";
import { useCustomRequestDetails } from "../../../hooks/useCustomRequestDetails";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";
import { getImageUrl } from "../../../utils/imageUtil";
import styles from "./RequestDetails.module.css";

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { request, loading, error } = useCustomRequestDetails(id);

  const handleDownloadAll = () => {
    if (!request?.projectFiles) return;

    request.projectFiles.forEach((file, index) => {
      
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = file.fileUrl;
        link.download = file.fileName;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 300);
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <PrinterLoader />
        <p>Carregando informações da solicitação...</p>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className={styles.errorContainer}>
        <AlertTriangle size={48} color="#ef4444" />
        <h2>Ops!</h2>
        <p>{error || "Solicitação não encontrada"}</p>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Voltar para Lista
        </button>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(request.creationTime));

  return (
    <div className={styles.container}>
      <button
        className={styles.backLink}
        onClick={() => navigate("/dashboard/requests")}
      >
        <ArrowLeft size={18} />
        Voltar para Lista
      </button>

      <div className={styles.appNotice}>
        <div className={styles.noticeIcon}>
          <Smartphone size={24} />
        </div>
        <div className={styles.noticeContent}>
          <h4>Ação Necessária via Aplicativo</h4>
          <p>
            Para garantir a segurança, <strong>todas as propostas</strong> e a
            gestão oficial deste projeto devem ser realizadas exclusivamente
            através do aplicativo <strong>Rethink3D</strong> no seu celular.
          </p>
        </div>
      </div>

      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.idBadge}>
            SOLICITAÇÃO #{request.id.split("-")[0]}
          </div>
          <h1>{request.title}</h1>
          <p className={styles.creationTime}>Publicado em {formattedDate}</p>
        </div>

        <div className={`${styles.statusSection} ${styles[request.status]}`}>
          <Box size={18} />
          <span>
            {request.status === "open"
              ? "Aberta"
              : request.status === "accepted"
                ? "Aceita"
                : "Cancelada"}
          </span>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <FileText size={20} />
              <h2>Descrição do Projeto</h2>
            </div>
            <p className={styles.description}>{request.description}</p>

            {(!request.images || request.images.length === 0) && (
              <div className={styles.compactMeta}>
                <div className={styles.compactItem}>
                  <span className={styles.compactLabel}>Solicitante</span>
                  <div className={styles.compactValue}>
                    <img
                      src={getImageUrl(request.user.imageUrl)}
                      alt={request.user.name}
                      className={styles.compactUserImg}
                    />
                    <span>{request.user.name}</span>
                  </div>
                </div>
                <div className={styles.compactItem}>
                  <span className={styles.compactLabel}>Publicado em</span>
                  <div className={styles.compactValue}>
                    <Calendar size={16} />
                    <span>
                      {new Date(request.creationTime).toLocaleDateString(
                        "pt-BR",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {request.images && request.images.length > 0 && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <Package size={20} />
                <h2>Galeria de Referência</h2>
              </div>
              <div className={styles.gallery}>
                {request.images.map((img, index) => (
                  <div key={index} className={styles.galleryImage}>
                    <img
                      src={getImageUrl(img)}
                      alt={`Referência ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {request.projectFiles && request.projectFiles.length > 0 && (
            <section className={styles.section}>
              <div
                className={styles.sectionHeader}
                style={{ justifyContent: "space-between" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <Layers size={20} />
                  <h2>Arquivos do Projeto</h2>
                </div>
                {request.projectFiles.length > 1 && (
                  <button
                    className={styles.downloadAllBtn}
                    onClick={handleDownloadAll}
                  >
                    <Download size={14} />
                    <span>Baixar Todos</span>
                  </button>
                )}
              </div>
              <div className={styles.filesList}>
                {request.projectFiles.map((file, index) => (
                  <div key={index} className={styles.fileItem}>
                    <div className={styles.fileInfo}>
                      <FileText size={20} />
                      <span>{file.fileName}</span>
                    </div>
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.downloadLink}
                    >
                      <Download size={14} />
                      Baixar
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {request.projectLink && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <LinkIcon size={20} />
                <h2>Link Externo</h2>
              </div>
              <div className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <LinkIcon size={20} />
                  <span>Referência Externa</span>
                </div>
                <a
                  href={request.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadLink}
                >
                  Acessar Link
                </a>
              </div>
            </section>
          )}
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Settings size={20} />
              <h2>Configurações</h2>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Serviço Solicitado</span>
                <span className={styles.detailValue}>
                  {request.service === "printing"
                    ? "Apenas Impressão"
                    : "Modelagem & Impressão"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Quantidade</span>
                <span className={styles.detailValue}>
                  {request.quantity} unidades
                </span>
              </div>
              {request.materials && request.materials.length > 0 && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    Materiais Preferenciais
                  </span>
                  <div className={styles.categoriesList}>
                    {request.materials.map((mat) => (
                      <span key={mat} className={styles.categoryTag}>
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {request.categories && request.categories.length > 0 && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Categorias</span>
                  <div className={styles.categoriesList}>
                    {request.categories.map((cat) => (
                      <span key={cat.id} className={styles.categoryTag}>
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {request.images && request.images.length > 0 && (
            <>
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <User size={20} />
                  <h2>Solicitante</h2>
                </div>
                <div className={styles.userCard}>
                  <img
                    src={getImageUrl(request.user.imageUrl)}
                    alt={request.user.name}
                  />
                  <div className={styles.userInfo}>
                    <h3>{request.user.name}</h3>
                    <p>Solicitante</p>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <Calendar size={20} />
                  <h2>Data da Solicitação</h2>
                </div>
                <div className={styles.detailValue}>
                  <Calendar size={18} />
                  {new Date(request.creationTime).toLocaleDateString("pt-BR")}
                </div>
              </section>
            </>
          )}

          {request.maker && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <Package size={20} />
                <h2>Maker Atribuído</h2>
              </div>
              <div className={styles.userCard}>
                <img
                  src={getImageUrl(request.maker.imageUrl)}
                  alt={request.maker.name}
                />
                <div className={styles.userInfo}>
                  <h3>{request.maker.name}</h3>
                  <p>Responsável pelo projeto</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
