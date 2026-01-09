import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI, usersAPI, subjectsAPI, getAccessToken, checkAuth, clearAccessToken } from './api'

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      subjects: [],
      tasks: [],
      settings: {
        theme: 'dark',
        notifications: true
      },
      isOnline: true,
      isLoading: false,
      error: null,
      
      // Загрузить данные текущего пользователя
      loadCurrentUser: async () => {
        const token = getAccessToken();
        if (!token) {
          console.log('Токен отсутствует, пользователь не авторизован');
          return null;
        }
        
        try {
          console.log('Загрузка данных пользователя...');
          const userData = await usersAPI.getCurrentUser();
          console.log('Данные пользователя получены:', userData);
          
          set({ 
            user: {
              id: userData.id.toString(),
              email: userData.email,
              groupName: userData.group_name || 'Группа не указана',
              groupId: userData.group_id,
              isActive: userData.is_active,
              isVerified: userData.is_verified
            }
          });
          
          return userData;
        } catch (error) {
          console.error('Ошибка загрузки данных пользователя:', error);
          
          // Если ошибка 401, очищаем токен
          if (error.status === 401 || error.status_code === 401) {
            clearAccessToken();
            set({ user: null });
          }
          
          return null;
        }
      },
      
      register: async (email, password, groupName) => {
        set({ isLoading: true, error: null });
        
        try {
          const data = await authAPI.register(email, password, groupName);
          
          const loginData = await authAPI.login(email, password);
          
          // После успешной регистрации загружаем данные пользователя
          await get().loadCurrentUser();
          
          set({
            isLoading: false,
            subjects: [],
            tasks: []
          });
          
          return { success: true, data };
        } catch (error) {
          console.error('Ошибка регистрации:', error);
          
          let errorMessage = 'Произошла ошибка при регистрации';
          
          if (error.detail === 'REGISTER_USER_ALREADY_EXISTS') {
            errorMessage = 'Пользователь с таким email уже существует';
          } else if (error.detail) {
            errorMessage = error.detail;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const data = await authAPI.login(email, password);
          
          // После успешного входа загружаем данные пользователя
          await get().loadCurrentUser();
          
          set({ 
            subjects: [],
            tasks: [],
            isLoading: false
          });
          
          return { success: true, data };
        } catch (error) {
          console.error('Ошибка входа:', error);
          
          let errorMessage = 'Произошла ошибка при входе';
          
          if (error.detail === 'LOGIN_BAD_CREDENTIALS') {
            errorMessage = 'Неверный email или пароль';
          } else if (error.detail) {
            errorMessage = error.detail;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authAPI.logout();
        } catch (error) {
          console.error('Ошибка при выходе:', error);
        } finally {
          clearAccessToken();
          set({ user: null, subjects: [], tasks: [], isLoading: false });
        }
      },
      
      loadSubjects: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const data = await subjectsAPI.getSubjects();
          const subjects = data.map(subject => ({
            id: subject.id.toString(),
            name: subject.name,
            activities: subject.activities || []
          }));
          
          set({ subjects, isLoading: false });
          return subjects;
        } catch (error) {
          console.error('Ошибка загрузки предметов:', error);
          set({ error: 'Не удалось загрузить предметы', isLoading: false });
          return [];
        }
      },
      
      addSubject: async (name) => {
        set({ isLoading: true, error: null });
        
        try {
          const data = await subjectsAPI.addSubject(name);
          const newSubject = {
            id: data.id.toString(),
            name: data.name,
            activities: data.activities || []
          };
          
          set({ isLoading: false });
          return newSubject;
        } catch (error) {
          console.error('Ошибка добавления предмета:', error);
          
          let errorMessage = 'Не удалось добавить предмет';
          if (error.detail) {
            if (typeof error.detail === 'string') {
              errorMessage = error.detail;
            } else if (Array.isArray(error.detail)) {
              errorMessage = error.detail.map(d => d.msg).join(', ');
            }
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      deleteSubject: async (subjectId) => {
        set({ isLoading: true, error: null });
        
        try {
          const numericId = parseInt(subjectId);
          if (isNaN(numericId)) {
            throw new Error('Неверный ID предмета');
          }
          
          await subjectsAPI.deleteSubject(numericId);
          
          set({ isLoading: false });
          return true;
        } catch (error) {
          console.error('Ошибка удаления предмета:', error);
          
          let errorMessage = 'Не удалось удалить предмет';
          if (error.detail) {
            if (typeof error.detail === 'string') {
              errorMessage = error.detail;
            } else if (Array.isArray(error.detail)) {
              errorMessage = error.detail.map(d => d.msg).join(', ');
            }
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      clearError: () => set({ error: null }),
      
      addTask: (disciplineId, title, type) => set(state => ({
        tasks: [
          ...state.tasks,
          {
            id: Date.now().toString(),
            disciplineId,
            title,
            type,
            completed: false
          }
        ]
      })),
      
      toggleTask: (taskId) => set(state => ({
        tasks: state.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      })),
      
      deleteTask: (taskId) => set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
      })),
      
      toggleTheme: () => set(state => {
        const newTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
        
        if (newTheme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        
        return {
          settings: { 
            ...state.settings, 
            theme: newTheme
          }
        };
      }),
      
      setOnlineStatus: (status) => set({ isOnline: status }),
      
      getSubjectsWithProgress: () => {
        const { subjects, tasks } = get();
        return subjects.map(subject => {
          const subjectTasks = tasks.filter(t => t.disciplineId === subject.id);
          const completedCount = subjectTasks.filter(t => t.completed).length;
          const totalCount = subjectTasks.length;
          
          return {
            ...subject,
            progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
            completedCount,
            totalCount
          };
        });
      },
      
      getSubjectById: (subjectId) => {
        const { subjects, tasks } = get();
        const subject = subjects.find(s => s.id === subjectId);
        if (!subject) return null;
        
        const subjectTasks = tasks.filter(t => t.disciplineId === subjectId);
        const completedCount = subjectTasks.filter(t => t.completed).length;
        const totalCount = subjectTasks.length;
        
        return {
          ...subject,
          tasks: subjectTasks,
          progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
          completedCount,
          totalCount
        };
      },

      getTasksStats: () => {
        const { tasks } = get();
        const completed = tasks.filter(t => t.completed).length;
        const total = tasks.length;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return {
          completed,
          total,
          completionRate
        };
      }
    }),
    {
      name: 'poly-stats-storage',
      getStorage: () => localStorage,
      onRehydrateStorage: () => (state) => {
        if (state?.settings?.theme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        }
        // Не загружаем пользователя здесь, это делается в app.jsx
      }
    }
  )
);