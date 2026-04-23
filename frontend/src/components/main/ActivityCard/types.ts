import { Activity, ActivityID } from '@models/subjects/Activity';

export interface ActivityCardProps {
    activity: Activity;

    handleIncrement: (activityId: ActivityID) => void;
    handleDecrement: (activityId: ActivityID) => void;
    handleDelete: (activityId: ActivityID) => void;
}
