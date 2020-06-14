import { AmountType } from './amount-type';

export interface Filter {
  categories: string[];
  amountType: AmountType;
  keyword?: string;
}
