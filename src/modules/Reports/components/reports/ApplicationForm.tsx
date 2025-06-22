import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSharedUserService } from "@src/modules/Shared/api/useSharedUserService";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ReportStore } from "../../store";

export default function ApplicationForm() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const applicants = useQuery({
    queryKey: ["applicants", searchValue],
    queryFn: () => useSharedUserService.getAll({ name: searchValue }),
    enabled: !!searchValue,

    staleTime: 1000 * 60 * 5,
  });

  const form = useForm({
    initialValues: {
      applicantId: 0,
    },
  });

  const options =
    applicants.data?.items?.map((item: any) => ({
      value: String(item.id),
      label: `${item.nameResponse.firstName} ${item.nameResponse.lastName}`,
    })) || [];

  const handleChange = (value: string | null) => {
    setSelectedValue(value);

    const selectedItem = applicants.data?.items.find((item: any) => item.id.toString() === value);

    if (selectedItem) {
      const fullName = selectedItem.nameResponse.firstName + " " + selectedItem.nameResponse.lastName;

      const selected: { id: number; name: string } = {
        id: selectedItem.id,
        name: fullName,
      };
      form.setFieldValue("applicantId", selected.id);
      console.log("Selected:", selected);
    }
  };

  useEffect(() => {
    ReportStore.getState().updateForm("applicationForm", form.values);
  }, [form.values]);

  return (
    <div className="flex flex-col gap-4">
      <Select
        searchable
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        value={selectedValue}
        onChange={handleChange}
        data={options}
        classNames={{
          input: "poppins text-[#6D6D6D]",
          dropdown: "poppins text-[#6D6D6D]",
        }}
        radius={8}
        className="w-full text-[#6D6D6D]"
        size="md"
        label="Applicants"
        placeholder="Type full name (4 words)..."
        rightSection={<IconCaretDownFilled size="18" />}
        maxDropdownHeight={200}
        nothingFoundMessage="No applicants"
        clearable
      />
    </div>
  );
}
