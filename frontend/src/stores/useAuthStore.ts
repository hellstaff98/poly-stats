import { create } from 'zustand';
import AuthService from '@services/AuthService';
import UserService from '@services/UserService';

interface AuthState {
    isAuth: boolean;
    userId: number | null;
    email: string | null;
    isLoading: boolean;

    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, group_name: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    userId: null,
    email: null,
    isAuth: false,
    isLoading: !!localStorage.getItem('token'),

    async login(email: string, password: string) {
        try {
            set({ isLoading: true });
            const { data } = await AuthService.login(email, password);
            localStorage.setItem('token', data.access_token);
            set({ email: email, isAuth: true });
        } catch (e) {
            throw e;
        } finally {
            set({ isLoading: false });
        }
    },

    async register(email: string, password: string, group_name: string) {
        try {
            set({ isLoading: true });
            const { data } = await AuthService.register(email, password, group_name);
            set({ userId: data.id });
        } catch (e) {
            throw e;
        } finally {
            set({ isLoading: false });
        }
    },

    async logout() {
        try {
            set({ isLoading: true });
            await AuthService.logout();
            localStorage.removeItem('token');
            set({ isAuth: false });
            set({ userId: null, email: null });
        } catch (e) {
            throw e;
        } finally {
            set({ isLoading: false });
        }
    },

    async checkAuth() {
        try {
            set({ isLoading: true });
            const response = await UserService.userInfo();
            set({ isAuth: true });
        } catch (e) {
            if (e.response.status === 401) {
                set({ isAuth: false });
            }
        } finally {
            set({ isLoading: false });
        }
    },
}));
