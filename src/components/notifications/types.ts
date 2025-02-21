export interface Notification {
    title: string;
    description: string;
    document_no?: string;
    date_posted: string;
    notif_status: number;
    filing_status: string;
}

export interface NotificationState {
    notifications: Notification[];
    filter: string;

    setFilter: (filter: string) => void; 
    setNotifications: (notifications: Notification[]) => void; 
}