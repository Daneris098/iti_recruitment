// This is for displaying the applicants records in main table.

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

const applicantsColumns = [
  {
    accessor: 'Applicant_Name',
    title:
      <span
        className="job-offers-table cursor-pointer font-bold text-[14px]">
        Applicant Name
      </span>,
    sortable: true,
  },
  {
    accessor: 'Application_Date',
    title: <span className='job-offers-table font-bold text-[14px]'>Date Applied</span>,
    sortable: true,
  },
  {
    accessor: 'Phone',
    title: <span className='job-offers-table font-bold text-[14px]'>Phone</span>,
    sortable: true,
  },
  {
    accessor: 'Email',
    title: <span className='job-offers-table font-bold text-[14px]'>Email</span>,
    sortable: true,
  },
  {
    accessor: 'Position',
    title: <span className='job-offers-table font-bold text-[14px]'>Position</span>,
    sortable: true,
  },
  {
    accessor: 'Feedback',
    title: <span className='job-offers-table font-bold text-[14px]'>Feedback</span>,
    sortable: true,
  },
  {
    accessor: 'Status',
    title: <span className='job-offers-table font-bold text-[14px] flex justify-center w-full'>Status</span>,
    sortable: true,
    render: ({ Status }: { Status: string }) => (
      <div className="flex justify-center w-full">
        {checkStatus(Status)}
      </div>
    )
  },
];

export default applicantsColumns;
