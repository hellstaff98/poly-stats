import { create } from 'zustand';
import { Subject, SubjectID } from '@models/subjects/Subject';
import SubjectsService from '@services/SubjectsService';
import { ActivityID } from '@models/subjects/Activity';

interface SubjectsState {
    subjectsList: Subject[];
    isLoading: boolean;

    currentSubject: Subject;
    setCurrentSubject: (subjectId: SubjectID) => Promise<void>;
    incrementActivityProgress: (activityId: ActivityID) => Promise<void>;
    decrementActivityProgress: (activityId: ActivityID) => Promise<void>;
    deleteActivity: (activityId: ActivityID) => Promise<void>;
    createActivity: (subjectId: SubjectID, name: string, maxProgress: number) => Promise<void>;

    fetchSubjectsList: () => Promise<void>;
}

export const useSubjectsStore = create<SubjectsState>((set, get) => ({
    subjectsList: null,
    currentSubject: null,

    isLoading: false,

    async fetchSubjectsList() {
        try {
            set({ isLoading: true });
            const { data } = await SubjectsService.getSubjectsList();
            set({ subjectsList: data });
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            set({ isLoading: false });
        }
    },

    async setCurrentSubject(subjectId: SubjectID) {
        set({ isLoading: true });
        let subject = get().currentSubject;

        if (subject && subject.id === subjectId) {
            set({ isLoading: false });
            return;
        }

        const list = get().subjectsList;

        if (list) {
            subject = list.find((subject, index) => subject.id === subjectId);
        }
        if (!subject) {
            try {
                const { data } = await SubjectsService.getSubjectDetails(subjectId);
                subject = data;
            } catch (error) {
                throw error;
            } finally {
            }
        }
        set({ currentSubject: subject, isLoading: false });
    },

    async incrementActivityProgress(activityId: ActivityID) {
        try {
            const { data } = await SubjectsService.incrementActivityProgress(activityId);
            set({
                currentSubject: {
                    ...get().currentSubject,
                    activities: get().currentSubject.activities.map((activity, index) => {
                        if (activity.id === activityId) {
                            activity.current_progress = data.current_progress;
                        }
                        return activity;
                    }),
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async decrementActivityProgress(activityId: ActivityID) {
        try {
            const { data } = await SubjectsService.decrementActivityProgress(activityId);
            set({
                currentSubject: {
                    ...get().currentSubject,
                    activities: get().currentSubject.activities.map((activity, index) => {
                        if (activity.id === activityId) {
                            activity.current_progress = data.current_progress;
                        }
                        return activity;
                    }),
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async deleteActivity(activityId: ActivityID) {
        try {
            await SubjectsService.deleteActivity(activityId);
            const subject = get().currentSubject;
            if (subject.activities.find((activity, index) => activity.id === activityId)) {
                set({
                    currentSubject: {
                        ...subject,
                        activities: subject.activities.filter(
                            (activity, index) => activity.id !== activityId,
                        ),
                    },
                });
            }
        } catch (error) {
            throw error;
        }
    },

    async createActivity(subjectId: SubjectID, name: string, maxProgress: number) {
        try {
            //set({ isLoading: true });
            const { data } = await SubjectsService.createActivity(subjectId, name, maxProgress);
            set({
                currentSubject: {
                    ...get().currentSubject,
                    activities: [...get().currentSubject.activities, data],
                },
            });
        } catch (error) {
            throw error;
        } finally {
            //set({ isLoading: false });
        }
    },
}));
