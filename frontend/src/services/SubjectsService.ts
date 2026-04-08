import { AxiosResponse } from 'axios';
import { Subject } from '@models/subjects/Subject';
import $api from '@api/api';

export default class SubjectsService {
  static getSubjectsList(): Promise<AxiosResponse<Subject[]>> {
    return $api.get<Subject[]>('/v1/subjects/list');
  }
}
