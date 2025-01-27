import React from "react";
import { Tooltip } from "@mantine/core";
export const TooltipIcon = ({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) => {
  return (
    <>
      <Tooltip
        label={label}
        position="right-end"
        offset={{ crossAxis: 3, mainAxis: 10 }}
        arrowPosition="center"
        className="poppins"
        color="#559CDA"
        withArrow
      >
        {icon}
      </Tooltip>
    </>
  );
};
