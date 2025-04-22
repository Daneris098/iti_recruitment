import { IconFile } from "@tabler/icons-react";

export const checkStatus = (status: string) => {
  const statusType = status.toLowerCase();

  const baseClass =
    'text-white rounded-xl p-1 w-[132px] text-center inline-block';

  let bgColor = '';

  switch (statusType) {
    case 'pending':
      bgColor = 'bg-[#9B51E0]';
      break;
    case 'archived':
      bgColor = 'bg-[#F14336]';
      break;
    case 'accepted':
      bgColor = 'bg-[#5A9D27]';
      break;
    default:
      bgColor = 'bg-gray-400';
  }
  return <span className={`${baseClass} ${bgColor}`}>{status}</span>;
};

const columns = [
  {
    accessor: 'id',
    title: <span className='job-offers-table poppins font-bold text-[14px]'>ID</span>,
    sortable: true
  },
  {
    accessor: 'Applicant_Name',
    title: <span className='job-offers-table poppins font-bold text-[14px]'>Applicant Name</span>,
    sortable: true

  },
  {
    accessor: 'Date_Generated',
    title: <span className='job-offers-table poppins font-bold text-[14px]'>Date Generated</span>,
    sortable: true
  },
  {
    accessor: 'Date_Last_Updated',
    title: <span className='job-offers-table poppins font-bold text-[14px]'>Date Last Updated</span>,
    sortable: true
  },
  {
    accessor: 'Remarks',
    title: <span className='job-offers-table poppins font-bold text-[14px]'>Remarks</span>,
    sortable: true
  },
  {
    accessor: 'Status',
    title: (
      <div className="flex justify-center w-full">
        <span className="poppins font-bold text-[15px]">Status</span>
      </div>
    ),
    sortable: true,
    render: ({ Status }: any) => (
      <div>
        {checkStatus(Status)}
      </div>
    ),
  },
  {
    accessor: 'Attachments',
    title: (
      <span className='job-offers-table poppins font-bold text-[14px]' style={{ textAlign: 'center', display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
        Attachments
      </span>
    ),
    sortable: true,
    render: ({ Attachments }: any) => Attachments ? <IconFile size={18} className="text-gray-600 poppins font-bold text-[14px]" /> : null,
  },
]

export default columns;