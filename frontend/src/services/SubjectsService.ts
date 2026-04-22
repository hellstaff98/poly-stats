import { AxiosResponse } from 'axios';
import { Subject, SubjectID } from '@models/subjects/Subject';
import $api from '@api/api';
import { Activity, ActivityID } from '@models/subjects/Activity';

export default class SubjectsService {
    static getSubjectsList(): Promise<AxiosResponse<Subject[]>> {
        return $api.get<Subject[]>('/v1/subjects/list');
    }

    static getSubjectDetails(subjectId: SubjectID): Promise<AxiosResponse<Subject>> {
        return $api.get<Subject>(`/v1/subjects/${subjectId}`);
    }

    static incrementActivityProgress(activityId: ActivityID): Promise<AxiosResponse<Activity>> {
        return $api.patch<Activity>(`/v1/subjects/activities/${activityId}/plus`);
    }

    static decrementActivityProgress(activityId: ActivityID): Promise<AxiosResponse<Activity>> {
        return $api.patch<Activity>(`/v1/subjects/activities/${activityId}/minus`);
    }

    static deleteActivity(activityId: ActivityID): Promise<AxiosResponse> {
        return $api.delete(`/v1/subjects/activities/${activityId}`);
    }

    static createActivity(
        subjectId: SubjectID,
        name: string,
        max_progress: number,
    ): Promise<AxiosResponse<Activity>> {
        return $api.post<Activity>(`/v1/subjects/${subjectId}/activity-add`, {
            name,
            max_progress,
        });
    }
}
