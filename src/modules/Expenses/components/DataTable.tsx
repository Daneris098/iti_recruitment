import { DataTable as MantineDataTable } from 'mantine-datatable';
import { useEffect } from 'react';
import axiosInstance from "@src/api";
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import 'mantine-datatable/styles.layer.css';
import { Expenses } from '@src/modules/Expenses/types';
import { DialogStore, DataTableStore } from "@src/modules/Expenses/store"
import { useExpenses } from '@src/modules/Expenses/api/use-expenses';

dayjs.extend(localizedFormat);
const PAGE_SIZES = [10, 15, 20];

export default function DataTable() {

  const { setAction, setSelectedData } = DialogStore()

  const { isFetching, isError, error, data, refetch } = useExpenses();

  const {
    totalRecords, page, pageSize, sortStatus, refresh,
    setPage, setPageSize, setSortStatus, setRefresh
  } = DataTableStore();


  const handleEdit = (data: Expenses) => {
    setAction('Update')
    setSelectedData(data)
  };


  useEffect(() => {
    console.log(data);
  }, [data]);
  
  useEffect(() => {
    console.log(isFetching);
  }, [isFetching]);


  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`deleteExpenseById/${id}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Expense deleted successfully!",
                timer: 1500,
                showConfirmButton: false,
              });
              refetch(); // Refresh the data after deletion
            }
          })
          .catch((error) => {
            const message = error.response?.data?.message || "Failed to delete the expense.";
            Swal.fire("Error!", message, "error");
            console.error("Error deleting expense:", error.response || error);
          });
      }
    });
  };

  useEffect(() => {
    if(refresh){
      refetch();
    }
    return (
      setRefresh(false)
    )
  }, [ refresh]);

  useEffect(() => {
    console.log('err: ', error)
  }, [isError])

  return (
    <MantineDataTable
      idAccessor="_id"
      records={data}
      columns={[
        { accessor: '_id', title: 'ID', textAlign: 'left', sortable: true },
        { accessor: 'title', title: 'Title', textAlign: 'left', sortable: true },
        {
          accessor: 'amount', title: 'Amount', textAlign: 'left', sortable: true,
          render: (record) => `₱ ${record.amount}`,
        },
        {
          accessor: 'spent_at', title: 'Spent At', textAlign: 'left', sortable: true,
          render: (record) => dayjs(record.spent_at).format('MMMM D, YYYY'),
        },
        {
          accessor: 'actions', title: 'Actions', textAlign: 'left',
          render: (record) => (
            <div style={{ display: 'flex', justifyContent: 'left', gap: '10px' }}>
              <IconPencil
                size={20}
                style={{ cursor: 'pointer', color: '#007bff' }}
                onClick={() => handleEdit(record)}
                title="Edit"
              />
              <IconTrash
                size={20}
                style={{ cursor: 'pointer', color: '#dc3545' }}
                onClick={() => handleDelete(record._id)}
                title="Delete"
              />
            </div>
          ),
        },
      ]}
      paginationText={({ from, to, totalRecords }) =>
        `Showing data ${from} to ${to} of ${totalRecords} entries`
      }
      fetching={isFetching}
      loaderType="dots"
      loaderSize="lg"
      loaderColor="blue"
      loaderBackgroundBlur={1}
      className=""
      styles={{
        header: {
          color: "rgba(109, 109, 109, 0.6)",
          fontWeight: 500,
        },
        root: {
          color: "rgba(0, 0, 0, 0.6)",
        },
      }}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      totalRecords={totalRecords}
      paginationActiveBackgroundColor="grape"
      recordsPerPage={pageSize}
      page={page}
      onPageChange={setPage}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
    />
  );
}
