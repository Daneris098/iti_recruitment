import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import { DataTableStore } from "@src/modules/Vacancies/store";
import { useCalendarStore } from "../store";

export const useCalendar = () => {
    const {
        page,
        pageSize,
        sortStatus,
        setTime
    } = DataTableStore();
    const {  currentDate } = useCalendarStore();

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(`recruitment/calendar?Date=${currentDate}`);
            console.log('response456: ', res.data)
            if (res.status === 200 && Array.isArray(res.data.calendarDates)) {  
                const mapped = res.data.calendarDates.flatMap((day:any, dayIndex:number) => {
                    return day.entries.map((entry:any, entryIndex:number) => {
                        const applicantName = entry.applicant?.name || 'No Name';
                        const interviewerName = entry.interviewer?.name || 'Unknown';
                        const interviewStage = entry.interviewStage?.name || 'Interview';

                        return {
                            id: `${dayIndex}-${entryIndex}`, // Ensures unique ID
                            title: `${interviewerName} - ${interviewStage} with ${applicantName}`,
                            start: entry.date, // Full timestamp of the interview
                            textColor: '#559cda',
                            backgroundColor: '#deecff',
                            entry: entry
                        };
                    });
                });

                return mapped;
                  
            } else {
                console.error("Unexpected response format:", res.data);
                return [];
            }
        } catch (error: any) {
            console.error("Error fetching data:", error.response || error);
            throw error;
        }
    };

    return useQuery<[]>({
        queryKey: ["recruitment/calendar", { page, pageSize, sortStatus, currentDate }],
        queryFn: fetchData,
        staleTime: 60 * 1000, // Data is fresh for 5 minutes
    });
};
