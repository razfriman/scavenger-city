import { Hunt } from './hunt';
import { QuestionInstance } from './question-instance';

export class HuntInstance {
  huntInstanceID: number;
  hunt: Hunt;
  currentQuestionInstance: QuestionInstance;
  currentQuestionInstanceID: number;
  startTime: Date;
  endTime: Date;
  adjustedEndTime: Date;
  status: number;
  userID: string;
  huntID: number;
  penalties: number;
  progress: number;
  purchase: any;
  questionCount: number;
  skipped: number;
}
