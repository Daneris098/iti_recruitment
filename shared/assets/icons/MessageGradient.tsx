import { Tooltip } from "@mantine/core";

const MessageGradient = ({
  size,
  tooltip,
}: {
  size: number;
  tooltip?: string;
}) => {
  return (
    <Tooltip
      label={tooltip}
      position="bottom"
      className="bg-white text-blue-400 font-semibold cursor-pointer"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
      >
        <path
          d="M6.71875 7.125L8.05469 8.53125L11.1719 5.25M10.4361 12.587L8.5 16.5L6.71875 12.587H3.15625C2.17249 12.587 1.375 11.7475 1.375 10.712V3.375C1.375 2.33947 2.17249 1.5 3.15625 1.5H13.8438C14.8275 1.5 15.625 2.33947 15.625 3.375V10.712C15.625 11.7475 14.8275 12.587 13.8438 12.587H10.4361Z"
          stroke="url(#paint0_linear_4434_193)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_4434_193"
            x1="1.375"
            y1="9"
            x2="15.625"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="gray" />
            {/* <stop stopColor="#559CDA" /> */}
            {/* <stop offset="0.24" stopColor="#7BADFF" /> */}
            {/* <stop offset="0.73" stopColor="#FFB58D" /> */}
            {/* <stop offset="1" stopColor="#ED8028" /> */}
          </linearGradient>
        </defs>
      </svg>
    </Tooltip>
  );
};

export default MessageGradient;
