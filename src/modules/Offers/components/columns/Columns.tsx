import { IconFile } from "@tabler/icons-react";

export const checkStatus = (status: string) => {
  const statusType = status.toLowerCase();
  let className = 'job-offer-type-generated';
  if (statusType === 'generated') {
    className = 'text-white bg-purple-700 rounded-md p-1 text-xs inline-block w-20 text-center';
  } else if (statusType === 'archived') {
    className = 'text-white rounded-md bg-red-700 text-xs p-1 inline-block w-20 text-center';
  } else if (statusType === 'accepted') {
    className = 'text-white rounded-md bg-green-700 text-xs p-1 inline-block w-20 text-center';
  }
  return <span className={className}>{status}</span>;
};

const columns = [
    {
      accessor: 'id',
      title: <span className='job-offers-table'>ID</span>,
      sortable: true
    },
    {
      accessor: 'Applicant_Name',
      title: <span className='job-offers-table'>Applicant Name</span>,
      sortable: true

    },
    {
      accessor: 'Date_Generated',
      title: <span className='job-offers-table'>Date Generated</span>,
      sortable: true
    },
    {
      accessor: 'Date_Last_Updated',
      title: <span className='job-offers-table'>Date Last Updated</span>,
      sortable: true
    },
    {
      accessor: 'Remarks',
      title: <span className='job-offers-table'>Remarks</span>,
      sortable: true
    },
     { accessor: 'Status', 
      title: (<span className='job-offers-table'>Status</span>), sortable: true,
      render: ({ Status }) => checkStatus(Status)
     },
     {
      accessor: 'Attachments',
      title: (
        <span className='job-offers-table' style={{ textAlign: 'center', display: 'inline-flex', justifyContent: 'center', width: '100%'}}>
          Attachments
        </span>
      ),
      sortable: true,
      render: ({ Attachments }) => Attachments ? <IconFile size={18} className="text-gray-600" /> : null,

    },      
   ]

   export default columns;