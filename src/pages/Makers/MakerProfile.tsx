import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Hammer } from "lucide-react";
import type { MakerPageDTO, MakerProductDTO } from "../../types/dtos";
import { makerService } from "../../services/makerService";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { getImageUrl } from "../../utils/imageUtil";
import { translateService } from "../../utils/translationUtil";
import styles from "./MakerProfile.module.css";

const MakerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [maker, setMaker] = useState<MakerPageDTO | null>(null);
  const [loading, setLoading] = useState(true);

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
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <span className="mt-4 text-gray-500">Carregando perfil...</span>
        </div>
      </div>
    );
  if (!maker) return <div className={styles.error}>Maker não encontrado</div>;

  const displayCategories = maker.categories?.length ? maker.categories : [];

  return (
    <div className={styles.container}>
      <Button
        variant="text"
        onClick={() => navigate("/makers")}
        className="mb-8 hover:text-primary transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Voltar para Makers
      </Button>

      <div className={styles.profileHeader}>
        <div className={styles.cover}></div>
        <div className={styles.profileInfo}>
          <div className={styles.avatarWrapper}>
            <img
              src={getImageUrl(maker.imageUrl || "")}
              alt={maker.name || "Maker"}
              className={styles.avatar}
            />
          </div>
          <div className={styles.infoContent}>
            <h1>{maker.name}</h1>

            <div className={styles.badges}>
              {maker.service && (
                <div className={styles.badge} title="Tipo de Serviço">
                  <Hammer size={14} />
                  <span>{translateService(maker.service)}</span>
                </div>
              )}
              {maker.creationTime && (
                <div className={styles.badge} title="Membro desde">
                  <Calendar size={14} />
                  <span>
                    Membro desde {new Date(maker.creationTime).getFullYear()}
                  </span>
                </div>
              )}
            </div>

            <p className={styles.bio}>{maker.description}</p>

            <div className={styles.services}>
              {displayCategories.map((s) => (
                <span key={s} className={styles.tag}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Portfólio / Produtos</h2>
        <div className={styles.productsGrid}>
          {maker.products && maker.products.length > 0 ? (
            maker.products.map((prod: MakerProductDTO) => (
              <Card
                key={prod.id}
                className={styles.miniProductCard}
                onClick={() => navigate(`/products/${prod.id}`)}
              >
                <img src={getImageUrl(prod.imageUrl)} alt={prod.name} />
                <div className={styles.productInfo}>
                  <h4>{prod.name}</h4>
                  <span className={styles.price}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(prod.price)}
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>Este Maker ainda não possui produtos cadastrados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakerProfile;
