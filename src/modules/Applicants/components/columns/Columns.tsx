// This is for displaying the applicants records in main table.
const checkStatus = (status: string) => {
  const statusType = status.toLowerCase();
  let className = 'text-teal-500 rounded-md p-1 bg-gray-200 my-1';

  if (statusType === 'applied') {
    className = 'text-white rounded-xl bg-[#559CDA] p-1 inline-block w-[132px] text-center font-medium';
  }
  else if (statusType === 'for interview') {
    className = 'text-white rounded-xl bg-[#ED8028] p-1 inline-block w-[132px] text-center font-medium';
  }
  else if (statusType === 'hired') {
    className = 'text-white rounded-xl bg-[#5A9D27]  p-1 inline-block w-[132px] text-center font-medium';
  }
  else if (statusType === 'offered') {
    className = 'text-white rounded-xl bg-[#FEC001] p-1 inline-block w-[132px] text-center font-medium';
  }
  else if (statusType === 'for transfer') {
    className = 'text-white rounded-xl bg-[#9B51E0]  p-1 inline-block w-[132px] text-center font-medium';
  }
  else if (statusType === 'archived') {
    className = 'text-white rounded-xl bg-[#FF554A]  p-1 inline-block w-[132px] text-center font-medium ';
  }
  else if (statusType === 'transferred') {
    className = 'text-white rounded-xl bg-[#6D6D6D]  p-1 inline-block w-[132px] text-center font-medium';
  }
  else if (statusType === 'assessment') {
    className = 'text-white rounded-xl bg-[#ED8028] p-1 inline-block w-[132px] text-center font-medium';
  }
  else if (statusType === 'initial interview') {
    className = 'text-white rounded-xl bg-[#559CDA]  p-1 inline-block w-[132px] text-center font-medium';
  }
  else if (statusType === 'final interview') {
    className = 'text-white rounded-xl bg-[#FEC001]  p-1 inline-block w-[132px] text-center font-medium';
  }
  return <span className={className}>{status}</span>
}

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
