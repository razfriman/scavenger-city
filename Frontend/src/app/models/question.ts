import { Hint } from 'app/models/hint';

export class Question {
  questionID: number;
  text: string;
  fact: string;
  hint: Hint;
}
