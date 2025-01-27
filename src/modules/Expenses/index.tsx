import { Button, TextInput } from '@mantine/core';
import { IconSearch, IconFileTypePdf, IconFileTypeXls } from '@tabler/icons-react';
import DataTable from "@src/modules/Expenses/components/DataTable";
import Dialog from "@src/modules/Expenses/components/Dialog";
import { DialogStore, DataTableStore } from "@src/modules/Expenses/store"
export const Expenses = () => {

  const { search, setSearch, setRefresh, setPage } = DataTableStore()
  const { setAction } = DialogStore()

  const handleSearch = () => {
    setPage(1)
    setRefresh(true)
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-4 h-full">

      <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-2'>
        <div className='flex gap-2'>
          <Button radius="md" color="blue" onClick={() => setAction('New')}>
            + Add Expenses
          </Button>
          <Button radius="md" color="green" >
            <IconFileTypeXls />
          </Button>
          <Button radius="md" color="red" >
            <IconFileTypePdf />
          </Button>
        </div>

        <TextInput
          className='w-full sm:w-1/6 self-end'
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          rightSection={<IconSearch onClick={handleSearch} />}
        />
      </div>

      <DataTable />
      <Dialog />
    </div>
  );
};

export default Expenses;
