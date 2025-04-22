// This is for displaying the applicants records in main table.
const checkStatus = (status: string) => {
  const statusType = status.toLowerCase();

  let baseClass = 'text-white rounded-xl  p-1 inline-block w-[132px] text-center font-medium';
  let bgColor = '';

  switch (statusType) {
    case 'applied':
      bgColor = 'bg-[#559CDA]';
      break;
    case 'for interview':
      bgColor = 'bg-[#ED8028]';
      break;
    case 'hired':
      bgColor = 'bg-[#5A9D27]';
      break;
    case 'offered':
      bgColor = 'bg-[#FEC001]';
      break;
    case 'for transfer':
      bgColor = 'bg-[#9B51E0]';
      break;
    case 'archived':
      bgColor = 'bg-[#FF554A]';
      break;
    case 'transferred':
      bgColor = 'bg-[#6D6D6D]';
      break;
    case 'assessment':
      bgColor = 'bg-[#ED8028]';
      break;
    case 'initial interview':
      bgColor = 'bg-[#559CDA]';
      break;
    case 'final interview':
      bgColor = 'bg-[#FEC001]';
      break;
  }

  return <span className={`${baseClass} ${bgColor}`}>{status}</span>
}

const applicantsColumns = [
  {
    accessor: 'applicantName',
    title:
      <span
        className="job-offers-table cursor-pointer font-bold text-[14px]">
        Applicant Name
      </span>,
    sortable: true,
  },
  {
    accessor: 'applicationDate',
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
