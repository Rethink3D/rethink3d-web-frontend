import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Hammer,
  Package,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type {
  MakerPageDTO,
  MakerProductDTO,
  ProductPreviewDTO,
} from "../../types/dtos";
import { makerService } from "../../services/makerService";
import { Button } from "../../components/ui/Button";
import { ProductGrid } from "./components/ProductGrid";
import { getImageUrl } from "../../utils/imageUtil";
import { translateService } from "../../utils/translationUtil";
import styles from "./MakerProfile.module.css";

const MakerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [maker, setMaker] = useState<MakerPageDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBioExpanded, setIsBioExpanded] = useState(true);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchMaker = async () => {
        try {
          const data = await makerService.getMakerById(id);
          setMaker(data);
        } catch (error) {
          console.error("Failed to fetch maker", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMaker();
    }
  }, [id]);

  if (loading)
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <span className={styles.loadingText}>Carregando perfil...</span>
      </div>
    );

  if (!maker) {
    return (
      <div className={styles.error}>
        <h2>Maker não encontrado</h2>
        <Button onClick={() => navigate("/makers")} className="mt-4">
          Voltar para Makers
        </Button>
      </div>
    );
  }

  const makerPreviewProducts: ProductPreviewDTO[] = (maker.products || []).map(
    (p: MakerProductDTO) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      imageUrl: p.imageUrl,
      description: "",
      maker: maker.name || "",
      makerId: String(maker.id),
      rating: 0,
      isPersonalizable: false,
      isActive: true,
      categories: [],
    }),
  );

  return (
    <div className={styles.container}>
      <Button
        variant="text"
        onClick={() => navigate("/makers")}
        className={styles.backButton}
      >
        <ArrowLeft size={20} className="mr-2" /> Voltar para Makers
      </Button>

      <div className={styles.profileContent}>
        {}
        <div className={styles.mainInfo}>
          <div className={styles.avatarWrapper}>
            <img
              src={getImageUrl(maker.imageUrl || "")}
              alt={maker.name || "Maker"}
              className={styles.avatar}
            />
          </div>

          <div className={styles.headerText}>
            <h1>{maker.name}</h1>
            <div className={styles.badges}>
              {maker.service && (
                <div className={styles.badge} title="Tipo de Serviço">
                  <Hammer size={16} />
                  <span>{translateService(maker.service)}</span>
                </div>
              )}
              <div className={styles.badge} title="Total de Produtos">
                <Package size={16} />
                <span>{(maker.products || []).length} Produtos</span>
              </div>
              {maker.creationTime && (
                <div className={styles.badge} title="Membro desde">
                  <Calendar size={16} />
                  <span>
                    Desde {new Date(maker.creationTime).getFullYear()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.detailsGrid}>
          {}
          <div className={styles.bioSection}>
            <button
              className={styles.sectionHeaderToggle}
              onClick={() => setIsBioExpanded(!isBioExpanded)}
            >
              <h3>Sobre o Maker</h3>
              {isBioExpanded ? (
                <ChevronUp size={20} className={styles.chevron} />
              ) : (
                <ChevronDown size={20} className={styles.chevron} />
              )}
            </button>
            <div
              className={`${styles.expandableContent} ${
                isBioExpanded ? styles.expanded : ""
              }`}
            >
              <p className={styles.bio}>{maker.description}</p>
            </div>
          </div>

          {}
          <aside className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <h3>Gostou do trabalho?</h3>
              <p>
                Encomende produtos personalizados ou solicite orçamentos
                diretamente pelo nosso aplicativo.
              </p>
              <Button
                fullWidth
                size="lg"
                onClick={() => {
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={styles.ctaButton}
              >
                <MessageCircle size={20} /> Solicitar Orçamento
              </Button>
            </div>
          </aside>

          {}
          {maker.categories && maker.categories.length > 0 && (
            <div className={styles.categoriesSection}>
              <button
                className={styles.sectionHeaderToggle}
                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
              >
                <h3>Especialidades</h3>
                {isCategoriesExpanded ? (
                  <ChevronUp size={20} className={styles.chevron} />
                ) : (
                  <ChevronDown size={20} className={styles.chevron} />
                )}
              </button>
              <div
                className={`${styles.expandableContent} ${
                  isCategoriesExpanded ? styles.expanded : ""
                }`}
              >
                <div className={styles.tags}>
                  {maker.categories.map((cat) => (
                    <span key={cat} className={styles.tag}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {}
      <div className={styles.portfolioSection}>
        {makerPreviewProducts.length > 0 ? (
          <ProductGrid
            title="Portfólio / Produtos"
            products={makerPreviewProducts}
          />
        ) : (
          <div className={styles.emptyPortfolio}>
            <Package size={48} />
            <p>Este Maker ainda não possui produtos cadastrados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakerProfile;
