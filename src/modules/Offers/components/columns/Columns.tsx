import { IconFile } from "@tabler/icons-react";

export const checkStatus = (status: string) => {
  const statusType = status.toLowerCase();
  let className = 'job-offer-type-generated';
  if (statusType === 'pending') {
    className = 'text-white bg-[#9B51E0] rounded-xl p-1 inline-block w-[132px] text-center';
  } else if (statusType === 'archived') {
    className = 'text-white rounded-xl bg-[#F14336] p-1 inline-block w-[132px] text-center';
  } else if (statusType === 'accepted') {
    className = 'text-white rounded-xl bg-[#5A9D27] p-1 inline-block w-[132px] text-center';
  }
  return <span className={className}>{status}</span>;
};

const columns = [
  {
    accessor: 'id',
    title: <span className='job-offers-table poppins font-bold text-[15px]'>ID</span>,
    sortable: true
  },
  {
    accessor: 'Applicant_Name',
    title: <span className='job-offers-table poppins font-bold text-[15px]'>Applicant Name</span>,
    sortable: true

  },
  {
    accessor: 'Date_Generated',
    title: <span className='job-offers-table poppins font-bold text-[15px]'>Date Generated</span>,
    sortable: true
  },
  {
    accessor: 'Date_Last_Updated',
    title: <span className='job-offers-table poppins font-bold text-[15px]'>Date Last Updated</span>,
    sortable: true
  },
  {
    accessor: 'Remarks',
    title: <span className='job-offers-table poppins font-bold text-[15px]'>Remarks</span>,
    sortable: true
  },
  {
    accessor: 'Status',
    title: (
      <span className="poppins font-bold text-[15px] text-center w-full block">
        Status
      </span>
    ),
    sortable: true,
    render: ({ Status }: any) => (
      <div className="text-center w-full">{checkStatus(Status)}</div>
    ),
  },
  {
    accessor: 'Attachments',
    title: (
      <span className='job-offers-table poppins font-bold text-[15px]' style={{ textAlign: 'center', display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
        Attachments
      </span>
    ),
    sortable: true,
    render: ({ Attachments }: any) => Attachments ? <IconFile size={18} className="text-gray-600 poppins font-bold text-[15px]" /> : null,

  },
]

export default columns;