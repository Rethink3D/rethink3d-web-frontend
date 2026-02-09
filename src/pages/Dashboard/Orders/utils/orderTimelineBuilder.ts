import type { OrderDetailsDTO, OrderStatusEnum } from "../../../../types/dtos";

export type TimelineEventStatusType = "completed" | "current" | "pending";

export const TimelineEventStatus = {
  Completed: "completed" as TimelineEventStatusType,
  Current: "current" as TimelineEventStatusType,
  Pending: "pending" as TimelineEventStatusType,
};

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  status: TimelineEventStatusType;
  circleColor?: string;
}

function findLastIndex<T>(
  arr: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
): number {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

export function getMakerTimelineEvents(
  order: OrderDetailsDTO,
): TimelineEvent[] {
  if (!order.history || order.history.length === 0) {
    return [];
  }

  const history = [...order.history]
    .filter((event) => event.status !== "awaiting_payment")
    .sort(
      (a, b) =>
        new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime(),
    );

  const wasRefundRequestedByClient = history.some(
    (e) => e.status === "refund_in_analysis",
  );

  const lastIndexOfCurrentStatus = findLastIndex(
    history,
    (e) => e.status === order.status,
  );

  const events: TimelineEvent[] = [];

  history.forEach((event, index) => {
    const time = new Date(event.eventTime).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    let title: string = "";
    let description: string = "";
    let circleColor: string | undefined;

    const isCurrent = index === lastIndexOfCurrentStatus;

    switch (event.status) {
      case "awaiting_maker":
        if (isCurrent) {
          title = "Aguardando sua confirmação";
          description = "Aceite o pedido para iniciar a produção.";
        } else {
          const nextEvent = history[index + 1];
          if (
            nextEvent?.status === "refund_in_process" ||
            nextEvent?.status === "refunded"
          ) {
            title = "Você recusou o pedido";
            description =
              "O pedido não foi iniciado e o cliente foi reembolsado.";
            circleColor = "#ef4444";
          } else {
            title = "Pedido Aceito";
            description = "Você aceitou o pedido.";
          }
        }
        break;

      case "on_going": {
        const previousEvent = index > 0 ? history[index - 1] : null;
        if (previousEvent?.status === "new_deadline") {
          title = isCurrent ? "Produção Retomada" : "Produção Continuada";
          description = isCurrent
            ? "O cliente aceitou o novo prazo e a produção continua."
            : "A produção foi retomada após o cliente aceitar o novo prazo.";
        } else {
          title = isCurrent ? "Em Produção" : "Produção Iniciada";
          description = isCurrent
            ? "O pedido está em produção."
            : "Você iniciou a produção do pedido.";
        }
        break;
      }

      case "delayed":
        title = isCurrent ? "Produção Atrasada" : "A Produção Atrasou";
        description = isCurrent
          ? "O prazo original expirou. Finalize o pedido, negocie um novo prazo ou cancele."
          : "A produção ultrapassou o prazo de entrega original.";
        circleColor = "#ef4444";
        break;

      case "new_deadline":
        if (isCurrent) {
          title = "Aguardando Resposta do Cliente";
          description =
            "Você sugeriu um novo prazo e aguarda a aprovação do cliente.";
          circleColor = "#f59e0b";
        } else {
          const nextEvent = history[index + 1];
          if (nextEvent?.status === "refund_in_process") {
            title = "Novo Prazo Recusado";
            description =
              "O cliente recusou o novo prazo e solicitou o reembolso.";
            circleColor = "#ef4444";
          } else if (nextEvent?.status === "ready") {
            title = "Novo Prazo (Superado)";
            description =
              "Você finalizou o pedido antes da resposta formal do cliente sobre o novo prazo.";
            circleColor = "#22c55e";
          } else {
            title = "Novo Prazo Aceito";
            description = "O cliente aceitou o novo prazo que você sugeriu.";
            circleColor = "#22c55e";
          }
        }
        break;

      case "ready":
        title = isCurrent ? "Aguardando Retirada" : "Produção Finalizada";
        description = isCurrent
          ? "Você marcou o pedido como pronto. O cliente foi notificado."
          : "Você finalizou a produção do pedido.";
        break;

      case "awaiting_confirmation":
        title = isCurrent
          ? "Aguardando Confirmação do Cliente"
          : "Pedido Entregue";
        description = isCurrent
          ? "Aguarde o cliente confirmar o recebimento para o pagamento ser liberado."
          : "O cliente confirmou o recebimento.";
        break;

      case "done":
        if (wasRefundRequestedByClient) {
          title = "Disputa Encerrada / Reembolso Negado";
          description =
            "A análise da disputa foi favorável a você. O pagamento foi liberado.";
          circleColor = "#22c55e";
        } else {
          title = "Pedido Finalizado";
          description = "O pedido foi concluído e o pagamento liberado.";
          circleColor = "#22c55e";
        }
        break;

      case "refund_in_analysis":
        title = isCurrent ? "Reembolso em Análise" : "Reembolso Solicitado";
        description =
          "O cliente solicitou reembolso após a entrega. Nossa equipe está analisando o caso.";
        circleColor = isCurrent ? "#f59e0b" : undefined;
        break;

      case "refund_in_process": {
        if (wasRefundRequestedByClient) {
          title = isCurrent ? "Reembolso em Processo" : "Reembolso Aprovado";
          description = "O reembolso do cliente foi aprovado por nossa equipe.";
          circleColor = isCurrent ? "#f59e0b" : "#22c55e";
        } else {
          const prevEvent = index > 0 ? history[index - 1] : null;
          if (
            prevEvent?.status === "delayed" ||
            prevEvent?.status === "new_deadline"
          ) {
            title = isCurrent
              ? "Reembolso em Processo"
              : "Reembolso Solicitado";
            description = "O cliente solicitou o reembolso do pedido.";
            circleColor = isCurrent ? "#f59e0b" : "#ef4444";
          } else {
            title = isCurrent ? "Cancelamento em Processo" : "Você Cancelou";
            const reasonText = event.reason
              ? `Motivo: ${event.reason}`
              : "O motivo não foi especificado.";
            description = `Você cancelou o pedido. ${reasonText} O cliente será reembolsado.`;
            circleColor = isCurrent ? "#f59e0b" : "#ef4444";
          }
        }
        break;
      }

      case "refunded":
        title = "Reembolso Concluído";
        description = "O valor do pedido foi estornado ao cliente.";
        circleColor = "#22c55e";
        break;

      case "partial_refund_in_process":
        title = isCurrent ? "Reembolso Parcial Aprovado" : "Disputa Resolvida";
        description =
          "A análise foi concluída com um reembolso parcial ao cliente. O saldo restante será liberado para você.";
        circleColor = "#f59e0b";
        break;

      case "partial_refund":
        title = "Finalizado Parcialmente";
        description =
          "O processo foi concluído. O saldo remanescente foi liberado na sua carteira.";
        circleColor = "#22c55e";
        break;
    }

    if (title) {
      events.push({
        time,
        title,
        description,
        status: isCurrent
          ? TimelineEventStatus.Current
          : TimelineEventStatus.Completed,
        circleColor,
      });
    }
  });

  return events.reverse();
}

export function formatDeadlineMaker(
  deadline: string,
  status: OrderStatusEnum,
): string {
  const date = new Date(deadline);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  switch (status) {
    case "awaiting_maker":
      return `Você tem até ${formattedDate} para confirmar o pedido.`;
    case "on_going":
      return `Você tem até ${formattedDate} para finalizar a produção.`;
    case "delayed":
      return `O prazo de entrega era ${formattedDate}.`;
    case "new_deadline":
      return `Você sugeriu um novo prazo para ${formattedDate}.`;
    case "ready":
      return `O cliente tem até ${formattedDate} para retirar o pedido.`;
    case "awaiting_confirmation":
      return `Seu pagamento cairá até ${formattedDate}.`;
    case "refund_in_process":
      return "Você recusou este pedido.";
    case "refund_in_analysis":
      return "O pedido está em análise de reembolso.";
    case "refunded":
      return "Este pedido foi reembolsado ao cliente.";
    case "done":
      return `O pedido foi concluído!`;
    case "partial_refund_in_process":
      return "Um reembolso parcial foi aprovado e está em processamento.";
    case "partial_refund":
      return "Reembolso parcial concluído.";
    default:
      return "Prazo não aplicável.";
  }
}

export function formatProductionTime(days: number): string {
  if (days === 0) {
    return "Pronta entrega";
  }
  if (days === 1) {
    return "1 dia de produção";
  }
  return `${days} dias de produção`;
}
