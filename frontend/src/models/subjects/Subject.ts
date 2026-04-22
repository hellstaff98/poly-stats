import { Activity } from '@models/subjects/Activity';

export type SubjectID = number;

export interface Subject {
  name: string;
  id: SubjectID;
  activities: Activity[];
}
