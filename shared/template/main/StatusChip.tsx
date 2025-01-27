import { Badge } from "@mantine/core";

interface Status {
  label: string;
}
export default function StatusChip({ label }: Status) {
  let color;
  switch (label) {
    case "Filed":
      color = "#9B51E0";
      break;
    case "Approved":
      color = "#1E8449";
      break;
    case "Cancelled":
      color = "#FF4B34";
      break;
    case "Reviewed":
      color = "#FF7800";
      break;
    default:
      color = "gray";
  }
  return (
    <Badge
      color={color}
      className="w-32 h-8 rounded-xl normal-case font-medium text-[13px]"
    >
      {label}
    </Badge>
  );
}
