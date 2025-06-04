import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";

export const useCities = () => {

    const fetchData = async () => {
        try {
            let url = `general/cities`;
            const res = await axiosInstance.get(url);
            if (res.status === 200 && Array.isArray(res.data.items)) {
                console.log('res', res.data.items)
                const mapCitiesData = res.data.items?.map((item: any) => ({
                    id: item.id,
                    value: `${item.id}`,
                    label: item.name,
                })) ?? [{ id: 1, value: 'MANILA', label: 'MANILA' },];
                return mapCitiesData;
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
        queryKey: ["general/cities", {}],
        queryFn: fetchData,
        staleTime: 60 * 1000,
    });
};
