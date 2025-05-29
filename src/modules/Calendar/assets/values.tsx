import { EventDetails } from "./Types";

// Initial empty value
const initialDetails: EventDetails = {
  scheduleId: 0,
  date: '',
  time: '',
  applicant: {
    id: 0,
    name: '',
    position: {},
  },
  interviewer: {
    id: 0,
    name: '',
  },
  interviewStage: {
    id: 0,
    name: '',
  },
};

export { initialDetails}