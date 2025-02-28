// This is for displaying the applicants records in main table.
const checkStatus = (status: string) => {
  const statusType = status.toLowerCase();
  let className = 'text-teal-500 rounded-md p-1 bg-gray-200 ';

  if (statusType === 'applied') {
    className = 'text-white rounded-md bg-[#559CDA] text-xs p-1 inline-block w-[113px] text-center font-medium';
  }
  else if (statusType === 'for interview') {
    className = 'text-white rounded-md bg-[#ED8028] text-[11px] p-1 inline-block w-[113px] text-center font-medium ';
  }
  else if (statusType === 'hired') {
    className = 'text-white rounded-md bg-[#5A9D27] text-xs p-1 inline-block w-[113px] text-center font-medium';
  }
  else if (statusType === 'offered') {
    className = 'text-white rounded-md bg-[#FEC001] text-xs p-1 inline-block w-[113px] text-center font-medium';
  }
  else if (statusType === 'for transfer') {
    className = 'text-white rounded-md bg-[#9B51E0] text-xs p-1 inline-block w-[113px] text-center font-medium';
  }
  else if (statusType === 'archived') {
    className = 'text-white rounded-md bg-[#FF554A] text-xs p-1 inline-block w-[113px] text-center font-medium';
  }
  else if (statusType === 'transferred') {
    className = 'text-white rounded-md bg-[#6D6D6D] text-xs p-1 inline-block w-[113px] text-center font-medium';
  }
  else if (statusType === 'assessment') {
    className = 'text-white rounded-md bg-[#ED8028] text-[11px] p-1 inline-block w-[113px] text-center font-medium';
  }
  else if (statusType === 'initial interview') {
    className = 'text-white rounded-md bg-[#559CDA] text-xs p-1 inline-block w-[113px] text-center font-medium';
  }
  else if (statusType === 'final interview') {
    className = 'text-white rounded-md bg-[#FEC001] text-xs p-1 inline-block w-[113px] text-center font-medium';
  }
  return <span className={className}>{status}</span>
}

const applicantsColumns = [
  {
    accessor: 'Applicant_Name',
    title:
      <span
        className="job-offers-table cursor-pointer">
        Applicant Name
      </span>,
    sortable: true,
  },
  {
    accessor: 'Application_Date',
    title: <span className='job-offers-table'>Date Applied</span>,
    sortable: true,
  },
  {
    accessor: 'Phone_Number',
    title: <span className='job-offers-table'>Phone</span>,
    sortable: true,
  },
  {
    accessor: 'Email',
    title: <span className='job-offers-table'>Email</span>,
    sortable: true,
  },
  {
    accessor: 'Position',
    title: <span className='job-offers-table'>Position</span>,
    sortable: true,
  },
  {
    accessor: 'Status',
    title: <span className='job-offers-table'>Status</span>,
    sortable: true,
    render: ({ Status }) => checkStatus(Status)
  },
];

export default applicantsColumns;
