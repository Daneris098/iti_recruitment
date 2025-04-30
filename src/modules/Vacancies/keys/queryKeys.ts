export const applicantKeys = {
    all: ['vacancies'] as const,
    lists: () => [...applicantKeys.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...applicantKeys.lists(), filters] as const,
    detail: (id: string | number) => [...applicantKeys.all, 'detail', id] as const
}