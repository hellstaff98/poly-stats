import { create } from 'zustand';
import { Subject } from '@models/subjects/Subject';
import SubjectsService from '@services/SubjectsService';

interface SubjectsState {
  subjectsList: Subject[];
  isLoading: boolean;

  fetchSubjectsList: () => Promise<void>;
}

export const useSubjectsStore = create<SubjectsState>((set, get) => ({
  subjectsList: null,
  isLoading: false,

  async fetchSubjectsList() {
    try {
      set({ isLoading: true });
      const { data } = await SubjectsService.getSubjectsList();
      set({ subjectsList: data });
      console.log(data);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },
}));
