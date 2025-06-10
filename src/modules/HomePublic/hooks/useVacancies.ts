import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import { DataTableStore } from "@src/modules/Vacancies/store";
import { VacancyType } from "@src/modules/Vacancies/types";
import { FilterStore } from "@src/modules/HomePublic/store";

export const useVacancies = () => {
  const { storedFilters, searchParams } = FilterStore();
  const { setTime } = DataTableStore();

  const fetchData = async () => {
    try {
      const searchFilter = searchParams === "" ? "" : `?${searchParams}`;
      let url = `recruitment/vacancies${searchFilter}`;

      const startTime = performance.now();
      const res = await axiosInstance.get(url);

      if (res.status === 200 && Array.isArray(res.data.items)) {
        const mapped = res.data.items.map((item: any) => ({
          ...item,
          companyDetails: item.company,
          departmentDetails: item.department,
          mustHaveSkills: item.skills,
          company: item.company.name,
          branch: item.branch.name,
          division: item.division.name,
          experienceLevel: item.experienceLevel.name,
          vacancyType: item.vacancyType.name,
          section: item.section.name,
          employmentType: item.employmentType.name,
          workplace: item.workplaceType.name,
          vacancyDuration: { start: item.vacancyDuration.dateStart, end: item.vacancyDuration.dateEnd },
          id: item.id,
          position: item.position,
          datePublish: item.vacancyDuration?.dateStart,
          interviewer: "N/A",
          department: item.department?.name || "-",
          quantity: item.availableSlot,
          totalApplicant: item.availableSlot,
          status: item.status.name,
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

  return useQuery<VacancyType[]>({
    queryKey: ["recruitment/vacancies", { ...storedFilters }],
    queryFn: fetchData,
    staleTime: 60 * 1000,
  });
};
