import { Activity } from '@models/subjects/Activity';

export interface Subject {
  name: string;
  id: number;
  activities: Activity[];
}
