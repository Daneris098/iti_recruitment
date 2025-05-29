export const getDisplayStatus = (status: string): string => {
  const forInterviewStatuses = ["Assessment", "Final Interview", "Initial Interview"];
  return forInterviewStatuses.includes(status) ? "For Interview" : status;
};
