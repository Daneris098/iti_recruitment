import { feedback, interviewStage } from "../types";

export const PAGE_SIZE = 15;
export const applicantInitialData: feedback[] = [
    { feedback: 'Great', id: 1 },
    { feedback: 'Good', id: 2 },
    { feedback: 'Bad', id: 3 },
];
export const hiringInitialData: feedback[] = [
    { feedback: 'Great', id: 1 },
    { feedback: 'Good', id: 2 },
    { feedback: 'Bad', id: 3 },
];
export const interviewStagesInitialData: interviewStage[] = [
    { id: 1, stageName: 'Initial Interview', status: 'ACTIVE', lastModified : 'Feb 17, 2025'},
    { id: 2, stageName: 'Assessment', status: 'INACTIVE', lastModified: 'Feb 17, 2025'},
    { id: 3, stageName: 'Final Interview', status: 'ACTIVE', lastModified: 'Feb 17, 2025'},
];
