export const ApplicantRoutes = {
    applied: {
        path: "/applied",
        status: ["Applied"],
        label: "Applied",
    },
    offered: {
        path: "/offered",
        status: ["Offered"],
        label: "Offered",
    },
    interview: {
        path: "/interview",
        status: ["Assessment", "Initial Interview", "Final Interview", "For Interview"],
        label: "For Interview",
    },
    applicants: {
        path: "/applicants",
        status: ["Hired", "Applied", "Offered", "For Transfer", "Archived", "For Interview"],
        label: "All Applicants",
    },
    hired: {
        path: "/hired",
        status: ["Hired"],
        label: "Hired",
    },
    transferee: {
        path: "/transferee",
        status: ["For Transfer"],
        label: "For Transfer",
    },
    transferred: {
        path: "/transferred",
        status: ["Ready for Transfer"],
        label: "Transferred",
    },
    archive: {
        path: "/archive",
        status: ["Archived"],
        label: "Archived",
    },
} as const;

export type ApplicantRouteKey = keyof typeof ApplicantRoutes;
export type ApplicantPath = (typeof ApplicantRoutes)[ApplicantRouteKey]["path"];