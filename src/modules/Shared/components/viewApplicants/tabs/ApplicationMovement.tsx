import { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { useApplicantIdStore } from "@modules/Shared/store";
import { getCombinedColumns } from "@src/modules/Shared/components/columns";
import { ApplicantMovementsProps, Props, InterviewSchedule } from "@src/modules/Shared/types";
import { fetchApplicantByIdService } from "@src/modules/Shared/utils/GetApplicantById/applicantServiceById";
import {

    READY_FOR_TRANSFER,
    FEEDBACK, TRANSFERRED,
    ALLOWED_ACCESSORS_BASE,
    MOVEMENT, COLUMN_HEADER_DATE,
    ARCHIVED, COLUMN_ACCESSOR_DATE_APPLIED,
} from "@modules/Shared/utils/constants";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

export default function ApplicationMovement({ status }: Props) {
    /* ----------------------------- data ---------------------------- */
    const applicantId = useApplicantIdStore((s) => s.id);
    const token = sessionStorage.getItem("accessToken") ?? undefined;

    const [applicant, setApplicant] = useState<ApplicantMovementsProps | null>(null);
    const [_isLoading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!applicantId || !token) return;

        setLoading(true);
        fetchApplicantByIdService(applicantId, token)
            .then(setApplicant)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [applicantId, token]);

    /* -------------------------- columns ---------------------------- */
    const allowedAccessors = [...ALLOWED_ACCESSORS_BASE];
    if (status === ARCHIVED) allowedAccessors.push(FEEDBACK);

    const allColumns = getCombinedColumns({ includeApplicants: true });

    const columnsWithComments = [
        ...allColumns.filter(
            (c) => allowedAccessors.includes(c.accessor) && c.accessor !== MOVEMENT
        ),
        ...allColumns.filter((c) => c.accessor === MOVEMENT),
    ].map((c) =>
        c.accessor === COLUMN_ACCESSOR_DATE_APPLIED
            ? { ...c, title: COLUMN_HEADER_DATE }
            : c
    );

    /* -------------------------- records --------------------------- */
    const movements = applicant?.applicationMovements ?? [];
    const schedules = applicant?.interviewSchedules ?? [];

    const safeDate = (d?: string | Date | null) =>
        d ? new Date(d).getTime() : 0;

    const movementRecords = movements.map((m, i) => ({
        _sortDate: safeDate(m.audit.date),
        id: `${applicantId}-move-${i}`,
        movement: formatMovement(m.status.name),
        comments: m.comment || null,
        applicationDate:
            DateTimeUtils.dateDefaultToHalfMonthWord(m.audit.date) || null,
    }));


    const stageRecords = schedules.map(
        (s: InterviewSchedule, i: number) => ({
            _sortDate: safeDate(s.schedule?.interviewDate ?? s.schedule?.date),
            id: `${applicantId}-stage-${i}`,
            movement: s.schedule?.interviewStage?.name ?? "Interview",
            comments: null,
            applicationDate:
                DateTimeUtils.dateDefaultToHalfMonthWord(
                    s.schedule?.interviewDate ?? s.schedule?.date
                ) || null,
        })
    );

    const records = [...movementRecords, ...stageRecords]
        .sort((a, b) => b._sortDate - a._sortDate)
        .map(({ _sortDate, ...rest }) => rest);

    /* ------------------------- helpers ---------------------------- */
    function formatMovement(src: string) {
        return src === READY_FOR_TRANSFER ? TRANSFERRED : src;
    }

    if (!fetchApplicantByIdService) return <p>Loading…</p>;

    /* ------------------------- render ----------------------------- */
    if (error)
        return (
            <p className="text-red-500">
                Couldn't load applicant data — please try again.
            </p>
        );

    return (
        <div className="pt-1 pb-40 poppins">
            <DataTable
                columns={columnsWithComments}
                records={records}
                sortIcons={{ sorted: <span />, unsorted: <span /> }}
                className="poppins font-medium text-[#6D6D6D] text-[14px]"
            />
        </div>
    );
}
