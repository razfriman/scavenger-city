import { Question } from './question';

export class Hunt {
  huntID: number;
  name: string;
  distance: number;
  description: string;
  city: string;
  country: string;
  price: number;
  questions: Question[];
}
