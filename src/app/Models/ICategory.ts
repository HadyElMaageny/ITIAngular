import { IProduct } from './IProduct';
export interface ICategory {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  products?: IProduct[];
}
