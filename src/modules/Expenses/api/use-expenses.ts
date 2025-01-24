import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import {  DataTableStore } from "@src/modules/Expenses/store";
import { Expenses } from "@src/modules/Expenses/types";
export const useExpenses = () => {
  const {
    search,
    page,
    pageSize,
    sortStatus,
    setTotalRecords
  } = DataTableStore();

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('getAllExpenses/me', {
        params: {
          page,
          limit: pageSize,
          search,
          sortBy: sortStatus.columnAccessor,
          sortDirection: sortStatus.direction,
        },
      });

      if (res.status === 200 && Array.isArray(res.data.data)) {
        setTotalRecords(res.data.totalExpenses);
        return res.data.data; // Return the data if it's valid
      } else {
        console.error("Unexpected response format:", res.data);
        return []; // Return an empty array if the response format is unexpected
      }
    } catch (error:any) {
      console.error("Error fetching data:", error.response || error);
      throw error; // Throw error to be handled by react-query
    }
  };

  return useQuery<Expenses[]>({
    queryKey: ["expenses", { page, pageSize, sortStatus }],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  });
};
