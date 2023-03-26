/* eslint-disable import/export */
import {
  formatDistanceToNow as dfsFormatDistanceToNow,
  format as dfsFormat,
} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatDistanceToNow(dateToCompare: Date) {
  return dfsFormatDistanceToNow(dateToCompare, {
    locale: ptBR,
    addSuffix: false,
  });
}

export function format(dateToCompare: Date, pattern: string) {
  return dfsFormat(dateToCompare, pattern, {
    locale: ptBR,
  });
}

export * from "date-fns";
