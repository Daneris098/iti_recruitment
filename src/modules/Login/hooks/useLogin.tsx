import axiosInstance from '@src/api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useLoginMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (formVal: { username: string; password: string }) => {
            const payload = {
                username: formVal.username,
                password: formVal.password,
            };
            const response = await axiosInstance.post('auth/login', payload);
            return response.data;
        },
        onSuccess: (data) => {
            const { refreshToken, accessToken } = data;
            sessionStorage.setItem('accessToken', accessToken);
            document.cookie = `refreshToken=${refreshToken}; path=/; secure; SameSite=Strict`;
            navigate('/home');
        },
    });
};
