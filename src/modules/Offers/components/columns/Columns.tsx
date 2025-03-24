import { IconFile } from "@tabler/icons-react";

export const checkStatus = (status: string) => {
  const statusType = status.toLowerCase();
  let className = 'job-offer-type-generated';
  if (statusType === 'generated') {
    className = 'text-white bg-[#9B51E0] rounded-md p-1 text-xs inline-block w-20 text-center';
  } else if (statusType === 'archived') {
    className = 'text-white rounded-md bg-[#F14336] text-xs p-1 inline-block w-20 text-center';
  } else if (statusType === 'accepted') {
    className = 'text-white rounded-md bg-[#5A9D27] text-xs p-1 inline-block w-20 text-center';
  }
  return <span className={className}>{status}</span>;
};

const columns = [
    {
      accessor: 'id',
      title: <span className='job-offers-table poppins font-medium text-[14px]'>ID</span>,
      sortable: true
    },
    {
      accessor: 'Applicant_Name',
      title: <span className='job-offers-table poppins font-medium text-[14px]'>Applicant Name</span>,
      sortable: true

    },
    {
      accessor: 'Date_Generated',
      title: <span className='job-offers-table poppins font-medium text-[14px]'>Date Generated</span>,
      sortable: true
    },
    {
      accessor: 'Date_Last_Updated',
      title: <span className='job-offers-table poppins font-medium text-[14px]'>Date Last Updated</span>,
      sortable: true
    },
    {
      accessor: 'Remarks',
      title: <span className='job-offers-table poppins font-medium text-[14px]'>Remarks</span>,
      sortable: true
    },
     { accessor: 'Status', 
      title: (<span className='job-offers-table poppins font-medium text-[14px]'>Status</span>), sortable: true,
      render: ({ Status } : any) => checkStatus(Status)
     },
     {
      accessor: 'Attachments',
      title: (
        <span className='job-offers-table poppins font-medium text-[14px]' style={{ textAlign: 'center', display: 'inline-flex', justifyContent: 'center', width: '100%'}}>
          Attachments
        </span>
      ),
      sortable: true,
      render: ({ Attachments } : any) => Attachments ? <IconFile size={18} className="text-gray-600 poppins font-medium text-[14px]" /> : null,

    },      
   ]

   export default columns;