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
    const { currentDate, filterInterviewer, filterDepartmentIds, filterCompanyId } = useCalendarStore();

    const fetchData = async () => {
        try {
            let url = "recruitment/calendar";
            if (currentDate) {
                url += `?Date=${currentDate}`;
            }


            if (filterCompanyId.length > 0) {
                for (let index in filterCompanyId) {
                    const id = filterCompanyId[index];
                    url += `&CompanyId=${id}`;
                }
            }

            if (filterDepartmentIds.length > 0) {
                for (let index in filterDepartmentIds) {
                    const id = filterDepartmentIds[index];
                    url += `&DepartmentIds=${id}`;
                }
            }

            if (filterInterviewer.length > 0) {
                for (let index in filterInterviewer) {
                    const id = filterInterviewer[index];
                    url += `&InterviewerIds=${id}`;
                }
            }
            // console.log('useCalendar-filterDepartmentIds: ', filterDepartmentIds)
            // console.log('useCalendar-filterInterviewer: ', filterInterviewer)
            // console.log('useCalendar-filterInterviewer: ', filterInterviewer)
            const res = await axiosInstance.get(url);
            // console.log('response456: ', res.data)
            if (res.status === 200 && Array.isArray(res.data.calendarDates)) {
                const mapped = res.data.calendarDates.flatMap((day: any, dayIndex: number) => {
                    return day.entries.map((entry: any, entryIndex: number) => {
                        const applicantName = entry.applicant?.name || 'No Name';

                        return {
                            id: `${dayIndex}-${entryIndex}`, // Ensures unique ID
                            title: `${applicantName}`,
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
        queryKey: ["recruitment/calendar", { page, pageSize, sortStatus, currentDate, filterDepartmentIds, filterCompanyId, filterInterviewer }],
        queryFn: fetchData,
        staleTime: 60 * 1000, // Data is fresh for 5 minutes
    });
};
