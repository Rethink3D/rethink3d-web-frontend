import React, { useState } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import {
  TimelineEventStatus,
  type TimelineEvent,
} from "../utils/orderTimelineBuilder";
import styles from "../OrderDetails.module.css";

interface OrderHistoryProps {
  events: TimelineEvent[];
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ events }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const showToggleButton = events.length > 2;
  const displayedEvents =
    isExpanded || !showToggleButton
      ? events
      : [events[0], events[events.length - 1]];

  return (
    <section className={styles.section}>
      <div
        className={styles.sectionHeader}
        style={{ justifyContent: "space-between", width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Clock size={20} />
          <h2>Histórico</h2>
        </div>
        {showToggleButton && (
          <button
            className={styles.toggleButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <span>Mostrar menos</span> <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span>Ver tudo</span> <ChevronDown size={16} />
              </>
            )}
          </button>
        )}
      </div>
      <div className={styles.historyTimeline}>
        {displayedEvents.map((entry, index) => (
          <div key={index} className={styles.timelineEntry}>
            <div
              className={styles.timelineDot}
              style={{
                backgroundColor:
                  entry.status === TimelineEventStatus.Current
                    ? "#ffa500"
                    : entry.circleColor || "#22c55e",
              }}
            />
            <div className={styles.timelineContent}>
              <div className={styles.timelineHeader}>
                <div className={styles.timelineStatus}>{entry.title}</div>
                <div className={styles.timelineTime}>{entry.time}</div>
              </div>
              <p className={styles.timelineDescription}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
