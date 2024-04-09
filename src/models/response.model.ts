import { IProduct } from './IProduct.model';

export type TGetSearchProductResponse = {
  cards: IProduct[];
  countTotalCards: number;
};
