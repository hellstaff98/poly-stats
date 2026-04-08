import { AxiosResponse } from 'axios';
import { IUser } from '@models/IUser';
import $api from '@api/api';

export default class UserService {
  static async userInfo(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('v1/users/me');
  }
}
