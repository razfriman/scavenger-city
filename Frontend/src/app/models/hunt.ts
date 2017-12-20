import { Question } from './question';

export class Hunt {
  huntID: number;
  name: string;
  distance: number;
  description: string;
  city: string;
  country: string;
  price: number;
  startingPoint: string;
  questions: Question[];
}
