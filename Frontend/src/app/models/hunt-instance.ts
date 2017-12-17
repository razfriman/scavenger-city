import { Hunt } from './hunt';
import { QuestionInstance } from './question-instance';
import { HuntStatus } from './hunt-status';

export class HuntInstance {
  huntInstanceID: number;
  hunt: Hunt;
  currentQuestionInstance: QuestionInstance;
  currentQuestionInstanceID: number;
  startTime: Date;
  endTime: Date;
  adjustedEndTime: Date;
  status: HuntStatus;
  userID: string;
  huntID: number;
  penalties: number;
  progress: number;
  purchase: any;
  questionCount: number;
  skipped: number;
}
