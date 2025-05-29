import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api/authApi";
import { DataTableStore } from "@src/modules/AdministratorSettings/store";
import { user } from "../types";

export const useUser = () => {
    const {
        page,
        pageSize,
        sortStatus,
        setTime,
        setTotalRecords
    } = DataTableStore();

    const fetchData = async () => {
        try {
            const startTime = performance.now();    
            const res = await axiosInstance.get('user-management/users', {
                params: {
                    page,
                    pageSize,
                    sortBy: sortStatus.columnAccessor,
                },
            }); 

            if (res.status === 200 && Array.isArray(res.data.items)) {  
                setTotalRecords(res.data.total)
                const mapped: user[] = res.data.items.map((item: any) => ({
                    id: item.userId,
                    username : item.username,
                    firstname: item.firstName,    
                    lastname: item.lastName,    
                    email: 'sample@gmail.com',
                    status: item.isActive ? 'Active' : 'Inactive',
                }));
                const endTime = performance.now();
                const executionTime = (endTime - startTime) / 1000;
                setTime(executionTime.toFixed(3).toString());
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

    return useQuery<user[]>({
        queryKey: ["auth/users", { page, pageSize, sortStatus }],
        queryFn: fetchData,
        staleTime: 60 * 1000, // Data is fresh for 5 minutes
    });
};
