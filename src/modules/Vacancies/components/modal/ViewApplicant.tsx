import { Divider, Modal } from "@mantine/core";
import { ApplicantStore, ViewApplicantsDataTableStore, ComponentsStore } from "@modules/Vacancies/store/index";
// import { selectedDataVal } from "../../values";
import { useEffect, useState } from "react";
import { VacancyType } from "../../types";
// import Vacancies from '@src/modules/Vacancies/values/response/Applicants.json';
import { DataTable } from "mantine-datatable";
import { Badge } from '@mantine/core';
import "@modules/Vacancies/style.css"
import { useApplicants } from "@modules/Vacancies/hooks/useApplicants";
import { useApplicantIdStore } from "@modules/Applicants/store";
import { applicantsByIdService } from "@src/modules/Shared/components/api/UserService";
import { useQueryClient } from "@tanstack/react-query";

export default function index() {
  const { setSelectedApplicant, setIsViewApplicant } = ApplicantStore();
  const { ViewApplicantsModal, setViewApplicantModal } = ComponentsStore();
  const setApplicantId = useApplicantIdStore((state) => state.setApplicantId);
  const queryClient = useQueryClient();
  const [sortStatus, setSortStatus] = useState<{ columnAccessor: keyof VacancyType; direction: "asc" | "desc" }>({
    columnAccessor: "position", // Use a valid key from VacancyType
    direction: "asc",
  });
  const { data: applicants, isFetching } = useApplicants();
  const { counts, page } = ViewApplicantsDataTableStore();
  const [appliedCount, setAppliedCount] = useState(0);
  const [forInterviewCount, setForInterviewCount] = useState(0);
  const [offeredCount, setOfferedCount] = useState(0);
  const [hiredCount, setHiredCount] = useState(0);
  const [archivedCount, setArchivedCount] = useState(0);

  useEffect(() => {
    setAppliedCount(counts['applied'] || 0);
    setForInterviewCount(counts['forInterview'] || 0);
    setOfferedCount(counts['offered'] || 0);
    setHiredCount(counts['hired'] || 0);
    setArchivedCount(counts['archived'] || 0);
  }, [counts]);

  const handleRowClick = async (id: number) => {
    const { data: applicantDetails } = await applicantsByIdService.getById(id);
    setApplicantId(id);
    setSelectedApplicant(applicantDetails)
    setIsViewApplicant(true)
  }

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["recruitment/applicants"], type: 'active' });
  }, [page])

  useEffect(() => {
    console.log('applicants: ', applicants)
  }, [applicants])

  return (
    <>
      <Modal size={'80%'} opened={ViewApplicantsModal} centered onClose={() => setViewApplicantModal(false)} title={'View Applicants'}
        className='text-[#559CDA]' styles={{
          header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
          title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
        }}>
        <div className='m-auto w-[95%] h-[80vh] '>
          <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
          <div className=" h-[98%] ">
            <DataTable
              className="applicants-datatable"
              defaultColumnProps={{
                textAlign: 'right',
                noWrap: true,
                ellipsis: true,
              }}
              style={{
                color: "#6D6D6D",
              }}
              fetching={isFetching}
              loaderType="dots"
              loaderSize="lg"
              loaderColor="blue"
              withColumnBorders
              withRowBorders={false}
              withTableBorder
              borderRadius="sm"
              records={applicants}
              // paginationText={({ from, to, totalRecords }) => `Showing data ${from} to ${to} of ${totalRecords} esntries (0.225) seconds`}
              columns={[
                {
                  accessor: 'applied', render: (data: any) => (<>{data.applied.name}</>),
                  title:
                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem] applied">
                      <p>Applied</p>
                      <Badge color="blue" >{appliedCount}</Badge>
                    </div>
                  , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.blue[3], background: 'rgb(222, 236, 255, 0.3)', fontWeight: 'normal' }),
                },
                {
                  accessor: 'forInterview', render: (data: any) => (<>{data.forInterview.name}</>),
                  title:
                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem]">
                      <p>For Interview</p>
                      <Badge color="orange">{forInterviewCount}</Badge>
                    </div>
                  , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.orange[6], background: 'rgb(255,216,182, 0.3)', fontWeight: 'normal' })
                },
                {
                  accessor: 'offered', render: (data: any) => (<>{data.offered.name}</>), title:
                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem]">
                      <p>Offered</p>
                      <Badge color="yellow">{offeredCount}</Badge>
                    </div>
                  , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.yellow[6], background: 'rgb(255,240,192,0.3)', fontWeight: 'normal' })
                },
                {
                  accessor: 'hired', render: (data: any) => (<>{data.hired.name}</>), title:
                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem]">
                      <p>Hired</p>
                      <Badge color="green">{hiredCount}</Badge>
                    </div>
                  , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.green[6], background: 'rgb(215,255,185, 0.3)', fontWeight: 'normal' })
                },
                {
                  accessor: 'archived', render: (data: any) => (<>{data.archived.name}</>), title:
                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem]">
                      <p>Archived</p>
                      <Badge color="red">{archivedCount}</Badge>
                    </div>
                  , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.red[6], background: "rgb(255,203,199, 0.3)", fontWeight: 'normal' })
                },
              ]}
              // totalRecords={maxLength}
              // recordsPerPage={pageSize}
              // page={page}
              // onPageChange={setPage}
              sortStatus={sortStatus}
              onCellClick={(val) => {
                handleRowClick(val.record[val.column.accessor]?.applicantId)
              }}
              onSortStatusChange={(sort) => setSortStatus(sort as { columnAccessor: keyof VacancyType; direction: "asc" | "desc" })}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}