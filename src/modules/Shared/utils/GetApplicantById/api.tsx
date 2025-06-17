import axios from 'axios';

export const getApplicantById = async <T = any>(
    endpoint: string,
    applicantId: number | string,
    token?: string | null
): Promise<T> => {
    const { data } = await axios.get<T>(
        `${endpoint}/${applicantId}`,
        {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
    );
    return data;
}