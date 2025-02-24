import { create } from 'zustand';
import { NotificationState, Notification } from './types';


export const NotificationStore = create<NotificationState>((set) => ({
    filter: 'all',
    notifications: [],

    setFilter: (filter: string) => set({  filter }),
    setNotifications: (notifications: Notification[]) => set({  notifications }), // Fixed function name
}));

