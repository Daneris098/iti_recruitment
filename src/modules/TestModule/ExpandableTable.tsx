// import { useState, forwardRef } from 'react';
// import { DataTable } from 'mantine-datatable';
// import { IconPencil, IconTrashFilled } from "@tabler/icons-react";
// import { Flex, Text, Image } from '@mantine/core';
// import { OrganizationSettingsStore } from '@modules/OrganizationSettings/store';
// import { Company } from '@modules/OrganizationSettings/types';

// const PAGE_SIZE = 15;
// const initialData: Company[] = [
//     { id: 1, name: 'John', code: 'insys001', location: 'Quezon City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
//     { id: 2, name: 'Alice', code: 'insys002', location: 'Caloocan City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
//     { id: 3, name: 'Bob', code: 'insys003', location: 'Manila City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
// ];

// const DataTableComp = forwardRef((_, ref) => {
//     const { activePanel } = OrganizationSettingsStore();
//     const [page, setPage] = useState(1);
//     const [records, setRecords] = useState<Company[]>(initialData.slice(0, PAGE_SIZE));
//     const [expandedRowIds, setExpandedRowIds] = useState<number[]>([]);

//     const toggleRowExpansion = (id: number) => {
//         // Get the index of the row being toggled
//         const rowIndex = records.findIndex(record => record.id === id);
//         const lastRowIndex = records.length - 1;

//         // Prevent expansion if the last row is being toggled
//         if (rowIndex === lastRowIndex) {
//             return;
//         }

//         setExpandedRowIds(prev =>
//             prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//         );
//     };

//     const columns = [
//         {
//             accessor: 'code',
//             title: 'Code',
//             sortable: true,
//         },
//         {
//             accessor: 'name',
//             title: 'Name',
//             sortable: true,
//         },
//         {
//             accessor: 'status',
//             title: 'Status',
//             sortable: true,
//         },
//         {
//             accessor: 'actions',
//             title: 'Actions',
//             render: (data: Company) => (
//                 <div>
//                     <IconPencil onClick={() => toggleRowExpansion(data.id)} />
//                     <IconTrashFilled onClick={() => {/* handle delete */ }} />
//                 </div>
//             ),
//         },
//     ];

//     const rowExpansion = {
//         allowMultiple: true,
//         content: ({ record }) => (
//             <Flex p="xs" gap="md" align="center">
//                 <Image
//                     radius="sm"
//                     w={50}
//                     h={50}
//                     alt={`${record.name}`}
//                     src={`https://xsgames.co/randomusers/avatar.php?g=male&q=${record.id}`} // Placeholder image
//                 />
//                 <Text size="sm" fs="italic">
//                     {record.name} is located in {record.location}, area {record.area}.
//                     <br />
//                     Description: {record.description}.
//                     <br />
//                     Department: {record.department}, Head: {record.departmentHead}.
//                 </Text>
//             </Flex>
//         ),
//     };

//     return (
//         <DataTable
//             height="70dvh"
//             minHeight={400}
//             maxHeight={1000}
//             withTableBorder
//             highlightOnHover
//             borderRadius="sm"
//             withColumnBorders
//             striped
//             verticalAlign="top"
//             columns={columns}
//             records={records}
//             page={page}
//             onPageChange={setPage}
//             recordsPerPage={PAGE_SIZE}
//             rowExpansion={rowExpansion}
//         />
//     );
// });

// export default DataTableComp;