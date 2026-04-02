import {AxiosResponse} from "axios";
import {LoginResponse} from "@models/response/LoginResponse";
import $api from "@api/api";
import {RegisterResponse} from "@models/response/RegisterResponse";


export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return $api.post<LoginResponse>('/auth/login', {email, password})
    }

    static async register(email: string, password: string, group_name: string): Promise<AxiosResponse<RegisterResponse>> {
        return $api.post<RegisterResponse>('/auth/register', {email, password, group_name})
    }

    static async logout(): Promise<AxiosResponse> {
        return $api.post('/auth/login')
    }
}