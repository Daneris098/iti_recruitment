import { Pagination, Group, Text, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
interface PaginationTypes {
  total: number;
  onChange: (page: number) => void;
  pageSize: number;
  recordsLength: number;
  currentPage: number;
}
export default function Footer({
  total,
  onChange,
  pageSize,
  recordsLength,
  currentPage,
}: PaginationTypes) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <Group justify={isMobile ? "center" : "space-between"} align="center">
      <Text size="sm" className="text-gray-500">
        Showing data {Math.min(currentPage * pageSize, recordsLength)} out of{" "}
        {recordsLength} entries found in (0.225) seconds
      </Text>
      <Pagination onChange={onChange} total={total} size="sm" />
    </Group>
  );
}
