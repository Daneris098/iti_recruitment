export const sharedApplicantKeys = {
    all: ['applicants'] as const,
    lists: () => [...sharedApplicantKeys.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...sharedApplicantKeys.lists(), filters] as const,
    detail: (id: string | number) => [...sharedApplicantKeys.all, 'detail', id] as const
}