import { Stack } from "@mantine/core";
export default function Container({ children }: { children: React.ReactNode }) {
  return <Stack className="w-full h-full">{children}</Stack>;
}
