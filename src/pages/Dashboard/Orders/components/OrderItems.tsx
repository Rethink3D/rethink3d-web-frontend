import React from "react";
import { Package, FileText } from "lucide-react";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { formatProductionTime } from "../utils/orderTimelineBuilder";
import styles from "../OrderDetails.module.css";

import type { QuotationItemDTO } from "../../../../types/dtos";

interface OrderItemsProps {
  products: {
    product: {
      id: string;
      name: string;
      imageUrl: string;
      makerName?: string;
    };
    quantity: number;
    price: number;
    totalValue: number;
    estimatedProductionTime: number;
  }[];
  quotationItems?: QuotationItemDTO[];
}

export const OrderItems: React.FC<OrderItemsProps> = ({
  products,
  quotationItems,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <Package size={20} />
        <h2>Itens do Pedido</h2>
      </div>
      <div className={styles.itemsList}>
        {products.map((item, index) => (
          <div key={index} className={styles.itemCard}>
            <div className={styles.itemImage}>
              <img src={item.product.imageUrl} alt={item.product.name} />
            </div>
            <div className={styles.itemInfo}>
              <h3>{item.product.name}</h3>
              <div className={styles.itemMeta}>
                <span>Qtd: {item.quantity}</span>
                <span className={styles.dot}>•</span>
                <span>
                  {formatProductionTime(item.estimatedProductionTime)}
                </span>
                <span className={styles.dot}>•</span>
                <span>Valor unit: {formatCurrency(item.price)}</span>
              </div>
            </div>
            <div className={styles.itemPrice}>
              {formatCurrency(item.totalValue)}
            </div>
          </div>
        ))}

        {quotationItems?.map((item, index) => (
          <div key={index} className={styles.itemCard}>
            <div className={styles.itemIcon}>
              <FileText size={24} />
            </div>
            <div className={styles.itemInfo}>
              <h3>{item.description}</h3>
              <div className={styles.itemMeta}>
                <span>Qtd: {item.quantity}</span>
                <span className={styles.dot}>•</span>
                <span>
                  {formatProductionTime(item.estimatedProductionTime)}
                </span>
              </div>
            </div>
            <div className={styles.itemPrice}>{formatCurrency(item.price)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
