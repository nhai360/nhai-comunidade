/* eslint-disable import/export */
import { formatDistanceToNow as dfsFormatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatDistanceToNow(dateToCompare: Date) {
  return dfsFormatDistanceToNow(dateToCompare, {
    locale: ptBR,
    addSuffix: false,
  });
}

export * from "date-fns";
