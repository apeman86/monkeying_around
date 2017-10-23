import { Card } from './card';

export interface MoveEvent {
  uid?: string;
  type: string;
  message?: string;
  error?: string;
  card?: Card;
  count?: number;
}
