const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
// Utility used in status rendering
const statusBgClasses: Record<string, string> = {
  applied: 'bg-[#559CDA]',
  'for interview': 'bg-[#ED8028]',
  hired: 'bg-[#5A9D27]',
  offered: 'bg-[#FEC001]',
  'for transfer': 'bg-[#9B51E0]',
  archived: 'bg-[#FF554A]',
  transferred: 'bg-[#6D6D6D]',
  assessment: 'bg-[#ED8028]',
  'initial interview': 'bg-[#559CDA]',
  'final interview': 'bg-[#FEC001]',
  'ready for transfer': 'bg-[#6D6D6D]',
  'final': 'bg-[#ED8028]',
  'technical': 'bg-[#ED8028]',
};

const baseStatusClass = 'text-white rounded-xl p-1 inline-block w-[132px] text-center font-medium';

const getStatusClass = (status: string) => {
  const normalized = status.toLowerCase();
  const bgClass = statusBgClasses[normalized] ?? 'bg-gray-200 text-teal-500 rounded-md my-1';
  return `${baseStatusClass} ${bgClass}`;
};

const checkStatus = (status: string) => {
  const className = getStatusClass(status);
  return <span className={className}>{status}</span>;
};

export const getCombinedColumns = ({
  includeVacancy = false,
  includeApplicants = false,
  setSelectedData,
}: {
  includeVacancy?: boolean;
  includeApplicants?: boolean;
  setSelectedData?: (data: any) => void;
}) => {
  const columns: any[] = [];

  if (includeVacancy) {
    columns.push(
      {
        accessor: 'position',
        title: 'Vacancy',
        textAlign: 'left',
        sortable: true,
      },
      {
        accessor: 'datePublish',
        title: 'Publish Date',
        textAlign: 'left',
        sortable: true,
        render: ({ datePublish }: { datePublish: string }) => formatDate(datePublish),
      },
      {
        accessor: 'department',
        title: 'Department',
        textAlign: 'left',
        sortable: true,
      },
      {
        accessor: 'quantity',
        title: 'Quantity',
        textAlign: 'center',
        sortable: true,
      },
      {
        accessor: 'totalApplicant',
        title: 'Total Applicant',
        textAlign: 'center',
        sortable: true,
      },
      {
        accessor: 'status',
        title: 'Status',
        textAlign: 'center',
        sortable: true,
        render: ({ status }: { status: string }) => (
          <div className="rounded-xl text-white text-center p-1" style={{ background: statusBgClasses[status.toLowerCase()] || 'gray' }}>
            {status}
          </div>
        ),
      },
      {
        accessor: '',
        title: 'Action',
        textAlign: 'center',
        render: (data: any) => (
          <div
            className="rounded-xl p-1 text-center border border-[#6D6D6D] cursor-pointer text-[#6D6D6D]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedData?.(data);
            }}
          >
            View Applicants
          </div>
        ),
      }
    );
  }

  if (includeApplicants) {
    columns.push(
      {
        accessor: 'applicantName',
        title: <span className="job-offers-table font-bold text-[14px]">Applicant Name</span>,
        sortable: true,
      },
      {
        accessor: 'applicationDate',
        title: <span className="job-offers-table font-bold text-[14px]">Date Applied</span>,
        sortable: true,
      },
      {
        accessor: 'phone',
        title: <span className="job-offers-table font-bold text-[14px]">Phone</span>,
        sortable: true,
      },
      {
        accessor: 'email',
        title: <span className="job-offers-table font-bold text-[14px]">Email</span>,
        sortable: true,
      },
      {
        accessor: 'position',
        title: <span className="job-offers-table font-bold text-[14px]">Position</span>,
        sortable: true,
      },
      {
        accessor: 'feedback',
        title: <span className="job-offers-table font-bold text-[14px]">Feedback</span>,
        sortable: true,
      },
      {
        accessor: 'status',
        title: <span className="job-offers-table font-bold text-[14px] flex justify-center w-full">Status</span>,
        sortable: true,
        render: ({ status }: { status: string }) => (
          <div className="flex justify-center w-full">{checkStatus(status)}</div>
        ),
      },
      {
        accessor: 'movement',
        title: <span className="job-offers-table font-bold text-[14px] flex justify-center w-full">Movements</span>,
        sortable: false,
        render: ({ movement }: { movement: string }) => (
          <div className="flex justify-center w-full">{checkStatus(movement)}</div>
        ),
      },
      {
        accessor: 'comments',
        title: <span className="job-offers-table font-bold text-[14px] flex justify-center w-full">Comments</span>,
        sortable: false,
        render: ({ comments }: { comments: string }) => (
          <span className="flex justify-center w-full">{comments || ''}</span>
        ),
      }
    );
  }

  return columns;
};
